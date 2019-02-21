import { Height, CharacterSize, 
        StdWeaponName, 
        Language, NormalLanguage, ArmorWeight, 
        WeaponDamageKind, Weapon, 
        WeaponWeight, WeaponHandedness,
        WeaponKind, WeaponType,
        Alignment,
        AlignmentMajor, AlignmentMinor,
} from './character'
import { Range } from './range';
import { AbilityKind } from './abilityScore';
import { Tool, ArtisanTools } from './tools';
export class Race {
    public abilityModifiers: [AbilityKind, number][];
    public subRace?: SubRace;
    public ageRange: [number, number];
    public darkVision?: Range;
    public preferredAlignment: Alignment;
    public heightRange: [Height, Height];
    public size: CharacterSize = CharacterSize.Medium;
    public avgWeight: number;
    public speed: number = 30;
    public weaponProfs: StdWeaponName[] = [];
    public toolProfs: Tool[] = [];
    public languages: Language[] = [];
    public armorProfs: ArmorWeight[] = [];
    public miscBenefits: string[] = [];
    public bonusLanguages: number = 0;
    public damageResistance?: WeaponDamageKind;
    public naturalWeapons?: Weapon[] = [
        new Weapon('Left Fist', WeaponType.Melee, WeaponKind.Martial, WeaponDamageKind.Bludgeoning, WeaponWeight.Light, WeaponHandedness.One, [1,4]), 
        new Weapon('Right Fist', WeaponType.Melee, WeaponKind.Martial, WeaponDamageKind.Bludgeoning, WeaponWeight.Light, WeaponHandedness.One, [1,4]), 
    ];
    constructor(
        public name: RaceKind = RaceKind.Human,
        subRace: SubRace = null,
    ) {
        if (name == RaceKind.Dragonborn && subRace == null) {
            subRace = Dragon.Black;
        }
        this.checkSubRace(subRace);
        this.subRace = subRace;
        switch (name) {
                case RaceKind.Dwarf: 
                    this.dwarfCtor();
                break;
                case RaceKind.Elf: 
                    this.elfCtor();
                break;
                case RaceKind.Halfling: 
                    this.halflingCtor();
                break;
                case RaceKind.Human: 
                    this.humanCtor();
                break;
                case RaceKind.Dragonborn: 
                    this.dragonbornCtor();
                break;
                case RaceKind.Gnome: 
                    this.gnomeCtor();
                break;
                case RaceKind.HalfElf: 
                    this.halfElfCtor();
                break;
                case RaceKind.HalfOrc: 
                    this.halfOrcCtor();
                break;
                case RaceKind.Tiefling: 
                    this.tieflingCtor();
                break;
        }
    }

    dwarfCtor() {
        this.abilityModifiers = [
            [AbilityKind.Constitution, 2]
        ];
        if (this.subRace == Dwarf.Hill) {
            this.abilityModifiers.push([AbilityKind.Wisdom, 1]);
        }
        if (this.subRace == Dwarf.Mountain) {
            this.abilityModifiers.push([AbilityKind.Strength, 2]);
        }
        this.ageRange = [50, 350];
        this.preferredAlignment = new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Good);
        this.heightRange = [new Height(4,0), new Height(5, 0)];
        this.size = CharacterSize.Medium;
        this.avgWeight = 150;
        this.speed = 25;
        this.darkVision = new Range(60);
        this.weaponProfs = [
            StdWeaponName.Battleaxe,
            StdWeaponName.HandAxe,
            StdWeaponName.ThrowingHammer,
            StdWeaponName.WarHammer,
        ];
        this.languages = [
            NormalLanguage.Common, 
            NormalLanguage.Dwarvish
        ];
        this.miscBenefits = [
            'Your speed is not reduced by wearing heavy armor',
            'Stonecunning: +1 on Int (History) checks about Stonework',
        ];
        if (this.subRace == Dwarf.Hill) {
            this.miscBenefits.push('+1 max HP at each level');
        }
        if (this.subRace == Dwarf.Mountain) {
            this.armorProfs = [ArmorWeight.Light, ArmorWeight.Medium];
        }
    }

    elfCtor() {
        this.abilityModifiers = [[AbilityKind.Dexterity, 2]];
        if (this.subRace == Elf.High) {
            this.abilityModifiers.push([AbilityKind.Intelligence, 1]);
        }
        if (this.subRace == Elf.Wood) {
            this.abilityModifiers.push([AbilityKind.Wisdom, 1]);
        }
        if (this.subRace == Elf.Drow) {
            this.abilityModifiers.push([AbilityKind.Charisma, 1]);
        }
        this.ageRange = [100, 750];
        this.preferredAlignment = new Alignment(AlignmentMajor.Chaotic, this.subRace == Elf.Drow ? AlignmentMinor.Evil : AlignmentMinor.Good);
        this.heightRange = [new Height(5, 0), new Height(6, 0)];
        this.avgWeight = 130;
        this.size = CharacterSize.Medium;
        this.speed = 30;
        this.darkVision = new Range(60);
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Elvish,
        ];
        this.miscBenefits = [
            'Keen Senses: Proficiency in perception',
            'Fey Ancestry: Advantage against being charmed and magic cannot be put to sleep',
            'Trance: Instead of sleeping you meditate for 4 hours',
        ];
        if (this.subRace == Elf.High) {
            this.weaponProfs = [
                StdWeaponName.LongBow,
                StdWeaponName.LongSword,
                StdWeaponName.ShortBow,
                StdWeaponName.ShortSword,
            ];
            this.miscBenefits.push('Cantrip: You know one Cantrip of your choice from lhe wizard spell list');
            this.bonusLanguages = 1;
        }
        if (this.subRace == Elf.Wood) {
            this.weaponProfs = [
                StdWeaponName.LongBow,
                StdWeaponName.LongSword,
                StdWeaponName.ShortBow,
                StdWeaponName.ShortSword,
            ];
            this.speed = 35;
            this.miscBenefits.push('Mask of the Wild: You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.');
        }
        if (this.subRace == Elf.Drow) {
            this.darkVision = new Range(120);
            this.miscBenefits.push('Sun Light Sensitivity: You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight');
            this.miscBenefits.push('Drow Magic: You know the dancing lights Cantrip. At level 3 you can cas Faerie Fire once per day, at level 5 you can cast Darkness once per day Charisma is your spell casting ability');
            this.weaponProfs = [
                StdWeaponName.ShortSword,
                StdWeaponName.Rapier,
                StdWeaponName.HandCrossbow,
            ];
        }
    }

    halflingCtor() {
        this.abilityModifiers = [[AbilityKind.Dexterity, 2]];
        this.heightRange = [new Height(2, 6), new Height(3, 6)];
        this.avgWeight = 40;
        this.preferredAlignment = Alignment.LawfulGood();
        this.speed = 25;
        this.size = CharacterSize.Small;
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Halfling,
        ];
        this.ageRange = [20, 175];
        this.miscBenefits = [
            'Lucky: When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll',
            'Brave: Vou have advantage on saving throws against being frightened',
            'Halfling Nimbleness: You can move through the space of any creature that is of a size larger than yours',
        ];
        if (this.subRace == Halfling.Lightfoot) {
            this.abilityModifiers.push([AbilityKind.Charisma, 1]);
            this.miscBenefits.push('Naturally Stealthy: You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you');
        }
        if (this.subRace == Halfling.Stout) {
            this.abilityModifiers.push([AbilityKind.Constitution, 1]);
            this.miscBenefits.push('Stout Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage');
        }
    }

    humanCtor() {
        this.abilityModifiers = [
            [AbilityKind.Strength, 1], 
            [AbilityKind.Dexterity, 1],
            [AbilityKind.Constitution, 1],
            [AbilityKind.Intelligence, 1],
            [AbilityKind.Wisdom, 1],
            [AbilityKind.Charisma, 1],
        ];
        this.ageRange = [16, 90];
        this.preferredAlignment = Alignment.TrueNeutral();
        this.heightRange = [new Height(5, 0), new Height(7, 0)];
        this.avgWeight = 150;
        this.speed = 30;
        this.languages = [NormalLanguage.Common];
        this.bonusLanguages = 1;
    }

    dragonbornCtor() {
        this.abilityModifiers = [[AbilityKind.Strength, 2]];
        this.ageRange = [15, 80];
        this.preferredAlignment = Alignment.NeutralGood();
        this.heightRange = [new Height(6, 0), new Height(9, 0)];
        this.avgWeight = 250;
        this.size = CharacterSize.Medium;
        this.speed = 30;
        let breathDmgKind, breathRange, notes;
        switch (this.subRace) {
            case Dragon.Black:
            case Dragon.Copper:
                breathRange = new Range(30);
                this.damageResistance = breathDmgKind = WeaponDamageKind.Acid
                notes = 'Dex save';
            break;
            case Dragon.Blue:
            case Dragon.Bronze:
                breathRange = new Range(30);
                this.damageResistance = breathDmgKind = WeaponDamageKind.Lightening;
                notes = 'Dex save';
            break;
            case Dragon.Brass:
            case Dragon.Gold:
            case Dragon.Red:
                breathRange = this.subRace == Dragon.Brass ? new Range(30) : new Range(15);
                this.damageResistance = breathDmgKind = WeaponDamageKind.Fire;
                notes = 'Dex save';
            break;
            case Dragon.Green:
                breathRange = new Range(15);
                this.damageResistance = breathDmgKind = WeaponDamageKind.Poison;
                notes = 'Con save';
            break;
            case Dragon.Silver:
            case Dragon.White:
                breathRange = new Range(15);
                this.damageResistance = breathDmgKind = WeaponDamageKind.Cold;
                notes = 'Con save';
            break;
        }
        this.naturalWeapons.push(
            new Weapon('Breath Weapon', 
                WeaponType.Melee, 
                WeaponKind.Natural, 
                breathDmgKind,
                null,
                null,
                [2,6],
                breathRange,
                0,
                null,
                false,
                notes
                )
        );
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Draconic,
        ];
    }

    gnomeCtor() {
        this.abilityModifiers = [[AbilityKind.Intelligence, 2]];
        if (this.subRace == 'Forest') {
            this.abilityModifiers.push([AbilityKind.Dexterity, 1]);
        }
        if (this.subRace == 'Rock') {
            this.abilityModifiers.push([AbilityKind.Constitution, 1]);
        }
        this.ageRange = [17, 500];
        this.preferredAlignment = Alignment.NeutralGood();
        this.heightRange = [new Height(3,0), new Height(4, 0)];
        this.avgWeight = 40;
        this.size = CharacterSize.Small;
        this.speed = 25;
        this.darkVision = new Range(60);
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Gnomish,
        ]
        this.miscBenefits = [
            'Gnome Cunning: You have advantage on all Int, Wis, & Cha saving throws against magic',
        ];
        if (this.subRace == Gnome.Forest) {
            this.miscBenefits.push('Natural Illusionist: You know the minor illusion Cantrip. Intelligence is your spell casting ability',
                'Speak with Small Beasts: You can communicate with small or smaller beasts');
            
        }
        if (this.subRace == Gnome.Rock) {
            this.toolProfs = [ArtisanTools.Tinker];
            this.miscBenefits.push(
                'Artificer\'s Lore: Whenever you make an Intelligence (History) check related to magic items, alchemical objects, ar technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally appIy',
                `Tinker: You can create 1 clockwork device (AC5, 1hp) it takes 1 hour and 10 gp. 
Clockwork Toy: animal, monster or person (i.e. mouse, dragon, soldier). It moves 5 feet each turn and makes noises appropriate to the creature it represents
Fire Starter: A lighter
Music Box: When opened it plays a single song an moderate volume, stops when song ends/is closed
`);
        }
    }

    halfElfCtor() {
        this.abilityModifiers = [[AbilityKind.Charisma, 2]];
        this.ageRange = [20, 180];
        this.preferredAlignment = Alignment.ChaoticGood();
        this.heightRange = [new Height(5, 0), new Height(6, 0)];
        this.avgWeight = 160;
        this.size = CharacterSize.Medium;
        this.speed = 25;
        this.darkVision = new Range(60);
        this.bonusLanguages = 1;
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Elvish,
        ];
        this.miscBenefits = [
            'Skill Versatility: You gain proficiency in two skills of your choice',
            'Fey Ancestry: Advantage against being charmed and magic cannot be put to sleep',
        ];
    }

    halfOrcCtor() {
        this.abilityModifiers = [
            [AbilityKind.Strength, 2],
            [AbilityKind.Constitution, 1],
        ];
        this.ageRange = [14, 75];
        this.preferredAlignment = Alignment.ChaoticGood();
        this.heightRange = [new Height(5,0), new Height(8,0)];
        this.avgWeight = 200;
        this.size = CharacterSize.Medium;
        this.speed = 30;
        this.darkVision = new Range(60);
        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Orc,
        ]
        this.miscBenefits = [
            'Menacing: You gain proficiency in the Intimidation skill',
            'Savage Attacks: When you score a critical hit with a melee weapon attack you add 1 hit die to the damage role as bonus damage',
        ];
    }

    tieflingCtor() {
        this.abilityModifiers = [
            [AbilityKind.Intelligence, 1],
            [AbilityKind.Charisma, 2],
        ];
        this.ageRange = [16, 120];
        this.preferredAlignment = Alignment.ChaoticEvil();
        this.heightRange = [new Height(5, 0), new Height(7, 0)];
        this.avgWeight = 160;
        this.speed = 30;
        this.darkVision = new Range(60);
        this.damageResistance = WeaponDamageKind.Fire;

        this.languages = [
            NormalLanguage.Common,
            NormalLanguage.Infernal,
        ];
        this.miscBenefits = [
            `Infernal Legacy: You know the thaumaturgy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spell casting ability for these spells.`
        ]
    }

    checkSubRace(subRace: SubRace) {
        if (
            ((subRace == Gnome.Rock || subRace == Gnome.Forest) && this.name != RaceKind.Gnome) 
            || ((subRace == Elf.Drow || subRace == Elf.High || subRace == Elf.Wood) && this.name != RaceKind.Elf) 
            || ((subRace == Dwarf.Hill || subRace == Dwarf.Mountain) && this.name != RaceKind.Dwarf) 
            || ((subRace == Halfling.Lightfoot || subRace == Halfling.Stout) && this.name != RaceKind.Halfling)
            || ((subRace ==   Dragon.Black 
                ||subRace ==  Dragon.Blue 
                || subRace == Dragon.Brass 
                || subRace == Dragon.Bronze
                || subRace == Dragon.Copper
                || subRace == Dragon.Gold
                || subRace == Dragon.Green
                || subRace == Dragon.Red
                || subRace == Dragon.Silver
                || subRace == Dragon.White) &&this.name != RaceKind.Dragonborn)
        ) {
            throw new Error(`Subrace ${subRace} isn't compatible with ${this.name}`);
        }
        if (!subRace && this.name == RaceKind.Dragonborn) {
            throw new Error('Dragonborn must pick an ancestry');
        }
    }
    public static fromJson(json: any): Race {
        return new Race(
            json.name,
            json.subRace,
        )
    }
}

export enum RaceKind {
    Dwarf = 'Dwarf',
    Elf = 'Elf',
    Halfling = 'Halfling',
    Human = 'Human',
    Dragonborn = 'Dragonborn',
    Gnome = 'Gnome',
    HalfElf = 'Half-Elf',
    HalfOrc = 'Half-Orc',
    Tiefling = 'Tiefling',
}

export type SubRace = Halfling | Dwarf | Elf | Gnome | Dragon;

export enum Dwarf {
    Hill = 'Hill',
    Mountain = 'Mountain',
}

export enum Elf {
    Drow = 'Drow',
    Wood = 'Wood',
    High = 'High',
}

export enum Halfling {
    Stout = 'Stout',
    Lightfoot = 'Lightfoot',
}

export enum Gnome {
    Forest = 'Forest',
    Rock = 'Rock',
}

export enum Dragon {
    Black = 'Black',
    Blue = 'Blue',
    Brass = 'Brass',
    Bronze = 'Bronze',
    Copper = 'Copper',
    Gold = 'Gold',
    Green = 'Green',
    Red = 'Red',
    Silver = 'Silver',
    White = 'White',
}