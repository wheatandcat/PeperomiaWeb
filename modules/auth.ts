import { SetupContext } from '@vue/composition-api'
import dayjs from 'dayjs'

export const getAccessToken = async (context: SetupContext) => {
  const accessToken = await localStorage.getItem('accessToken')

  if (!accessToken) {
    return null
  }

  const expiration = await localStorage.getItem('expiration')

  if (dayjs(new Date(Number(expiration) * 1000)).isAfter(dayjs())) {
    return accessToken
  }

  return await setSession(context, true)
}

export const setSession = async (context: SetupContext, refresh = false) => {
  const user = context.root.$fireAuth.currentUser
  if (!user) {
    return null
  }

  const accessToken = await user.getIdToken(refresh)

  await localStorage.setItem('accessToken', accessToken)

  const expiration = dayjs().add(1, 'hour').unix()

  await localStorage.setItem('expiration', String(expiration))

  return accessToken
}
