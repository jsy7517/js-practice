const iter = {
	[Symbol.iterator]() {
		return this;
	},
	data: [1, 2, 3, 4],
	next() {
		return {
			done: this.data.length === 0,
			value: this.data.shift()
		};
	}
};

const complexIter = {
	[Symbol.iterator]() {
		return this;
	},
	data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
	next() {
		// return '???';
		let v;
		while ((v = this.data.shift())) {
			switch (true) {
				case Array.isArray(v):
					this.data.unshift(...v);
					break;
				case v && typeof v === 'object':
					// hasOwnProperty() 필요.
					for (const k in v) this.data.unshift(v[k]);
					break;
				default:
					return { value: v, done: false };
			}
		}
		return { done: true };
	}
};

const test = [...complexIter];
console.log(test);

const complexIter2 = {
	[Symbol.itertor]() {
		return this;
	},
	data: [{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9],
	next() {
		let v;
		while ((v = this.data.shift())) {
			// ES6+ 내장 함수 활용
			if (!(v && v instanceof Object)) return { value: v };
			if (!Array.isArray(v)) v = Object.values(v);
			this.data.unshift(...v);
		}
		return { done: true };
	}
};

// const test2 = [...complexIter2];
// console.log(test2);

const Compx = class {
	constructor(data) {
		this.data = data;
	}

	[Symbol.iterator]() {
		const data = [JSON.parse(JSON.stringify(this.data))];
		return {
			// next: function()의 단축 문법
			next() {
				let v;
				while ((v = data.shift())) {
					if (v && !(v instanceof Object)) return { value: v };
					if (!Array.isArray(v)) v = Object.values(v);
					data.unshift(...v);
				}

				return { done: true };
			}
		};
	}
};

const a = new Compx([{ a: [1, 2, 3, 4], b: '-' }, [5, 6, 7], 8, 9]);
console.log([...a]);

const Compx2 = class {
	constructor(data) {
		this.data = data;
	}
	*gene() {
		const data = [JSON.parse(JSON.stringify(this.data))];
		let v;
		while ((v = data.shift())) {
			if (v && !(v instanceof Object)) yield v;
			else {
				if (!Array.isArray(v)) v = Object.values(v);
				data.unshift(...v);
			}
		}
	}
};
