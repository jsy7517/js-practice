import { $ } from '../../lib/utils/dom';
import { dispatchCustomEvent } from '../../lib/utils/eventManager';
import PageElement from '../common/PageElement';

const HomePage = class extends PageElement {
  static #template = /* template */ `
    <home-page class="d-flex-col">
      <div id="login-btn-wrapper">
        <a href="/login" id="login" class="btn pack">로그인</a>
      </div>
      <h1 class="title">🍿 자판기 🍿</h1>
      <div class="wspace(30)"></div>
      <nav class="global__nav">
        <a href="/manage" class="btn pack">상품 관리</a>
        <div class="hspace(10)"></div>
        <a href="/charge" class="btn pack">잔돈 충전</a>
        <div class="hspace(10)"></div>
        <a href="/purchase" class="btn pack">상품 구매</a>
      </nav>
      <manage-tab></manage-tab>
      <charge-tab></charge-tab>
      <purchase-tab></purchase-tab>
    </home-page>
  `;

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', HomePage.#template);
    $('home-page').addEventListener('click', (e) => this.handleClickAnchor(e));
  }

  handleClickAnchor(e) {
    if (!e.target.classList.contains('btn')) return;
    e.preventDefault();
    dispatchCustomEvent(this.$target, '@route', e.target.pathname);
  }
};

customElements.define('home-page', HomePage);
// customElements.define('manage-tab', HomePage);
// customElements.define('purchase-tab', HomePage);
// customElements.define('charge-tab', HomePage);
export default HomePage;
