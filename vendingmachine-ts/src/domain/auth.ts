import { $ } from '../lib/utils/dom';
import { bindCustomEvent } from '../lib/utils/eventManager';
import Domain from './domain';

export interface LoginProps {
  email: string;
  password: string;
}

export interface SignupProps extends LoginProps {
  userName: string;
  confirmedPassword: string;
}

const Auth = class extends Domain {
  $target = $('#app');

  subscribe(eventType) {
    switch (eventType) {
      case 'LOGIN':
        bindCustomEvent(this.$target, '@login', (e) =>
          this.handleLogin(e.detail),
        );
        break;
      case 'SIGNUP':
        bindCustomEvent(this.$target, '@signup', (e) =>
          this.handleSignup(e.detail),
        );
        break;
      default:
        break;
    }
  }

  handleLogin({ email, password }: LoginProps) {
    console.log(email, password);
  }

  handleSignup({ email, userName, password, confirmedPassword }: SignupProps) {
    console.log(email, userName, password, confirmedPassword);
  }
};

export default Auth;
