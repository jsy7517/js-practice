export const $ = (selector, baseEl = document) => baseEl.querySelector(selector);
export const createRestartButton = () => {
	const restartButton = document.createElement('button');
	restartButton.setAttribute('id', 'game-restart-button');
	restartButton.textContent = '게임 재시작';
	return restartButton;
};
