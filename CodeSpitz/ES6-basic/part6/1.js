const infinity = (function* () {
	let i = 0;
	while (true) yield i++;
})();

console.log(infinity.next());
// ...
console.log(infinity.next());

const looper = (n, f, slice = 3) => {
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

looper(10, console.log);

// Generator
const loop = function* (n, f, slice = 3) {
	let i = 0;
	let limit = 0;
	while (i < n) {
		if (limit++ < slice) f(i++);
		else {
			limit = 0;
			yield;
		}
	}
};

const executor = (iter) => {
	const runner = () => {
		if (!iter.next().done) requestAnimationFrame(runner);
	};

	requestAnimationFrame(runner);
};

const executor2 = (iter) => {
	const id = setInterval(() => {
		if (iter.next()) clearInterval(id);
	}, 10);
};

const profile = function* (end, next, r) {
	const userId = yield $.post('member.php', { r }, next);
	let added = yield $.post('detail.php', { userId }, next);
	added = added.split(',');
	end({ userId, nick: added[0], thumb: added[1] });
};

const executor = (end, gene, ...arg) => {
	const next = (v) => iter.next(v);
	const iter = gene(end, next, ...arg);
	iter.next();
};
