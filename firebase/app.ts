import firebase from 'firebase'

import env from '~/config/index'

const config = {
  ...env.FIREBASE,
}

const googleProvider = new firebase.auth.GoogleAuthProvider()

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

export { googleProvider }
