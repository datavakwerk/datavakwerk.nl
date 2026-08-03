import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'
import codeTheme from './scripts/code-theme.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      // Syntax highlighting gebeurt tijdens de build (shiki): kleuren staan in
      // de geprerenderde HTML, er gaat geen highlighter-JS naar de browser.
      // Blokken zonder taal (consoleoutput) laat shiki met rust.
      ...mdx({ rehypePlugins: [[rehypeShiki, { theme: codeTheme }]] }),
    },
    react(),
  ],
})
