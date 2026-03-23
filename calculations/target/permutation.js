// Transcrypt'ed from Python, 2026-03-20 09:49:04
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'permutation';
export var Permutation =  __class__ ('Permutation', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, array) {
		self.array = array;
	});},
	get __mul__ () {return __get__ (this, function (self, other) {
		if (isinstance (other, Permutation)) {
			return Permutation ((function () {
				var __accu0__ = [];
				for (var i = 0; i < len (self.array); i++) {
					__accu0__.append (self.array [other.array [i] - 1]);
				}
				return __accu0__;
			}) ());
		}
		else {
			return NotImplemented;
		}
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		return self.array == other.array;
	});},
	get inverse () {return __get__ (this, function (self) {
		return Permutation ((function () {
			var __accu0__ = [];
			for (var i = 0; i < len (self.array); i++) {
				__accu0__.append (self.array.index (i + 1) + 1);
			}
			return __accu0__;
		}) ());
	});},
	get fixed () {return __get__ (this, function (self) {
		return (function () {
			var __accu0__ = [];
			for (var i = 0; i < len (self.array); i++) {
				if (self.array [i] == i + 1) {
					__accu0__.append (i + 1);
				}
			}
			return __accu0__;
		}) ();
	});},
	get stir () {return __get__ (this, function (self) {
		return (function () {
			var __accu0__ = [];
			for (var i = 0; i < len (self.array); i++) {
				if (self.array [i] != i + 1) {
					__accu0__.append (i + 1);
				}
			}
			return __accu0__;
		}) ();
	});},
	get disjoint_cycles () {return __get__ (this, function (self) {
		var cycles = [];
		var py_copy = self.array.py_copy ();
		while (py_copy) {
			var i = py_copy [0];
			cycles.append ([]);
			while (__in__ (i, py_copy)) {
				py_copy.remove (i);
				cycles [-(1)].append (i);
				var i = self.array [i - 1];
			}
		}
		return cycles;
	});},
	get sgn () {return __get__ (this, function (self) {
		var sign = 1;
		var cycles = self.disjoint_cycles ();
		for (var c of cycles) {
			if (__mod__ (len (c), 2) == 0) {
				var sign = sign * -(1);
			}
		}
		return sign;
	});},
	get ad () {return __get__ (this, function (self, other) {
		return (other * self) * other.inverse ();
	});},
	get __str__ () {return __get__ (this, function (self) {
		var cycles = self.disjoint_cycles ();
		var result = '';
		for (var cycle of cycles) {
			if (len (cycle) > 1) {
				var string = '(';
				for (var i = 0; i < len (cycle); i++) {
					var string = string + str (cycle [i]);
					if (i + 1 != len (cycle)) {
						var string = string + '\\, ';
					}
					else {
						var string = string + ')';
					}
				}
				var result = result + string;
			}
		}
		if (result == '') {
			var result = 'e';
		}
		return result;
	});},
	get cycle_type () {return __get__ (this, function (self) {
		var cycle_lengths = dict ({});
		for (var cycle of self.disjoint_cycles ()) {
			var n = len (cycle);
			if (!__in__ (n, cycle_lengths)) {
				cycle_lengths [n] = 0;
			}
			cycle_lengths [n]++;
		}
		return cycle_lengths;
	});}
});
export var Zn_braid =  __class__ ('Zn_braid', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, diag, sigma, n) {
		self.n = n;
		self.diag = (function () {
			var __accu0__ = [];
			for (var i of diag) {
				__accu0__.append (__mod__ (i, n));
			}
			return __accu0__;
		}) ();
		self.sigma = sigma;
	});},
	get __mul__ () {return __get__ (this, function (self, other) {
		var s = self.sigma.array;
		var new_diag = (function () {
			var __accu0__ = [];
			for (var i = 0; i < len (s); i++) {
				__accu0__.append (self.diag [i] + __mod__ (other.diag [s [i] - 1], self.n));
			}
			return __accu0__;
		}) ();
		return Zn_braid (new_diag, self.sigma * other.sigma, self.n);
	});},
	get __str__ () {return __get__ (this, function (self) {
		return (str (self.diag) + '|') + str (self.sigma);
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		return self.diag == other.diag && self.sigma == other.sigma;
	});}
});

//# sourceMappingURL=permutation.map