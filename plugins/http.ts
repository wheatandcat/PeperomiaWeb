import { Plugin } from '@nuxt/types'
import { NuxtHTTPInstance } from '@nuxt/http'

type Props = {
  $http: NuxtHTTPInstance
}

const httpPlugin: Plugin = ({ $http }: Props) => {
  $http.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $http.onError((error) => {
    if (error.response.status === 500) {
      alert('Request Error!')
    }
  })
}

export default httpPlugin
