const { readFile,
    removeFile,
    _append } = require('./fileHelper.js');
const FILE_PATH = 'spellBook.json';
async function append(text) {
    await _append(text, FILE_PATH);
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
        if (s.duration) {
            duration = s.duration;
        }
        let ret = {
            name: s.name,
            level: s.level,
            verbalRequirement: ver,
            somaticRequirement: som,
            materialRequirement: [mat],
            castingTime: s.time,
            desc: s.desc,
            duration: s.duration,
            classKinds: []
        }
        if (s.range) {
            let val;
            if (s.range.length == 1) {
                ret.range = {first: s.range[0]}; //`new Range(${s.range[0]})`
            } else if (s.range.length == 2) {
                ret.range = {first: s.range[0], second: s.range[0]};//`new Range(${s.range[0]}, ${s.range[1]})`
            }
        }
        if (s.classes.indexOf('Bard') > -1) {
            ret.classKinds.push('Bard');
        }
        if (s.classes.indexOf('Cleric') > -1) {
            ret.classKinds.push('Cleric');
        }
        if (s.classes.indexOf('Druid') > -1) {
            ret.classKinds.push('Druid');
        }
        if (s.classes.indexOf('Fighter') > -1) {
            ret.classKinds.push('Fighter');
        }
        if (s.classes.indexOf('Paladin') > -1) {
            ret.classKinds.push('Paladin');
        }
        if (s.classes.indexOf('Ranger') > -1) {
            ret.classKinds.push('Ranger');
        }
        if (s.classes.indexOf('Rogue') > -1) {
            ret.classKinds.push('Rogue');
        }
        if (s.classes.indexOf('Sorcerer') > -1) {
            ret.classKinds.push('Sorcerer');
        }
        if (s.classes.indexOf('Warlock') > -1) {
            ret.classKinds.push('Warlock');
        }
        if (s.classes.indexOf('Wizard') > -1) {
            ret.classKinds.push('Wizard');
        }
        return acc.concat([ret]);
    }, []);
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

async function write(lists) {
    console.log('removing old file');
    try {
        await removeFile(FILE_PATH);
    } catch {}
    await append(JSON.stringify(lists));
    // await append(`import { Spell } from './spells';\nimport { Range } from './character';\n`);
    // await append("{");
    // for (let key in lists) {
    //     console.log('writing', key);
    //     await append(`key: `)
        // if (key == 'enum') {
        //     await append('export enum SpellName {\n')
        // } else {
        //     await append(`export const ${key.toLocaleUpperCase()}_SPELLS = [\n`);
        // }
        // for (let entry of lists[key]) {
        //     await append(`    ${entry},\n`);
        // }
        // if (key === 'enum') {
        //     await append("}\n");
        // } else {    
        //     await append("];\n");
        // }
    // }
}

async function main() {
    let spells = await convertSpells();
    await write(spells);
}

main().then(() => console.log('done')).catch(e => console.error('error in main', e));