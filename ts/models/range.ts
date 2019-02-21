
export class Range {
    constructor(
        public first: number,
        public second: number = null,
    ) {}

    metaString(): string {
        if (this.second) {
            return `${this.first}/${this.second}`;
        }
        return this.first.toString();
    }
    public static fromJson(json: any): Range {
        if (!json) return null;
        return new Range(
            json.first || 0,
            json.second,
        )
    }
}