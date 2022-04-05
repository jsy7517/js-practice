const View = class {
	$target;

	constructor($target) {
		this.$target = $target;
	}

	bindEventHandler(eventType, handler) {
		this.$target.addEventListener(eventType, handler);
	}

	dispatch(eventType, data) {
		const newEvent = new CustomEvent(eventType, { detail: data });
		this.$target.dispatchEvent(newEvent);
	}
};

export default View;
