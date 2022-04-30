import { BASE_URL, HTTP_METHOD, request } from '../lib/utils/api';
import { $ } from '../lib/utils/dom';
import {
  bindCustomEvent,
  dispatchCustomEvent,
} from '../lib/utils/eventManager';
import Domain from './domain';
import {
  validateLoginResponse,
  validateSignupResponse,
} from '../lib/validation/authValidation';

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

  async handleLogin({ email, password }: LoginProps) {
    const response = await AuthApi.login({
      email,
      password,
    });

    try {
      validateLoginResponse(response);
    } catch (err) {
      alert(err.message);
      return;
    }

    // TODO: Notify
    const { accessToken, user } = response;
    console.log(accessToken, user);
  }

  async handleSignup({
    email,
    userName,
    password,
    confirmedPassword,
  }: SignupProps) {
    // TODO: Validate Signup Props
    // validateSignupFormData()
    const response = await AuthApi.signup({
      email,
      userName,
      password,
    });

    try {
      validateSignupResponse(response);
    } catch (err) {
      alert(err.message);
      return;
    }

    // TODO: Dispatch
    dispatchCustomEvent(this.$target, '@route', { pathname: '/login' });
  }
};

export default Auth;
