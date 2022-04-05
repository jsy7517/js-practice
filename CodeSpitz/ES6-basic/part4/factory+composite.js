const Operator = class {
	static factory(v) {
		if (v && typeof v === 'object') {
			if (!Array.isArray(v)) v = Object.values(v);
			return new ArrayOp(v.map((v) => Operator.factory(v)));
		} else {
			return typeof v === 'string' ? new StringOp(v) : new PrimaOp(v);
		}
	}

	constructor(v) {
		this.v = v;
	}
	operation(f) {
		throw 'override';
	}
};

const PrimaOp = class extends Operator {
	constructor(v) {
		super(v);
	}

	operation(f) {
		f(this.v);
	}
};

const ArrayOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	operation(f) {
		for (const v of this.v) v.operation(f);
	}
};

const StringOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	operation(f) {
		for (const c of this.v) f(Number(c));
	}
};

Operator.factory([1, 2, 3, { a: 4, b: 5 }, 6, 7, '89']).operation(console.log); // 1, 2, 3, 4, 5, 6, 7
