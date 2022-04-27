export const ROUTE_PATH = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  MANAGE: '/manage',
  CHARGE: '/charge',
  PURCHASE: '/purchase',
};

export type PathKey = 'LOGIN' | 'SIGNUP' | 'MANAGE' | 'CHARGE' | 'PURCHASE';

export const { route } = {
  route(data, key: PathKey) {
    if (window.location.pathname !== ROUTE_PATH[key]) {
      window.history.pushState(data, '', ROUTE_PATH[key]);
    }
  },
};
