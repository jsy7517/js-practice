export type PathnameType =
  | '/'
  | '/login'
  | '/signup'
  | '/manage'
  | '/charge'
  | '/purchase';

export const { route } = {
  route(pathname: PathnameType) {
    if (window.location.pathname !== pathname) {
      window.history.pushState(pathname, '', pathname);
    }
  },
};
