import { Plugin } from 'vite'
import {transform} from 'esbuild'

export function script():Plugin {
    return {
      name: 'vite-plugin-script',
      async transform(src, id) {
        if (id.endsWith('?script')) {
          const minisrc = await transform(src,{
            minify:true,
            minifyIdentifiers:true,
            minifySyntax:true,
            minifyWhitespace:true
          })
          return "export default `"+await minisrc.code+"`";
        }
      },
    };
  }