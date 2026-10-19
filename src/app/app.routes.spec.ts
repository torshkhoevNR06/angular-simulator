import { routes } from './app.routes';

describe('application routes', () => {
  it('registers a cart page inside the authenticated layout', () => {
    const layoutRoute = routes.find((route) => route.path === '');
    const cartRoute = layoutRoute?.children?.find((route) => route.path === 'cart');

    expect(cartRoute?.loadComponent).toBeDefined();
  });
});
