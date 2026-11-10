import { Link } from 'react-router';

export function About() {
  return (
    <article>
      <h1>About</h1>
      <p>
        This page is a second route, so the template ships with working routing.
        Add more in <code>src/router.tsx</code>.
      </p>
      <p>
        <Link to="/">&larr; Back home</Link>
      </p>
    </article>
  );
}
