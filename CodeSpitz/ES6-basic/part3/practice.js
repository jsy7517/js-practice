// 제곱을 요소로 갖는 가상 컬렉션
const N2 = class {
	// 무한 루프를 걸면 앱이 뻗으므로, limit를 걸어주는 습관을 들이자.
	constructor(max) {
		this.max = max;
	}

	[Symbol.iterator]() {
		let cursor = 0,
			max = this.max;
		// Iterator이면서 Iterable한 인터페이스 정의
		return {
			done: false,
			next() {
				if (cursor > max) {
					this.done = true; // 루프 종료
				} else {
					this.value = cursor * cursor;
					cursor++;
				}

				return this;
			}
		};
	}
};

// Generator
const generator = function* (max) {
	let cursor = 0;
	while (cursor < max) {
		yield cursor * cursor;
		cursor++;
	}
};

console.log([...new N2(5)]);

for (const v of new N2(5)) {
	console.log(v);
}
