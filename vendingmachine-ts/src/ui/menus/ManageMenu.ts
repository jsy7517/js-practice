import { unavailableMenuTemplate } from '../../lib/constants/template';
import { $ } from '../../lib/utils/dom';

const ManageMenu = class extends HTMLElement {
  static #template = /* template */ `
    <div>
      <h2>상품 관리 메뉴</h2>
    </div>
  `;

  render(isLoggedIn: boolean) {
    $('manage-menu').insertAdjacentHTML(
      'afterbegin',
      isLoggedIn ? ManageMenu.#template : unavailableMenuTemplate,
    );
  }
};

customElements.define('manage-menu', ManageMenu);
export default ManageMenu;
