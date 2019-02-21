import { AbilityKind } from './abilityScore';
export class Skills {
    constructor(
        private skills: Skill[] = [
            new Skill(SkillKind.Acrobatics, false, AbilityKind.Dexterity),
            new Skill(SkillKind.AnimalHandling, false, AbilityKind.Wisdom),
            new Skill(SkillKind.Athletics, false, AbilityKind.Strength),
            new Skill(SkillKind.Arcana, false, AbilityKind.Intelligence),
            new Skill(SkillKind.Deception, false, AbilityKind.Charisma),
            new Skill(SkillKind.History, false, AbilityKind.Intelligence),
            new Skill(SkillKind.Insight, false, AbilityKind.Wisdom),
            new Skill(SkillKind.Intimidation, false, AbilityKind.Charisma),
            new Skill(SkillKind.Investigation, false, AbilityKind.Intelligence),
            new Skill(SkillKind.Medicine, false, AbilityKind.Wisdom),
            new Skill(SkillKind.Nature, false, AbilityKind.Intelligence),
            new Skill(SkillKind.Perception, false, AbilityKind.Wisdom),
            new Skill(SkillKind.Performance, false, AbilityKind.Charisma),
            new Skill(SkillKind.Persuasion, false, AbilityKind.Charisma),
            new Skill(SkillKind.Religion, false, AbilityKind.Intelligence),
            new Skill(SkillKind.SleightOfHand, false, AbilityKind.Dexterity),
            new Skill(SkillKind.Stealth, false, AbilityKind.Dexterity),
            new Skill(SkillKind.Survival, false, AbilityKind.Wisdom),
        ]
    ) { }

    public isEnabled(skillKind: SkillKind): boolean {
        if (!this.skills) return false;
        let filter = this.skills.filter(s => s.kind == skillKind);
        if (filter.length > 0) {
            return filter[0].enabled
        }
        return false;
    }

    public map<U>(cb: (skill: Skill) => U): U[] {
        return this.skills.map(cb)
    }
    public set(skillKind: SkillKind, enabled: boolean) {
        let skillIdx = this.skills.findIndex(s => s.kind == skillKind);
        if (skillIdx > -1) {
            this.skills[skillIdx].enabled = enabled;
        }
    }
    public static fromJson(json: any): Skills {
        return new Skills(
            json.skills.map(Skill.fromJson),
        );
    }
}

export class Skill {
    constructor(
        public kind: SkillKind,
        public enabled: boolean,
        public modifier: AbilityKind,
    ) { }

    public static from(other: Skill): Skill {
        return new Skill(other.kind, other.enabled, other.modifier);
    }

    public get desc(): string {
        switch (this.kind) {
            case SkillKind.Acrobatics:
                return `Dealing with difficult physical situations like tumbling or balancing on a ledge, modified by ${this.modifier}`;
            case SkillKind.AnimalHandling:
                return `Your ability to communicate with animals like calming your mount or interpreting your dog's needs, modified by ${this.modifier}`;
            case SkillKind.Arcana:
                return `This represents your knowledge about all things magic, modified by ${this.modifier}`;
            case SkillKind.Athletics:
                return `Physical situations that might be an olympic individual competition like long/high jump or swimming, modified by ${this.modifier}`;
            case SkillKind.Deception:
                return `Your ability to hide information from someone else, modified by ${this.modifier}`;
            case SkillKind.History:
                return `Your ability to recall important things from the past, modified by ${this.modifier}`;
            case SkillKind.Insight:
                return `Your ability to see through deception, modified by ${this.modifier}`;
            case SkillKind.Intimidation:
                return `Your ability to scare someone into doing what you want, modified by ${this.modifier}`;
            case SkillKind.Investigation:
                return `Your ability to discern the information you need from the resources in front of you, modified by ${this.modifier}`;
            case SkillKind.Medicine:
                return `Your ability to stabilize someone who's below 0 HP, modified by ${this.modifier}`;
            case SkillKind.Nature:
                return `You knowledge of the natural world, modified by ${this.modifier}`;
            case SkillKind.Perception:
                return `Your ability to notice something in your current environment, modified by ${this.modifier}`;
            case SkillKind.Performance:
                return `Your ability to entertain a crowd, modified by ${this.modifier}`;
            case SkillKind.Persuasion:
                return `Your ability to influence someone else's decision, modified by ${this.modifier}`;
            case SkillKind.Religion:
                return `Your knowledge about the gods and their worshipers, modified by ${this.modifier}`;
            case SkillKind.SleightOfHand:
                return `When you want to do something with your hands discretely enough that someone else doesn't see/feel it like card tricks or pick pocketing, modified by ${this.modifier}`;
            case SkillKind.Stealth:
                return `When you want to remain hidden, modified by ${this.modifier}`;
            case SkillKind.Survival:
                return `Anything Bear Grills would need to do to survive, modified by ${this.modifier}`;
            default:
                return '';
        }
    }

    public copy() {
        return Skill.from(this);
    }

    public static fromJson(json: any): Skill {
        return new Skill(
            json.kind,
            json.enabled,
            json.modifier,
        );
    }
}

export enum SkillKind {
    Acrobatics = 'Acrobatics',
    AnimalHandling = 'Animal Handling',
    Arcana = 'Arcana',
    Athletics = 'Athletics',
    Deception = 'Deception',
    History = 'History',
    Insight = 'Insight',
    Intimidation = 'Intimidation',
    Investigation = 'Investigation',
    Medicine = 'Medicine',
    Nature = 'Nature',
    Perception = 'Perception',
    Performance = 'Performance',
    Persuasion = 'Persuasion',
    Religion = 'Religion',
    SleightOfHand = 'Sleight Of Hand',
    Stealth = 'Stealth',
    Survival = 'Survival',
}