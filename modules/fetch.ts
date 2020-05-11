import { SetupContext } from '@vue/composition-api'
import { getAccessToken } from './auth'

const BASE_URL = 'https://peperomia-196da.appspot.com'

export const post = async (context: SetupContext, path: string, param: any) => {
  const token = await getAccessToken(context)

  context.root.$http.setHeader('Content-Type', 'application/json')
  context.root.$http.setHeader('Authorization', `Bearer ${token}`)

  const res = await context.root.$http.post(`${BASE_URL}/${path}`, param)

  return res
}
