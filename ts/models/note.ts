export class Note {
    constructor(
        public name: string,
        public shortDesc: string,
        public longDesc: string,
    ) { }

    toString(): string {
        return `${this.name}: ${this.shortDesc}`;
    }
}