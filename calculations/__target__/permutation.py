class Permutation:

    def __init__ (self, array):
        self.array = array
    
    def __mul__ (self, other):
        if isinstance(other, Permutation):
            return Permutation([self.array[other.array[i]-1] for i in range(len(self.array))])
        else:
            return NotImplemented
    
    def __eq__ (self, other):
        return (self.array == other.array)
    
    def inverse(self):
        return Permutation([self.array.index(i+1) +1 for i in range(len(self.array))])
    
    def fixed(self):
        return [i+1 for i in range(len(self.array)) if self.array[i] == i+1]
    
    def stir(self):
        return [i+1 for i in range(len(self.array)) if self.array[i] != i+1]
    
    def disjoint_cycles(self):
        cycles = []
        copy = self.array.copy()
        while copy:
            i = copy[0]
            cycles.append([])
            while i in copy:
                copy.remove(i)
                cycles[-1].append(i)
                i = self.array[i-1]
        return cycles
    
    def sgn(self):
        sign = 1
        cycles = self.disjoint_cycles()
        for c in cycles:
            if len(c) % 2 == 0:
                sign = sign * -1
        return sign
    
    def ad(self, other):
        return other * self * other.inverse()
    
    def __str__(self):
        cycles = self.disjoint_cycles()
        result = ""
        for cycle in cycles:
            if len(cycle) > 1:
                string = "("
                for i in range(len(cycle)):
                    string = string + str(cycle[i])
                    if i + 1 != len(cycle):
                        string = string + "\\, "
                    else:
                        string = string + ")"
                result = result + string


        if result == "":
            result = "e"
        return result
    
    def cycle_type(self):
        cycle_lengths = {}
        for cycle in self.disjoint_cycles():
            n = len(cycle)
            if n not in cycle_lengths:
                cycle_lengths[n] = 0
            cycle_lengths[n] += 1
        return cycle_lengths

class Zn_braid:

    # diag: array, sigma: Permutation, n: int
    def __init__ (self, diag, sigma, n):
        self.n = n
        self.diag = [i % n for i in diag]
        self.sigma = sigma

    def __mul__ (self, other):
        s = self.sigma.array
        new_diag = [self.diag[i]+other.diag[s[i]-1] % self.n for i in range(len(s))]
        return Zn_braid(new_diag, self.sigma*other.sigma, self.n)
    
    def __str__ (self):
        return str(self.diag) + "|" + str(self.sigma)
    
    def __eq__ (self, other):
        return (self.diag == other.diag and self.sigma == other.sigma)