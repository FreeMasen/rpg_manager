export type Tool = ArtisanTools
                    | GamingSet
                    | Instrument
                    | MiscTools
                    | Mount
                    | Vehicle
                    | Boat;
export enum ArtisanTools {
    Alchemist = "Alchemist's Supplies",
    Brewer = "Brewer's Supplies ",
    Calligrapher = "Calligrapher's Supplies ",
    Carpenter = "Carpenter's Tools",
    Cartographer = "Cartographer's Tools",
    Cobbler = "Cobbler's Tools",
    Cook = "Cook's Utensils ",
    Glassblower = "Glassblower's Tools",
    Jeweler = "Jeweler's Tools",
    Leatherworker = "Leatherworker's Tools",
    Mason = "Mason's Tools",
    Painter = "Painter's Supplies",
    Potter = "Potter's Tools",
    Smith = "Smith's Tools",
    Tinker = "Tinker's Tools",
    Weaver = "Weaver's Tools",
    Woodcarver = "Woodcarver's Tools",
}

export enum GamingSet {
    Dice = "Dice Set",
    Dragonchess = "Dragonchess Set",
    PlayingCards = "Playing Card Set",
    ThreeDragonAnte = "Three-Dragon Ante Set",
}

export enum Instrument {
    Bagpipes = "Bagpipes",
    Drum = "Drum",
    Dulcimer = "Dulcimer",
    Flute = "Flute",
    Lute = "Lute ",
    Lyre = "Lyre",
    Horn = "Horn",
    Pan = "Pan Flute",
    Shawm = "Shawm",
    Viol = "Viol",
}

export enum MiscTools {
    Disguise = "Disguise Kit",
    Forgery = "Forgery Kit",
    Herbalism = "Herbalism Kit",
    Navigator = "Navigator's Tools",
    Poisoner = "Poisoner's Kit",
    Thieves = "Thieves' Tools",
}

export enum Mount {
    Camel = 'Camel',
    Donkey = 'Donkey',
    Elephant = 'Elephant',
    DraftHorse = 'Horse (draft)',
    Horse = 'Horse (riding)',
    Mastiff = 'Mastiff',
    Pony = 'Pony',
    Warhorse = 'Warhorse',
}

export enum Vehicle {
    Carriage = 'Carriage',
    Cart = 'Cart',
    Chariot = 'Chariot',
    Sled = 'Sled',
    Wagon = 'Wagon',
}

export enum Boat {
    Galley = 'Galley',
    Keelboat = 'Keelboat',
    Longship = 'Longship',
    Rowboat = 'Rowboat',
    Sailing = 'Sailing', 
    Warship = 'Warship',
}