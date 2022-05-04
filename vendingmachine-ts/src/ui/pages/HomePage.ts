import { $ } from '../../lib/utils/dom';
import { dispatchCustomEvent } from '../../lib/utils/eventManager';
import { showToast } from '../../lib/utils/toast';
import PageElement from '../common/PageElement';
import ManageMenu from '../menus/ManageMenu';

const HomePage = class extends PageElement {
  manageMenu = new ManageMenu();
  // chargeMenu = new ManageMenu();
  // manageMenu = new ManageMenu();

  static #template = /* template */ `
    <home-page class="d-flex-col">
      <div id="login-btn-wrapper">
        <a href="/login" id="login" class="btn pack">로그인</a>
        <a href="/profile" id="profile" class="hide">프로필</a>
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
      <p></p>
      <manage-menu></manage-menu>
      <charge-menu></charge-menu>
      <purchase-menu></purchase-menu>
    </home-page>
    <div id="toast-container"></div>
  `;

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', HomePage.#template);
    $('home-page').addEventListener('click', (e) => this.handleClickAnchor(e));
  }

  showManageMenu(isLoggedIn: boolean) {
    this.manageMenu.render(isLoggedIn);
  }

  showChargeMenu() {}

  showPurchaseMenu() {}

  handleClickAnchor(e) {
    if (!e.target.classList.contains('btn')) return;
    e.preventDefault();
    dispatchCustomEvent(this.$target, '@route', e.target);
  }

  notify({ data }) {
    const userName = data;
    $('#login').className = 'hide';
    $('#profile').className = 'btn pack';
    showToast({ isError: false, message: `${userName}님 환영합니다!` });
  }
};

customElements.define('home-page', HomePage);
export default HomePage;
