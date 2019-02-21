const fs = require('fs');


async function readFile(path) {
    return new Promise((r, j) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return j(err);
            return r(data);
        })
    })
}

async function convertSpells() {
    console.log('reading json');
    let text = await readFile('spells.json');
    let parsed;
    console.log('parsing json');
    try {
        parsed = JSON.parse(text);
    } catch (e) {
        console.error('error parsing json', e);
        process.exit();
    }
    console.log('mapReduce');
    return parsed.sort((l, r) => l.level - r.level).reduce((acc, s) => {
        if (!s) {
            console.error('null s');
            return acc;
        }
        if (!s.components || !s.classes) {
            throw new Error('invalid spell: ', JSON.stringify(s));
        }
        let ver = s.components.indexOf('V') > -1;
        let som = s.components.indexOf('S') > -1;
        let matIdx = s.components.indexOf('M');
        let mat = '';
        if (matIdx > -1) {
            mat = s.components.substr(matIdx + 2).replace(/[\(\)]/g, '').trim();
        } else {
            mat = '';
        }
        let duration = 'null';
        if (s.duration) {
            duration = s.duration;
        }
        let range = 'null';
        if (s.range) {
            let val;
            if (s.range.length == 1) {
                range = `new Range(${s.range[0]})`
            } else if (s.range.length == 2) {
                range = `new Range(${s.range[0]}, ${s.range[1]})`
            }
        }
        let formattedName = formatSpellName(s.name);
        acc.enum.push(`${formattedName} = "${s.name}"`);
        let ret = `new Spell(SpellName.${formattedName}, ${s.level}, ${ver}, ${som}, ["${mat}"], "${s.time}", "${s.desc}", "${duration}", ${range})`;
        if (s.classes.indexOf('Bard') > -1) {
            acc.bard.push(ret);
        }
        if (s.classes.indexOf('Cleric') > -1) {
            acc.cleric.push(ret);
        }
        if (s.classes.indexOf('Druid') > -1) {
            acc.druid.push(ret);
        }
        if (s.classes.indexOf('Paladin') > -1) {
            acc.paladin.push(ret);
        }
        if (s.classes.indexOf('Ranger') > -1) {
            acc.ranger.push(ret);
        }
        if (s.classes.indexOf('Rogue') > -1) {
            acc.rogue.push(ret);
        }
        if (s.classes.indexOf('Sorcerer') > -1) {
            acc.sorcerer.push(ret);
        }
        if (s.classes.indexOf('Warlock') > -1) {
            acc.warlock.push(ret);
        }
        if (s.classes.indexOf('Wizard') > -1) {
            acc.wizard.push(ret);
        }
        return acc;
    }, {
        enum: [],
        bard: [],
        cleric: [],
        druid: [],
        paladin: [],
        ranger: [],
        rogue: [],
        sorcerer: [],
        warlock: [],
        wizard: [],
    });
}
/**
 * 
 * @param {string} name 
 */
function formatSpellName(name) {
    let capitalizeNext = false;
    let ret = '';
    for (let i = 0; i < name.length; i++) {
        let char = name[i];
        if (char === ' ') {
            capitalizeNext = true;
            continue;
        } 
        if (char === "'" || char === '/') {
            continue;
        }
        if (capitalizeNext) {
            capitalizeNext = false;
            ret += name[i].toLocaleUpperCase();
        } else {
            ret += name[i]
        }
    }
    return ret;
}
const FILE_PATH = 'ts/models/spellBook.ts';
async function write(lists) {
    console.log('removing old file');
    await removeFile(FILE_PATH);
    await append(`import { Spell } from './spells';\nimport { Range } from './character';\n`);
    for (let key in lists) {
        console.log('writing', key);
        if (key == 'enum') {
            await append('export enum SpellName {\n')
        } else {
            await append(`export const ${key.toLocaleUpperCase()}_SPELLS = [\n`);
        }
        for (let entry of lists[key]) {
            await append(`    ${entry},\n`);
        }
        if (key === 'enum') {
            await append("}\n");
        } else {    
            await append("];\n");
        }
    }
}

async function append(text) {
    return new Promise((r, j) => {
        fs.appendFile(FILE_PATH, text, err => {
            if (err) return j(err);
            return r();
        });
    });
}

async function removeFile(path) {
    return new Promise((r, j) => {
        fs.unlink(path, err => {
            if (err) return j(err);
            return r()
        });
    });
}

async function main() {
    let lists = await convertSpells();
    await write(lists);
}

main().then(() => {
    
    console.log('done');
}).catch(e => {
    console.error('error from main', e);
})