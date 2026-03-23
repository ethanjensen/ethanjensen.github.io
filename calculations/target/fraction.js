// Transcrypt'ed from Python, 2026-03-20 09:49:04
var math = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_math__ from './math.js';
__nest__ (math, '', __module_math__);
var __name__ = 'fraction';
export var Frac =  __class__ ('Frac', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, a, b) {
		if (b == 0) {
			var __except0__ = ZeroDivisionError ('Denominator cannot be 0');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self.numerator = a;
		self.denominator = b;
		self.reduce ();
	});},
	get as_list () {return __get__ (this, function (self) {
		return [self.numerator, self.denominator];
	});},
	get reduce () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		var sign = (x * y > 0 ? 1 : -(1));
		var x = abs (x);
		var y = abs (y);
		var g = math.gcd (x, y);
		self.numerator = Math.floor ((sign * x) / g);
		self.denominator = Math.floor (y / g);
	});},
	get __neg__ () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		return Frac (-(x), y);
	});},
	get __invert__ () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		return Frac (y, x);
	});},
	get __add__ () {return __get__ (this, function (self, other) {
		var __left0__ = self.as_list ();
		var x1 = __left0__ [0];
		var y1 = __left0__ [1];
		var __left0__ = other.as_list ();
		var x2 = __left0__ [0];
		var y2 = __left0__ [1];
		return Frac (x1 * y2 + x2 * y1, y1 * y2);
	});},
	get __sub__ () {return __get__ (this, function (self, other) {
		return self + -(other);
	});},
	get __mul__ () {return __get__ (this, function (self, other) {
		var __left0__ = self.as_list ();
		var x1 = __left0__ [0];
		var y1 = __left0__ [1];
		if (isinstance (other, Frac)) {
			var __left0__ = other.as_list ();
			var x2 = __left0__ [0];
			var y2 = __left0__ [1];
			return Frac (x1 * x2, y1 * y2);
		}
		else if (isinstance (other, int)) {
			return Frac (x1 * other, y1);
		}
		else {
			return NotImplemented;
		}
	});},
	get __rmul__ () {return __get__ (this, function (self, other) {
		return self.__mul__ (other);
	});},
	get _truediv__ () {return __get__ (this, function (self, other) {
		return self * ~(other);
	});},
	get __pow__ () {return __get__ (this, function (self, n) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		if (n == 0) {
			return Frac (1, 1);
		}
		else if (n > 0) {
			return Frac (Math.pow (x, n), Math.pow (y, n));
		}
		else {
			return Frac (Math.pow (y, -(n)), Math.pow (x, -(n)));
		}
	});},
	get is_identity () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		return x == 1 && y == 1;
	});},
	get is_zero () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		return x == 0;
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, Frac)) {
			var __left0__ = self.as_list ();
			var x1 = __left0__ [0];
			var y1 = __left0__ [1];
			var __left0__ = other.as_list ();
			var x2 = __left0__ [0];
			var y2 = __left0__ [1];
			return x1 == x2 && y1 == y2;
		}
		else if (isinstance (other, int)) {
			var other_frac = Frac (other, 1);
			return self == other_frac;
		}
		else {
			return NotImplemented;
		}
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		return !(self == other);
	});},
	get __lt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, Frac)) {
			var __left0__ = self.as_list ();
			var x1 = __left0__ [0];
			var y1 = __left0__ [1];
			var __left0__ = other.as_list ();
			var x2 = __left0__ [0];
			var y2 = __left0__ [1];
			return x1 * y2 < x2 * y1;
		}
		else if (isinstance (other, int)) {
			var other_frac = Frac (other, 1);
			return self < other_frac;
		}
		else {
			return NotImplemented;
		}
	});},
	get __gt__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, Frac)) {
			var __left0__ = self.as_list ();
			var x1 = __left0__ [0];
			var y1 = __left0__ [1];
			var __left0__ = other.as_list ();
			var x2 = __left0__ [0];
			var y2 = __left0__ [1];
			return x1 * y2 > x2 * y1;
		}
		else if (isinstance (other, int)) {
			var other_frac = Frac (other, 1);
			return self > other_frac;
		}
		else {
			return NotImplemented;
		}
	});},
	get __le__ () {return __get__ (this, function (self, other) {
		return !(self > other);
	});},
	get __ge__ () {return __get__ (this, function (self, other) {
		return !(self < other);
	});},
	get __str__ () {return __get__ (this, function (self) {
		var __left0__ = self.as_list ();
		var x = __left0__ [0];
		var y = __left0__ [1];
		return '{}/{}'.format (x, y);
	});}
});

//# sourceMappingURL=fraction.map