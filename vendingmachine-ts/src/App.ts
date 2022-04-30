import Auth from './domain/auth';
import { getLocalStorage, setLocalStorage } from './lib/store/localStorage';
import { $ } from './lib/utils/dom';
import { bindCustomEvent } from './lib/utils/eventManager';
import { Pathname, route } from './lib/utils/router';
import HomePage from './ui/pages/HomePage';
import LoginPage from './ui/pages/LoginPage';
import SignupPage from './ui/pages/SignupPage';

const App = class {
  $target = $('#app');

  homePage;

  loginPage;

  signupPage;

  authDomain;

  constructor() {
    this.homePage = new HomePage();
    this.loginPage = new LoginPage();
    this.signupPage = new SignupPage();
    this.authDomain = new Auth();

    bindCustomEvent(this.$target, '@route', (e) => this.handleRoute(e.detail));
    window.addEventListener('popstate', (e) => this.handlePopState(e));

    this.loadLatestPage();
    this.bindObservers();
  }

  loadLatestPage() {
    const latestPage: string = getLocalStorage('latestPage') ?? null;
    if (window.location.pathname !== latestPage) {
      this.renderPageByPathname('/');
      return;
    }

    this.renderPageByPathname(latestPage);
  }

  bindObservers() {
    this.signupPage.bindObserver(this.authDomain, 'SIGNUP');
  }

  handleRoute(pathname: Pathname) {
    route(pathname);
    this.renderPageByPathname(pathname);
  }

  handlePopState({ state }) {
    this.renderPageByPathname(state);
  }

  renderPageByPathname(pathname) {
    switch (pathname) {
      case '/login':
        this.loginPage.render();
        break;
      case '/signup':
        this.signupPage.render();
        break;
      case '/manage':
        this.homePage.render();
        break;
      case '/charge':
        this.homePage.render();
        break;
      case '/purchase':
        this.homePage.render();
        break;
      default:
        this.homePage.render();
        break;
    }
    setLocalStorage('latestPage', pathname);
  }
};

export default new App();
