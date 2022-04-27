import { $ } from './lib/utils/dom';
import { bindCustomEvent } from './lib/utils/eventManager';
import { PathKey, route, ROUTE_PATH } from './lib/utils/router';
import HomePage from './ui/pages/HomePage';

const App = class {
  $target = $('#app');

  homePage;

  constructor() {
    this.homePage = new HomePage(this.$target);
    bindCustomEvent(this.$target, '@route', (e) => this.handleRoute(e.detail));
    this.homePage.render();
  }

  handleRoute(key: PathKey) {
    route(ROUTE_PATH[key], key);
    switch (key) {
      case 'LOGIN':
        this.$target.replaceChildren();
        // this.loginPage.render();
        console.log('login');
        break;
      case 'MANAGE':
        // this.loginPage.render();
        break;
      case 'CHARGE':
        // this.loginPage.render();
        break;
      case 'PURCHASE':
        // this.loginPage.render();
        break;
      default:
        break;
    }
  }
};

export default App;
