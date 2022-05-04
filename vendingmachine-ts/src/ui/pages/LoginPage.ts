import { $ } from '../../lib/utils/dom';
import { dispatchCustomEvent } from '../../lib/utils/eventManager';
import PageElement from '../common/PageElement';

const LoginPage = class extends PageElement {
  static #template = /* template */ `
    <login-page class="d-flex-col">
      <h2 class="title">로그인</h2>
      <div class="wspace(50)"></div>
      <div id="form-container">
        <form id="login-form" class="form d-flex-col">
          <label class="form__label" for="email">이메일</label>
          <div class="wspace(5)"></div>
          <input class="form__input form__input--email" type="email" name="email" placeholder="example@gmail.com" required/>
          <div class="wspace(10)"></div>
          <label class="form__label" for="password">비밀번호</label>
          <div class="wspace(5)"></div>
          <input class="form__input" type="password" name="password" placeholder="비밀번호를 입력해 주세요." required/>
          <div class="wspace(20)"></div>
          <button type="submit" class="form__button__submit">로그인</button>
        </form>
        <div class="wspace(10)"></div>
        <p>아직 회원이 아니신가요? <a href="/signup" id="signup">회원가입</a></p>
      </div>
    </login-page>
    <div id="toast-container"></div>
  `;

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', LoginPage.#template);
    $('#login-form').addEventListener('submit', (e) =>
      this.handleSubmitLoginForm(e),
    );
    $('#signup').addEventListener('click', (e) => this.handleClickSignUpBtn(e));
    $('.form__input--email').focus();
  }

  handleSubmitLoginForm(e) {
    e.preventDefault();
    const [$emailInput, $passwordInput]: HTMLInputElement[] = e.target;
    const [email, password] = [$emailInput.value, $passwordInput.value];
    dispatchCustomEvent(this.$target, '@login', {
      email,
      password,
    });
  }

  handleClickSignUpBtn(e) {
    e.preventDefault();
    dispatchCustomEvent(this.$target, '@route', e.target);
  }
};

customElements.define('login-page', LoginPage);
export default LoginPage;
