import math

class Frac:

    # a numerator, b denominator, integers.
    # the normal form is that a holds the sign and gcd(a,b) = 1
    def __init__ (self, a,b):
        if b == 0:
            raise ZeroDivisionError("Denominator cannot be 0")
        self.numerator = a
        self.denominator = b
        self.reduce()
    
    def as_list(self):
        return [self.numerator, self.denominator]
    
    def reduce(self):
        [x,y] = self.as_list()
        sign = 1 if (x*y > 0) else -1
        x = abs(x)
        y = abs(y)
        g = math.gcd(x,y)
        self.numerator = sign*x//g
        self.denominator = y//g
    
    def __neg__(self):
        [x,y] = self.as_list()
        return Frac(-x,y)
    
    def __invert__(self):
        [x,y] = self.as_list()
        return Frac(y,x)
    
    def __add__ (self, other):
        [x1,y1] = self.as_list()
        [x2,y2] = other.as_list()
        return Frac(x1*y2 + x2*y1, y1*y2)
    
    def __sub__ (self, other):
        return self + -other
    
    def __mul__ (self, other):
        [x1,y1] = self.as_list()
        if isinstance(other, Frac):
            [x2,y2] = other.as_list()
            return Frac(x1*x2, y1*y2)
        elif isinstance(other, int):
            # assume other is an int
            return Frac(x1*other, y1)
        else:
            return NotImplemented
    
    def __rmul__(self, other):
        # Just reuse __mul__ so scalar * Frac works
        return self.__mul__(other)
    
    def _truediv__(self, other):
        return self * ~other
    
    def __pow__(self, n):
        [x,y] = self.as_list()
        if n == 0:
            return Frac(1,1)
        elif n > 0:
            return Frac(x**n, y**n)
        else:
            return Frac(y**(-n), x**(-n))
        
    def is_identity(self):
        [x,y] = self.as_list()
        return (x == 1 and y == 1)
    
    def is_zero(self):
        [x,y] = self.as_list()
        return x == 0
    
    def __eq__ (self, other):
        if isinstance(other, Frac):
            [x1,y1] = self.as_list()
            [x2,y2] = other.as_list()
            return (x1 == x2 and y1 == y2)
        elif isinstance(other, int):
            other_frac = Frac(other, 1)
            return (self == other_frac)
        else:
            return NotImplemented
    
    def __ne__ (self, other):
        return not self == other
    
    def __lt__ (self, other):
        if isinstance(other, Frac):
            [x1,y1] = self.as_list()
            [x2,y2] = other.as_list()
            return (x1*y2 < x2*y1)
        elif isinstance(other, int):
            other_frac = Frac(other, 1)
            return (self < other_frac)
        else:
            return NotImplemented
    
    def __gt__ (self, other):
        if isinstance(other, Frac):
            [x1,y1] = self.as_list()
            [x2,y2] = other.as_list()
            return (x1*y2 > x2*y1)
        elif isinstance(other, int):
            other_frac = Frac(other, 1)
            return (self > other_frac)
        else:
            return NotImplemented
    
    def __le__ (self, other):
        return (not self > other)
    
    def __ge__ (self, other):
        return (not self < other)
    
    def __str__ (self):
        [x,y] = self.as_list()
        return f"{x}/{y}"