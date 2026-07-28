import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Gebruikt door scripts/prerender.mjs om elke route naar statische HTML te
// renderen. De routegegevens gaan mee zodat het script maar één bundel hoeft
// te laden.
export function render(path) {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  )
}

export * from './routes.js'
