import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = resolve(import.meta.dirname, '..')
const outputPath = resolve(root, 'dist/index.html')
const marker = '<div id="root"></div>'

// Load the React render entry through Vite so TSX, CSS imports, and project
// aliases are handled exactly as they are in the browser build.
const vite = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
})

try {
  const { prerender } = await vite.ssrLoadModule('/src/prerender.tsx')
  const { html } = await prerender({ url: new URL('/', 'https://redt7ger.com') })
  const document = await readFile(outputPath, 'utf8')

  if (!document.includes(marker)) {
    throw new Error(`Unable to find ${marker} in ${outputPath}`)
  }

  await writeFile(outputPath, document.replace(marker, `<div id="root">${html}</div>`))
  console.log(`Prerendered / into ${outputPath}`)
} finally {
  await vite.close()
}
