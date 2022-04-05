export const $ = (selector, baseEl = document) => baseEl.querySelector(selector);
export const clearInput = (inputEls) => {
	inputEls.forEach((inputEl) => {
		inputEl.value = '';
	});
};
export const checkClickedTargetById = (e, clickedTargetId) => {
	const {
		target: { id }
	} = e;
	return id === clickedTargetId;
};
export const checkClickedTargetByClassName = (e, clickedTargetClassName) => {
	const {
		target: { className }
	} = e;
	return className === clickedTargetClassName;
};
export const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(0, 2);
