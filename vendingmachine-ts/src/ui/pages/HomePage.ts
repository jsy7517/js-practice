import { dispatchCustomEvent } from '../../lib/utils/eventManager';

const HomePage = class {
  $target: HTMLElement;

  static #template = /* template */ `
    <div class="login__btn__wrapper">
      <a id="login" class="btn pack">로그인</a>
    </div>
    <h1 class="title">🍿 자판기 🍿</h1>
    <div class="wspace(30)"></div>
    <nav class="global__nav">
      <a id="manage" class="btn pack">상품 관리</a>
      <div class="hspace(10)"></div>
      <a id="charge" class="btn pack">잔돈 충전</a>
      <div class="hspace(10)"></div>
      <a id="purchase" class="btn pack">상품 구매</a>
    </nav>
  `;

  constructor($target: HTMLElement) {
    this.$target = $target;
    this.$target.addEventListener('click', (e) => this.handleClickAnchor(e));
  }

  handleClickAnchor(e) {
    if (!e.target.classList.contains('btn')) return;
    const {
      target: { id },
    } = e;
    dispatchCustomEvent(this.$target, '@route', id.toUpperCase());
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', HomePage.#template);
  }
};

export default HomePage;
