import PageElement from '../common/PageElement';

const SignUpPage = class extends PageElement {
  static #template = /* template */ `
    <signup-page class="d-flex-col">
      <h2 class="title">회원가입</h2>
      <div class="wspace(50)"></div>
      <div id="form-container">
        <form id="signup-form" class="form d-flex-col">
          <label class="form__label" for="email">이메일</label>
          <div class="wspace(5)"></div>
          <input class="form__input" type="email" name="email" placeholder="example@gmail.com" required/>
          <div class="wspace(10)"></div>
          <label class="form__label" for="email">이름</label>
          <div class="wspace(5)"></div>
          <input class="form__input" type="text" name="userName" placeholder="이름을 입력해 주세요." required/>
          <div class="wspace(10)"></div>
          <label class="form__label" for="password">비밀번호</label>
          <div class="wspace(5)"></div>
          <input class="form__input" type="password" name="password" placeholder="비밀번호는 문자와 숫자를 포함하여 8자 이상 16자 이하여야 합니다." required/>
          <div class="wspace(10)"></div>
          <label class="form__label" for="password">비밀번호 확인</label>
          <div class="wspace(5)"></div>
          <input class="form__input" type="password" name="password" placeholder="비밀번호를 한번 더 입력해 주세요." required/>
          <div class="wspace(20)"></div>
          <button type="submit" class="form__button__submit">가입하기</button>
        </form>
      </div>
    </signup-page>
  `;

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', SignUpPage.#template);
  }
};

customElements.define('signup-page', SignUpPage);
export default SignUpPage;
