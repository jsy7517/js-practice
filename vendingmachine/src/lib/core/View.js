const View = class {
	on($target, event, eventHandler) {
		$target.addEventListener(event, eventHandler);
		return this;
	}

	emit($target, event, data = {}) {
		const newEvent = new CustomEvent(event, { detail: data });
		$target.dispatchEvent(newEvent);
		return this;
	}
};

export default View;
