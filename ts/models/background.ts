import { Language } from "./character";
import { SkillKind } from './skills';
import { Tool, MiscTools, GamingSet, Instrument, ArtisanTools, Mount, Vehicle, Boat } from './tools';
const GAMING_SETS = Object.getOwnPropertyNames(GamingSet).map(n => GamingSet[n]);
const INSTRUMENTS = Object.getOwnPropertyNames(Instrument).map(n => Instrument[n]);
const ARTISAN_TOOLS = Object.getOwnPropertyNames(ArtisanTools).map(n => ArtisanTools[n]);
const VEHICLES = Object.getOwnPropertyNames(Mount).map(n => Mount[n])
                    .concat(Object.getOwnPropertyNames(Vehicle).map(n => Vehicle[n]))
                    .concat(Object.getOwnPropertyNames(Boat).map(n => Boat[n]));

export class Background {
    constructor(
        public kind: BackgroundKind,
        public skills: SkillKind[] = [],
        public languages: Language[] = [],
        public toolProficiencies: Tool[] = [],
        public toolOptions: Tool[][] = [],
    ) { }

    public static Acolyte(): Background {
        return new Background(
            BackgroundKind.Acolyte,
            [SkillKind.Insight, SkillKind.Religion],
            [null, null],
            [],
            [],
        );
    }

    public static Charlatan(): Background {
        return new Background(
            BackgroundKind.Charlatan,
            [SkillKind.Deception, SkillKind.SleightOfHand],
            [],
            [MiscTools.Disguise, MiscTools.Forgery],
        );
    }

    public static Criminal(): Background {
        return new Background(
            BackgroundKind.Criminal,
            [SkillKind.Deception, SkillKind.Stealth],
            [],
            [MiscTools.Thieves, null],
            [null, GAMING_SETS],
        );
    }

    public static Entertainer(): Background {
        return new Background(
            BackgroundKind.Entertainer,
            [SkillKind.Acrobatics, SkillKind.Performance],
            [],
            [MiscTools.Disguise, null],
            [null, INSTRUMENTS]
        );
    }

    public static FolkHero(): Background {
        return new Background(
            BackgroundKind.FolkHero,
            [SkillKind.AnimalHandling, SkillKind.Survival],
            [],
            [null, null],
            [ARTISAN_TOOLS, 
            VEHICLES]
        );
    }

    public static GuildArtisan(): Background {
        return new Background(
            BackgroundKind.GuildArtisan,
            [SkillKind.Insight, SkillKind.Persuasion],
            [null],
            [null],
            [ARTISAN_TOOLS],
        );
    }

    public static Hermit(): Background {
        return new Background(
            BackgroundKind.Hermit,
            [SkillKind.Medicine, SkillKind.Religion],
            [null],
            [MiscTools.Herbalism],
            [],
        );
    }

    public static Noble(): Background {
        return new Background(
            BackgroundKind.Noble,
            [SkillKind.History, SkillKind.Persuasion],
            [null],
            [null],
            [GAMING_SETS]
        );
    }

    public static Outlander(): Background {
        return new Background(
            BackgroundKind.Outlander,
            [SkillKind.Athletics, SkillKind.Survival],
            [null],
            [null],
            [INSTRUMENTS]
        );
    }

    public static Sage(): Background {
        return new Background(
            BackgroundKind.Sage,
            [SkillKind.Arcana, SkillKind.History],
            [null, null],
            [],
            [],
        );
    }

    public static Sailor(): Background {
        return new Background(
            BackgroundKind.Sailor,
            [SkillKind.Athletics, SkillKind.Perception],
            [],
            [MiscTools.Navigator, null],
            [null, Object.getOwnPropertyNames(Boat).map(n => Boat[n])],
        );
    }
    public static Soldier(): Background {
        return new Background(
            BackgroundKind.Soldier,
            [SkillKind.Athletics, SkillKind.Intimidation],
            [],
            [null, null],
            [GAMING_SETS, Object.getOwnPropertyNames(Vehicle).map(n => Vehicle[n])],
        );
    }

    public static Urchin(): Background {
        return new Background(
            BackgroundKind.Urchin,
            [SkillKind.SleightOfHand, SkillKind.Stealth],
            [],
            [MiscTools.Disguise, MiscTools.Thieves],
            []
        );
    }

    public static fromJson(json: any): Background {
        return new Background(
            json.kind,
            json.skills,
            json.languages,
            json.toolProficiencies,
            json.toolOptions,
        );
    }
}

export enum BackgroundKind {
    Acolyte = 'Acolyte',
    Charlatan = 'Charlatan',
    Criminal = 'Criminal',
    Entertainer = 'Entertainer',
    FolkHero = 'Folk Hero',
    GuildArtisan = 'Guild Artisan',
    Hermit = 'Hermit',
    Noble = 'Noble',
    Outlander = 'Outlander',
    Sage = 'Sage',
    Sailor = 'Sailor',
    Soldier = 'Soldier',
    Urchin = 'Urchin',
}

export const ACOLYTE_TRAITS = [
    'I idolize a particular hero of my faith, and constantly refer to that person\'s deeds and example,',
    'I can find common ground between lhe fiercest enemies, empathizing with them and always working toward peace.',
    'I see omens in every event and action. The gods try to speak to us we just need lo listen',
    'Nothing can shake my optimistic attitude.',
    'I quote (or misquote) sacred texts and proverbs in almost every situation.',
    'I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.',
    'I\'ve enjoyed fine food, drink, and high society among my temple\'s elite. Rough living grates on me.',
    'I\'ve spent so long in the tem pie that I have little practical experience dealing with people in the outside world.'
];

export const ACOLYTE_IDEALS = [
    'Tradition. lhe ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)',
    'Charily. I always try to help those in need, no matter what the personal cost. (Good)',
    'Change. We must help bring about the changes lhe gods are constantly working in the world. (Chaotic)',
    'Power. I hope to one day rise to the top of my faith\'s religious hierarchy. (Lawful)',
    'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)',
    'Aspiration. I seek lo prove myself worthy of my god\'s favor by matching my actions against his or her teachings. (Any)',
];

export const ACOLYTE_BONDS = [
    'I would die to recover an ancient relic of my faith that was lost long ago.',
    'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
    'I owe my life to the priest who took me in when my parents died.',
    'Everything I do is for the common people.',
    'I will do anything lo protect the tem pie where I served.',
    'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.',
];

export const ACOLYTE_FLAWS = [
    'I judge others harshly, and myself even more severely.',
    'I put roo much trust in those who wield power within my temple\'s hierarchy.',
    'My piety sometimes leads me lo blindly trust those that profess faith in my god.',
    'I am inflexible in my thinking.',
    'I am suspicious af strangers and expect the worst of them.',
    'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
];

export const CHARLATAN_TRAITS = [

];

export const CHARLATAN_IDEALS = [

];

export const CHARLATAN_BONDS = [

]

export const CHARLATAN_FLAWS = [

];

export const ALL_BACKGROUNDS: Background[] = [
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
];