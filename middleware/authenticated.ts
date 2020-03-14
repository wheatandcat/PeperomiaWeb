import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = context => {
  const { store, redirect } = context

  if (!store.getters.isLoggedIn) {
    return redirect('/login')
  }
}

export default myMiddleware
