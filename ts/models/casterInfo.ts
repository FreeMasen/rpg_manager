import { Spell, SpellName } from "./spells";



export class CasterInfo {
    private knownSet: Set<SpellName>
    private _highest = 0
    constructor(
        public spellSlots: number[] = [],
        public currentSlots: number[] = [],
        public cantripCount: number = 0,
        public spellCount: number = 0,
        public _knownSpells: Spell[] = [],
    ) {
        this.knownSet = new Set(_knownSpells.map(s => s.name));
    }

    public resetSpells() {
        this.currentSlots = this.spellSlots.map(s => s);
    }

    public useSlot(level: number) {
        let count = this.currentSlots[level];
        if (!count) {
            throw new Error('Attempted to use unusable spell slot');
        }
        this.currentSlots[level] = Math.max(0, count - 1);
    }

    public addSpell(spell: Spell) {
        this._knownSpells.push(spell);
        this.knownSet.add(spell.name);
    }

    public removeSpell(spell: SpellName) {
        let idx = this._knownSpells.findIndex(s => s.name === spell);
        if (idx < 0) {
            return;
        }
        this._knownSpells.splice(idx, 1);
        this.knownSet.delete(spell);
    }
    public get knownSpells(): Spell[][] {
        return this._knownSpells.reduce((acc: Spell[][], s) => {
            let inner = acc[s.level];
            if (!inner) {
                acc[s.level] = [s]
            } else {
                acc[s.level].push(s)
            }
            return acc;
        }, []);
    }

    public set knownSpells(value: Spell[][]) {
        this.setRawSpells(value.reduce((acc, spells) => acc.concat(spells), []));
    }

    public setRawSpells(spells: Spell[]) {
        this._knownSpells = spells;
        this.knownSet = new Set(this._knownSpells.map(s => s.name));
    }

    public has(name: SpellName): boolean {
        return this.knownSet.has(name);
    }

    public static fromJson(json: any): CasterInfo {
        if (!json) return;
        return new CasterInfo(json.spellSlots, json.currentSlots, json.cantripCount, json.spellCount, json._knownSpells || []);
    }
}