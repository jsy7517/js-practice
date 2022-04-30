export type Pathname =
  | '/'
  | '/login'
  | '/signup'
  | '/manage'
  | '/charge'
  | '/purchase';

export const { route } = {
  route(pathname: Pathname) {
    if (window.location.pathname !== pathname) {
      window.history.pushState(pathname, window.document.title, pathname);
    }
  },
};
