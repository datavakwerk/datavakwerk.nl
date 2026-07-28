import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
)

// De productiebuild levert geprerenderde HTML; die hydrateren we. In dev is
// #root leeg en renderen we normaal.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
