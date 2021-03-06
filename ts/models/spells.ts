import { Range } from "./range";
import { AbilityKind } from "./abilityScore";

export class Spells {
    constructor(
        public spells: Spell[] = [],
    ) { }

    map<U>(cb: (s: Spell) => U): U[] {
        return this.spells.map(cb);
    }

    public static fromJson(json: any): Spells {
        return new Spells(
            json.spells.map(Spell.fromJson),
        );
    }
}
export enum SpellName {
    AcidSplash = "Acid Splash",
    BladeWard = "Blade Ward",
    ChillTouch = "Chill Touch",
    DancingLights = "Dancing Lights",
    Druidcraft = "Druidcraft",
    EldritchBlast = "Eldritch Blast",
    FireBolt = "Fire Bolt",
    Friends = "Friends",
    Guidance = "Guidance",
    Light = "Light",
    MageHand = "Mage Hand",
    Mending = "Mending",
    Message = "Message",
    MinorIllusion = "Minor Illusion",
    PoisonSpray = "Poison Spray",
    Prestidigitation = "Prestidigitation",
    ProduceFlame = "Produce Flame",
    RayOfFrost = "Ray of Frost",
    Resistance = "Resistance",
    SacredFlame = "Sacred Flame",
    Shillelagh = "Shillelagh",
    ShockingGrasp = "Shocking Grasp",
    SpareTheDying = "Spare the Dying",
    Thaumaturgy = "Thaumaturgy",
    ThornWhip = "Thorn Whip",
    TrueStrike = "True Strike",
    ViciousMockery = "Vicious Mockery",
    Alarm = "Alarm",
    AnimalFriendship = "Animal Friendship",
    ArmorOfAgathys = "Armor of Agathys",
    ArmsOfHadar = "Arms of Hadar",
    Bane = "Bane",
    Bless = "Bless",
    BurningHands = "Burning Hands",
    CharmPerson = "Charm Person",
    ChromaticOrb = "Chromatic Orb",
    ColorSpray = "Color Spray",
    Command = "Command",
    CompelledDuel = "Compelled Duel",
    ComprehendLanguages = "Comprehend Languages",
    CreateOrDestroyWater = "Create or Destroy Water",
    CureWounds = "Cure Wounds",
    DetectEvilAndGood = "Detect Evil and Good",
    DetectMagic = "Detect Magic",
    DetectPoisonAndDisease = "Detect Poison and Disease",
    DisguiseSelf = "Disguise Self",
    DissonantWhispers = "Dissonant Whispers",
    DivineFavor = "Divine Favor",
    EnsnaringStrike = "Ensnaring Strike",
    Entangle = "Entangle",
    ExpeditiousRetreat = "Expeditious Retreat",
    FaerieFire = "Faerie Fire",
    FalseLife = "False Life",
    FeatherFall = "Feather Fall",
    FindFamiliar = "Find Familiar",
    FogCloud = "Fog Cloud",
    Goodberry = "Goodberry",
    Grease = "Grease",
    GuidingBolt = "Guiding Bolt",
    HailOfThorns = "Hail of Thorns",
    HealingWord = "Healing Word",
    HellishRebuke = "Hellish Rebuke",
    Heroism = "Heroism",
    Hex = "Hex",
    HuntersMark = "Hunter's Mark",
    Identify = "Identify",
    IllusoryScript = "Illusory Script",
    InflictWounds = "Inflict Wounds",
    Jump = "Jump",
    Longstrider = "Longstrider",
    MageArmor = "Mage Armor",
    MagicMissile = "Magic Missile",
    ProtectionFromEvilAndGood = "Protection from Evil and Good",
    PurifyFoodAndDrink = "Purify Food and Drink",
    RayOfSickness = "Ray of Sickness",
    Sanctuary = "Sanctuary",
    SearingSmite = "Searing Smite",
    Shield = "Shield",
    ShieldOfFaith = "Shield of Faith",
    SilentImage = "Silent Image",
    Sleep = "Sleep",
    SpeakWithAnimals = "Speak with Animals",
    TashasHideousLaughter = "Tasha's Hideous Laughter",
    TensersFloatingDisk = "Tenser's Floating Disk",
    ThunderousSmite = "Thunderous Smite",
    Thunderwave = "Thunderwave",
    UnseenServant = "Unseen Servant",
    WitchBolt = "Witch Bolt",
    WrathfulSmite = "Wrathful Smite",
    Aid = "Aid",
    AlterSelf = "Alter Self",
    AnimalMessenger = "Animal Messenger",
    ArcaneLock = "Arcane Lock",
    Augury = "Augury",
    Barkskin = "Barkskin",
    BeastSense = "Beast Sense",
    BlindnessDeafness = "Blindness/Deafness",
    Blur = "Blur",
    BrandingSmite = "Branding Smite",
    CalmEmotions = "Calm Emotions",
    CloudOfDaggers = "Cloud of Daggers",
    ContinualFlame = "Continual Flame",
    CordonOfArrows = "Cordon of Arrows",
    CrownOfMadness = "Crown of Madness",
    Darkness = "Darkness",
    Darkvision = "Darkvision",
    DetectThoughts = "Detect Thoughts",
    EnhanceAbility = "Enhance Ability",
    EnlargeReduce = "Enlarge/Reduce",
    Enthrall = "Enthrall",
    FindSteed = "Find Steed",
    FindTraps = "Find Traps",
    FlameBlade = "Flame Blade",
    FlamingSphere = "Flaming Sphere",
    GentleRepose = "Gentle Repose",
    GustOfWind = "Gust of Wind",
    HeatMetal = "Heat Metal",
    HoldPerson = "Hold Person",
    Invisibility = "Invisibility",
    Knock = "Knock",
    LesserRestoration = "Lesser Restoration",
    Levitate = "Levitate",
    LocateAnimalsOrPlants = "Locate Animals or Plants",
    LocateObject = "Locate Object",
    MagicMouth = "Magic Mouth",
    MagicWeapon = "Magic Weapon",
    MelfsAcidArrow = "Melf's Acid Arrow",
    MirrorImage = "Mirror Image",
    MistyStep = "Misty Step",
    Moonbeam = "Moonbeam",
    NystulsMagicAura = "Nystul's Magic Aura",
    PassWithoutTrace = "Pass Without Trace",
    PhantasmalForce = "Phantasmal Force",
    PrayerOfHealing = "Prayer of Healing",
    ProtectionFromPoison = "Protection from Poison",
    RayOfEnfeeblement = "Ray of Enfeeblement",
    RopeTrick = "Rope Trick",
    ScorchingRay = "Scorching Ray",
    SeeInvisibility = "See Invisibility",
    Shatter = "Shatter",
    Silence = "Silence",
    SpiderClimb = "Spider Climb",
    SpikeGrowth = "Spike Growth",
    SpiritualWeapon = "Spiritual Weapon",
    Suggestion = "Suggestion",
    WardingBond = "Warding Bond",
    Web = "Web",
    ZoneOfTruth = "Zone of Truth",
    AnimateDead = "Animate Dead",
    AuraOfVitality = "Aura of Vitality",
    BeaconOfHope = "Beacon of Hope",
    BestowCurse = "Bestow Curse",
    BlindingSmite = "Blinding Smite",
    Blink = "Blink",
    CallLightning = "Call Lightning",
    Clairvoyance = "Clairvoyance",
    ConjureAnimals = "Conjure Animals",
    ConjureBarrage = "Conjure Barrage",
    Counterspell = "Counterspell",
    CreateFoodAndWater = "Create Food and Water",
    CrusadersMantle = "Crusader's Mantle",
    Daylight = "Daylight",
    DispelMagic = "Dispel Magic",
    ElementalWeapon = "Elemental Weapon",
    Fear = "Fear",
    FeignDeath = "Feign Death",
    Fireball = "Fireball",
    Fly = "Fly",
    GaseousForm = "Gaseous Form",
    GlyphOfWarding = "Glyph of Warding",
    Haste = "Haste",
    HungerOfHadar = "Hunger of Hadar",
    HypnoticPattern = "Hypnotic Pattern",
    LeomundsTinyHut = "Leomund's Tiny Hut",
    LightningArrow = "Lightning Arrow",
    LightningBolt = "Lightning Bolt",
    MagicCircle = "Magic Circle",
    MajorImage = "Major Image",
    MassHealingWord = "Mass Healing Word",
    MeldIntoStone = "Meld into Stone",
    Nondetection = "Nondetection",
    PhantomSteed = "Phantom Steed",
    PlantGrowth = "Plant Growth",
    ProtectionFromEnergy = "Protection from Energy",
    RemoveCurse = "Remove Curse",
    Revivify = "Revivify",
    Sending = "Sending",
    SleetStorm = "Sleet Storm",
    Slow = "Slow",
    SpeakWithDead = "Speak with Dead",
    SpeakWithPlants = "Speak with Plants",
    SpiritGuardians = "Spirit Guardians",
    StinkingCloud = "Stinking Cloud",
    Tongues = "Tongues",
    VampiricTouch = "Vampiric Touch",
    WaterBreathing = "Water Breathing",
    WaterWalk = "Water Walk",
    WindWall = "Wind Wall",
    ArcaneEye = "Arcane Eye",
    AuraOfLife = "Aura of Life",
    AuraOfPurity = "Aura of Purity",
    Banishment = "Banishment",
    Blight = "Blight",
    Compulsion = "Compulsion",
    Confusion = "Confusion",
    ConjureMinorElementals = "Conjure Minor Elementals",
    ConjureWoodlandBeings = "Conjure Woodland Beings",
    ControlWater = "Control Water",
    DeathWard = "Death Ward",
    DimensionDoor = "Dimension Door",
    Divination = "Divination",
    DominateBeast = "Dominate Beast",
    EvardsBlackTentacles = "Evard's Black Tentacles",
    Fabricate = "Fabricate",
    FireShield = "Fire Shield",
    FreedomOfMovement = "Freedom of Movement",
    GiantInsect = "Giant Insect",
    GraspingVine = "Grasping Vine",
    GreaterInvisibility = "Greater Invisibility",
    GuardianOfFaith = "Guardian of Faith",
    HallucinatoryTerrain = "Hallucinatory Terrain",
    IceStorm = "Ice Storm",
    LeomundsSecretChest = "Leomund's Secret Chest",
    LocateCreature = "Locate Creature",
    MordenkainensFaithfulHound = "Mordenkainen's Faithful Hound",
    MordenkainensPrivateSanctum = "Mordenkainen's Private Sanctum",
    OtilukesResilientSphere = "Otiluke's Resilient Sphere",
    PhantasmalKiller = "Phantasmal Killer",
    Polymorph = "Polymorph",
    StaggeringSmite = "Staggering Smite",
    StoneShape = "Stone Shape",
    Stoneskin = "Stoneskin",
    WallOfFire = "Wall of Fire",
    AnimateObjects = "Animate Objects",
    AntilifeShell = "Antilife Shell",
    Awaken = "Awaken",
    BanishingSmite = "Banishing Smite",
    BigbysHand = "Bigby's Hand",
    CircleOfPower = "Circle of Power",
    Cloudkill = "Cloudkill",
    Commune = "Commune",
    CommuneWithNature = "Commune with Nature",
    ConeOfCold = "Cone of Cold",
    ConjureElemental = "Conjure Elemental",
    ConjureVolley = "Conjure Volley",
    ContactOtherPlane = "Contact Other Plane",
    Contagion = "Contagion",
    Creation = "Creation",
    DestructiveWave = "Destructive Wave",
    DispelEvilAndGood = "Dispel Evil and Good",
    DominatePerson = "Dominate Person",
    Dream = "Dream",
    FlameStrike = "Flame Strike",
    Geas = "Geas",
    GreaterRestoration = "Greater Restoration",
    Hallow = "Hallow",
    HoldMonster = "Hold Monster",
    InsectPlague = "Insect Plague",
    LegendLore = "Legend Lore",
    MassCureWounds = "Mass Cure Wounds",
    Mislead = "Mislead",
    ModifyMemory = "Modify Memory",
    Passwall = "Passwall",
    PlanarBinding = "Planar Binding",
    RaiseDead = "Raise Dead",
    RarysTelepathicBond = "Rary's Telepathic Bond",
    Reincarnate = "Reincarnate",
    Scrying = "Scrying",
    Seeming = "Seeming",
    SwiftQuiver = "Swift Quiver",
    Telekinesis = "Telekinesis",
    TeleportationCircle = "Teleportation Circle",
    TreeStride = "Tree Stride",
    WallOfForce = "Wall of Force",
    WallOfStone = "Wall of Stone",
    ArcaneGate = "Arcane Gate",
    BladeBarrier = "Blade Barrier",
    ChainLightning = "Chain Lightning",
    CircleOfDeath = "Circle of Death",
    ConjureFey = "Conjure Fey",
    Contingency = "Contingency",
    CreateUndead = "Create Undead",
    Disintegrate = "Disintegrate",
    DrawmijsInstantSummon = "Drawmij's Instant Summon",
    Eyebite = "Eyebite",
    FindThePath = "Find the Path",
    FleshToStone = "Flesh to Stone",
    Forbiddance = "Forbiddance",
    GlobeOfInvulnerability = "Globe of Invulnerability",
    GuardsAndWards = "Guards and Wards",
    Harm = "Harm",
    Heal = "Heal",
    HeroesFeast = "Heroes' Feast",
    MagicJar = "Magic Jar",
    MassSuggestion = "Mass Suggestion",
    MoveEarth = "Move Earth",
    OtilukesFreezingSphere = "Otiluke's Freezing Sphere",
    OttosIrresistibleDance = "Otto's Irresistible Dance",
    PlanarAlly = "Planar Ally",
    ProgrammedIllusion = "Programmed Illusion",
    Sunbeam = "Sunbeam",
    TransportViaPlants = "Transport via Plants",
    TrueSeeing = "True Seeing",
    WallOfIce = "Wall of Ice",
    WallOfThorns = "Wall of Thorns",
    WindWalk = "Wind Walk",
    WordOfRecall = "Word of Recall",
    ConjureCelestial = "Conjure Celestial",
    DelayedBlastFireball = "Delayed Blast Fireball",
    DivineWord = "Divine Word",
    Etherealness = "Etherealness",
    FingerOfDeath = "Finger of Death",
    FireStorm = "Fire Storm",
    Forcecage = "Forcecage",
    MirageArcane = "Mirage Arcane",
    MordenkainensMagnificentMansion = "Mordenkainen's Magnificent Mansion",
    MordenkainensSword = "Mordenkainen's Sword",
    PlaneShift = "Plane Shift",
    PrismaticSpray = "Prismatic Spray",
    ProjectImage = "Project Image",
    Regenerate = "Regenerate",
    Resurrection = "Resurrection",
    ReverseGravity = "Reverse Gravity",
    Sequester = "Sequester",
    Simulacrum = "Simulacrum",
    Symbol = "Symbol",
    Teleport = "Teleport",
    AnimalShapes = "Animal Shapes",
    AntimagicField = "Antimagic Field",
    AntipathySympathy = "Antipathy/Sympathy",
    Clone = "Clone",
    ControlWeather = "Control Weather",
    Demiplane = "Demiplane",
    DominateMonster = "Dominate Monster",
    Earthquake = "Earthquake",
    Feeblemind = "Feeblemind",
    Glibness = "Glibness",
    HolyAura = "Holy Aura",
    IncendiaryCloud = "Incendiary Cloud",
    Maze = "Maze",
    MindBlank = "Mind Blank",
    PowerWordStun = "Power Word Stun",
    Sunburst = "Sunburst",
    Telepathy = "Telepathy",
    Tsunami = "Tsunami",
    AstralProjection = "Astral Projection",
    Foresight = "Foresight",
    Gate = "Gate",
    Imprisonment = "Imprisonment",
    MassHeal = "Mass Heal",
    MeteorSwarm = "Meteor Swarm",
    PowerWordHeal = "Power Word Heal",
    PowerWordKill = "Power Word Kill",
    PrismaticWall = "Prismatic Wall",
    Shapechange = "Shapechange",
    StormOfVengeance = "Storm of Vengeance",
    TimeStop = "Time Stop",
    TruePolymorph = "True Polymorph",
    TrueResurrection = "True Resurrection",
    Weird = "Weird",
    Wish = "Wish",
}

export class Spell {
    public id?: number;
    constructor(
        public name: SpellName,
        public level: number,
        public verbalRequirement: boolean,
        public somaticRequirement: boolean,
        public materialRequirement: string[],
        public castingTime: string,
        public desc: string,
        public duration?: string,
        public range?: Range,
        public save?: SpellSave,
    ) { }

    public static fromJson(json: any): Spell {
        let ret = new Spell(
            json.name,
            json.level,
            json.verbalRequirement,
            json.somaticRequirement,
            json.materialRequirement,
            json.castingTime,
            json.desc,
            json.duration,
            json.range,
            SpellSave.fromJson(json.save),
        );
        ret.id = json.id;
        return ret;
    }
}

export class SpellSave {
    constructor(
        public ability: AbilityKind,
        public toBeat: number,
        public ifBeaten: string,
        public ifLost: string,
    ) { }

    public static fromJson(json: any): SpellSave {
        if (!json) return;
        return new SpellSave(
            json.ability,
            json.toBeat,
            json.ifBeaten,
            json.ifLost,
        )
    }
}
