import { BASE_URL, HTTP_METHOD, request } from '../lib/utils/api';
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

const AuthApi = {
  async login(data) {
    return request(`${BASE_URL}/login`, HTTP_METHOD.POST(data));
  },

  async signup(data) {
    return request(`${BASE_URL}/signup`, HTTP_METHOD.POST(data));
  },
};

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
    AuthApi.login({
      email,
      password,
    });
  }

  handleSignup(data: SignupProps) {
    // TODO: Validate Signup Props
    const { email, userName, password, confirmedPassword } = data;
    AuthApi.signup({
      email,
      userName,
      password,
    });
  }
};

export default Auth;
