// Ambient declarations for non-TS imports handled by webpack.

// CSS Modules: `import styles from './Button.module.css'`
declare module '*.module.css' {
  const classes: { readonly [className: string]: string };
  export default classes;
}

// Global stylesheets: `import './index.css'` (side-effect only)
declare module '*.css';

// Asset modules resolve to a URL string
declare module '*.svg' {
  const url: string;
  export default url;
}
declare module '*.png' {
  const url: string;
  export default url;
}
declare module '*.jpg' {
  const url: string;
  export default url;
}
declare module '*.webp' {
  const url: string;
  export default url;
}
declare module '*.woff2' {
  const url: string;
  export default url;
}

// Client-visible env vars. Only PUBLIC_* keys are inlined by webpack's DefinePlugin.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly PUBLIC_APP_NAME?: string;
  }
}
