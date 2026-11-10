import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { describe, expect, it } from 'vitest';
import { routes } from '@/routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return router;
}

describe('routes', () => {
  it('renders the home page at /', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', { name: 'TypeScript Webpack Template' })
    ).toBeInTheDocument();
  });

  it('navigates from home to about via the link', async () => {
    const router = renderAt('/');
    fireEvent.click(screen.getByRole('link', { name: /what.s inside/i }));

    expect(
      await screen.findByRole('heading', { name: 'About' })
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/about');
  });

  it('marks the active nav link', () => {
    renderAt('/about');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(nav.querySelector('a[aria-current="page"]')).toHaveTextContent(
      'About'
    );
  });

  it('renders the not-found page for unknown paths', () => {
    renderAt('/does-not-exist');
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
  });
});
