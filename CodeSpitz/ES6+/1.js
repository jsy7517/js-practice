const routineA = (b) => {
	const result = b * 2;
	console.log(result);
	return result;
};

const routineB = (d) => {
	const result = d * 3;
	console.log(result);
	return d;
};

const b = 10;
const d = 30;
const a = routineA(b);
console.log(a);
const c = routineB(d);
console.log(c);

const routineA = (arg) => {
	const result = arg * 2;
	return result;
};

const b = 10;
const c = 20;
const d = 30;
const a = routineA(b) + routineA(c) + routineA(d);

const routineA = (arg) => routineB(arg * 2);
const routineB = (arg) => arg * 3;

const b = 10;
const a = routineA(b);

const r1 = (a) => r2(a * 2);
const r2 = (a) => r3(a * 3);
const r3 = (a) => r4(a * 4);
const r4 = (a) => r5(a * 5);
const r5 = (a) => r6(a * 6);
const r6 = (a) => r7(a * 7);
const b = 10;
const a = r1(b); // 36000

const routine = (a) => a * 2;
const flow1 = () => {
	const b = 10,
		d = 20;
	const a = routine(b);
	const c = routine(d);

	return a + c;
};

const flow2 = () => {
	const b = 30,
		d = 40;
	const a = routine(b);
	const c = routine(d);

	return a + c;
};

flow1();
flow2();

// Key a, b를 제거
const routine = (ref) =>
	['a', 'b'].reduce((p, c) => {
		delete p[c];
		return p;
	}, ref);
const ref = { a: 3, b: 4, c: 5, d: 6 };
const a = routine(ref);
ref === a; // true

// 나머지 키와 결합
const routine = ({ a, b, ...rest }) => rest;
const ref = { a: 3, b: 4, c: 5, d: 6 };
const a = routine(ref);
ref !== a; // true

const routine = (ref) => {
	const local = ref;
	local.e = 7;
	return local;
};

const ref = { a: 3, b: 4, c: 5, d: 6 };
const a = routine(ref);
ref === a; // true

const routine = (ref) => ({ ...ref, e: 7 });
const ref = { a: 3, b: 4, c: 5, d: 6 };
const a = routine(ref);
ref !== a; // true

const A = class {
	constructor(v) {
		this.v = v;
	}
};

const B = class {
	constructor(a) {
		this.v = a.v;
	}
};

const b = new B(new A(3));

const Common = class {
	constructor(v) {
		this.v = v;
	}
};

const A = class {
	constructor(c) {
		this.v = c.v;
	}
};

const B = class {
	constructor(c) {
		this.v = c.v;
	}
};

const a = new A(new Common(3));
const b = new B(new Common(3));

const A = class {
	constructor(member) {
		this.v = member.name;
	}
};
const B = class {
	constructor(member) {
		this.v = member.age;
	}
};

fetch('/member')
	.then((res) => res.json())
	.then((member) => {
		const a = new A(member);
		const b = new B(member);
	});

const A = class {
	process(flag, v) {
		switch (flag) {
			case 1:
				return this.run1(v);
			case 2:
				return this.run2(v);
			case 3:
				return this.run3(v);
		}
	}
};

const B = class {
	constructor(a) {
		this.a = a;
	}

	noop() {
		this.a.process(1);
	}

	echo(data) {
		this.a.process(2, data);
	}
};

const b = new B(new A());
b.noop();
b.echo();

const A = class {
	add(data) {
		data.count++;
	}
};

const B = class {
	constructor(counter) {
		this.counter = counter;
		this.data = { a: 1, count: 0 };
	}

	count() {
		this.counter.add(this.data);
	}
};

const b = new B(new A());
b.count();
b.count();

const A = class {
	add(count) {
		return count + 1;
	}
};

const B = class {
	constructor(counter) {
		this.counter = counter;
		this.data = { a: 1, count: 0 };
	}

	count() {
		this.data.count = this.counter.add(this.data.count);
	}
};

const b = new B(new A());
b.count();
b.count();

const Util = class {
	static isConnect() {}
	static log() {}
	static isLogin() {}
};

const Math = class {
	static sin(r) {}
	static cos(r) {}
	static random(r) {}
	static sqrt(r) {}
};

const App = class {
	init() {
		this.db.init();
		this.net.init();
		this.asset.init();
		this.ui.start();
	}
};

const Account = class {
	login() {
		p = this.ptoken(); // permanent token
		s = this.stoken();
		if (!s) this.newLogin();
		else this.auth(s);
	}
};

const Array = class {
	push(v) {}
	pop(v) {}
	shift() {}
	unshift(v) {}
};

const Account = class {
	ptoken() {
		return this.pk || (this.pk = IO.cookie.get('ptoken'));
	}

	stoken() {
		if (this.sk) return this.sk;
		if (this.pk) {
			const sk = Net.getSessionFromPtoken(this.ptoken);
			sk.then((v) => this.sk);
		}
	}

	auth() {
		if (this.isLogin) return;
		Net.auth(this.sk).then((v) => this.isLogin);
	}
};
