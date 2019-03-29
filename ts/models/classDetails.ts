import { SkillKind } from './skills';
import { AbilityKind } from './abilityScore';
import { ClassFeature } from '../services/data';

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
    id?: number;
    constructor(
        public level: number,
        public features: ClassFeature[],
        public archetype?: T,
        public selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        if (id) {
            this.id = id;
        }
        if (!selectedFeatures || selectedFeatures.size == 0) {
            this.selectedFeatures = new Map();
            this.mapFeatures(features, this.selectedFeatures);
        }
    }

    private mapFeatures(features: ClassFeature[], map: Map<string, {idx: number, minLevel: number}>) {
        for (let feat of features) {
            if (feat.options && feat.options.length > 0) {
                map.set(feat.name,{idx: -1, minLevel: feat.level});
                for (let opt of feat.options) {
                    if (opt.features && opt.features.length > 0) {
                        this.mapFeatures(opt.features, map);
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
                if (selection.idx > -1) {
                    acc.push(f);
                    acc.push(...f.options[selection.idx].features);
                    return acc;
                }
            }
            acc.push(f);
            return acc;
        }, []);
    }
}

export class BarbarianDetails extends _ClassDetails<PrimalPath> {
    constructor(
        level: number,
        features: ClassFeature[],
        primalPath?: PrimalPath,
        public spiritTotem?: Totem,
        public aspectTotem?: Totem,
        public totemicAttunement?: Totem,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, primalPath, selectedFeatures, id);
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
            json.features.map(ClassFeature.fromJson), 
            json.primalPath, 
            json.spiritTotem, 
            json.aspectTotem, 
            json.totemicAttunement, 
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
        college?: BardCollege,
        public inspiration: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, college, selectedFeatures, id);
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
            json.college,
            json.inspiration,
            json.selectedFeatures,
            json.id
        );
    }
}
// export class BardDetails {
//     constructor(
//         public level: number,
//         public bardCollege: BardCollege = null,
//         public expertise: SkillKind[] = [],
//     ) {}

//     notes(): Note[] {
//         let ret = [
//             new Note('Spell Casting', 
//                     'Your music and/or voice is imbued with magic', 
//                     `Your music and/or voice is imbued with magic.
//                     This magic can support and inspire allies or deflate and hurt foes.`),
//             new Note(`Bardic Inspiration`, 
//                     `You can bestow a 1d${this.bardicInspirationDie} on any ally equal to your DEX mod per day, this die can be used to augment and skill, attack or saving roll before or after the roll. Must be declared before DM says it was successful or not, must be used within 10 minutes`,
//                     `You can doll out inspiration like a currency boosting the dice rolls of your allies.
//                     The number of times you can do this and how powerful the effect is increases as you level.
//                     Any inspired ally must use this effect within 10 minutes.
//                     You regain this ability after a long rest.`),
//         ];
//         if (this.level > 1) {
//             ret.push(new Note('Jack of All Trades', 'Add half your proficiency bonus (rounded down) to any ability check that doesn\'t include your proficiency bonus', ''));
//             ret.push(new Note(`Song of Rest`, `You can sing/orate during a short rest, all allies gain an additional ${this.songOfRestDice} HP`, ''));
//         }
//         if (this.level > 2) {
//             ret.push(new Note(`Bard College`, this.collegeDesc(), ''));
//             ret.push(...this.collegeNotes());
//             ret.push(new Note('Expertise', 'Double your proficiency bonus on 2 skills', ''));
//         }
//         if (this.level > 3 && this.level < 8) {
//             ret.push(new Note('Bonus Ability Scores',  '2', ''));
//         }
//         if (this.level > 7 && this.level < 12) {
//             ret.push(new Note('Bonus Ability Scores',  '4', ''));
//         }
//         if (this.level > 11 && this.level < 16) {
//             ret.push(new Note('Bonus Ability Scores',  '6', ''));
//         }
//         if (this.level > 15 && this.level < 19) {
//             ret.push(new Note('Bonus Ability Scores',  '8', ''));
//         }
//         if (this.level > 18) {
//             ret.push(new Note('Bonus Ability Scores',  '10', ''));
//         }
//         if (this.level > 4) {
//             ret.push(new Note('Font of Inspiration', 'You regain all expended uses of Bardic Inspiration when you finish a short of long rest', ''));
//         }
//         if (this.level > 5) {
//             ret.push(new Note('Counter-charm', 'You can use music or words to disrupt mind-influencing effects as an action on your turn, during which you and any allies within 30 ft have the advantage on saving throws again fear or charm', ''));
//         }
//         if (this.level > 9) {
//             ret.push(new Note(`Magical Secrets`, `You can choose to add ${this.magicalSecrets} spells from any spell book to your know spells so long as it meets your caster level`, ''));
//         }
//         if (this.level > 19) {
//             ret.push(new Note('Superior Inspiration', 'When your roll initiative and have no Bardic Inspiration left you regain one', ''));
//         }
//         return ret;
//     }

//     get bardicInspirationDie(): number {
//         if (this.level < 5) {
//             return 6;
//         }
//         if (this.level > 10) {
//             return 8;
//         }
//         if (this.level < 15) {
//             return 10;
//         }
//         return 12;
//     }

//     get expertiseCount(): number {
//         if (this.level > 2) {
//             return 2;
//         } if (this.level > 9) {
//             return 4;
//         }
//         return 0;

//     }

//     get magicalSecrets(): number {
//         let ret = 0;
//         if (this.level > 5 && this.bardCollege === BardCollege.Lore) {
//             ret += 2;
//         }
//         if (this.level > 9) {
//             ret += 2;
//         }
//         if (this.level > 13) {
//             ret += 2;
//         }
//         if (this.level > 17) {
//             ret += 2
//         }
//         return ret;
//     }

//     private collegeDesc(): string {
//         if (!this.bardCollege) {
//             return 'Choose between the College of Lore or Valor';
//         }
//         return this.bardCollege;
//     }

//     private collegeNotes(): Note[] {
//         let ret = [];
//         switch (this.bardCollege) {
//             case BardCollege.Lore:
//                 if (this.level > 2) {
//                     ret.push(new Note('Bonus Proficiencies', 'Become proficient in 3 additional skills', ''));
//                     ret.push(new Note('Cutting Words', 'When an enemy within 30 feet makes an attack roll you can use a Bardic Inspiration roll to remove that number of points from their roll', ''));
//                 }
//                 if (this.level > 5) {
//                     ret.push(new Note('Additional Magical Secrets', 'You gain 2 new spells from any spell book, these do not count against your known spells', ''));
//                 }
//                 if (this.level > 13) {
//                     ret.push(new Note('Peerless Skill', 'You can use Bardic Inspiration on yourself', ''));
//                 }
//             case BardCollege.Valor:
//                 if (this.level > 2) {
//                     ret.push(new Note('Bonus Proficiencies', 'Become proficient in Medium Armor, Shields, and Martial Weapons', ''))
//                 }
//                 if (this.level > 5) {
//                     ret.push(new Note('Extra Attack', 'If you attack on your action you can attack twice', ''));
//                 }
//                 if (this.level > 13) {
//                     ret.push(new Note('Battle Magic', 'When you use a bard spell on your action you can attack as a bonus action', ''));
//                 }
//         }
//         return ret;
//     }

//     get songOfRestDice(): string {
//         if (this.level === 1) {
//             return 'no';
//         }
//         if (this.level < 9) {
//             return '1d6';
//         }
//         if (this.level < 13) {
//             return '1d8';
//         }
//         if (this.level < 17) {
//             return '1d10';
//         }
//         return '1d12'
//     }

//     cantripsKnown(): number {
//         if (this.level < 4) {
//             return 2;
//         }
//         if (this.level < 10) {
//             return 3;
//         }
//         return 4;
//     }

//     spellsKnown(): number {
//         if (this.level < 10) {
//             return this.level + 3;
//         }
//         switch (this.level) {
//             case 10:
//                 return 14;
//             case 11:
//             case 12:
//                 return 15;
//             case 13:
//                 return 16;
//             case 14:
//                 return 18;
//             case 15:
//             case 16:
//                 return 19;
//             case 17:
//                 return 20;
//             default:
//                 return 22;
//         }
//     }

//     spellSlots(): number[] {
//         switch (this.level) {
//             case 1:
//                 return [2,0,0,0,0,0,0,0,0];
//             case 2:
//                 return [3,0,0,0,0,0,0,0,0];
//             case 3:
//                 return [4,2,0,0,0,0,0,0,0];
//             case 4:
//                 return [4,3,0,0,0,0,0,0,0];
//             case 5:
//                 return [4,3,2,0,0,0,0,0,0];
//             case 6:
//                 return [4,3,3,0,0,0,0,0,0];
//             case 7:
//                 return [4,3,3,1,0,0,0,0,0];
//             case 8:
//                 return [4,3,3,2,0,0,0,0,0];
//             case 9:
//                 return [4,3,3,3,1,0,0,0,0];
//             case 10:
//                 return [4,3,3,3,2,0,0,0,0];
//             case 11:
//             case 12:
//                 return [4,3,3,3,2,1,0,0,0];
//             case 13:
//             case 14:
//                 return [4,3,3,3,2,1,1,0,0];
//             case 15:
//             case 16:
//                 return [4,3,3,3,2,1,1,1,0];
//             case 17:
//                 return [4,3,3,3,2,1,1,1,1];
//             case 18:
//                 return [4,3,3,3,3,1,1,1,1];
//             case 19:
//                 return [4,3,3,3,3,2,1,1,1];
//             case 20:
//                 return [4,3,3,3,3,2,2,1,1];
//         }
//     }

//     public static fromJson(json: any): BardDetails {
//         return new BardDetails(json.level, json.barbCollege, json.expertise);
//     }
// }

export enum BardCollege {
    Lore = "College of Lore",
    Valor = "College of Valor",
}
export class ClericDetails extends _ClassDetails<ClericDomain> {
    constructor(
        level: number,
        features: ClassFeature[],
        domain?: ClericDomain,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, domain, selectedFeatures, id);
    }

    static fromJson(json: any): ClericDetails {
        return new ClericDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.domain,
            json.selectedFeatures,
            json.id,
        );
    }
}
// export class ClericDetails {
//     constructor(
//         public level,
//         public domain: ClericDomain,
//     ) { }
//     public notes(): Note[] {
//         let ret = [
//             new Note('Spell Casting', 
//                 'Your religious pursuits have enable you to wield magic', 
//                 `Your god has betrothed you the ability to wield magic, this gift does not come unchecked, your available spells are restricted by the god you worship.`),
//             new Note('Divine Domain', this.domainDesc(), this.longDomainDesc()),
//         ];
//         if (this.level > 2) {
//             ret.push(
//                 new Note(
//                     'Channel Divinity',
//                     `You can channel energy directly from your god ${this.channels} times before resting`, 
//                     `Your connection to the divine is so strong that you are able to act as a conduit for your god's will.
//                     A certain number of times per day between long or short rests you can invoke a prayer that will impact the world around you.`
//                 )
//             );
//             ret.push(...this.availableChannels());
//         }
//         if (this.level > 3 && this.level < 8) {
//             ret.push(new Note('Bonus Ability Scores', '2', ''));
//         }
//         if (this.level > 7 && this.level < 12) {
//             ret.push(new Note('Bonus Ability Scores', '4', ''));
//         }
//         if (this.level > 11 && this.level < 16) {
//             ret.push(new Note('Bonus Ability Scores', '6', ''));
//         }
//         if (this.level > 15 && this.level < 19) {
//             ret.push(new Note('Bonus Ability Scores', '8', ''));
//         }
//         if (this.level > 18) {
//             ret.push(new Note('Bonus Ability Scores', '10', ''));
//         }
//         return ret;
//     }

//     public get channels(): number {
//         if (this.level < 6) {
//             return 1;
//         }
//         if (this.level < 18) {
//             return 2;
//         }
//         return 3;
//     }

//     public availableChannels(): Note[] {
//         let ret = [
//             new Note('Channel Divinity - Turn Undead', 'Each undead that can hear you within 30 feet will spend the next 1 minute trying to get as far away from you as possible', ''),
//         ];
//         ret.push(...this.domainChannels());
        
//         if (this.level > 4) {
//             ret.push(new Note('Channel Divinity - Destroy Undead', `Successfully turning undead with a challenge ranting of ${this.destroyUndeadCR()} or lower destroys that creature`, ''));
//         }
//         if (this.level > 9) {
//             ret.push(new Note('Channel Divinity - Divine Intervention', 'You can choose to call on your deity for extreme intervention, roll your percentile dice, if the value is below your cleric level your deity intervenes (DM chooses the nature of the intervention) on success you must wait 7 days before using again on failure you must rest', ''));
//         }
//         return ret;
//     }

//     public destroyUndeadCR(): number {
//         if (this.level < 8) {
//             return 0.5;
//         }
//         if (this.level < 11) {
//             return 1;
//         }
//         if (this.level < 14) {
//             return 2;
//         }
//         if (this.level < 16) {
//             return 3;
//         }
//         return 4;
//     }

//     public domainChannels(): Note[] {
//         let ret = [];
//         switch (this.domain) {
//             case ClericDomain.Knowledge:
//                 if (this.level > 1) {
//                     ret.push(new Note('Channel Divinity: Knowledge of the Ages', 'For 10 minutes you have proficiency with a chosen skill or tool', ''));
//                 }
//                 if (this.level > 5) {
//                     ret.push(new Note('Channel Divinity: Read Thoughts', '', ''))
//                 }
//             break;
//             case ClericDomain.Life:

//             break;
//             case ClericDomain.Light:

//             break;
//             case ClericDomain.Nature:

//             break;
//             case ClericDomain.Tempest:

//             break;
//             case ClericDomain.Trickery:

//             break;
//             case ClericDomain.War:

//             break;
//         }
//         return ret;
//     }

//     public domainDesc(): string {
//         if (!this.domain) {
//             return 'Choose between Knowledge, Life, Light, Nature, Tempest, Trickery, or War';
//         }
//         return this.domain;
//     }
//     public longDomainDesc(): string {
//         switch (this.domain) {
//             case ClericDomain.Knowledge:
//             return 'The gods of knowledge-including Gilean, Aureon, \
//                     and Thoth-value learning and understanding above all. \
//                     Some teach that knowledge is to be gathered and \
//                     shared in libraries and universities, or promote \
//                     the practical knowledge of craft and invention. \
//                     Some deities hoard knowledge and keep its secrets \
//                     to themselves. And some promise their followers \
//                     that they will gain tremendous power if they \
//                     unlock the secrets of the multiverse. Followers \
//                     of these gods study esoteric lore, collect old \
//                     tomes, delve into the secret places of the earth, \
//                     and learn all they can to Some gods of knowledge \
//                     promote the practical knowledge of craft and invention, \
//                     including smith deities like Gond, Reorx, Onatar, \
//                     Moradin, Hephaestus, and Goibhniu.';
//             case ClericDomain.Life:
//                 return 'The Life domain focuses on the vibrant positive energy-one of the fundamental \
//                     forces of the universe-that sustains all ife. The gods of life promote vitality and \
//                     health through healing the sick and wounded, caring for those in need, and driving away \
//                     the forces of death and undeath. Almost any non-evil deity can claim influence over this \
//                     domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods \
//                     (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as IlIllatcr, \
//                     Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).'
            
//             case ClericDomain.Light:
//                 return 'Gods of light-including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakty-\
//                     promote the ideals of rebirth and renewal, truth, vigilance, adn beauty, often using the symbol of the sun. Some \
//                     of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others \
//                     are tireless sentinels whose eyes pierce every shadow and see through ever deception. Some are deities of beauty and \
//                     artistry, who teach that art is a vehicle for the soul\'s improvement. Clerics of a god of light are enlightened souls \
//                     infused with radiance and the power of their god\'s discerning vision, charged with chasing away lies and burning \
//                     away darkness.';
//             case ClericDomain.Nature:
//                 return 'Gods of nature are as varied as the natural world \
//                     itself, from illscrutable gods of the deep forests (such \
//                     as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly \
//                     deities associated with particular springs and groves (such as Eldath). \
//                     Druids revere nature as a whole and might serve one of these deities, \
//                     practicing mysterious rites and reciting all-but-forgotten prayers in \
//                     their own secret tongue. But many of these gods have clerics as well, \
//                     champions who take a more active role in advancing the interests of a \
//                     particular nature god. These clerics might hunt the evil monstrosities \
//                     that despoil the woodlands, bless the harvest of the faithful, or \
//                     wither the crops of those who anger their gods.';
//             case ClericDomain.Tempest:
//                 return 'Gods whose portfolios include the Tempest domain- including \
//                     Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor-govern \
//                     storms, sea, and sky. They include gods of lightning and thunder, gods \
//                     of earthquakes, some tire gods, and certain gods of violence, physical \
//                     strength, and courage. In some pantheons, a god of this domain rules over \
//                     other deities and is known for swift justice delivered by thunderbolts. \
//                     In the pantheons of seafaring people, gods of this domain are ocean \
//                     deities and the patrons of sailors. Tempest gods send their clerics to \
//                     inspire fear in the common folk, either to keep those folk on the path of \
//                     righteousness or to encourage them to offer sacrifices of propitiation to \
//                     ward off divine wrath.'
//             case ClericDomain.Trickery:
//                 return 'Gods of trickery-such as Tymora, Beshaba, Olidammara, the Traveler, \
//                     Garl Glittergold, and Loki-are mischief-makers and instigators who stand \
//                     as a constant challenge to the accepted order among both gods and mortais. \
//                     They\'re patrons of thieves, scoundrels, gamblers, rebels, and liberators. \
//                     Their clerics are a disruptive force in the world, puncturing pride, \
//                     mocking tyrants, stealing from the rich, freeing captives, and \
//                     flouting hollow traditions. They prefer subterfuge, pranks, deception, \
//                     and theft rather than direct confrontation.';
//             case ClericDomain.War:
//                 return 'War has many manifestations. It can make heroes of ordinary people. \
//                     It can be desperate and horrific, with acts of cruelty and cowardice \
//                     eclipsing instances of excellence and courage. In either case, \
//                     the gods of war watch over warriors and reward them for their great \
//                     deeds. The clerics of such gods excel in battle, inspiring others \
//                     to fight the good fight or offering acts of violence as prayers. \
//                     Gods of war include champions of honor and chivalry (such as \
//                     Torm, Heironeous, and Kiri-Jolith) as well as gods of \
//                     destruction and pillage (such as Erythnul, the Fury, \
//                     Gruumsh, and Ares) and gods of conquest and domination \
//                     (such as Bane, Hextor, and Maglubiyet). Other war gods \
//                     (such as Tempus, Nike, and Nuada) take a more neutral stance, promoting war\
//                     in all its manifestations and supporting warriors in any circumstance.'
//             default:
//                 return '';
//         }
//     }

//     public domainNotes(): Note[] {
//         let ret = [];
//             switch (this.domain) {
//                 case ClericDomain.Knowledge:
//                     ret.push(new Note('Knowledge Domain', 'You gain knowledge of 2 additional languages', ''));
//                     if (this.level > 7) {
//                         ret.push(new Note('Potent Spellcasting', 'Add your WIS modifier cantrip spell damage', ''));
//                     }
//                     if (this.level > 16) {
//                         ret.push(new Note('Visions of the Past', '', ''));
//                     }
//                 break;
//                 case ClericDomain.Life:
//                     ret.push(new Note('Life Domain', 'You can now wear Heavy Armor', 'You can now wear Heavy Armor'));
//                     ret.push(new Note('Life Domain: Disciple of Life', 'Add +2 to add heals spells', ''));

//                     if (this.level > 1) {
                        
//                     }
//                 break;
//             }
//         return ret;
//     }
//     public cantripsKnown(): number {
//         if (this.level < 4) {
//             return 3;
//         }
//         if (this.level < 10) {
//             return 4;
//         }
//         return 5;
//     }
//     spellSlots(): number[] {
//         switch (this.level) {
//             case 1:
//                 return [2,0,0,0,0,0,0,0,0];
//             case 2:
//                 return [3,0,0,0,0,0,0,0,0];
//             case 3:
//                 return [4,2,0,0,0,0,0,0,0];
//             case 4:
//                 return [4,3,0,0,0,0,0,0,0];
//             case 5:
//                 return [4,3,2,0,0,0,0,0,0];
//             case 6:
//                 return [4,3,3,0,0,0,0,0,0];
//             case 7:
//                 return [4,3,3,1,0,0,0,0,0];
//             case 8:
//                 return [4,3,3,2,0,0,0,0,0];
//             case 9:
//                 return [4,3,3,3,1,0,0,0,0];
//             case 10:
//                 return [4,3,3,3,2,0,0,0,0];
//             case 11:
//             case 12:
//                 return [4,3,3,3,2,1,0,0,0];
//             case 13:
//             case 14:
//                 return [4,3,3,3,2,1,1,0,0];
//             case 15:
//             case 16:
//                 return [4,3,3,3,2,1,1,1,0];
//             case 17:
//                 return [4,3,3,3,2,1,1,1,1];
//             case 18:
//                 return [4,3,3,3,3,2,1,1,1];
//             case 19:
//                 return [4,3,3,3,3,2,2,1,1];
//             case 20:

//         }
//     }
//     public static fromJson(json: any): ClericDetails {
//         return new ClericDetails(
//             json.level,
//             json.domain,
//             );
//     }
// }

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
        circle?: DruidCircle,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, circle, selectedFeatures, id);
    }

    static fromJson(json: any): DruidDetails {
        return new DruidDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.circle,
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
        archType?: CombatArchetype,
        public fightingStyle: FighterStyle[] = [],
        public combatSuperiority?: CombatSuperiority,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, archType, selectedFeatures, id);
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
            json.archType,
            json.fightingStyle,
            json.combatSuperiority,
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
        monasticTradition?: MonasticTradition,
        public kiPoints: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, monasticTradition, selectedFeatures, id);
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
            json.monasticTradition,
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
        oath?: PaladinOath,
        public fightingStyle?: PaladinStyle,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, oath, selectedFeatures, id);
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
            json.oath,
            json.fightingStyle,
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
        archetype?: RangerArchetype,
        public favoredEnemies: RangerEnemy[] = [],
        public favoredTerrains: string[] = [],
        public fightingStyles: RangerStyle[] = [],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, archetype, selectedFeatures, id);
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
            json.archetype,
            json.favoredEnemies,
            json.favoredTerrains,
            json.fightingStyle,
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
        archetype?: RoguishArchetype,
        public expertise: SkillKind[] = [],
        public bonusAbilityScore: [AbilityKind, number][] = [],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, archetype, selectedFeatures, id);
    }

    static fromJson(json: any): RogueDetails {
        return new RogueDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.archetype,
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
        origins?: SorcererOrigins,
        public metaMagic: MetaMagic[] = [],
        public sorcererPoints: number = 0,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number
    ) {
        super(level, features, origins, selectedFeatures, id);
    }

    static fromJson(json: any): SorcererDetails {
        return new SorcererDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.origins,
            json.metaMagic,
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
        patron?: OtherworldlyPatron,
        public eldritchIncantations: EldritchIncantation[] = [],
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, patron, selectedFeatures, id);
    }

    static fromJson(json: any): WarlockDetails {
        return new WarlockDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.patron,
            json.eldritchIncantations,
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
        tradition?: ArcaneTradition,
        selectedFeatures?: Map<string, {idx: number, minLevel: number}>,
        id?: number,
    ) {
        super(level, features, tradition, selectedFeatures, id);
    }

    static fromJson(json: any): WizardDetails {
        return new WizardDetails(
            json.level,
            json.features.map(ClassFeature.fromJson),
            json.tradition,
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