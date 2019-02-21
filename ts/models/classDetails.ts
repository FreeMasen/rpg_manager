import { SkillKind } from './skills';
import { AbilityKind } from './abilityScore';
import { DEFAULT_BONUS_ABILITY_SCORES } from './class';
import { Note } from './note';

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

export class BarbarianDetails {
    constructor(
        public level: number,
        public primalPath: PrimalPath = null,
        public totem: [Totem?, Totem?, Totem?] = [],
        ) { }
        
    public static fromJson(json: any): BarbarianDetails {
        return new BarbarianDetails(json.level, json.primalPath, json.totem);
    }

    public notes(level?: number): Note[] {
        if (!level) {
            level = this.level;
        }
        let ret = [
            new Note(`Rage`, `${this.dailyRages} times daily, you rage for 1 minute (10 rounds)`, 
            `You can enter into a rage a certain number of times depending on your level. 
            During that time you have the following benefits.
            - Advantage on Strength Checks,
            - +${this.rageDamage} damage on Strength based attacks,
            - Resistance to bludgeoning, piercing and slashing damage (halve damage)
            A rage last for 1 minute which is 10 round of combat, you can be forced to end your rage early in one of the following situations.
            - You do not attempt to attack an opponent on your turn
            - You are knocked unconscious
            Rages are only regained after a long rest`),
            new Note('Unarmored Defense', 
                    'When not wearing armor your AC = 10 + DEX + CON (can use shield)', 
                    `When not wearing any armor your calculate your Armor Class by adding your dexterity and constitution modifiers to 10.
                    If you are carrying a shield add the bonus from that as well.`),
        ];
        if (level > 1) {
            ret.push(new Note('Reckless Attack', 'Your first attack on a turn can be declared reckless giving you advantage on attack rolls that use strength but attack rolls against you have the advantage until the rest of your turn',''));
            ret.push(new Note('Danger Sense', 'You have the advantage on DEX saving throws against effects you an see', ''));
        }
        if (level > 2) {
            ret.push(new Note('Primal Path', this.pathDesc(), ''));
            if (this.primalPath) {
                ret.push(...this.pathNotes())
            }
        }
        if (level > 3 && level < 8) {
            ret.push(new Note('Bonus Ability Scores',  '2', ''));
        }
        if (level > 7 && level < 12) {
            ret.push(new Note('Bonus Ability Scores',  '4', ''));
        }
        if (level > 11 && level < 16) {
            ret.push(new Note('Bonus Ability Scores',  '6', ''));
        }
        if (level > 15 && level < 19) {
            ret.push(new Note('Bonus Ability Scores',  '8', ''));
        }
        if (level > 18) {
            ret.push(new Note('Bonus Ability Scores',  '10', ''));
        }
        if (level > 4) {
            ret.push(new Note('Extra Attack', 'You can attack twice on your turn', ''));
            ret.push(new Note('Fast Movement', 'Add 10 to your movement speed', ''));
        }
        if (level > 6) {
            ret.push(new Note('Feral Instinct', 'Advantage on Initiative rolls, if surprised at the beginning of combat you act normally on your first turn if you immediately rage', ''));
        }
        if (level > 8) {
            ret.push(new Note('Brutal Critical', `Add ${this.brutalCriticalDice} to your critical damage rolls`, ''));
        }
        if (level > 10) {
            ret.push(new Note('Relentless Rage', 'If you drop to 0HP you can make a CON save to drop to 1, DC starts at 10 and goes up by 5 for each attempt per day', ''));
        }
        if (level > 14) {
            ret.push(new Note('Persistent Rage', 'Rage no longer ends early if you don\'t attack an enemy your turn', ''));
        }
        if (level > 17) {
            ret.push(new Note('Indomitable Might', 'If your total for a STR check is less than your STR score you can use your STR score instead', ''));
        }
        if (level > 19) {
            ret.push(new Note('Primal Champion', 'Add 4 to your STR and CON scores (max 24)', ''));
        }
        return ret;
    }

    private pathDesc(): string {
        if (!this.primalPath) {
            return 'Choose between Berserker or Totem Warrior';
        } else {
            return this.primalPath;
        }
    }

    private pathNotes(): Note[] {
        let ret = [];
        switch (this.primalPath) {
            case PrimalPath.Berserker:
                if (this.level > 2) {
                    ret.push(new Note('Frenzy', 'While raging you can go into a frenzy, each turn after you get a single melee attack as a bonus action. (1 level of Exhaustion when rage ends see PHB 291)', ''));
                }
                if (this.level > 5) {
                    ret.push(new Note('Mindless Rage', 'Can\'t be charmed or frightened while raging', ''));
                }
                if (this.level > 9) {
                    ret.push(new Note('Intimidating Presence', 'Can use action to frighten someone DC 8 + proficiency bonus + CHA, failed attempt you can\'t use this again for 24 hours', ''));
                }
                if (this.level > 13) {
                    ret.push(new Note('Retaliation', 'When you take damage from a creature within 5 feet of you you can make a melee weapon attack against that target', ''));
                }
            break;
            case PrimalPath.TotemWarrior:
                return this.totemNotes();        
        }       
        return ret;
    }

    private totemNotes(): Note[] {
        let ret = [];
        ret.push('- Spirit Seeker: cast Beast Sense and Speak with Animals as Rituals');
        if (this.totem.length > 0) {
            for (let i = 0; i < this.totem.length; i++) {
                switch (this.totem[i]) {
                    case Totem.Bear:
                        ret.push(this.bearNotes(i + 1));
                    break;
                    case Totem.Eagle:
                        ret.push(this.eagleNotes(i + 1));
                    break;
                    case Totem.Wolf:
                        ret.push(this.wolfNotes(i + 1));
                    break;
                }
            }
        }
        
        if (this.level > 9) {
            let spirit = this.totem[0] === this.totem[1] ? this.totem[0] : `${this.totem[0]} or ${this.totem[1]}`;
            ret.push(`- Spirit Walker You can cast commune with nature as a ritual (spirit will be ${spirit})`);
        }
        return ret;
    }

    private bearNotes(level: number): Note {
        if (level === 1) {
            return new Note('Spirit Totem (Bear)', 'While raging you have resistance to all damage but psychic', '');
        }
        if (level === 2) {
            return new Note('Aspect of the Beast (Bear)', 'You double your carrying capacity and have advantage on STR checks to push, pull, lift or break objects', '');
        }
        if (level === 3) {
            return new Note('Totemic Attunement (Bear)', 'While raging enemies withing 5 feet of you have disadvantage on attack rolls against others (enemy must be able to see you can be frightened)', '');
        }
    }

    private eagleNotes(level: number): Note {
        if (level === 1) {
            return new Note('Spirit Totem (Eagle)', 'While raging you can Dash as bonus action, enemies have disadvantage on opportunity attacks', '');
        }
        if (level === 2) {
            return new Note('Aspect of the Beast (Eagle)', 'You can see up to 1 mile with no difficulty as though it were 100 ft, dim light doesn\'t impose a disadvantage on perception checks', '');
        }
        if (level === 3) {
            return new Note('Totemic Attunement (Eagle)', 'While raging you have a flying speed equal to your current walking speed, if you end your turn in the air you fall', '');
        }
    }
    private wolfNotes(level: number): Note {
        if (level === 1) {
            return new Note('Spirit Totem (Wolf)', 'While raging your friends have advantage on attack rolls against any creature within 5 ft of you', '');
        }
        if (level === 2) {
            return new Note('Aspect of the Beast (Wolf)', 'You can track at a fast pace, can move stealthily at normal pace', '');
        }
        if (level === 3) {
            return new Note('Totemic Attunement (Wolf)', 'While raging you can use a bonus action to knock a large (or smaller) creature prone after a successful hit with a melee weapon attack', '');
        }
    }
    
    get dailyRages(): number {
        if (this.level < 3) {
            return 2;
        }
        if (this.level < 6) {
            return 3;
        }
        if (this.level < 12) {
            return 4;
        }
        if (this.level < 17) {
            return 5;
        }
        if (this.level < 20) {
            return 6;
        }
        return Infinity;
    }
    get rageDamage(): number {
        if (this.level < 9) {
            return 2;
        }
        if (this.level < 16) {
            return 3;
        }
        return 4;
    }
    get brutalCriticalDice(): number {
        if (this.level < 9) {
            return 0;
        }
        if (this.level < 13) {
            return 1;
        }
        if (this.level < 17) {
            return 2;
        }
        return 3;
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

export class BardDetails {
    constructor(
        public level: number,
        public bardCollege: BardCollege = null,
        public expertise: SkillKind[] = [],
    ) {}

    notes(): Note[] {
        let ret = [
            new Note('Spell Casting', 
                    'Your music and/or voice is imbued with magic', 
                    `Your music and/or voice is imbued with magic.
                    This magic can support and inspire allies or deflate and hurt foes.`),
            new Note(`Bardic Inspiration`, 
                    `You can bestow a 1d${this.bardicInspirationDie} on any ally equal to your DEX mod per day, this die can be used to augment and skill, attack or saving roll before or after the roll. Must be declared before DM says it was successful or not, must be used within 10 minutes`,
                    `You can doll out inspiration like a currency boosting the dice rolls of your allies.
                    The number of times you can do this and how powerful the effect is increases as you level.
                    Any inspired ally must use this effect within 10 minutes.
                    You regain this ability after a long rest.`),
        ];
        if (this.level > 1) {
            ret.push(new Note('Jack of All Trades', 'Add half your proficiency bonus (rounded down) to any ability check that doesn\'t include your proficiency bonus', ''));
            ret.push(new Note(`Song of Rest`, `You can sing/orate during a short rest, all allies gain an additional ${this.songOfRestDice} HP`, ''));
        }
        if (this.level > 2) {
            ret.push(new Note(`Bard College`, this.collegeDesc(), ''));
            ret.push(...this.collegeNotes());
            ret.push(new Note('Expertise', 'Double your proficiency bonus on 2 skills', ''));
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new Note('Bonus Ability Scores',  '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new Note('Bonus Ability Scores',  '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new Note('Bonus Ability Scores',  '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new Note('Bonus Ability Scores',  '8', ''));
        }
        if (this.level > 18) {
            ret.push(new Note('Bonus Ability Scores',  '10', ''));
        }
        if (this.level > 4) {
            ret.push(new Note('Font of Inspiration', 'You regain all expended uses of Bardic Inspiration when you finish a short of long rest', ''));
        }
        if (this.level > 5) {
            ret.push(new Note('Counter-charm', 'You can use music or words to disrupt mind-influencing effects as an action on your turn, during which you and any allies within 30 ft have the advantage on saving throws again fear or charm', ''));
        }
        if (this.level > 9) {
            ret.push(new Note(`Magical Secrets`, `You can choose to add ${this.magicalSecrets} spells from any spell book to your know spells so long as it meets your caster level`, ''));
        }
        if (this.level > 19) {
            ret.push(new Note('Superior Inspiration', 'When your roll initiative and have no Bardic Inspiration left you regain one', ''));
        }
        return ret;
    }

    get bardicInspirationDie(): number {
        if (this.level < 5) {
            return 6;
        }
        if (this.level > 10) {
            return 8;
        }
        if (this.level < 15) {
            return 10;
        }
        return 12;
    }

    get magicalSecrets(): number {
        let ret = 0;
        if (this.level > 5 && this.bardCollege === BardCollege.Lore) {
            ret += 2;
        }
        if (this.level > 9) {
            ret += 2;
        }
        if (this.level > 13) {
            ret += 2;
        }
        if (this.level > 17) {
            ret += 2
        }
        return ret;
    }

    private collegeDesc(): string {
        if (!this.bardCollege) {
            return 'Choose between the College of Lore or Valor';
        }
        return this.bardCollege;
    }

    private collegeNotes(): Note[] {
        let ret = [];
        switch (this.bardCollege) {
            case BardCollege.Lore:
                if (this.level > 2) {
                    ret.push(new Note('Bonus Proficiencies', 'Become proficient in 3 additional skills', ''));
                    ret.push(new Note('Cutting Words', 'When an enemy within 30 feet makes an attack roll you can use a Bardic Inspiration roll to remove that number of points from their roll', ''));
                }
                if (this.level > 5) {
                    ret.push(new Note('Additional Magical Secrets', 'You gain 2 new spells from any spell book, these do not count against your known spells', ''));
                }
                if (this.level > 13) {
                    ret.push(new Note('Peerless Skill', 'You can use Bardic Inspiration on yourself', ''));
                }
            case BardCollege.Valor:
                if (this.level > 2) {
                    ret.push(new Note('Bonus Proficiencies', 'Become proficient in Medium Armor, Shields, and Martial Weapons', ''))
                }
                if (this.level > 5) {
                    ret.push(new Note('Extra Attack', 'If you attack on your action you can attack twice', ''));
                }
                if (this.level > 13) {
                    ret.push(new Note('Battle Magic', 'When you use a bard spell on your action you can attack as a bonus action', ''));
                }
        }
        return ret;
    }

    get songOfRestDice(): string {
        if (this.level === 1) {
            return 'no';
        }
        if (this.level < 9) {
            return '1d6';
        }
        if (this.level < 13) {
            return '1d8';
        }
        if (this.level < 17) {
            return '1d10';
        }
        return '1d12'
    }

    cantripsKnown(): number {
        if (this.level < 4) {
            return 2;
        }
        if (this.level < 10) {
            return 3;
        }
        return 4;
    }

    spellsKnown(): number {
        if (this.level < 10) {
            return this.level + 3;
        }
        switch (this.level) {
            case 10:
                return 14;
            case 11:
            case 12:
                return 15;
            case 13:
                return 16;
            case 14:
                return 18;
            case 15:
            case 16:
                return 19;
            case 17:
                return 20;
            default:
                return 22;
        }
    }

    spellSlots(): number[] {
        switch (this.level) {
            case 1:
                return [2,0,0,0,0,0,0,0,0];
            case 2:
                return [3,0,0,0,0,0,0,0,0];
            case 3:
                return [4,2,0,0,0,0,0,0,0];
            case 4:
                return [4,3,0,0,0,0,0,0,0];
            case 5:
                return [4,3,2,0,0,0,0,0,0];
            case 6:
                return [4,3,3,0,0,0,0,0,0];
            case 7:
                return [4,3,3,1,0,0,0,0,0];
            case 8:
                return [4,3,3,2,0,0,0,0,0];
            case 9:
                return [4,3,3,3,1,0,0,0,0];
            case 10:
                return [4,3,3,3,2,0,0,0,0];
            case 11:
            case 12:
                return [4,3,3,3,2,1,0,0,0];
            case 13:
            case 14:
                return [4,3,3,3,2,1,1,0,0];
            case 15:
            case 16:
                return [4,3,3,3,2,1,1,1,0];
            case 17:
                return [4,3,3,3,2,1,1,1,1];
            case 18:
                return [4,3,3,3,3,1,1,1,1];
            case 19:
                return [4,3,3,3,3,2,1,1,1];
            case 20:
                return [4,3,3,3,3,2,2,1,1];
        }
    }

    public static fromJson(json: any): BardDetails {
        return new BardDetails(json.level, json.barbCollege, json.expertise);
    }
}

export enum BardCollege {
    Lore = "College of Lore",
    Valor = "College of Valor",
}

export class ClericDetails {
    constructor(
        public level,
        public domain: ClericDomain,
    ) { }
    public notes(): Note[] {
        let ret = [
            new Note('Spell Casting', 
                'Your religious pursuits have enable you to wield magic', 
                `Your god has betrothed you the ability to wield magic, this gift does not come unchecked, your available spells are restricted by the god you worship.`),
            new Note('Divine Domain', this.domainDesc(), this.longDomainDesc()),
        ];
        if (this.level > 2) {
            ret.push(
                new Note(
                    'Channel Divinity',
                    `You can channel energy directly from your god ${this.channels} times before resting`, 
                    `Your connection to the divine is so strong that you are able to act as a conduit for your god's will.
                    A certain number of times per day between long or short rests you can invoke a prayer that will impact the world around you.`
                )
            );
            ret.push(...this.availableChannels());
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new Note('Bonus Ability Scores', '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new Note('Bonus Ability Scores', '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new Note('Bonus Ability Scores', '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new Note('Bonus Ability Scores', '8', ''));
        }
        if (this.level > 18) {
            ret.push(new Note('Bonus Ability Scores', '10', ''));
        }
        return ret;
    }

    public get channels(): number {
        if (this.level < 6) {
            return 1;
        }
        if (this.level < 18) {
            return 2;
        }
        return 3;
    }

    public availableChannels(): Note[] {
        let ret = [
            new Note('Channel Divinity - Turn Undead', 'Each undead that can hear you within 30 feet will spend the next 1 minute trying to get as far away from you as possible', ''),
        ];
        ret.push(...this.domainChannels());
        
        if (this.level > 4) {
            ret.push(new Note('Channel Divinity - Destroy Undead', `Successfully turning undead with a challenge ranting of ${this.destroyUndeadCR()} or lower destroys that creature`, ''));
        }
        if (this.level > 9) {
            ret.push(new Note('Channel Divinity - Divine Intervention', 'You can choose to call on your deity for extreme intervention, roll your percentile dice, if the value is below your cleric level your deity intervenes (DM chooses the nature of the intervention) on success you must wait 7 days before using again on failure you must rest', ''));
        }
        return ret;
    }

    public destroyUndeadCR(): number {
        if (this.level < 8) {
            return 0.5;
        }
        if (this.level < 11) {
            return 1;
        }
        if (this.level < 14) {
            return 2;
        }
        if (this.level < 16) {
            return 3;
        }
        return 4;
    }

    public domainChannels(): Note[] {
        let ret = [];
        switch (this.domain) {
            case ClericDomain.Knowledge:

            break;
            case ClericDomain.Life:

            break;
            case ClericDomain.Light:

            break;
            case ClericDomain.Nature:

            break;
            case ClericDomain.Tempest:

            break;
            case ClericDomain.Trickery:

            break;
            case ClericDomain.War:

            break;
        }
        return ret;
    }

    public domainDesc(): string {
        if (!this.domain) {
            return 'Choose between Knowledge, Life, Light, Nature, Tempest, Trickery, or War';
        }
        return this.domain;
    }
    public longDomainDesc(): string {
        switch (this.domain) {
            case ClericDomain.Knowledge:
            return 'The gods of knowledge-including Gilean, Aureon, \
                    and Thoth-value learning and understanding above all. \
                    Some teach that knowledge is to be gathered and \
                    shared in libraries and universities, or promote \
                    the practical knowledge of craft and invention. \
                    Some deities hoard knowledge and keep its secrets \
                    to themselves. And some promise their followers \
                    that they will gain tremendous power if they \
                    unlock the secrets of the multiverse. Followers \
                    of these gods study esoteric lore, collect old \
                    tomes, delve into the secret places of the earth, \
                    and learn all they can to Some gods of knowledge \
                    promote the practical knowledge of craft and invention, \
                    including smith deities like Gond, Reorx, Onatar, \
                    Moradin, Hephaestus, and Goibhniu.';
            case ClericDomain.Life:
                return 'The Life domain focuses on the vibrant positive energy-one of the fundamental \
                    forces of the universe-that sustains all ife. The gods of life promote vitality and \
                    health through healing the sick and wounded, caring for those in need, and driving away \
                    the forces of death and undeath. Almost any non-evil deity can claim influence over this \
                    domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods \
                    (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as IlIllatcr, \
                    Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).'
            
            case ClericDomain.Light:
                return 'Gods of light-including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakty-\
                    promote the ideals of rebirth and renewal, truth, vigilance, adn beauty, often using the symbol of the sun. Some \
                    of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others \
                    are tireless sentinels whose eyes pierce every shadow and see through ever deception. Some are deities of beauty and \
                    artistry, who teach that art is a vehicle for the soul\'s improvement. Clerics of a god of light are enlightened souls \
                    infused with radiance and the power of their god\'s discerning vision, charged with chasing away lies and burning \
                    away darkness.';
            case ClericDomain.Nature:
                return 'Gods of nature are as varied as the natural world \
                    itself, from illscrutable gods of the deep forests (such \
                    as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly \
                    deities associated with particular springs and groves (such as Eldath). \
                    Druids revere nature as a whole and might serve one of these deities, \
                    practicing mysterious rites and reciting all-but-forgotten prayers in \
                    their own secret tongue. But many of these gods have clerics as well, \
                    champions who take a more active role in advancing the interests of a \
                    particular nature god. These clerics might hunt the evil monstrosities \
                    that despoil the woodlands, bless the harvest of the faithful, or \
                    wither the crops of those who anger their gods.';
            case ClericDomain.Tempest:
                return 'Gods whose portfolios include the Tempest domain- including \
                    Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor-govern \
                    storms, sea, and sky. They include gods of lightning and thunder, gods \
                    of earthquakes, some tire gods, and certain gods of violence, physical \
                    strength, and courage. In some pantheons, a god of this domain rules over \
                    other deities and is known for swift justice delivered by thunderbolts. \
                    In the pantheons of seafaring people, gods of this domain are ocean \
                    deities and the patrons of sailors. Tempest gods send their clerics to \
                    inspire fear in the common folk, either to keep those folk on the path of \
                    righteousness or to encourage them to offer sacrifices of propitiation to \
                    ward off divine wrath.'
            case ClericDomain.Trickery:
                return 'Gods of trickery-such as Tymora, Beshaba, Olidammara, the Traveler, \
                    Garl Glittergold, and Loki-are mischief-makers and instigators who stand \
                    as a constant challenge to the accepted order among both gods and mortais. \
                    They\'re patrons of thieves, scoundrels, gamblers, rebels, and liberators. \
                    Their clerics are a disruptive force in the world, puncturing pride, \
                    mocking tyrants, stealing from the rich, freeing captives, and \
                    flouting hollow traditions. They prefer subterfuge, pranks, deception, \
                    and theft rather than direct confrontation.';
            case ClericDomain.War:
                return 'War has many manifestations. It can make heroes of ordinary people. \
                    It can be desperate and horrific, with acts of cruelty and cowardice \
                    eclipsing instances of excellence and courage. In either case, \
                    the gods of war watch over warriors and reward them for their great \
                    deeds. The clerics of such gods excel in battle, inspiring others \
                    to fight the good fight or offering acts of violence as prayers. \
                    Gods of war include champions of honor and chivalry (such as \
                    Torm, Heironeous, and Kiri-Jolith) as well as gods of \
                    destruction and pillage (such as Erythnul, the Fury, \
                    Gruumsh, and Ares) and gods of conquest and domination \
                    (such as Bane, Hextor, and Maglubiyet). Other war gods \
                    (such as Tempus, Nike, and Nuada) take a more neutral stance, promoting war\
                    in all its manifestations and supporting warriors in any circumstance.'
            default:
                return '';
        }
    }

    public domainNotes(): Note[] {
        let ret = [];
            switch (this.domain) {
                case ClericDomain.Knowledge:
                    ret.push(new Note('Knowledge Domain', 'You gain knowledge of 2 additional languages', ''));
                    if (this.level > 7) {
                        ret.push(new Note('Potent Spellcasting', 'Add your WIS modifier cantrip spell damage', ''));
                    }
                    if (this.level > 16) {
                        ret.push(new Note('Visions of the Past', '', ''));
                    }
                break;
            }
        return ret;
    }
    public cantripsKnown(): number {
        if (this.level < 4) {
            return 3;
        }
        if (this.level < 10) {
            return 4;
        }
        return 5;
    }
    spellSlots(): number[] {
        switch (this.level) {
            case 1:
                return [2,0,0,0,0,0,0,0,0];
            case 2:
                return [3,0,0,0,0,0,0,0,0];
            case 3:
                return [4,2,0,0,0,0,0,0,0];
            case 4:
                return [4,3,0,0,0,0,0,0,0];
            case 5:
                return [4,3,2,0,0,0,0,0,0];
            case 6:
                return [4,3,3,0,0,0,0,0,0];
            case 7:
                return [4,3,3,1,0,0,0,0,0];
            case 8:
                return [4,3,3,2,0,0,0,0,0];
            case 9:
                return [4,3,3,3,1,0,0,0,0];
            case 10:
                return [4,3,3,3,2,0,0,0,0];
            case 11:
            case 12:
                return [4,3,3,3,2,1,0,0,0];
            case 13:
            case 14:
                return [4,3,3,3,2,1,1,0,0];
            case 15:
            case 16:
                return [4,3,3,3,2,1,1,1,0];
            case 17:
                return [4,3,3,3,2,1,1,1,1];
            case 18:
                return [4,3,3,3,3,2,1,1,1];
            case 19:
                return [4,3,3,3,3,2,2,1,1];
            case 20:

        }
    }
    public static fromJson(json: any): ClericDetails {
        return new ClericDetails(
            json.level,
            json.domain,
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

export class DruidDetails {
    constructor(
        public level: number,
        public circle: DruidCircle,
    ) {}

    public notes(): Note[] {
        let ret = [
            new Note('Spell Casting', 
                'Your relationship with nature has enable you to wield magic.', 
                `Your relationship with nature has reach a point that allows you to manipulate the world around in extraordinary ways.`)
        ];
        if (this.level > 1) {
            new Note(
                'Wild Shape',
                `You can turn into a beast with a challenge rating ${this.maxWildShapeCR()} or less 2 times between rests for up to ${this.maxWildShapeHours()} hours`,
                `You can turn into a beast with a challenge rating ${this.maxWildShapeCR()} or less 2 times between rests for up to ${this.maxWildShapeHours()} hours.
                Transforming take an action.
                ${this.wildShapeRestrictions()}
                You take on the attributes and abilities of the beast except for the following.
                - Alignment
                - Personality
                - Intelligence
                - Wisdom
                - Charisma
                - You cannot use any legendary or lair actions of this beast.
                You're are forced to revert if knocked unconscious.
                While in beast form you cannot cast spells.
                You can choose between the following three options for the items your are wearing.
                - They drop where you transformed
                - They merge into the beast
                - The beast will be wearing them (note: the DM gets final vote on the practicality of this)`
            )
        }

        return ret;
    }

    public maxWildShapeCR(): number {
        if (this.level < 4) {
            return 0.25;
        }
        if (this.level < 8) {
            return 0.5;
        }
        return 1;
    }

    public maxWildShapeHours(): number {
        return Math.floor(this.level / 2);
    }

    public wildShapeRestrictions(): string {
        if (this.level < 4) {
            return 'The beast cannot have a swim or flying speed';
        }
        if (this.level < 8) {
            return 'The beast cannot have a flying speed'
        }
        return 'No additional restrictions on the beast'
    }

    public static fromJson(json: any): DruidDetails {
        return new DruidDetails(
            json.level,
            json.circle,
        );
    }
}

export enum DruidCircle {
    Land = 'Land',
    Moon = 'Moon',
}

export class FighterDetails {
    constructor(
        public level: number,
        public fightingStyle: FighterStyle,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any) {
        return new FighterDetails(
            json.level,
            json.fightingStyle,
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

export class MonkDetails {
    constructor(
        public level: number,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any): MonkDetails {
        return new MonkDetails(
            json.level,
        );
    }
}

export class PaladinDetails {
    constructor(
        public level: number,
        public fightingStyle?: PaladinStyle,
        public oath?: PaladinOath,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any): PaladinDetails {
        return new PaladinDetails(
            json.level,
            json.fightingStyle,
            json.oath,
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
}

export class RangerDetails {
    constructor(
        public level: number,
        public favoredEnemy: RangerEnemy,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any): RangerDetails {
        return new RangerDetails(
            json.level,
            json.favoredEnemy,
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

export class RogueDetails {
    constructor(
        public level: number = 1,
        public archType: RoguishArchType,
        public expertise: SkillKind[] = [],
        public bonusAbilityScores: [AbilityKind, number][] = DEFAULT_BONUS_ABILITY_SCORES,
    ) { }

    notes(): Note[] {
        let ret = [];
        ret.push(new Note(`Expertise`, `Double ${this.expertiseNumber()} proficiency bonus`, ''));
        ret.push(new Note(`Sneak Attack`, `Add ${this.sneakAttackDice()}d6 to DMG rolls with advantage or another aly within 5 feet of enemy`, ''));
        ret.push(new Note(`Thieves Cant`, `Secret rogue slang language`, ''));
        if (this.level > 2) {
            ret.push(new Note(`Cunning Action`, `Bonus action of Dash, Disengage, or Hide on any combat turn`, ''));
            ret.push(new Note(`Roguish ArchType`, `${this.archTypeDesc()}`, ''));
            ret.push(...this.archTypeDetails());
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new Note('Bonus Ability Scores', '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new Note('Bonus Ability Scores', '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new Note('Bonus Ability Scores', '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new Note('Bonus Ability Scores', '8', ''));
        }
        if (this.level > 18) {
            ret.push(new Note('Bonus Ability Scores:', '0', ''));
        }
        if (this.level > 4) {
            ret.push(new Note('Uncanny Dodge', 'you can use your reaction to halve the attack\'s damage against you (must be able to see attacker)', ''));
        }
        if (this.level > 6) {
            ret.push(new Note('Evasion', 'AOEs that a dex save would halve damage, you take no damage on success and half if failed', ''));
        }
        if (this.level > 10) {
            ret.push(new Note('Reliable Talent', 'On skills that include proficiency bonus any roll 9 or less is counted as 10', ''));
        }
        if (this.level > 13) {
            ret.push(new Note('Blind Sense', 'If you can hear you are aware of any hidden or invisible creature within 10 feet', ''));
        }
        if (this.level > 17) {
            ret.push(new Note('Elusive', 'No attack roll has advantage against you unless incapacitated', ''));
        }
        if (this.level > 19) {
            ret.push(new Note('Stroke of Luck', 'Once a day you can convert any failed skill roll into a 20 or missed attack into a hit', ''));
        }
        return ret;
    }

    private expertiseNumber() {
        if (this.level < 6) {
            return 2;
        }
        return 4;
    }

    private archTypeDesc(): string {
        if (this.archType) {
            return this.archType
        } else {
            return 'Choose between Thief, Assassin, and Arcane Trickster';
        }
    }


    public archTypeDetails(): string[] {
        let ret = [];
        switch (this.archType) {
            case RoguishArchType.Thief:
                if (this.level > 2) {
                    ret.push('- Bonus Cunning Actions: Disarm Trap, Open Lock, Use Object');
                    ret.push('- Second Story Work: Climb without movement penalty');
                }
                if (this.level > 8) {
                    ret.push('- Supreme Sneak: Advantage on Stealth when moving 1/2 your speed');
                }
                if (this.level > 12) {
                    ret.push('- Use Magic Device: Ignore all Class, Race and Level requirements when using a magic item');
                }
                if (this.level > 16) {
                    ret.push('- Thief\'s Reflexes: You take 2 turns on the first round of combat (Second turn at Initiative - 10, cannot use when surprised)');
                }
            break;
            case RoguishArchType.Assassin:
                if (this.level > 2) {
                    ret.push('- Bonus Proficiencies: Poisoner\'s and Disguise Kit');
                    ret.push('- Assassinate: Advantage against enemies who have not taken a turn; surprise always crits');
                }
                if (this.level > 8) {
                    ret.push('- Infiltration Expertise: You can unfailingly create false identities (see PH:97 for details)');
                }
                if (this.level > 12) {
                    ret.push('- Imposter: Unerringly mimic another person\'s speech, writing, and behavior (see PH:97 for details)');
                }
                if (this.level > 16) {
                    ret.push('- Death Strike: Surprised Attacks must also make a CON save (8 + DEX + Prof), failed saves double damage');
                }
            break;
            case RoguishArchType.ArcaneTrickster:
                //TODO add this...
            break;
        }
        return ret;
    }

    public sneakAttackDice(): number {
        return Math.ceil(this.level / 2);
    }

    public allowedBonusAbilityScores(): number {
        if (this.level < 4) {
            return 0;
        }
        if (this.level < 8) {
            return 2;
        }
        if (this.level < 10) {
            return 4;
        }
        if (this.level < 12) {
            return 6;
        }
        if (this.level < 16) {
            return 8;
        }
        if (this.level < 19) {
            return 10;
        }
        return 12;
    }
    public static fromJson(json: any): RogueDetails {
        return new RogueDetails(
            json.level,
            json.archType,
            json.expertise,
            json.bonusAbilityScores,
        );
    }
}

export class SorcererDetails {
    constructor(
        public level: number,
        public metaMagic?: MetaMagic,
        public origins?: SorcererOrigins,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any): SorcererDetails {
        return new SorcererDetails(
            json.level,
            json.metaMagic,
            json.origins,
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

export class WarlockDetails {
    constructor(
        public level: number,
        public patron: OtherworldlyPatron,
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }

    public static fromJson(json: any): WarlockDetails {
        return new WarlockDetails(
            json.level,
            json.patron,
        );
    }
}

export enum OtherworldlyPatron {
    ArchFey,
    Fiend,
    GreatOldOne
}

export class WizardDetails {
    constructor(
        public level: number,
        public arcaneTradition: ArcaneTradition
    ) { }

    public notes(): Note[] {
        let ret = [];

        return ret;
    }
    public static fromJson(json: any): WizardDetails {
        return new WizardDetails(
            json.level,
            json.arcaneTradition,
        );
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

export enum RoguishArchType {
    Thief = 'Thief',
    Assassin = 'Assassin',
    ArcaneTrickster = 'Arcane Trickster',
}