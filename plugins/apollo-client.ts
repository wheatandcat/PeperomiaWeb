import { getIdToken } from '~/modules/auth'

const BASE_URL = process.env.API_HOST

export default function () {
  return {
    httpEndpoint: `${BASE_URL}graphql`,
    getAuth: async () => {
      const token = await getIdToken()
      console.log(token, 'token')

      return `Bearer ${token}`
    },
  }
}
