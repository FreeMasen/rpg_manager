const { readFile,
    removeFile,
    _append } = require('./fileHelper.js');
const IN_PATH = 'Character Files/Classes 3.1.12.json';
const OUT_PATH = 'classes.2.js';

async function append(text) {
    await _append(text + '\n', OUT_PATH);
}
async function main() {
    let text = await readFile(IN_PATH);
    let classes = JSON.parse(text);
    try {
        await removeFile(OUT_PATH);
    } catch { }
    for (let klass in classes) {
        console.log('writing', klass);
        await append(`//${klass}`)
        await writeFeatures(classes[klass]);
    }
}

async function writeFeatures(obj) {
    if (!obj.features) {
        console.error('obj', obj);
        throw new Error('Missing features');
    }
    for (let feature of obj.features) {
        await append(`//level ${feature.level}`);
        if (feature.spells) {
            await append('//spells');
            for (let spell of feature.spells) {
                await append(`//${spell.level} - ${spell.name}`)
            }
        }
        await append(`new Note(\`${feature.name}\`, \`${feature.shortDesc}\`, \`${feature.longDesc}\`)`);
        if (feature.options) {
            for (let opt of feature.options) {
                await append(`//${feature.name}::${opt.name}`);
                await append(`new Note(\`${opt.name}\`, \`${opt.shortDesc}\`, \`${opt.longDesc}\`)`);
                if (opt.features) {
                    await writeFeatures(opt);
                }
                await append(`//${feature.name}::${opt.name}`);
            }
        }
    }
}

main().then(() => console.log('done')).catch(e => console.error('error in main', e));