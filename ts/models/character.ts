import { AbilityScores, AbilityKind, AbilityScore } from "./abilityScore";
import { Data } from "../services/data";
import { Race } from './race';
import { Class, ClassKind } from './class';
import { RogueDetails, DruidCircle, ClericDomain } from './classDetails';
import { Background, BackgroundKind } from "./background";
import { Skills, SkillKind, Skill } from './skills';
import { Range } from './range';
export class Character {
    private static counter = 0;
    public id?: number;
    constructor(
        public name: string = Character.nextName(),
        public abilityScores: AbilityScores = new AbilityScores(),
        public race: Race = new Race(),
        public characterClass: Class,
        public background: Background = new Background(BackgroundKind.Criminal),
        public alignment: Alignment = Alignment.ChaoticGood(),
        public experience: number = 0,
        public height: Height = new Height(),
        public weight: number = 160,
        public eyeColor: string = 'grey',
        public inspiration: number = 0,
        public armor: Armor = null,
        public shield: Armor = null,
        public skills: Skills = new Skills(),
        public weapons: Weapon[] = [new Weapon()],
        public wealth: Wealth = new Wealth(),
        public languages: Language[] = [NormalLanguage.Common],
        public damage: number = 0,
        public tempHp: number = 0,
        public magicItems: MagicItem[] = [],
        public expendables: ExpendableItem[] = [],
    ) { 
        this.background.skills.map(s => {
            this.skills.set(s, true);
        });
    }

    public get proficiencyBonus(): number {
        return this.characterClass.proficiencyBonus()
    }

    public get proficiency(): string[] {
        let ret = this.characterClass.armorProfs.map(p => `${p} Armor`);
        ret.push(...this.characterClass.weaponProfs.map(p => {
            if (StdWeaponName[p.replace(/\s/g, '')]) {
                return p;
            }
            return `${p} Weapons`;
        }));
        ret.push(...this.characterClass.miscProfs);
        this.background.toolProficiencies.forEach(p => {
            if (Array.isArray(p)) {
                return;
            }
            ret.push(p);
        });
        if (this.background.languages.length > 0) {
            if (this.background.languages.filter(l => l != null).length == 0) {
                ret.push(`${this.background.languages.length} languages of your choice`);
            } else {
                ret.push(...this.background.languages);
            }
        }
        return ret;
    }

    public static nextName() {
        let ret = 'Carl';
        if (Character.counter > 0) {
            ret += ` ${Character.counter}`;
        }
        Character.counter++;
        return ret;
    }

    public get saves(): Save[] {
        let fullScores = this.abilityScores.map(score => {
            let s = new AbilityScore(score.value, score.kind);
            let raceMod = this.race.abilityModifiers.find(m => m[0] == s.kind);
            if (raceMod) {
                s.value += raceMod[1];
            }
            let classMod = this.characterClass.bonusAbilityScores.find(m => m[0] == s.kind);
            if (classMod) {
                s.value += classMod[1];
            }
            return s;
        });
        let prefs = this.characterClass.savingThrows;
        return fullScores.map(score => {
            let pref = prefs.indexOf(score.kind) > -1;
            let value = pref ? score.modifier + this.proficiencyBonus : score.modifier
            return new Save(score.kind, pref, value);
        });
    }

    public get rawSkills(): [SkillKind, number, boolean][] {
        let bonuses = this.modifiedAbilityScores().reduce((acc, ability) => {
            acc[ability.kind] = ability.modifier;
            return acc;
        }, {});
        return this.skills.map(skill => {
            let mod = bonuses[skill.modifier];
            let bonus = 0;
            let enabled = skill.enabled 
                        || this.characterClass.selectedSkills.indexOf(skill.kind) > -1;
            if (enabled) {
                if (this.characterClass.expertise.includes(skill.kind)) {
                    bonus = this.proficiencyBonus * 2;
                } else {
                    bonus = this.proficiencyBonus;
                }
            } else if (this.characterClass.name === ClassKind.Bard && this.level > 1) {
                bonus = Math.floor(this.proficiencyBonus / 2);
            }
            let value = mod + bonus;
            return [skill.kind, value, enabled] as [SkillKind, number, boolean];
        });
    }

    public modifiedAbilityScores(): AbilityScore[] {
        return this.abilityScores.map(s => {
            let bonus = 0;
            let racialMod = this.race.abilityModifiers.find(m => m[0] == s.kind);
            if (racialMod) {
                bonus += racialMod[1];
            }
            let classMod = this.characterClass.bonusAbilityScores.find(m => m[0] == s.kind);
            if (classMod) {
                bonus += classMod[1];
            }
            return new AbilityScore(bonus + s.value, s.kind);
        });
    }

    public get passiveWisdom(): number {
        return this.abilityScores.modifier(AbilityKind.Wisdom) + this.proficiencyBonus;
    }

    public get initiative(): number {
        return this.modifiedAbilityScores().find(s => s.kind === AbilityKind.Dexterity).modifier;
    }

    public armorClass(): number {
        let dex = this.modifiedAbilityScores().find(a => a.kind === AbilityKind.Dexterity).modifier;
        let bonus = 0;
        if (this.armor) {
            bonus = this.armor.bonus;
            if (this.armor.dexLimit && this.armor.dexLimit < dex) {
                dex = this.armor.dexLimit;
            }
        } else if (this.characterClass.name == ClassKind.Barbarian) {
            bonus = this.abilityScores.modifier(AbilityKind.Constitution);
        }
        if (this.shield) {
            bonus += this.shield.bonus;
        }
        return 10 + bonus + dex;
    }

    public get level(): number {
        let ret = Data.levelForExp(this.experience);
        if (this.characterClass.level != ret) {
            this.characterClass.level = ret;
        }
        return ret;
    }

    addExperience(points: number) {
        this.experience += points;
    }

    get expToNextLevel(): number {
        switch (this.level) {
            case 1:
                return 300 - this.experience;
            case 2:
                return 900 - this.experience;
            case 3:
                return 2700 - this.experience;
            case 4:
                return 6500 - this.experience;
            case 5:
                return 14000 - this.experience;
            case 6:
                return 23000 - this.experience;
            case 7:
                return 34000 - this.experience;
            case 8:
                return 48000 - this.experience;
            case 9:
                return 64000 - this.experience;
            case 10:
                return 85000 - this.experience;
            case 11:
                return 100000 - this.experience;
            case 12:
                return 120000 - this.experience;
            case 13:
                return 140000 - this.experience;
            case 14:
                return 165000 - this.experience;
            case 15:
                return 195000 - this.experience;
            case 16:
                return 225000 - this.experience;
            case 17:
                return 265000 - this.experience;
            case 18:
                return 305000 - this.experience;
            case 19:
                return 355000 - this.experience;
        }
    }

    hitPoints(): number {
        let con = this.abilityScores.modifier(AbilityKind.Constitution);
        let base = this.characterClass.hitDie + con;
        let avg = Data.averageHpFor(this.characterClass.name)
        for (let i = 0; i < this.level;i++) {
            base += avg + con;
        }
        return base;
    }

    currentHealth(): number {
        return this.hitPoints() + this.tempHp - this.damage;
    }

    get speed(): number {
        if (this.characterClass.name == ClassKind.Barbarian && this.level > 4) {
            return this.race.speed + 10;
        }
        return this.race.speed;
    }

    abilityScoreModNeeded(): number {
        let currentBonusPoints = Data.getAbilityScoreBonusCountFor(this.characterClass.name, this.level);
        return currentBonusPoints - this.characterClass.bonusAbilityCount();
    }

    skillsModNeeded(): number {
        return this.characterClass.numberOfSkills - this.characterClass.selectedSkills.length;
    }

    availableSkillsToAdd(): SkillKind[] {
        return this.characterClass.unselectedAvailableSkills().filter(s => !this.background.skills.includes(s));
    } 

    castorAbilityModifier() {
        let abilityKind: AbilityKind;
        switch (this.characterClass.name) {
            case ClassKind.Bard:
            case ClassKind.Paladin:
            case ClassKind.Sorcerer:
            case ClassKind.Warlock:
                abilityKind = AbilityKind.Charisma;
                break;
            case ClassKind.Cleric:
            case ClassKind.Druid:
            case ClassKind.Ranger:
                abilityKind = AbilityKind.Wisdom;
                break;
            case ClassKind.Fighter:
            case ClassKind.Rogue:
            case ClassKind.Wizard:
                abilityKind = AbilityKind.Intelligence
                break;
            default:
                return 0;
        }
        return this.modifiedAbilityScores().find(a => a.kind === abilityKind).modifier;
    }

    public static fromJson(json: any): Character {
        if (!json) {
            let err = new Error('Character json is undefined');
            console.error(err.message, err.stack);
            throw err;
        }
        let ret = new Character(
            json.name,
            AbilityScores.fromJson(json.abilityScores),
            Race.fromJson(json.race),
            Class.fromJson(json.characterClass),
            Background.fromJson(json.background),
            Alignment.fromJson(json.alignment),
            json.experience,
            Height.fromJson(json.height),
            json.weight,
            json.eyeColor,
            json.inspiration,
            Armor.fromJson(json.armor),
            Armor.fromJson(json.shield),
            Skills.fromJson(json.skills),
            json.weapons.map(Weapon.fromJson),
            Wealth.fromJson(json.wealth),
            json.languages,
            json.damage,
            json.tempHp,
            json.magicItems.map(MagicItem.fromJson),
            json.expendables.map(ExpendableItem.fromJson),
        );
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }
}

export type Language = NormalLanguage
                    | ClassLanguage;

export enum NormalLanguage {
    Common = 'Common',
    Dwarvish = 'Dwarvish',
    Elvish = 'Elvish',
    Halfling = 'Halfling',
    Draconic = 'Draconic',
    Gnomish = 'Gnomish',
    Orc = 'Orc',
    Infernal = 'Infernal',
}

export enum ClassLanguage {
    ThievesCant = "Thieves' Cant",
    Druidic = 'Druidic',
}

export enum CharacterSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export class Alignment {
    constructor(
        public major: AlignmentMajor, 
        public minor: AlignmentMinor,
    ) { }

    toString() {
        if (this.major == AlignmentMajor.Neutral 
            && this.minor == AlignmentMinor.Neutral) 
        {
            return 'True Neutral';
        }
        return `${this.major} ${this.minor}`;
    }
    static LawfulGood(): Alignment {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Good);
    }
    static LawfulNeutral(): Alignment {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Neutral);
    }
    static LawfulEvil(): Alignment {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Evil);
    }
    static NeutralGood(): Alignment {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Good);
    }
    static TrueNeutral(): Alignment {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Neutral);
    }
    static NeutralEvil(): Alignment {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Evil);
    }
    static ChaoticGood(): Alignment {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Good);
    }
    static ChaoticNeutral(): Alignment {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Neutral);
    }
    static ChaoticEvil(): Alignment {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Evil);
    }
    static fromJson(json: any): Alignment {
        return new Alignment(
            json.major,
            json.minor,
        );
    }

}

export enum AlignmentMajor {
    Lawful = 'Lawful',
    Neutral = 'Neutral',
    Chaotic = 'Chaotic',
}

export enum AlignmentMinor {
    Good = 'Good',
    Neutral = 'Neutral',
    Evil = 'Evil',
}

export class Height {
    constructor(
        public feet: number = 5,
        public inches: number = 9,
    ) { }

    toString(): string {
        return `${this.feet}' ${this.inches}"`;
    }
    public static fromJson(json: any): Height {
        return new Height(
            json.feet,
            json.inches,
        )
    }
}

export class Save {
    constructor(
        public kind: AbilityKind,
        public enabled: boolean,
        public value: number,
    ) { }
    public static fromJson(json: any): Save {
        return new Save(
            json.kind,
            json.enabled,
            json.value,
        )
    }
}

export class Armor {
    constructor(
        public name: ArmorName,
        public kind: ArmorWeight,
        public bonus: number,
        public dexLimit: number,
    ) { 
    }
    public maxDex(): string {
        if (this.dexLimit < 0) {
            return '∞';
        }
        return this.dexLimit.toString();
    }
    public static fromJson(json: any): Armor {
        if (!json) return null;
        return new Armor(
            json.name,
            json.kind,
            json.bonus,
            json.dexLimit || -1,
        )
    }
}

export type ArmorName = LightArmor | MediumArmor | HeavyArmor | 'Shield';

export enum LightArmor {
    Padded = 'Padded',
    Leather = 'Leather',
    StuddedLeather = 'Studded Leather',
}

export enum MediumArmor {
    Hide = 'Hide',
    ChainShirt = 'Chain Shirt',
    ScaleMail = 'Scale Mail',
    BreastPlate = 'Breast Plate',
    HalfPlate = 'Half Plate',
}

export enum HeavyArmor {
    RingMail = 'Ring Mail',
    ChainMail = 'Chain Mail',
    Splint = 'Splint',
    Plate = 'Plate',
}

export enum ArmorWeight {
    Light = 'Light',
    Medium = 'Medium',
    Heavy = 'Heavy',
    Shield = 'Shield',
}

export class Weapon {
    constructor(
        public name: WeaponName = 'Daggar',
        public weaponType: WeaponType = WeaponType.Melee,
        public kind: WeaponKind = WeaponKind.Simple,
        public damageKind: WeaponDamageKind = WeaponDamageKind.Piercing,
        public weight: WeaponWeight = WeaponWeight.Light,
        public handedness: WeaponHandedness = WeaponHandedness.One,
        public hitDie: [number, number] = [1, 4],
        public range: Range = new Range(5),
        public carryWeight: number = 1,
        public thrown: Range = new Range(20, 60),
        public isRanged: boolean = false,
        public isFinesse: boolean = true,
        public notes: string = '',
    ) { }

    miscString(): string {
        let ret = `${this.damageKind.substr(0, 1)}`;
        if (this.handedness) {
            ret += `/${this.handedness.substr(0, 1)}`;
        }
        if (this.weight) {
            ret += `/${this.weight.substr(0, 1).toLocaleLowerCase()}`;
        }
        if (this.isRanged) {
            ret += '/R';
        }
        if (this.thrown) {
            ret += '/T';
        }
        if (this.isFinesse) {
            ret += '/F'
        }
        ret += '/' + this.range.metaString();
        return ret;
    }

    longMiscString(): string {
        let ret = `Damage Kind: ${this.damageKind}`;
        if (this.handedness) {
            ret += `\nHandedness: ${this.handedness}`;
        }
        if (this.weight) {
            ret += `\nWeight: ${this.weight}`;
        }
        ret += `\nRanged: ${this.isRanged ? 'Yes' : 'No'}`;
        ret += `\nThrowable: ${this.thrown ? 'Yes' : 'No'}`;
        ret += `\nFinesse: ${this.thrown ? 'Yes' : 'No'}`
        return ret;
    }
    public static fromJson(json: any): Weapon {
        return new Weapon(
            json.name,
            json.weaponType,
            json.kind,
            json.damageKind,
            json.weight,
            json.handedness,
            json.hitDie,
            Range.fromJson(json.range),
            json.carryWeight,
            Range.fromJson(json.thrown),
            json.isRanged,
            json.isFinesse,
            json.notes,
        );
    }
}

export type WeaponName = StdWeaponName | string;
export enum StdWeaponName {
    Battleaxe = 'Battleaxe', 
    HandAxe = 'Hand Axe', 
    ThrowingHammer = 'Throwing Hammer',
    WarHammer = 'War Hammer',
    LongSword = 'Long Sword', 
    ShortSword = 'Short Sword', 
    ShortBow = 'Short Bow',
    LongBow = 'Long Bow',
    Rapier = 'Rapier',
    HandCrossbow = 'Hand Crossbow',
    Club = 'Club',
    Dagger = 'Dagger',
    Dart = 'Dart',
    Javelin = 'Javelin',
    Mace = 'Mace',
    QuarterStaff = 'Quarter Staff',
    Scimitar = 'Scimitar',
    Sickle = 'Sickle',
    Sling = 'Sling',
    LightCrossbow = 'LightCrossbow',
    Spear = 'Spear',
}

export enum WeaponType {
    Melee = 'Melee',
    Range = 'Range',
}

export enum WeaponKind {
    Simple = 'Simple',
    Martial = 'Martial',
    Natural = 'Natural',
}

export enum WeaponDamageKind {
    Piercing = 'Piercing',
    Slashing = 'Slashing',
    Bludgeoning = 'Bludgeoning',
    Acid = 'Acid',
    Fire = 'Fire',
    Lightening = 'Lightening',
    Cold = 'Cold',
    Poison = 'Poison',
}

export enum WeaponWeight {
    Light = 'Light',
    Heavy = 'Heavy',
}

export enum WeaponHandedness {
    One = 'One',
    Two = 'Two',
    Versatile = 'Versatile',
}

export class Wealth {
    constructor(
        public copper: number = 0,
        public silver: number = 0,
        public electrum: number = 0,
        public gold: number = 0,
        public platinum: number = 0
    ) {
        this.balance()
    }
    public balance() {
        this.roundUp();
        this.roundDown();        
    }
    public clone(): Wealth {
        return Wealth.fromJson(this)
    }
    public add(other: Wealth): Wealth {
        return new Wealth(
            this.copper + other.copper,
            this.silver + other.silver,
            this.electrum + other.electrum,
            this.gold + other.gold,
            this.platinum + other.platinum,
        );
    }
    public mul(mul: number): Wealth {
        return new Wealth(
            this.copper * mul,
            this.silver * mul,
            this.electrum * mul,
            this.gold * mul,
            this.platinum * mul
        );
    }

    private roundUp() {
        while (this.copper > 99) {
            this.copper -= 100;
            this.silver++;
        }
        while (this.silver > 99) {
            this.silver -= 100;
            this.electrum++;
        }
        while (this.electrum > 99) {
            this.electrum -= 100;
            this.gold++;
        }
        while (this.gold > 99) {
            this.gold -= 100;
            this.platinum += 1;
        }
    }

    private roundDown() {
        while (this.copper < 0) {
            this.silver--;
            this.copper += 100;
        }
        while (this.silver < 0) {
            this.electrum--;
            this.silver += 100;
        }
        while (this.electrum < 0) {
            this.gold--;
            this.electrum += 100;
        }
        while(this.gold < 0) {
            this.platinum--;
            this.gold += 100;
        }
    }
    public static fromJson(json: any): Wealth {
        return new Wealth(
            json.copper || 0,
            json.silver || 0,
            json.electrum || 0,
            json.gold || 0,
            json.platinum || 0,
        )
    }
}

export class MagicItem {
    constructor (
        public name: string,
        public buf: string, 
    ) {

    }
    public static fromJson(json: any) {
        return new MagicItem(
            json.name,
            json.buf,
        );
    }
}

export class ExpendableItem {
    constructor(
        public quantity: number,
        public name: string,
        public desc: string,
    ) { }

    public static fromJson(json: any): ExpendableItem {
        return new ExpendableItem(
            json.quantity,
            json.name,
            json.desc
        );
    }
}