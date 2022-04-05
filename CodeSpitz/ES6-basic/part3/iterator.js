const loop = (iter, f) => {
	// Iterable이라면 Iterator를 얻음.
	if (typeof iter[Symbol.iterator] === 'function') {
		iter = iter[Symbol.iterator]();
	} else return;

	// IteratorResultObject가 아니라면 건너뜀.
	if (typeof iter.next !== 'function') return;

	do {
		const v = iter.next();
		if (v.done) return; // 루프 종료 처리.
		f(v.value); // 현재 값을 전달함.
	} while (true); // 권한, 책임 없이 무한 반복
};

const iter = {
	arr: [1, 2, 3, 4],
	[Symbol.iterator]() {
		return this;
	},
	next() {
		return {
			done: this.arr.length === 0,
			// value: this.arr.pop(),
			value: this.arr.pop()
		};
	}
};

loop(iter, console.log);

/**
 * 내장 반복 처리기
 */

// Array Destructuring
const iter2 = {
	[Symbol.iterator]() {
		return this;
	},
	arr: [1, 2, 3, 4],
	next() {
		return {
			done: this.arr.length === 0,
			value: this.arr.pop()
		};
	}
};

const [a, ...b] = iter2;
console.log(a, b);

// Spread (펼치기)
const iter3 = {
	[Symbol.iterator]() {
		return this;
	},
	arr: [1, 2, 3, 4],
	next() {
		return {
			done: this.arr.length === 0,
			value: this.arr.pop()
		};
	}
};

const spreadArr = [...iter3];
console.log(spreadArr); // [4, 3, 2, 1]

const test = (...arg) => console.log(arg);
test(...iter4);

for (const v of iter5) {
	console.log(v);
}
