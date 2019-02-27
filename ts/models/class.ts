import { AbilityKind } from './abilityScore';
import {
    WeaponKind, StdWeaponName,
    ArmorWeight
} from './character';
import { SkillKind, Skill } from './skills';
import {
    ClassDetails, BarbarianDetails,
    BardDetails, BardCollege,
    ClericDetails, RogueDetails, DruidDetails, FighterDetails, MonkDetails, PaladinDetails, RangerDetails, SorcererDetails, WarlockDetails, WizardDetails, RoguishArchType,
} from './classDetails';
import { Data } from '../services/data';

export const DEFAULT_BONUS_ABILITY_SCORES: [AbilityKind, number][] =  [
    [AbilityKind.Strength, 0],
    [AbilityKind.Dexterity, 0],
    [AbilityKind.Constitution, 0],
    [AbilityKind.Intelligence, 0],
    [AbilityKind.Wisdom, 0],
    [AbilityKind.Charisma, 0],
];

export class Class {
    public desc: string;
    public hitDie: number;
    public primaryAbility: AbilityKind[];
    public numberOfPrimaryAbilities = 1;
    public savingThrows: AbilityKind[] = [];
    public weaponProfs: Array<WeaponKind | StdWeaponName> = [];
    public armorProfs: ArmorWeight[] = [];
    public canUseShield: boolean = false;
    public features = [];
    public numberOfSkills = 0;
    public availableSkills: SkillKind[] = [];
    public classDetails: ClassDetails;
    public miscProfs: string[] = [];
    isCaster: boolean = false;
    constructor(
        public name: ClassKind,
        public _level: number,
        public bonusAbilityScores: [AbilityKind, number][] = DEFAULT_BONUS_ABILITY_SCORES,
        public selectedSkills: SkillKind[] = [],
    ) {
        switch (name) {
            case ClassKind.Barbarian:
                this.barbarianCtor();
            break;
            case ClassKind.Bard:
                this.bardCtor();
            break;
            case ClassKind.Cleric:
                this.clericCtor();
            break;
            case ClassKind.Druid:
                this.druidCtor();
            case ClassKind.Fighter:
                this.fighterCtor();
            break;
            case ClassKind.Monk:
                this.monkCtor();
            break;
            case ClassKind.Paladin:
                this.paladinCtor();
            break;
            case ClassKind.Ranger:
                this.rangerCtor();
            break;
            case ClassKind.Rogue:
                this.rogueCtor();
            break;
            case ClassKind.Sorcerer:
                this.sorcererCtor();
            break;
            case ClassKind.Warlock:
                this.warlockCtor();
            break;
            case ClassKind.Wizard:
                this.wizardCtor();
            break;
        }
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
        if (this.classDetails.level) {
            this.classDetails.level = value;
        }
    }

    proficiencyBonus(): number {
        return Data.proficiencyBonusFor(this.level);
    }

    barbarianCtor(details: BarbarianDetails = new BarbarianDetails(this._level, null, null)) {
        this.desc = 'A fierce warrior of primitive background who can enter a battle rage';
        this.classDetails = details;
        this.hitDie = 12;
        this.primaryAbility = [AbilityKind.Strength, AbilityKind.Constitution];
        this.savingThrows = [
            AbilityKind.Strength,
            AbilityKind.Constitution
        ];
        
        this.weaponProfs = [
            WeaponKind.Martial,
            WeaponKind.Simple
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
            ArmorWeight.Heavy
        ];
        this.canUseShield = true;
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.AnimalHandling,
            SkillKind.Athletics,
            SkillKind.Intimidation,
            SkillKind.Nature,
            SkillKind.Perception,
            SkillKind.Survival,
        ];
    }
    bardCtor(details: BardDetails = new BardDetails(this._level, null, [])) {
        this.desc = 'An inspiring magician whose power echoes the music of creation';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Charisma,
            AbilityKind.Dexterity,
        ];
        this.weaponProfs = [
            WeaponKind.Simple,
            StdWeaponName.HandCrossbow,
            StdWeaponName.LongSword,
            StdWeaponName.Rapier,
            StdWeaponName.ShortSword,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
        ];
        this.numberOfSkills = 3;
        this.availableSkills = Object.getOwnPropertyNames(SkillKind).map(n => SkillKind[n]);
        if ((this.classDetails as BardDetails).bardCollege === BardCollege.Valor && this._level > 2) {
            this.weaponProfs.push(WeaponKind.Martial);
            this.armorProfs.push(ArmorWeight.Medium);
            this.canUseShield = true;
        }
        this.miscProfs = ['Musical Instrument'];
    }
    clericCtor(details: ClericDetails = new ClericDetails(this._level, null)) {
        this.desc = 'A priestly champion who wields divine magic in service of a higher power';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Wisdom];
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Wisdom,
            AbilityKind.Charisma,
        ];
        this.weaponProfs = [
            WeaponKind.Simple,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.History, 
            SkillKind.Insight, 
            SkillKind.Medicine,
            SkillKind.Persuasion, 
            SkillKind.Religion,
        ];
        this.canUseShield = true;
    }
    druidCtor(details: DruidDetails = new DruidDetails(this._level, null)) {
        this.desc = 'A priest of the Old Faith, wielding lhe powers of nature-moonlight and plant growth, fire and lightning-and adopting animal forms';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Wisdom];
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Wisdom,
            AbilityKind.Intelligence  
        ];
        this.weaponProfs = [
            StdWeaponName.Club,
            StdWeaponName.Dagger,
            StdWeaponName.Dart,
            StdWeaponName.Javelin,
            StdWeaponName.Mace,
            StdWeaponName.QuarterStaff,
            StdWeaponName.Scimitar,
            StdWeaponName.Sickle,
            StdWeaponName.Spear,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Arcana, 
            SkillKind.AnimalHandling, 
            SkillKind.Insight, 
            SkillKind.Medicine, 
            SkillKind.Nature, 
            SkillKind.Perception, 
            SkillKind.Religion,
            SkillKind.Survival,
        ];
        this.canUseShield = true;
    }
    fighterCtor(details: FighterDetails = new FighterDetails(this._level, null)) {
        this.desc = 'A master of martial combat, skilled with a variety of weapons and armor';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            AbilityKind.Strength, 
            AbilityKind.Dexterity,
        ];
        this.savingThrows = [
            AbilityKind.Strength,
            AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
            ArmorWeight.Heavy,
        ];
        this.weaponProfs = [
            WeaponKind.Simple,
            WeaponKind.Martial,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Acrobatics, 
            SkillKind.AnimalHandling,
            SkillKind.Athletics,
            SkillKind.History,
            SkillKind.Insight,
            SkillKind.Intimidation,
            SkillKind.Perception,
            SkillKind.Survival,
        ];
        this.canUseShield = true;
    }
    monkCtor(details: MonkDetails = new MonkDetails(this._level)) {
        this.desc = 'An master of martial arts, harnessing the power of lhe body in pursuit of physical and spiritual perfection';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [
            AbilityKind.Dexterity,
            AbilityKind.Wisdom,
        ];
        this.numberOfPrimaryAbilities = 2;
        this.savingThrows = [
            AbilityKind.Strength,
            AbilityKind.Dexterity,
        ];
        this.armorProfs = [];
        this.weaponProfs = [
            WeaponKind.Simple,
            StdWeaponName.ShortSword,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Acrobatics, 
            SkillKind.Athletics, 
            SkillKind.History,
            SkillKind.Insight, 
            SkillKind.Religion,
            SkillKind.Stealth,
        ];
    }
    paladinCtor(details: PaladinDetails = new PaladinDetails(this._level, null, null)) {
        this.desc = 'A holy warrior bound to a sacred oath';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            AbilityKind.Strength,
            AbilityKind.Charisma,
        ];
        this.numberOfPrimaryAbilities = 2;
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Wisdom,
            AbilityKind.Charisma,
        ];
        this.canUseShield = true;
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
            ArmorWeight.Heavy,
        ];
        this.weaponProfs = [
            WeaponKind.Martial,
            WeaponKind.Simple,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Athletics, 
            SkillKind.Insight, 
            SkillKind.Intimidation,
            SkillKind.Medicine, 
            SkillKind.Persuasion,
            SkillKind.Religion,
        ];
    }
    rangerCtor(details: RangerDetails = new RangerDetails(this._level, null)) {
        this.desc = 'A warrior who uses martial prowess and nature magic lo combat threats on lhe edges of civilization';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            AbilityKind.Dexterity,
            AbilityKind.Wisdom,
        ];
        this.numberOfPrimaryAbilities = 2;
        if (this._level > 1) {
            this.isCaster = true;
        }
        this.savingThrows = [
            AbilityKind.Strength,
            AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
        ];
        this.canUseShield = true;
        this.weaponProfs = [
            WeaponKind.Simple,
            WeaponKind.Martial,
        ];
        this.numberOfSkills = 3;
        this.availableSkills = [
            SkillKind.AnimalHandling,
            SkillKind.Athletics, 
            SkillKind.Insight, 
            SkillKind.Investigation, 
            SkillKind.Nature, 
            SkillKind.Perception, 
            SkillKind.Stealth, 
            SkillKind.Survival,
        ];
    }
    rogueCtor(details: RogueDetails = new RogueDetails(this.level, null, [])) {
        this.desc = 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Dexterity];
        this.savingThrows = [
            AbilityKind.Strength,
            AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
        ];
        this.canUseShield = true;
        this.isCaster = details.archType === RoguishArchType.ArcaneTrickster;
        this.weaponProfs = [
            WeaponKind.Simple,
            StdWeaponName.HandCrossbow,
            StdWeaponName.LongSword,
            StdWeaponName.Rapier,
            StdWeaponName.ShortSword,
        ];
        this.numberOfSkills = 4;
        this.availableSkills = [
            SkillKind.Acrobatics, 
            SkillKind.Athletics,
            SkillKind.Deception, 
            SkillKind.Insight, 
            SkillKind.Intimidation, 
            SkillKind.Investigation, 
            SkillKind.Perception, 
            SkillKind.Performance, 
            SkillKind.Persuasion,
            SkillKind.SleightOfHand, 
            SkillKind.Stealth,
        ];
    }
    sorcererCtor(details: SorcererDetails = new SorcererDetails(this._level, null, null)) {
        this.desc = 'A spell caster who draws on inherent magic from a gift or bloodline';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows =[
            AbilityKind.Constitution,
            AbilityKind.Charisma,
        ];
        this.weaponProfs = [
            StdWeaponName.Dagger,
            StdWeaponName.Sling,
            StdWeaponName.Dart,
            StdWeaponName.QuarterStaff,
            StdWeaponName.LightCrossbow,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Arcana, 
            SkillKind.Deception, 
            SkillKind.Insight,
            SkillKind.Intimidation, 
            SkillKind.Persuasion, 
            SkillKind.Religion,
        ];
    }
    warlockCtor(details: WarlockDetails = new WarlockDetails(this._level, null)) {
        this.desc = 'A wielder of magic that is derived from a bargain with an extra-planar entity';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Wisdom,
            AbilityKind.Charisma,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
        ];
        this.weaponProfs = [
            WeaponKind.Simple,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Arcana,
            SkillKind.Deception, 
            SkillKind.History, 
            SkillKind.Intimidation, 
            SkillKind.Investigation, 
            SkillKind.Nature,
            SkillKind.Religion,
        ];
    }
    wizardCtor(details: WizardDetails = new WizardDetails(this._level, null)) {
        this.desc = 'A scholarly magic-user capable of manipulating lhe structures of reality';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [AbilityKind.Intelligence];
        this.isCaster = true;
        this.savingThrows = [
            AbilityKind.Intelligence,
            AbilityKind.Wisdom,
        ];
        this.weaponProfs = [
            StdWeaponName.Dagger,
            StdWeaponName.Dart,
            StdWeaponName.Sling,
            StdWeaponName.QuarterStaff,
            StdWeaponName.LightCrossbow,
        ];
        this.armorProfs = [];
        this.numberOfSkills = 2;
        this.availableSkills = [
            SkillKind.Arcana, 
            SkillKind.History, 
            SkillKind.Insight,
            SkillKind.Investigation, 
            SkillKind.Medicine, 
            SkillKind.Religion,
        ];
    }
    addLevel() {
        this.level += 1;
    }
    public static fromJson(json: any): Class {
        let ret = new Class(
            null,
            json._level,
            json.bonusAbilityScores,
            json.availableSkills,
        );
        ret.name = json.name;
        switch (json.name) {
            case ClassKind.Barbarian:
                ret.barbarianCtor(BarbarianDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Bard:
                ret.bardCtor(BardDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Cleric:
                ret.clericCtor(ClericDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Druid:
                ret.druidCtor(DruidDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Fighter:
                ret.fighterCtor(FighterDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Monk:
                ret.monkCtor(MonkDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Paladin:
                ret.paladinCtor(PaladinDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Ranger:
                ret.rangerCtor(RangerDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Rogue:
                ret.rogueCtor(RogueDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Sorcerer:
                ret.sorcererCtor(SorcererDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Warlock:
                ret.warlockCtor(WarlockDetails.fromJson(json.classDetails));
            break;
            case ClassKind.Wizard:
                ret.wizardCtor(WizardDetails.fromJson(json.classDetails));
            break;
        }
        return ret;
    }
}



export enum ClassKind {
    Barbarian = 'Barbarian',
    Bard = 'Bard',
    Cleric = 'Cleric',
    Druid = 'Druid',
    Fighter = 'Fighter',
    Monk = 'Monk',
    Paladin = 'Paladin',
    Ranger = 'Ranger',
    Rogue = 'Rogue',
    Sorcerer = 'Sorcerer',
    Warlock = 'Warlock',
    Wizard = 'Wizard',
}