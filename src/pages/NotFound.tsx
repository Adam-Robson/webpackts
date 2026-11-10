import { Link } from 'react-router';

export function NotFound() {
  return (
    <article>
      <h1>Page not found</h1>
      <p>
        <Link to="/">&larr; Back home</Link>
      </p>
    </article>
  );
}
