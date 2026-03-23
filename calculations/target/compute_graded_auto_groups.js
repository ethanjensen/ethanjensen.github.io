// Transcrypt'ed from Python, 2026-03-20 09:49:04
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, _sort, abs, all, any, assert, bin, bool, bytearray, bytes, callable, chr, delattr, dict, dir, divmod, filter, float, getattr, hasattr, hex, input, int, isinstance, issubclass, len, list, map, max, min, object, oct, ord, pow, print, property, py_TypeError, py_enumerate, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {Frac} from './fraction.js';
import {Permutation} from './permutation.js';
var __name__ = '__main__';
export var get_decomposition = function (q) {
	var n = len (q);
	var blocks = [];
	var rows = (function () {
		var __accu0__ = [];
		for (var i = 0; i < n; i++) {
			__accu0__.append (i);
		}
		return __accu0__;
	}) ();
	while (rows) {
		var i = rows [0];
		var block = (function () {
			var __accu0__ = [];
			for (var j of rows) {
				if (q [i] == q [j]) {
					__accu0__.append (j);
				}
			}
			return __accu0__;
		}) ();
		var rows = (function () {
			var __accu0__ = [];
			for (var i of rows) {
				if (!(__in__ (i, block))) {
					__accu0__.append (i);
				}
			}
			return __accu0__;
		}) ();
		blocks.append (block);
	}
	return blocks;
};
export var get_secondary_partition = function (q) {
	var partition = [];
	var blocks = get_decomposition (q);
	var r = len (blocks);
	var multisets_of_entries = (function () {
		var __accu0__ = [];
		for (var i = 0; i < r; i++) {
			__accu0__.append ((function () {
				var __accu1__ = [];
				for (var x of (function () {
					var __accu2__ = [];
					for (var m = 0; m < r; m++) {
						__accu2__.append (q [blocks [i] [0]] [blocks [m] [0]]);
					}
					return __accu2__;
				}) ()) {
					__accu1__.append ([x, (function () {
						var __accu2__ = [];
						for (var m = 0; m < r; m++) {
							__accu2__.append (q [blocks [i] [0]] [blocks [m] [0]]);
						}
						return __accu2__;
					}) ().count (x)]);
				}
				return dict (__accu1__);
			}) ());
		}
		return __accu0__;
	}) ();
	for (var i = 0; i < r; i++) {
		var appended = false;
		for (var j = 0; j < len (partition); j++) {
			if (len (blocks [i]) == len (blocks [partition [j] [0]]) && multisets_of_entries [i] == multisets_of_entries [partition [j] [0]]) {
				partition [j].append (i);
				var appended = true;
			}
		}
		if (!(appended)) {
			partition.append ([i]);
		}
	}
	return partition;
};
export var get_stabilizing_autos = function (curr, search_space, q) {
	var solutions = [];
	if (len (curr) == len (q)) {
		solutions.append (curr);
	}
	else {
		var j = len (curr);
		var block = (function () {
			var __accu0__ = [];
			for (var block of search_space) {
				if (__in__ (j, block)) {
					__accu0__.append (block);
				}
			}
			return __accu0__;
		}) () [0];
		var options = (function () {
			var __accu0__ = [];
			for (var i of block) {
				if (!__in__ (i, curr)) {
					__accu0__.append (i);
				}
			}
			return __accu0__;
		}) ();
		for (var m of options) {
			var valid = true;
			var i = 0;
			while (valid && i < j) {
				var valid = q [i] [j] == q [curr [i]] [m];
				var i = i + 1;
			}
			if (valid) {
				solutions.extend (get_stabilizing_autos (curr + [m], search_space, q));
			}
		}
	}
	return solutions;
};
export var get_graded_autos = function (q) {
	var P = get_decomposition (q);
	var search_space = get_secondary_partition (q);
	var r = len (P);
	var q_compressed = (function () {
		var __accu0__ = [];
		for (var i = 0; i < r; i++) {
			__accu0__.append ((function () {
				var __accu1__ = [];
				for (var j = 0; j < r; j++) {
					__accu1__.append (q [P [i] [0]] [P [j] [0]]);
				}
				return __accu1__;
			}) ());
		}
		return __accu0__;
	}) ();
	return tuple ([P, get_stabilizing_autos ([], search_space, q_compressed)]);
};
export var get_formatted_graded_autos = function (q) {
	var autos = [];
	var n = len (q);
	var __left0__ = get_graded_autos (q);
	var blocks = __left0__ [0];
	var stabilizing_autos = __left0__ [1];
	print (blocks, stabilizing_autos);
	for (var sigma of stabilizing_autos) {
		var matrix = (function () {
			var __accu0__ = [];
			for (var i = 0; i < n; i++) {
				__accu0__.append ((function () {
					var __accu1__ = [];
					for (var j = 0; j < n; j++) {
						__accu1__.append (' ');
					}
					return __accu1__;
				}) ());
			}
			return __accu0__;
		}) ();
		for (var i = 0; i < len (blocks); i++) {
			var __left0__ = tuple ([blocks [i], blocks [sigma [i]]]);
			var block = __left0__ [0];
			var new_block = __left0__ [1];
			for (var j = 0; j < len (block); j++) {
				for (var m = 0; m < len (new_block); m++) {
					matrix [block [j]] [new_block [m]] = '*';
				}
			}
		}
		autos.append (matrix);
	}
	return autos;
};

//# sourceMappingURL=compute_graded_auto_groups.map