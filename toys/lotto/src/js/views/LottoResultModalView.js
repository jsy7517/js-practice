import View from '../lib/core/View.js';

const LottoResultModalView = class extends View {
	constructor($target) {
		super($target);
		this.bindEventHandler('click', (e) => this.onClickCloseModalBtn(e));
	}

	openModal() {
		this.$target.classList.add('open');
	}

	onClickCloseModalBtn({ target }) {
		if (target.closest('#modal-close-btn') || !target.closest('.modal-inner')) {
			this.$target.classList.remove('open');
		}
	}
};

export default LottoResultModalView;
