import { StrictMode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import App from './App.tsx'

// Build-time only. vite-prerender-plugin calls this to produce the static HTML
// that ships inside <div id="root">, so crawlers that do not execute JavaScript
// (OAI-SearchBot, PerplexityBot, ClaudeBot, most retrieval bots) still receive
// the full RED T7GER bio, discography and platform links.
export async function prerender() {
  const html = renderToStaticMarkup(
    <StrictMode>
      <App />
    </StrictMode>,
  )

  return { html }
}
