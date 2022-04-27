import { getLocalStorage, setLocalStorage } from './lib/store/localStorage';
import { $ } from './lib/utils/dom';
import { bindCustomEvent } from './lib/utils/eventManager';
import { PathKey, route, ROUTE_PATH } from './lib/utils/router';
import HomePage from './ui/pages/HomePage';
import LoginPage from './ui/pages/LoginPage';
import SignUpPage from './ui/pages/SignUpPage';

const App = class {
  $target = $('#app');

  homePage;

  loginPage;

  signUpPage;

  constructor() {
    this.homePage = new HomePage();
    this.loginPage = new LoginPage();
    this.signUpPage = new SignUpPage();

    bindCustomEvent(this.$target, '@route', (e) => this.handleRoute(e.detail));
    window.addEventListener('popstate', (e) => this.handlePopState(e));

    this.loadLatestPage();
  }

  loadLatestPage() {
    const latestPage = getLocalStorage('latestPage') ?? null;
    this.renderPageByPathname(latestPage);
  }

  handleRoute(key: PathKey) {
    route(ROUTE_PATH[key], key);
    this.renderPageByPathname(ROUTE_PATH[key]);
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
        this.signUpPage.render();
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
