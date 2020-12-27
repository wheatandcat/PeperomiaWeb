import { SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'
import firebase from 'firebase'

export const getAccessToken = async (ctx: SetupContext) => {
  const accessToken = await localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }

  const expiration = await localStorage.getItem('expiration')

  if (Number(expiration) > dayjs().unix()) {
    return accessToken
  }

  return await setSession(ctx, true)
}

export const setSession = async (ctx: SetupContext, refresh = false) => {
  const user = ctx.root.$fire.auth.currentUser
  if (!user) {
    return null
  }

  const result = await user.getIdTokenResult(refresh)

  await localStorage.setItem('accessToken', result.token)

  await localStorage.setItem('expiration', String(result.claims.exp))

  return result.token
}

export const initialSession = async () => {
  const expiration = await localStorage.getItem('expiration')

  if (Number(expiration) > dayjs().unix()) {
    return
  }

  try {
    await firebase.auth().onAuthStateChanged(async (user2) => {
      if (user2) {
        const result = await user2.getIdTokenResult(true)

        await localStorage.setItem('accessToken', result.token)
        await localStorage.setItem('expiration', String(result.claims.exp))
      } else {
        throw new Error('Could not get firebase auth user')
      }
    })
  } catch (error) {
    console.error('Not found token')
  }
}

export const getIdToken = async () => {
  const expiration = await localStorage.getItem('expiration')

  if (Number(expiration) > dayjs().unix()) {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      console.error('Not found token')
      return null
    }
    return accessToken
  }

  const user = firebase.auth().currentUser

  if (user) {
    const result = await user.getIdTokenResult(true)

    await localStorage.setItem('accessToken', result.token)
    await localStorage.setItem('expiration', String(result.claims.exp))

    return result.token
  } else {
    console.error('Not found token')
    return null
  }
}
