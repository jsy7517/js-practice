import { api } from './utils/api.js';
import { $ } from './utils/dom.js';

const ImageInfo = class {
	$imageInfo = null;
	data = null;

	constructor({ $target, data }) {
		const $imageInfo = document.createElement('div');
		$imageInfo.className = 'ImageInfo';
		this.$imageInfo = $imageInfo;
		$target.appendChild($imageInfo);

		this.data = data;

		this.render();
	}

	setState(nextData) {
		this.data = nextData;
		this.render();
	}

	async render() {
		if (this.data.visible) {
			const { id, name, url } = this.data.image;
			const {
				data: { temperament, origin }
			} = await api.fetchCatDetail(id);

			this.$imageInfo.innerHTML = `
        <article class="content-wrapper">
          <h1 class="title">
            <span>${name}</span>
            <div class="close">&nbsp;</div>
          </h1>
          <img src="${url}" alt="${name}"/>        
          <section class="description">
            <p>성격 : ${temperament}</p>
            <p>태생 : ${origin}</p>
          </section>
        </article>`;
			this.$imageInfo.style.display = 'block';
			this.bindEvent();
		} else {
			this.$imageInfo.style.display = 'none';
		}
	}

	bindEvent() {
		const $closeBtn = $('.close');
		$closeBtn.addEventListener('click', (e) => {
			this.handleModalClose(e);
		});
		this.$imageInfo.addEventListener('click', (e) => {
			this.handleModalClose(e);
		});
		window.addEventListener('keyup', (e) => {
			this.handleModalClose(e);
		});
	}

	handleModalClose(e) {
		if (e.target.className === 'close') {
			this.closeModal();
			return;
		}

		if (e.key === 'Escape') {
			this.closeModal();
			return;
		}

		if (!e.target.closest('.content-wrapper')) {
			this.closeModal();
		}
	}

	closeModal() {
		if (this.data.visible) {
			this.data.visible = !this.data.visible;
			this.setState(this.data);
		}
	}
};

export default ImageInfo;
