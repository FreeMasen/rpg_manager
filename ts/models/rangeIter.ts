import { array } from "prop-types";

export class RangeIter {
    private arr: number[];
    constructor(
        public low: number = 0,
        public high: number = 10,
        public step: number = 1,
    ) {
        this.arr = [];
        for (var i = low; i < high; i += step) {
            this.arr.push(i);
        }
    }
    map<U>(cb: (i: number) => U): U[] {
        return this.arr.map(cb)
    }

    reduce<U>(cb: (acc: U, i: number) => U, acc: U): U {
        return this.arr.reduce(cb, acc);
    }
}