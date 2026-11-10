import { Link } from 'react-router';

export function Home() {
  return (
    <article>
      <h1>TypeScript Webpack Template</h1>
      <p>
        React, TypeScript, and webpack, ready to go. Edit{' '}
        <code>src/pages/Home.tsx</code> and save to see your changes.
      </p>
      <p>
        <Link to="/about">Learn what&rsquo;s inside &rarr;</Link>
      </p>
    </article>
  );
}
