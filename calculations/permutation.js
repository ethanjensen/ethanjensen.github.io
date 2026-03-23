// permutation.js

export class Permutation {
    constructor(array) {
        // Expecting 1‑based permutation array, e.g. [2,3,1]
        this.array = array.slice();
    }

    // Composition: self * other  (same order as Python version)
    mul(other) {
        const n = this.array.length;
        const result = new Array(n);
        for (let i = 0; i < n; i++) {
            result[i] = this.array[other.array[i] - 1];
        }
        return new Permutation(result);
    }

    equals(other) {
        if (!(other instanceof Permutation)) return false;
        if (other.array.length !== this.array.length) return false;
        return this.array.every((v, i) => v === other.array[i]);
    }

    inverse() {
        const n = this.array.length;
        const inv = new Array(n);
        for (let i = 0; i < n; i++) {
            const image = this.array[i];     // value in 1..n
            inv[image - 1] = i + 1;          // inverse mapping
        }
        return new Permutation(inv);
    }

    fixed() {
        const n = this.array.length;
        const out = [];
        for (let i = 0; i < n; i++) {
            if (this.array[i] === i + 1) out.push(i + 1);
        }
        return out;
    }

    stir() {
        const n = this.array.length;
        const out = [];
        for (let i = 0; i < n; i++) {
            if (this.array[i] !== i + 1) out.push(i + 1);
        }
        return out;
    }

    disjointCycles() {
        const cycles = [];
        const remaining = this.array.slice(); // copy of 1‑based images

        while (remaining.length > 0) {
            let i = remaining[0];
            const cycle = [];

            while (remaining.includes(i)) {
                remaining.splice(remaining.indexOf(i), 1);
                cycle.push(i);
                i = this.array[i - 1];
            }

            cycles.push(cycle);
        }

        return cycles;
    }

    sgn() {
        let sign = 1;
        for (const cycle of this.disjointCycles()) {
            if (cycle.length % 2 === 0) {
                sign *= -1;
            }
        }
        return sign;
    }

    ad(other) {
        // conjugation: other * self * other^{-1}
        return other.mul(this).mul(other.inverse());
    }

    toString() {
        const cycles = this.disjointCycles();
        let out = "";

        for (const cycle of cycles) {
            if (cycle.length > 1) {
                out += "(" + cycle.join(" ") + ")";
            }
        }

        return out === "" ? "e" : out;
    }

    cycleType() {
        const type = {};
        for (const cycle of this.disjointCycles()) {
            const k = cycle.length;
            type[k] = (type[k] || 0) + 1;
        }
        return type;
    }
}