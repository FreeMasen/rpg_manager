export class AbilityScores {
    private scores:  AbilityScore[]
    constructor(
        scores?: AbilityScore[]
    ) { 
        if (!scores) {
            this.scores = [
                new AbilityScore(8, AbilityKind.Strength),
                new AbilityScore(8, AbilityKind.Dexterity),
                new AbilityScore(8, AbilityKind.Constitution),
                new AbilityScore(8, AbilityKind.Intelligence),
                new AbilityScore(8, AbilityKind.Wisdom),
                new AbilityScore(8, AbilityKind.Charisma),
            ];
        } else {
            this.scores = scores;
        }
    }

    public static Empty(): AbilityScores {
        return new AbilityScores([
            new AbilityScore(0, AbilityKind.Strength),
            new AbilityScore(0, AbilityKind.Dexterity),
            new AbilityScore(0, AbilityKind.Constitution),
            new AbilityScore(0, AbilityKind.Intelligence),
            new AbilityScore(0, AbilityKind.Wisdom),
            new AbilityScore(0, AbilityKind.Charisma),
        ])
    }

    public map<U>(cb: (score: AbilityScore) => U): U[] {
        return this.scores.map(cb)
    }

    public reduce<U>(cb: (previousValue: U, currentValue: AbilityScore) => U, acc: U): U {
        return this.scores.reduce(cb, acc)
    }

    public modifier(kind: AbilityKind): number {
        return this.scores.find(k => k.kind == kind).modifier;
    }
    public clone(): AbilityScores {
        return AbilityScores.fromJson(this);
    }

    public set(kind: AbilityKind, value: number) {
        let idx = this.scores.findIndex(a => a.kind == kind);
        if (idx < 0) return;
        this.scores[idx].value = value;
    }

    public add(other: AbilityScores): AbilityScores {
        return new AbilityScores([
            new AbilityScore(this.scores[0].value + other.scores[0].value, this.scores[0].kind),
            new AbilityScore(this.scores[1].value + other.scores[1].value, this.scores[1].kind),
            new AbilityScore(this.scores[2].value + other.scores[2].value, this.scores[2].kind),
            new AbilityScore(this.scores[3].value + other.scores[3].value, this.scores[3].kind),
            new AbilityScore(this.scores[4].value + other.scores[4].value, this.scores[4].kind),
            new AbilityScore(this.scores[5].value + other.scores[5].value, this.scores[5].kind),
        ]);
    }

    public static fromJson(json: any): AbilityScores {
        return new AbilityScores(
            json.scores.map(AbilityScore.fromJson),
        )
    }
}

export class AbilityScore {
    constructor(
        public value: number,
        public kind: AbilityKind
    ) { }

    get modifier() {
        return Math.floor((this.value - 10) / 2);
    }
    public static fromJson(json: any): AbilityScore {
        return new AbilityScore(
            json.value,
            json.kind,
        )
    }
}

export enum AbilityKind {
    Strength = 'Strength',
    Dexterity = 'Dexterity',
    Constitution = 'Constitution',
    Intelligence = 'Intelligence',
    Wisdom = 'Wisdom',
    Charisma = 'Charisma',
}