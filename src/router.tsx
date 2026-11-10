import { Layout } from '@comps/Layout';
import { About } from '@pages/About';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';
import { createBrowserRouter, type RouteObject } from 'react-router';

// Exported separately so tests can mount the same tree with createMemoryRouter.
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: '*', Component: NotFound }
    ]
  }
];

export const router = createBrowserRouter(routes);
