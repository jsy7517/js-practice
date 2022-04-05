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
	*gene() {
		throw 'override';
	}
};

const PrimaOp = class extends Operator {
	constructor(v) {
		super(v);
	}

	*gene() {
		yield this.v;
	}
};

const ArrayOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	*gene() {
		for (const v of this.v) yield* v.gene();
	}
};

const StringOp = class extends Operator {
	constructor(v) {
		super(v);
	}
	*gene() {
		for (const v of this.v) yield* v.gene();
	}
};

const complexArr = [1, 2, 3, { a: 4, b: 5 }, 6, 7];
for (const v of Operator.factory(complexArr).gene()) console.log(v); // 1, 2, 3, 4, 5, 6, 7
