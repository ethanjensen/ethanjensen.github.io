import { Permutation } from './permutation.js';

function rowsEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function get_decomposition(q) {
    const n = q.length;
    const blocks = [];
    let rows = [...Array(n).keys()];

    while (rows.length > 0) {
        const i = rows[0];
        const block = rows.filter(j => rowsEqual(q[i], q[j]));
        rows = rows.filter(j => !block.includes(j));
        blocks.push(block);
    }

    return blocks;
}

// helper: build multiset (as plain object) of values in an array
function buildMultiset(arr) {
    const counts = {};
    for (const x of arr) {
        const key = String(x);
        counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
}

// helper: compare two multiset objects {value: count}
function equalMultisets(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
        if (a[k] !== b[k]) return false;
    }
    return true;
}

export function get_secondary_partition(q) {
    const partition = [];
    const blocks = get_decomposition(q);
    const r = blocks.length;

    // multisets_of_entries[i] corresponds to block i
    const multisets_of_entries = [];
    for (let i = 0; i < r; i++) {
        const rowVals = [];
        for (let m = 0; m < r; m++) {
            rowVals.push(q[blocks[i][0]][blocks[m][0]]);
        }
        multisets_of_entries.push(buildMultiset(rowVals));
    }

    for (let i = 0; i < r; i++) {
        let appended = false;
        for (let j = 0; j < partition.length; j++) {
            const repIndex = partition[j][0];
            const sameSize = blocks[i].length === blocks[repIndex].length;
            const sameMultiset = equalMultisets(
                multisets_of_entries[i],
                multisets_of_entries[repIndex]
            );
            if (sameSize && sameMultiset) {
                partition[j].push(i);
                appended = true;
                break;
            }
        }
        if (!appended) {
            partition.push([i]);
        }
    }

    return partition;
}

export function get_stabilizing_autos(curr, search_space, q) {
    const solutions = [];
    const n = q.length;

    if (curr.length === n) {
        solutions.push(curr);
    } else {
        const j = curr.length; // next index
        const block = search_space.find(b => b.includes(j));
        const options = block.filter(i => !curr.includes(i));

        for (const m of options) {
            let valid = true;
            let i = 0;
            while (valid && i < j) {
                if (q[i][j] !== q[curr[i]][m]) {
                    valid = false;
                }
                i += 1;
            }
            if (valid) {
                solutions.push(
                    ...get_stabilizing_autos(curr.concat([m]), search_space, q)
                );
            }
        }
    }

    return solutions;
}

export function get_graded_autos(q) {
    const P = get_decomposition(q);
    const search_space = get_secondary_partition(q);
    const r = P.length;

    const q_compressed = [];
    for (let i = 0; i < r; i++) {
        const row = [];
        for (let j = 0; j < r; j++) {
            row.push(q[P[i][0]][P[j][0]]);
        }
        q_compressed.push(row);
    }

    const stabilizing_autos = get_stabilizing_autos([], search_space, q_compressed);
    return [P, stabilizing_autos];
}

// returns list of block matrices with '*' as entries of blocks
export function get_formatted_graded_autos(q) {
    const autos = [];
    const n = q.length;
    const [blocks, stabilizing_autos] = get_graded_autos(q);

    for (const sigma of stabilizing_autos) {
        const matrix = Array.from({ length: n }, () =>
            Array.from({ length: n }, () => ' ')
        );

        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const new_block = blocks[sigma[i]];
            for (const rowIdx of block) {
                for (const colIdx of new_block) {
                    matrix[rowIdx][colIdx] = '*';
                }
            }
        }

        autos.push(matrix);
    }

    return autos;
}
