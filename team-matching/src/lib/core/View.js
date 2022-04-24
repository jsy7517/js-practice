const View = class {
	$target;

	constructor($target) {
		this.$target = $target;
	}

	on(event, handler) {
		this.$target.addEventListener(event, handler);
		return this;
	}

	emit(event, data = {}) {
		const newEvent = new CustomEvent(event, { detail: data, bubbles: true });
		this.$target.dispatchEvent(newEvent);
		return this;
	}
};

export default View;
