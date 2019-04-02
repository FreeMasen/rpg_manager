import { Character, Wealth } from "../models/character";
import { RaceKind, SubRace, Elf, Dwarf, Gnome, Halfling, Dragon } from '../models/race';
import { ClassKind } from '../models/class';
import { Range } from '../models/range';
import { Background } from "../models/background";
import { Spell, SpellName, SpellSave } from "../models/spells";
import Dexie from 'dexie';
import { BarbarianDetails, BardDetails, ClericDetails, DruidDetails, FighterDetails, MonkDetails, PaladinDetails, RangerDetails, RogueDetails, SorcererDetails, WarlockDetails, WizardDetails } from "../models/classDetails";

export class Data {
    private db = new Database();
    async getCharacters(): Promise<Character[]> {
        if (!this.db.ready) {
            await this.db.init();
        }
        return await this.db.allCharacters();
    }

    async addCharacter(ch: Character): Promise<void> {
        await this.db.addCharacter(ch);
    }

    async saveCharacter(ch: Character): Promise<Character> {
        return this.db.saveCharacter(ch);
    }

    async saveCharacters(characters: Character[]): Promise<void> {
        if (!this.db.ready) {
            await this.db.init();
        }
        return await this.db.saveCharacters(characters);
    }

    async getSpellsForClass(cls: ClassKind): Promise<Spell[]> {
        return this.db.spellsForClass(cls);
    }

    async getClassDetails(cls: ClassKind, level: number) {
        return this.db.getClassDetails(cls, level);
    }

    static getAllClasses(): ClassKind[] {
        return Object.getOwnPropertyNames(ClassKind).map(n => ClassKind[n]);
    }

    static getAllRaces(): RaceKind[] {
        return Object.getOwnPropertyNames(RaceKind).map(n => RaceKind[n]);
    }

    static subRaceFor(race: RaceKind): SubRace[] | null {
        switch (race) {
            case RaceKind.Elf:
                return Object.getOwnPropertyNames(Elf).map(n => Elf[n]);
            case RaceKind.Dwarf:
                return Object.getOwnPropertyNames(Dwarf).map(n => Dwarf[n]);
            case RaceKind.Gnome:
                return Object.getOwnPropertyNames(Gnome).map(n => Gnome[n]);
            case RaceKind.Halfling:
                return Object.getOwnPropertyNames(Halfling).map(n => Halfling[n]);
            case RaceKind.Dragonborn:
                return Object.getOwnPropertyNames(Dragon).map(n => Dragon[n]);
            default:    
                return null;
        }
    }

    static getAllBackground(): Background[] {
        return [
            Background.Acolyte(),
            Background.Charlatan(),
            Background.Criminal(),
            Background.Entertainer(),
            Background.FolkHero(),
            Background.GuildArtisan(),
            Background.Hermit(),
            Background.Noble(),
            Background.Outlander(),
            Background.Sage(),
            Background.Sailor(),
            Background.Soldier(),
            Background.Urchin(),
        ]
    }

    static levelForExp(exp: number): number {
        if (exp < 300) {
            return 1;
        }
        if (exp < 900) {
            return 2;
        }
        if (exp < 2700) {
            return 3;
        }
        if (exp < 6500) {
            return 4;
        }
        if (exp < 14000) {
            return 5;
        }
        if (exp < 23000) {
            return 6;
        }
        if (exp < 34000) {
            return 7;
        }
        if (exp < 48000) {
            return 8;
        }
        if (exp < 64000) {
            return 9;
        }
        if (exp < 85000) {
            return 10;
        }
        if (exp < 100000) {
            return 11;
        }
        if (exp < 120000) {
            return 12;
        }
        if (exp < 140000) {
            return 13;
        }
        if (exp < 165000) {
            return 14;
        }
        if (exp < 195000) {
            return 15;
        }
        if (exp < 225000) {
            return 16;
        }
        if (exp < 265000) {
            return 17;
        }
        if (exp < 305000) {
            return 18;
        }
        if (exp < 355000) {
            return 19;
        }
        return 20;
    }

    public static proficiencyBonusFor(level: number) {
        if (level < 5) {
            return 2;
        }
        if (level < 9) {
            return 3;
        }
        if (level < 13) {
            return 4;
        }
        if (level < 17) {
            return 5;
        }
        return 6;
    }

    public static averageHpFor(classKind: ClassKind) {
        switch (classKind) {
            case ClassKind.Barbarian:
                return 7;
            case ClassKind.Fighter:
            case ClassKind.Paladin:
            case ClassKind.Ranger:
                return 6;
            case ClassKind.Bard:
            case ClassKind.Cleric:
            case ClassKind.Druid:
            case ClassKind.Rogue:
            case ClassKind.Warlock:
            case ClassKind.Monk:
                return 5;
            case ClassKind.Sorcerer:
            case ClassKind.Wizard:
                return 4;
            
        }
    }

    public static startingWealthFor(classKind: ClassKind): Wealth {
        let mul = 10;
        let numD4 = 0;
        switch (classKind) {
            case ClassKind.Barbarian:
            case ClassKind.Druid:
                numD4 = 2;
            break;
            case ClassKind.Sorcerer:
                numD4 = 3;
            break;
            case ClassKind.Rogue:
            case ClassKind.Warlock:
            case ClassKind.Wizard:
                numD4 = 4;
            break;
            default:
                numD4 = 5;
            case ClassKind.Monk:
                mul = 1;
            break;

        }
        let gp = 0;
        for (var i = 0; i < numD4; i++) {
            gp += Math.floor(Math.random() * 4) + 1;
        }
        return new Wealth(0,0,0,gp * mul,0);
    }

    public static getAbilityScoreBonusCountFor(cls: ClassKind, level: number): number {
        let ret = 0;
        if (level > 3) {
            ret += 2;
        }
        if (level > 7) {
            ret += 2;
        }
        if (level > 11) {
            ret += 2;
        }
        if (level > 15) {
            ret += 2;
        }
        if (level > 18) {
            ret += 2;
        }
        if (cls === ClassKind.Rogue && level > 9) {
            ret += 2;
        }
        if (cls === ClassKind.Fighter) {
            if (level > 5) {
                ret += 2;
            }
            if (level > 13) {
                ret += 2;
            }
        }
        return ret;
    }
}

export interface ISeed {
    id?: number;
    when: string;
    version: number;
}

export interface IClassFeature {
    id?: number;
    optionId?: number;
    level: number;
    classKind: ClassKind;
    name: string;
    shortDesc: string;
    longDesc: string;
}

export interface IClassFeatureOption {
    id?: number;
    featId: number;
    name: string;
    shortDesc: string;
    longDesc: string;
}

export class ClassFeature {
    id?: number;
    constructor(
        public classKind: ClassKind,
        public level: number,
        public name: string,
        public shortDesc: string,
        public longDesc: string,
        public options?: ClassFeatureOption[],
        id?: number,
    ) {
        if (id) {
            this.id = id;
        }
    }

    static fromJson(json: any): ClassFeature {
        let ret = new ClassFeature(
            json.classKind,
            json.level,
            json.name,
            json.shortDesc,
            json.longDesc,
        );
        if (json.options) {
            ret.options = json.options.map(j => ClassFeatureOption.fromJson(j, j.features));
        }
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }

    toString(): string {
        return `${this.name} - ${this.shortDesc}`;
    }
}

export class ClassFeatureOption {
    id?: number;
    constructor(
        public name: string,
        public shortDesc: string,
        public longDesc: string,
        public features?: ClassFeature[],
        id?: number
    ) { 
        if (id) {
            this.id = id;
        }
    }

    static fromJson(json: IClassFeatureOption, features?: IClassFeature[]): ClassFeatureOption {
        let ret = new ClassFeatureOption(
            json.name,
            json.shortDesc,
            json.longDesc,
        );
        if (features) {
            ret.features = features.map(ClassFeature.fromJson);
        }
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }
}
export interface ISpell {
    id?: number;
    name: SpellName;
    level: number;
    verbalRequirement: boolean;
    somaticRequirement: boolean;
    materialRequirement: string[];
    castingTime: string;
    desc: string;
    duration?: string;
    range?: Range;
    save?: SpellSave;
    classKinds: ClassKind[];
}

function formatClassKind(s: string) {
    let ret = '';
    ret += s[0].toLocaleUpperCase();
    ret += s.substr(1);
    return ret;
}
export class Database extends Dexie {
    public seeds: Dexie.Table<ISeed, number>;
    public characters: Dexie.Table<Character, number>;
    public spells: Dexie.Table<ISpell, number>;
    public classFeatures: Dexie.Table<IClassFeature, number>;
    public classFeatureOptions: Dexie.Table<IClassFeatureOption, number>;
    public ready = false;
    constructor() {
        super("DnDCharacterManager");
        (window as any).db = this;
        this.version(1).stores({
            seeds: "++id",
            characters: "++id,name",
            bardSpells: "++id,name",
            clericSpells: "++id,name",
            druidSpells: "++id,name",
            paladinSpells: "++id,name",
            rangerSpells: "++id,name",
            rogueSpells: "++id,name",
            sorcererSpells: "++id,name",
            warlockSpells: "++id,name",
            wizardSpells: "++id,name",
        });
        this.version(2).stores({
            seeds: "++id",
            characters: "++id,name",
            spells: "++id,name,*classKinds",
            classFeatures: "++id,classKind,level,optionId",
            classFeatureOptions: "++id,featId"
        }).upgrade((t) => {
            console.info('upgrading to v2');
            this.upgradeToTwo(t).then(() => {
                console.info('update complete');
            });
        });
    }

    private async upgradeToTwo(t: Dexie.Transaction) {
        for (let table in t.tables) {
            let idx = table.indexOf('Spells')
            if (idx > -1) {
                let classKind = formatClassKind(table.substring(0, idx)) as ClassKind;
                let rows: Spell[] = await t.table(table).toArray();
                for (let row of rows) {
                    let spell: ISpell = await t.table('spells').where('name').equals(row.name).first();
                    if (spell) {
                        spell.classKinds.push(classKind);
                        await t.table('spells').put(spell);
                    } else {
                        delete row.id;
                        (row as ISpell).classKinds = [classKind];
                        await t.table('spells').add(row);
                    }
                }
            }
        }
    }

    public async init() {
        console.info('checking for seeds');
        let lastSeed = await this.seeds.orderBy('id').reverse().first();
        if (!lastSeed) {
            console.info('no seeds... seeding');
            await this.seed();
        } else {
            console.info('last seeded version', lastSeed.version || 1,'at', lastSeed.when);
        }
        this.ready = true;
    }

    public async seed() {
        try {
            let mod = await import('./seeder');
            await mod.seed(this);
        } catch (e) {
            console.error('error seeding', e);
            throw e;
        }
    }

    async allCharacters(): Promise<Character[]> {
        let arr = await this.characters.toArray();
        return arr.map(Character.fromJson);
    }

    async addCharacter(ch: Character): Promise<void> {
        try {
            await this.characters.add(ch);
        } catch (e) {
            console.error('failed to add character', e, ch);
        }
    }

    async saveCharacter(ch: Character): Promise<Character> {
        try {
            let dbCh = Character.fromJson(await this.characters.get(ch.id));
            if (dbCh.level < ch.level) { // Level up!
                for (let i = 0; i < ch.level - dbCh.level;i++) {
                    let newFeatures = await this.getSingleLevelFeatures(ch.characterClass.name, dbCh.level + i + 1);
                    ch.characterClass.classDetails.features.push(...newFeatures);
                }
                ch.characterClass._level = ch.level;
                ch.characterClass.classDetails.level = ch.level;
            } 
            await this.characters.put(ch);
        } catch (e) {
            console.error(e);
        }
        return ch;
    }

    async saveCharacters(chs: Character[]): Promise<void> {
        try {
            await this.characters.bulkPut(chs);
        } catch (e) {
            console.error('Failed to save characters', e, chs,);
            throw e;
        }
    }

    async spellsForClass(cls: ClassKind): Promise<Spell[]> {
        try {
            let dbSpells = await this.spells.where('classKinds').equals(cls).toArray();
            return dbSpells.map(s => new Spell(s.name, s.level, s.verbalRequirement, s.somaticRequirement, s.materialRequirement, s.castingTime, s.desc, s.duration, s.range, s.save))
        } catch (e) {
            console.error('failed to get spells for ', cls, e);
            throw e;
        }
    }
    async getClassDetails(cls: ClassKind, level: number) {
        let features = await this.getClassFeatures(cls, level);
        switch (cls) {
            case ClassKind.Barbarian:
                return new BarbarianDetails(level, features);
            case ClassKind.Bard:
                return new BardDetails(level, features);
            case ClassKind.Cleric:
                return new ClericDetails(level, features);
            case ClassKind.Druid:
                return new DruidDetails(level, features);
            case ClassKind.Fighter:
                return new FighterDetails(level, features);
            case ClassKind.Monk:
                return new MonkDetails(level, features);
            case ClassKind.Paladin:
                return new PaladinDetails(level, features);
            case ClassKind.Ranger:
                return new RangerDetails(level, features);
            case ClassKind.Rogue:
                return new RogueDetails(level, features);
            case ClassKind.Sorcerer:
                return new SorcererDetails(level, features);
            case ClassKind.Warlock:
                return new WarlockDetails(level, features);
            case ClassKind.Wizard:
                return new WizardDetails(level, features);
        }
    }

    async getClassFeatures(cls: ClassKind, level: number, optionId: number = undefined) {
        let dbFeats = await this.classFeatures.where('classKind')
                                                .equals(cls)
                                                .and(f => f.level <= level && f.optionId == optionId)
                                                .toArray();
        let ret: ClassFeature[] = new Array(dbFeats.length);
        for (let i = 0; i < dbFeats.length; i++) {
            let dbFeat = dbFeats[i];
            let feature = new ClassFeature(dbFeat.classKind, dbFeat.level, dbFeat.name, dbFeat.shortDesc, dbFeat.longDesc, null, dbFeat.id);
            let dbOpts = await this.getOptionsForClassFeature(dbFeats[i].id);
            if (dbOpts && dbOpts.length > 0) {
                let options = new Array(dbOpts.length);
                for (let j = 0; j < dbOpts.length;j++) {
                    let dbOpt = dbOpts[j];
                    let feats = await this.getClassFeatures(cls, level, dbOpt.id);
                    options[j] = new ClassFeatureOption(dbOpt.name, dbOpt.shortDesc, dbOpt.longDesc, feats, dbOpt.id);
                }
                feature.options = options;
            }
            ret[i] = feature;
        }
        return ret;
    }

    async getSingleLevelFeatures(cls: ClassKind, level: number, optionId: number = undefined) {
        let dbFeats = await this.classFeatures.where('classKind')
                                                .equals(cls)
                                                .and(f => f.level === level && f.optionId == optionId)
                                                .toArray();
        let ret: ClassFeature[] = new Array(dbFeats.length);
        for (let i = 0; i < dbFeats.length; i++) {
            let dbFeat = dbFeats[i];
            let feature = new ClassFeature(dbFeat.classKind, dbFeat.level, dbFeat.name, dbFeat.shortDesc, dbFeat.longDesc, null, dbFeat.id);
            let dbOpts = await this.getOptionsForClassFeature(dbFeats[i].id);
            if (dbOpts && dbOpts.length > 0) {
                let options = new Array(dbOpts.length);
                for (let j = 0; j < dbOpts.length;j++) {
                    let dbOpt = dbOpts[j];
                    let feats = await this.getClassFeatures(cls, level, dbOpt.id);
                    options[j] = new ClassFeatureOption(dbOpt.name, dbOpt.shortDesc, dbOpt.longDesc, feats, dbOpt.id);
                }
                feature.options = options;
            }
            ret[i] = feature;
        }
        return ret;
    }

    async getOptionsForClassFeature(featId: number) {
        return await this.classFeatureOptions.where('featId').equals(featId).toArray();
    }

    async getFeaturesForOption(optId: number) {
        return await this.classFeatures.where('optionId').equals(optId).toArray()
    } 
}
