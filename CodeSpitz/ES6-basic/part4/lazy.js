const getOddNumber = function* (data) {
	for (const v of data) {
		console.log('odd', getOddNumber.cnt++);
		// Modular 연산은 양의 정수에만 동작함. absolute 걸어줘야 함.
		if (v % 2) yield v;
	}
};

getOddNumber.cnt = 0;
for (const v of getOddNumber([1, 2, 3, 4])) console.log(v);
/**
 *
 * odd 0
 * 1
 * odd 1
 * odd 2
 * 3
 * odd 3
 */

const take = function* (data, n) {
	for (const v of data) {
		console.log('take', take.cnt++);
		if (n--) yield v;
		else break;
	}
};

take.cnt = 0;
for (const v of take([1, 2, 3, 4], 2)) console.log(v);
/**
 * take 0
 * 1
 * take 1
 * 2
 * take 2
 */

take.cnt = 0;
getOddNumber.cnt = 0;
for (const v of take(getOddNumber([1, 2, 3, 4]), 2)) console.log(v);
