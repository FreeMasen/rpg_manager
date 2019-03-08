const xml = require('xml2js');
const fs = require('fs');

async function readFile(path) {
    return new Promise((r, j) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return j(err);
            return r(data);
        })
    })
}
async function parseFile(content) {
    return new Promise((r, j) => {
        xml.parseString(content, (err, res) => {
            if (err) return j(err);
            return r(res);
        });
    });
}

async function writeFile(path, content) {
    return new Promise((r, j) => {
        fs.writeFile(path, content, err => {
            if (err)  return j(err);
            return r();
        });
    });
}
const FILES = [
    // 'Character Files/Backgrounds 1.6.0.xml',
    'Character Files/Classes 3.1.1.xml',
    // 'Character Files/Feats 1.4.1.xml',
    // 'Character Files/Races 2.0.xml',
];
async function main() {
    for (let path of FILES) {
        let content = await readFile(path);
        let result = await parseFile(content);
        let transformed = {};
        for (let c of result['compendium']['class']) {
            let name = c['name'][0];
            let cls = {
                hidDie: c['hd'],
                features: []
            }
            let features = [];
            autoLevel: for (let feat of c['autolevel']) {
                if (!feat['$']['level'] || !feat['feature']) {
                    continue;
                }
                let level = parseInt(feat['$']['level']);
                for (let {name, text} of feat['feature']) {
                    if (name[0].indexOf('Starting') > -1) {
                        continue autoLevel;
                    }
                    cls.features.push(new Feature(level, name[0], text.join('\n')));
                }
            }            
            transformed[name] = cls;
        }
        await writeFile(path.substr(0, path.length - 4) + '2.json', JSON.stringify(transformed));
    }
}

function Feature(level, name, text) {
    this.level = level;
    this.name = name;
    this.text = text;
}

main().then(() => console.log('done')).catch(e => console.error('error', e));