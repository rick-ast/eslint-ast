// @ts-check
import { execa } from 'execa'
import fs from 'fs/promises'
import path from 'path'

const root = process.cwd()

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'pipe', ...opts })

async function main() {
  const packages = await fs.readdir(path.resolve(root, 'packages'))

  for (const pkg of packages) {
    const pkgRoot = path.resolve(root, 'packages', pkg)

    const pkgJsonPath = path.resolve(pkgRoot, 'package.json')

    const pkgInfo = JSON.parse(await fs.readFile(pkgJsonPath, 'utf-8'))

    const { private: isPrivate, name, version } = pkgInfo

    if (!isPrivate) {
      try {
        await run('npm', ['publish'], {
          cwd: pkgRoot,
        })
        // eslint-disable-next-line no-console
        console.log(`Successfully published ${name}@${version}`)
      } catch (e) {
        if (e.stderr.match(/package version that is forbidden/)) {
          // eslint-disable-next-line no-console
          console.log(`Skipping already published: ${name}`)
        } else {
          throw e
        }
      }
    }
  }
}

main().catch((err) => {
  throw err
})
