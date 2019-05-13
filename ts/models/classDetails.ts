import { SkillKind } from './skills';
import { AbilityKind } from './abilityScore';
import { ClassFeature } from '../services/data';
import { Armor } from './character';

export type ClassDetails = BarbarianDetails 
                        | BardDetails 
                        | ClericDetails
                        | DruidDetails
                        | FighterDetails
                        | MonkDetails
                        | PaladinDetails
                        | RangerDetails
                        | RogueDetails 
                        | SorcererDetails
                        | WarlockDetails
                        | WizardDetails;

export class _ClassDetails<T> {
    private archetypeIdx?: number;
    id?: number;
    constructor(
        public level: number,
        public features: ClassFeature[],
        protected ARCHETYPE_KEY: string,
        public selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        if (id) {
            this.id = id;
        }
        if (!selectedFeatures || selectedFeatures.size == 0) {
            this.selectedFeatures = new Map();
        }
        this.mapFeatures(features, this.selectedFeatures);
    }

    private mapFeatures(features: ClassFeature[], map: Map<string, {idx: number, minLevel: number}>) {
        for (let feat of features) {
            if (feat.options && feat.options.length > 0) {
                if (!map.has(feat.name)) {
                    map.set(feat.name,{idx: -1, minLevel: feat.level});
                    for (let opt of feat.options) {
                        if (opt.features && opt.features.length > 0) {
                            this.mapFeatures(opt.features, map);
                        }
                    }
                }
            }
        }
    }
    public attackCount(): number {
        return 1;
    }

    public chooseFeatureOption(name: string, idx: number) {
        let current = this.selectedFeatures.get(name);
        let update = Object.assign({}, current, {idx});
        this.selectedFeatures.set(name, update);
    }

    public remainingChoices(): ClassFeature[] {
        let ret = [];
        for (let [key, {idx, minLevel}] of this.selectedFeatures.entries()) {
            if (minLevel <= this.level && idx < 0) {
                ret.push(this.features.find(f => f.name == key));
            }
        }
        return ret;
    }

    public remainingChoiceIdxs(): number[] {
        let ret = [];
        for (var i = 0; i < this.features.length; i++) {
            let feat = this.features[i];
            if (feat.options && feat.options.length > 0) {
                if (this.selectedFeatures.get(feat.name).idx < 0) {
                    ret.push(i);
                }
            }
        }
        return ret;
    }

    public getAllAvailableFeatures(): ClassFeature[] {
        return this.features.reduce((acc: ClassFeature[], f: ClassFeature) => {
            if (f.options && f.options.length > 0) {
                let selection = this.selectedFeatures.get(f.name);
                if (!selection) {
                    selection = {idx: -1, minLevel: f.level};
                    this.selectedFeatures.set(f.name, selection);
                }
                if (selection.idx > -1) {
                    acc.push(f);
                    acc.push(...f.options[selection.idx].features);
                    return acc;
                }
            }
            if (f) {

            }
            acc.push(f);
            return acc;
        }, []);
    }

    public get archetype(): T {
        if (!this.selectedFeatures.has(this.ARCHETYPE_KEY)) {
            return null;
        }
        let {idx, minLevel} = this.selectedFeatures.get(this.ARCHETYPE_KEY);
        if (idx < 0 || this.level < minLevel) {
            return null;
        }
        if (this.archetypeIdx) {
            return this.features[this.archetypeIdx].options[idx].name as unknown as T;
        }
        for (let i = 0; i < this.features.length; i++) {
            let feat = this.features[i];
            if (feat.name === this.ARCHETYPE_KEY) {
                this.archetypeIdx = i;
                return feat.options[idx].name as unknown as T;
            }
        }
        return null;
    }
}

export class BarbarianDetails extends _ClassDetails<PrimalPath> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Primal Path', selectedFeatures, id);
    }
    attackCount(): number {
        if (this.level < 4) {
            return super.attackCount();
        }
        return 2;
    }

    static fromJson(json: any): BarbarianDetails {
        return new BarbarianDetails(
            json.level, 
            json.features,
            json.selectedFeatures,
            json.id
        );
    }
}

export enum PrimalPath {
    Berserker = 'Berserker',
    TotemWarrior = 'Totem Warrior',
}

export enum Totem {
    Bear = 'Bear',
    Eagle = 'Eagle',
    Wolf = 'Wolf',
}
export class BardDetails extends _ClassDetails<BardCollege> {
    constructor(
        level: number,
        features: ClassFeature[],
        public expertise: SkillKind[] = [],
        public inspiration: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Bard College', selectedFeatures, id);
    }

    public attackCount(): number {
        if (this.archetype === BardCollege.Valor && this.level > 5) {
            return 2;
        }
        return super.attackCount();
    }

    static fromJson(json: any): BardDetails {
        return new BardDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.expertise,
            json.inspiration,
            json.selectedFeatures,
            json.id
        );
    }
}

export enum BardCollege {
    Lore = "College of Lore",
    Valor = "College of Valor",
}
export class ClericDetails extends _ClassDetails<ClericDomain> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Divine Domain', selectedFeatures, id);
    }

    static fromJson(json: any): ClericDetails {
        return new ClericDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id,
        );
    }
}

export enum ClericDomain {
    Knowledge ='Knowledge',
    Life ='Life',
    Light ='Light',
    Nature ='Nature',
    Tempest ='Tempest',
    Trickery ='Trickery',
    War ='War'
}
export class DruidDetails extends _ClassDetails<DruidCircle> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Druid Circle', selectedFeatures, id);
    }

    static fromJson(json: any): DruidDetails {
        return new DruidDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id,
        );
    }
}

export enum DruidCircle {
    Land = 'Land',
    Moon = 'Moon',
}
export class FighterDetails extends _ClassDetails<CombatArchetype> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Combat Archetype', selectedFeatures, id);
    }

    public attackCount(): number {
        if (this.level < 5) {
            return super.attackCount();
        }
        if (this.level < 11) {
            return 2;
        }
        if (this.level < 20) {
            return 3;
        }
        return 4;
    }

    static fromJson(json: any): FighterDetails {
        return new FighterDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id
        );
    }
}

export enum FighterStyle {
    Archery = 'Archery',
    Defense = 'Defense',
    Dueling = 'Dueling',
    GreatWeapon = 'Great Weapon Fighting',
    Protection = 'Protection',
    TwoWeapon = 'Two Weapon Fighting',
}

export enum CombatArchetype {
    BattleMaster,
    Champion,
    EldrichKnight,
}

export enum CombatSuperiority {
    CommandersStrike = "Commander's Strike",
    DisarmingAttack = "Disarming Attack",
    DistractingStrike = "Distracting Strike",
    EvasiveFootwork = "Evasive Footwork",
    FeintingAttack = "Feinting Attack",
    GoadingAttack = "Goading Attack",
    LungingAttack = "Lunging Attack",
    ManeuveringAttack = "Maneuvering Attack",
    MenacingAttack = "Menacing Attack",
    Parry = "Parry",
    PrecisionAttack = "Precision Attack",
    PushingAttack = "Pushing Attack",
    Rally = "Rally",
    Riposte = "Riposte",
    SweepingAttack = "Sweeping Attack",
    TripAttack = "Trip Attack",
}
export class MonkDetails extends _ClassDetails<MonasticTradition> {
    constructor(
        level: number,
        features: ClassFeature[],
        public kiPoints: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Monastic Tradition',  selectedFeatures, id);
    }

    public attackCount(): number {
        if (this.level < 5) {
            return super.attackCount();
        }
        return 2;
    }

    static fromJson(json: any): MonkDetails {
        return new MonkDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.kiPoints,
            json.selectedFeatures,
            json.id
        );
    }
}

export enum MonasticTradition {
    Shadow = "Way of Shadow",
    OpenHand = "Way of the Open Hand",
    FourElements = "Way of the Four Elements",
    LongDeath = "Way of the Long Death",
    SunSoul = "Way of the Sun Soul",
}

export class PaladinDetails extends _ClassDetails<PaladinOath> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Paladin Oath', selectedFeatures, id);
    }

    public attackCount(): number {
        if (this.level < 5) {
            return super.attackCount();
        }
        return 2;
    }
    static fromJson(json: any): PaladinDetails {
        return new PaladinDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id
        );
    }
}


export enum PaladinStyle {
    Defense = 'Defense',
    Dueling = 'Dueling',
    GreatWeapon = 'Great Weapon Fighting',
    Protection = 'Protection',
}

export enum PaladinOath {
    Ancients = 'Ancients',
    Devotion = 'Devotion',
    Vengeance = 'Vengeance',
    Oathbreaker = 'Oathbreaker',
}

export class RangerDetails extends _ClassDetails<RangerArchetype> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Ranger Archetype', selectedFeatures, id);
    }

    public attackCount(): number {
        if (this.level < 5) {
            return super.attackCount();
        }
        return 2;
    }

    static fromJson(json: any): RangerDetails {
        return new RangerDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id,
        )
    }
}

export enum RangerEnemy {
    Aberration = 'Aberration',
    Beast = 'Beast', 
    Celestial = 'Celestial', 
    Construct = 'Construct', 
    Dragon = 'Dragon',
    Elemental = 'Elemental', 
    Fey = 'Fey', 
    Fiend = 'Fiend', 
    Giant = 'Giant', 
    Monstrosity = 'Monstrosity', 
    Ooze = 'Ooze', 
    Plant = 'Plant', 
    Undead = 'Undead',
}

export enum RangerStyle {
        Archery = "Archery",
        Defense = "Defense",
        Dueling = "Dueling",
        TwoWeapon = "Two-Weapon Fighting",
}

export enum RangerArchetype {
    Hunter = "Hunter",
    BeastMaster = "Beast Master"
}
export class RogueDetails extends _ClassDetails<RoguishArchetype> {
    constructor(
        level: number,
        features: ClassFeature[],
        public expertise: SkillKind[] = [],
        public bonusAbilityScore: [AbilityKind, number][] = [],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Roguish Archetype', selectedFeatures, id);
    }

    static fromJson(json: any): RogueDetails {
        return new RogueDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.expertise,
            json.bonusAbilityScore,
            json.selectedFeatures,
            json.id,
        );
    }
}

export class SorcererDetails extends _ClassDetails<SorcererOrigins> {
    constructor(
        level: number,
        features: ClassFeature[],
        public sorcererPoints: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number
    ) {
        super(level, features, 'Sorcerous Origin', selectedFeatures, id);
    }

    static fromJson(json: any): SorcererDetails {
        return new SorcererDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.sorcererPoints,
            json.selectedFeatures,
            json.id
        );
    }
}

export enum MetaMagic {
    Carful = 'Carful',
    Distant = 'Distant',
    Empowered = 'Empowered',
    Extended = 'Extended',
    Heightened = 'Heightened',
    Quickened = 'Quickened',
    Subtle = 'Subtle',
    Twinned = 'Twinned',
}

export enum SorcererOrigins {
    DraconicAncestor = 'DraconicAncestor',
    Wild = 'Wild',
}

export class WarlockDetails extends _ClassDetails<OtherworldlyPatron> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Otherworldly Patron', selectedFeatures, id);
    }

    static fromJson(json: any): WarlockDetails {
        return new WarlockDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id
        )
    }
}

export class EldritchIncantation {
    constructor(
        public name: EldrichIncantationName,
        public prerequisite: string,
        public desc: string,
    ) { }
}

export enum EldrichIncantationName {
    ArmorOfShadows = "Armor of Shadows",
    BeastSpeech = "Beast Speech",
    BeguilingInfluence = "Beguiling Influence",
    BookOfAncientSecrets = "Book of Ancient Secrets",
    DevilsSight = "Devil's Sight",
    EldritchSight = "Eldritch Sight",
    EldritchSpear = "Eldritch Spear",
    EyesOfTheRuneKeeper = "Eyes of the Rune Keeper",
    FiendishVigor = "Fiendish Vigor",
    GazeOfTwoMinds = "Gaze of Two Minds",
    MaskOfManyFaces = "Mask of Many Faces",
    MistyVisions = "Misty Visions",
    RepellingBlast = "Repelling Blast",
    ThiefOfFiveFates = "Thief of Five Fates",
    VoiceOfTheChainMaster = "Voice of the Chain Master",
}

export enum OtherworldlyPatron {
    ArchFey,
    Fiend,
    GreatOldOne
}
export class WizardDetails extends _ClassDetails<ArcaneTradition> {
    constructor(
        level: number,
        features: ClassFeature[],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, 'Arcane Tradition', selectedFeatures, id);
    }

    static fromJson(json: any): WizardDetails {
        return new WizardDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.selectedFeatures,
            json.id,
        )
    }
}

export enum ArcaneTradition {
    Abjuration = 'Abjuration',
    Conjuration = 'Conjuration',
    Divination = 'Divination',
    Enchantment = 'Enchantment',
    Evocation = 'Evocation',
    Illusion = 'Illusion',
    Necromancy = 'Necromancy',
    Transmutation = 'Transmutation',
}

export enum RoguishArchetype {
    Thief = 'Thief',
    Assassin = 'Assassin',
    ArcaneTrickster = 'Arcane Trickster',
}