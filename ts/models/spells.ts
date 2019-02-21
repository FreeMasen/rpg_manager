import { Range } from "./range";
import { AbilityKind } from "./abilityScore";
import { SpellName } from './spellBook';

export class Spells {
    constructor(
        public spells: Spell[] = [],
    ) { }



    map<U>(cb: (s: Spell) => U): U[] {
        return this.spells.map(cb);
    }

    public static fromJson(json: any): Spells {
        return new Spells(
            json.spells.map(Spell.fromJson)
        )
    }
}

export class Spell {
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
        return new Spell(
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
        )
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
