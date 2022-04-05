/**
 * Flow
 */
for (const i of (function* () {
	let i = 0;
	while (true) yield i++;
})())
	console.log(i);

/**
 * Time Slicing
 */
const looper = (n, f) => {
	for (let i = 0; i < n; i++) f(i);
};
looper(10, console.log);
looper(100000, console.log);

/**
 * n이 아무리 커도, 먼저 slice만큼만 루프를 순회한다.
 * 나머지는 미래에 맡긴다.
 */
const slicedLooper = (n, f, slice = 3) => {
	let limit = 0;
	let i = 0;

	const runner = () => {
		while (i < n) {
			if (limit++ < slice) f(i++);
			else {
				limit = 0;
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
};

/**
 * Auto Time Slicing
 */
const autoSlicedLooper = (n, f, ms = 5000, i = 0) => {
	let old = performance.now();
	let curr;
	const runner = (curr) => {
		while (i < n) {
			if (curr - old < ms) f(i++);
			else {
				old = performance.now();
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
};

const double = (v) => v * 2;
console.log(double(2));

const double = (v, f) => f(v * 2);
double(2, console.log);

const sum = (n) => {
	let sum = 0;
	for (let i = 1; i <= n; i++) sum += i;

	return sum;
};
sum(100);

const sum = (n) => {
	const result = { isComplete: false };
	requestAnimationFrame(() => {
		let sum = 0;
		for (let i = 1; i <= n; i++) sum += i;
		result.isComplete = true;
		result.value = sum;
	});

	return result;
};

/**
 * 계산이 완료되기 전에는 isComplete가 계속 false임.
 * 비동기로 계속 조사해야 함.
 */
const result = sum(100);

const id = setInterval(() => {
	if (!result.isComplete) {
		clearInterval(id);
		console.log(result.value);
	}
}, 10);

const sum = (n, f) => {
	let sum = 0;
	for (let i = 1; i <= n; i++) sum += i;
	return f(sum);
};

sum(10, console.log);
console.log(123);

const sum = (n, f) => {
	requestAnimationFrame(() => {
		let sum = 0;
		for (let i = 1; i <= n; i++) sum += i;
		f(sum);
	});
};

sum(10, console.log);
console.log(123);

const sum = (n, f) => {
	requestAnimationFrame(() => {
		let sum = 0;
		for (let i = 1; i <= n; i++) sum += i;
		f(sum);
	});
};
sum(1000000, console.log);
console.log(123);

const backRun = (f, end, ...arg) => {
	const blob = new Blob(
		[
			`
    onmessage = (e) => postMessage((${f}) (e.data));
  `
		],
		{ type: 'text/javascript' }
	);

	const url = URL.createObjectURL(blob);
	const worker = new Worker(url);
	worker.onmessage = (e) => end(e.data);
	worker.onerror = (e) => end(null);
	worker.postMessage(arg);
};

const f = (v) => {
	for (let i = 1, sum = 0; i <= v[0]; i++) {
		sum += i;
	}
	return sum;
};
let i = 1000;
while (i--) backRun(f, console.log, 100000);
