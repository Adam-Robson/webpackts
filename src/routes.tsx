import { Layout } from '@comps/Layout';
import { About } from '@pages/About';
import { Home } from '@pages/Home';
import { NotFound } from '@pages/NotFound';
import type { RouteObject } from 'react-router';

// Route tree only. The browser router is created in index.tsx, and tests
// mount this same tree with createMemoryRouter.
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
