import { AbilityKind } from './abilityScore';
import {
    WeaponKind, StdWeaponName,
    ArmorWeight
} from './character';
import { SkillKind, Skill } from './skills';
import {
    ClassDetails, BarbarianDetails,
    BardDetails, BardCollege,
    ClericDetails, RogueDetails, 
    DruidDetails, FighterDetails, 
    MonkDetails, PaladinDetails, 
    RangerDetails, SorcererDetails, 
    WarlockDetails, WizardDetails, 
    RoguishArchetype,
    CombatArchetype,
    ClericDomain,
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
    public miscProfs: string[] = [];
    constructor(
        public name: ClassKind,
        public _level: number,
        public classDetails: ClassDetails,
        public bonusAbilityScores: [AbilityKind, number][] = DEFAULT_BONUS_ABILITY_SCORES,
        public selectedSkills: SkillKind[] = [],
        public expertise: SkillKind[] = [],
    ) {
        switch (name) {
            case ClassKind.Barbarian:
                this.barbarianCtor(classDetails as BarbarianDetails);
            break;
            case ClassKind.Bard:
                this.bardCtor(classDetails as BardDetails);
            break;
            case ClassKind.Cleric:
                this.clericCtor(classDetails as ClericDetails);
            break;
            case ClassKind.Druid:
                this.druidCtor(classDetails as DruidDetails);
            case ClassKind.Fighter:
                this.fighterCtor(classDetails as FighterDetails);
            break;
            case ClassKind.Monk:
                this.monkCtor(classDetails as MonkDetails);
            break;
            case ClassKind.Paladin:
                this.paladinCtor(classDetails as PaladinDetails);
            break;
            case ClassKind.Ranger:
                this.rangerCtor(classDetails as RangerDetails);
            break;
            case ClassKind.Rogue:
                this.rogueCtor(classDetails as RogueDetails);
            break;
            case ClassKind.Sorcerer:
                this.sorcererCtor(classDetails as SorcererDetails);
            break;
            case ClassKind.Warlock:
                this.warlockCtor(classDetails as WarlockDetails);
            break;
            case ClassKind.Wizard:
                this.wizardCtor(classDetails as WizardDetails);
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

    barbarianCtor(details: BarbarianDetails) {
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
        if (this.classDetails && (this.classDetails as BardDetails).archetype === BardCollege.Valor && this._level > 2) {
            this.weaponProfs.push(WeaponKind.Martial);
            this.armorProfs.push(ArmorWeight.Medium);
            this.canUseShield = true;
        }
        this.miscProfs = ['Musical Instrument'];
        if (this._level > 2 && this.expertise.length < 2) {
            this.expertise = [null, null];
        }
    }
    clericCtor(details: ClericDetails) {
        this.desc = 'A priestly champion who wields divine magic in service of a higher power';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Wisdom];

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
        if (this.classDetails.archetype === ClericDomain.Knowledge 
            || this.classDetails.archetype === ClericDomain.Nature) {
            this.numberOfSkills += 2;
        }
        this.availableSkills = [
            SkillKind.History, 
            SkillKind.Insight, 
            SkillKind.Medicine,
            SkillKind.Persuasion, 
            SkillKind.Religion,
        ];
        this.canUseShield = true;
    }
    druidCtor(details: DruidDetails) {
        this.desc = 'A priest of the Old Faith, wielding lhe powers of nature-moonlight and plant growth, fire and lightning-and adopting animal forms';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Wisdom];

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
    fighterCtor(details: FighterDetails) {
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
    monkCtor(details: MonkDetails) {
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
    paladinCtor(details: PaladinDetails) {
        this.desc = 'A holy warrior bound to a sacred oath';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            AbilityKind.Strength,
            AbilityKind.Charisma,
        ];
        this.numberOfPrimaryAbilities = 2;

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
    rangerCtor(details: RangerDetails) {
        this.desc = 'A warrior who uses martial prowess and nature magic lo combat threats on lhe edges of civilization';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            AbilityKind.Dexterity,
            AbilityKind.Wisdom,
        ];
        this.numberOfPrimaryAbilities = 2;
        if (this._level > 1) {

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
    rogueCtor(details: RogueDetails) {
        this.desc = 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Dexterity];
        this.savingThrows = [
            AbilityKind.Dexterity,
            AbilityKind.Intelligence,
        ];
        this.armorProfs = [
            ArmorWeight.Light,
            ArmorWeight.Medium,
        ];
        this.canUseShield = true;
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
        if (this.expertise.length < 2) {
            this.expertise = [null, null];
        }
    }
    sorcererCtor(details: SorcererDetails) {
        this.desc = 'A spell caster who draws on inherent magic from a gift or bloodline';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [AbilityKind.Charisma];

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
    warlockCtor(details: WarlockDetails) {
        this.desc = 'A wielder of magic that is derived from a bargain with an extra-planar entity';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [AbilityKind.Charisma];

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
    wizardCtor(details: WizardDetails) {
        this.desc = 'A scholarly magic-user capable of manipulating lhe structures of reality';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [AbilityKind.Intelligence];

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
    get isCaster(): boolean {
        return this.name == ClassKind.Bard 
            || this.name == ClassKind.Cleric 
            || this.name == ClassKind.Druid 
            || (this.name == ClassKind.Paladin 
                && this.level > 1)
            || this.name == ClassKind.Ranger
            || this.name == ClassKind.Sorcerer
            || this.name == ClassKind.Warlock
            || this.name == ClassKind.Wizard
            || (this.name == ClassKind.Fighter 
                && this.classDetails.archetype == CombatArchetype.EldrichKnight)
            || (this.name == ClassKind.Rogue 
                && this.classDetails.archetype == RoguishArchetype.ArcaneTrickster)
    }

    bonusAbilityCount(): number {
        return this.bonusAbilityScores.reduce((acc, s) => acc + s[1], 0);
    }

    unselectedAvailableSkills() {
        if (this.name === ClassKind.Cleric) {
            if (this.classDetails.archetype === ClericDomain.Knowledge) {
                return [SkillKind.Arcana, SkillKind.History, SkillKind.Nature, SkillKind.Religion].filter(s => this.selectedSkills.includes(s))
            }
            if (this.classDetails.archetype === ClericDomain.Nature) {
                return [SkillKind.AnimalHandling, SkillKind.Nature, SkillKind.Survival].filter(s => this.selectedSkills.includes(s))
            }
        }
        return [];
    }
    
    public static fromJson(json: any): Class {
        let ret = new Class(
            null,
            json._level,
            null,
            json.bonusAbilityScores,
            json.selectedSkills || [],
            json.expertise || [],
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