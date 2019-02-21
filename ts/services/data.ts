import { Character, Height, Armor, ArmorWeight, Weapon, 
    WeaponType, WeaponKind, WeaponDamageKind, 
    WeaponWeight, WeaponHandedness, 
    Wealth, NormalLanguage, Alignment, MagicItem, 
    ExpendableItem, LightArmor } from "../models/character";
import { Race, RaceKind, SubRace, Elf, Dwarf, Gnome, Halfling, Dragon } from '../models/race';
import { Class, ClassKind } from '../models/class';
import { RogueDetails, RoguishArchType} from '../models/classDetails';
import { AbilityScores, AbilityScore, AbilityKind } from "../models/abilityScore";
import { Background, BackgroundKind } from "../models/background";
import { MiscTools, GamingSet } from '../models/tools';
import { Skills, SkillKind } from '../models/skills';
import { BARD_SPELLS, CLERIC_SPELLS, DRUID_SPELLS, PALADIN_SPELLS, 
    RANGER_SPELLS, ROGUE_SPELLS, SORCERER_SPELLS, 
    WARLOCK_SPELLS, WIZARD_SPELLS } from "../models/spellBook";
import { Spell } from "../models/spells";
import { Range } from '../models/range';
function seedCharacters() {
    let d = new Character('Daggers', 
                new AbilityScores([
                    new AbilityScore(8, AbilityKind.Strength),
                    new AbilityScore(8+7, AbilityKind.Dexterity),
                    new AbilityScore(8, AbilityKind.Constitution),
                    new AbilityScore(8, AbilityKind.Intelligence),
                    new AbilityScore(8+1, AbilityKind.Wisdom),
                    new AbilityScore(8+7, AbilityKind.Charisma),
                ]), 
                new Race(RaceKind.Human), 
                new Class(ClassKind.Rogue, 4, 
                    [
                    [AbilityKind.Strength, 0],
                    [AbilityKind.Dexterity, 2],
                    [AbilityKind.Constitution, 0],
                    [AbilityKind.Intelligence, 0],
                    [AbilityKind.Wisdom, 0],
                    [AbilityKind.Charisma, 0],
                    ],
                    [SkillKind.Acrobatics, SkillKind.SleightOfHand, SkillKind.Persuasion, SkillKind.Perception,]
                ),
                new Background(BackgroundKind.Criminal,
                    [SkillKind.Stealth, SkillKind.Deception],
                    [],
                    [MiscTools.Thieves, GamingSet.Dragonchess]),
                Alignment.TrueNeutral(),
                5116,
                new Height(5, 8),
                160,
                'Blue',
                0,
                new Armor(LightArmor.Leather, ArmorWeight.Light, 2),
                null,
                new Skills(),
                [new Weapon('Dagger', 
                            WeaponType.Melee, 
                            WeaponKind.Simple, 
                            WeaponDamageKind.Piercing, 
                            WeaponWeight.Light, 
                            WeaponHandedness.One, 
                            [1, 4], 
                            new Range(5), 
                            1, 
                            new Range(20, 60), 
                            false, 
                            true),
                new Weapon('Short Bow', 
                            WeaponType.Range, 
                            WeaponKind.Simple, 
                            WeaponDamageKind.Piercing, 
                            WeaponWeight.Light, 
                            WeaponHandedness.Two, 
                            [1,6], 
                            new Range(80, 320), 
                            1, 
                            null, 
                            true, 
                            false),
                ],
                new Wealth(0, 0, 0, 3450, 0),
                [NormalLanguage.Common],
                [],
                0,
                0,
                [
                    new MagicItem('Cloak of Elvenkind', 'Hood up: Preception checks to see you have disadvantage, stealth checks have advantage'),
                    new MagicItem('Goggles of Night', 'Darkvision (60 feet)'),
                ],
                [new ExpendableItem(1, 'Health Pot.', 'heal 2d4+2 Damage')],
    );
    let details = d.characterClass.classDetails as RogueDetails;
    details.archType = RoguishArchType.Thief;
    details.expertise.push(SkillKind.Deception, SkillKind.Stealth);
    return [d];
} 
export class Data {

    async getCharacters(): Promise<Character[]> {
        let rawCh = localStorage.getItem('characters');
        if (!rawCh || rawCh.length == 0) {
            return seedCharacters();
        } 
        let chs;
        try {
            chs = JSON.parse(rawCh);
        } catch (e) {
            console.error(e);
            return seedCharacters();
        }
        return chs.map(Character.fromJson);
    }

    async saveCharacters(characters: Character[]): Promise<void> {
        localStorage.setItem('characters', JSON.stringify(characters));
    }

    // private sendMsg<T>(event: string, data?: any): Promise<T> {
    //     return new Promise((resolve, reject) => {
    //         let to = setTimeout(rejectHandler, 5000)
    //         function resultHandler(ev) {
    //             window.removeEventListener('rcp-update', resultHandler);
    //             clearTimeout(to);
    //             resolve(ev.detail);
    //         }
    //         function rejectHandler() {
    //             reject("timeout");
    //         }
    //         let obj = {
    //             event,
    //             data: data != undefined ? data : null,
    //         };
    //         window.addEventListener('rcp-update', resultHandler);
    //         (window.external as any).invoke(JSON.stringify(obj));
    //     });
    // }

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

    static spellsForClass(name: ClassKind): Spell[] {
        switch (name) {
            case ClassKind.Bard:
                return BARD_SPELLS;
            case ClassKind.Cleric:
                return CLERIC_SPELLS;
            case ClassKind.Druid:
                return DRUID_SPELLS;
            case ClassKind.Paladin:
                return PALADIN_SPELLS;
            case ClassKind.Ranger:
                return RANGER_SPELLS;
            case ClassKind.Rogue:
                return ROGUE_SPELLS;
            case ClassKind.Sorcerer:
                return SORCERER_SPELLS;
            case ClassKind.Warlock:
                return WARLOCK_SPELLS;
            case ClassKind.Wizard:
                return WIZARD_SPELLS;
            default:
                return [];
        }
    }
}
