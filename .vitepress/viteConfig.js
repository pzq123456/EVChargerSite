import path from 'path'

export const viteConfig = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '..', 'src')
      }
    },
}