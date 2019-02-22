import { Character, Wealth } from "../models/character";
import { RaceKind, SubRace, Elf, Dwarf, Gnome, Halfling, Dragon } from '../models/race';
import { ClassKind } from '../models/class';
import { Background } from "../models/background";
import { Spell } from "../models/spells";
import Dexie from 'dexie';

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

    async saveCharacter(ch: Character): Promise<void> {
        await this.db.saveCharacters([ch]);
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
}

export interface IStorable<T> {
    id?: number;
    data: T
}

export interface ISeed {
    id?: number;
    when: string;
}

export class Database extends Dexie {
    public seeds: Dexie.Table<ISeed, number>;
    public characters: Dexie.Table<Character, number>;
    public bardSpells: Dexie.Table<Spell, number>;
    public clericSpells: Dexie.Table<Spell, number>;
    public druidSpells: Dexie.Table<Spell, number>;
    public paladinSpells: Dexie.Table<Spell, number>;
    public rangerSpells: Dexie.Table<Spell, number>;
    public rogueSpells: Dexie.Table<Spell, number>;
    public sorcererSpells: Dexie.Table<Spell, number>;
    public warlockSpells: Dexie.Table<Spell, number>;
    public wizardSpells: Dexie.Table<Spell, number>;
    public ready = false;
    constructor() {
        super("DnDCharacterManager");
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
    }

    public async init() {
        console.log('checking for seeds');
        if (await this.seeds.count() === 0) {
            console.log('no seeds... seeding');
            await this.seed();
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

    async saveCharacters(chs: Character[]): Promise<void> {
        try {
            await this.characters.bulkPut(chs);
        } catch (e) {
            console.error('Failed to save characters', e, chs,)
        }
    }

    async spellsForClass(cls: ClassKind): Promise<Spell[]> {
        try {

            switch (cls) {
                case ClassKind.Bard:
                    return (await this.bardSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Cleric:
                    return (await this.clericSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Druid:
                    return (await this.druidSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Paladin:
                    return (await this.paladinSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Ranger:
                    return (await this.rangerSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Rogue:
                    return (await this.rogueSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Sorcerer:
                    return (await this.sorcererSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Warlock:
                    return (await this.warlockSpells.toArray()).map(Spell.fromJson);
                case ClassKind.Wizard:
                    return (await this.wizardSpells.toArray()).map(Spell.fromJson);
                default:
                    return [];
            }
        } catch (e) {
            console.error('failed to get spells for ', cls, e);
        }
    }

}
