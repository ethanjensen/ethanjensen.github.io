from permutation import Permutation

def get_decomposition(q):
    n = len(q)
    blocks = []
    rows = [i for i in range(n)]
    while rows:
        i = rows[0]
        block = [j for j in rows if q[i] == q[j]]
        rows = [i for i in rows if not i in block]
        blocks.append(block)
    return blocks


def get_secondary_partition(q):
    partition = []
    blocks = get_decomposition(q)
    r = len(blocks)
    multisets_of_entries = [{x: [q[blocks[i][0]][blocks[m][0]] for m in range(r)].count(x) for x in [q[blocks[i][0]][blocks[m][0]] for m in range(r)]} for i in range(r)]
    for i in range(r):
        appended = False
        for j in range(len(partition)):
            if len(blocks[i]) == len(blocks[partition[j][0]]) and multisets_of_entries[i] == multisets_of_entries[partition[j][0]]:
                partition[j].append(i)
                appended = True
        if not appended:
            partition.append([i])
    return partition

def get_stabilizing_autos(curr, search_space, q):
    solutions = []
    if len(curr) == len(q):
        solutions.append(curr)
    else:
        j = len(curr) # next index
        block = [block for block in search_space if j in block][0]
        options = [i for i in block if i not in curr]
        for m in options:
            valid = True
            i = 0
            while valid and i < j:
                valid = (q[i][j] == q[curr[i]][m])
                i = i + 1
            if valid:
                solutions.extend(get_stabilizing_autos(curr + [m], search_space, q))
    return solutions

def get_graded_autos(q):
    P = get_decomposition(q)
    search_space = get_secondary_partition(q)
    r = len(P)
    q_compressed = [[q[P[i][0]][P[j][0]] for j in range(r)] for i in range(r)]
    return P, get_stabilizing_autos([], search_space, q_compressed)

# returns list of block matrices with stars as entries of blocks
def get_formatted_graded_autos(q):
    autos = []
    n = len(q)
    blocks, stabilizing_autos = get_graded_autos(q)
    print(blocks, stabilizing_autos)
    for sigma in stabilizing_autos:
        matrix = [[' ' for j in range(n)] for i in range(n)]
        for i in range(len(blocks)):
            (block, new_block) = (blocks[i], blocks[sigma[i]])
            for j in range(len(block)):
                for m in range(len(new_block)):
                    matrix[block[j]][new_block[m]] = '*'
        autos.append(matrix)
    return autos