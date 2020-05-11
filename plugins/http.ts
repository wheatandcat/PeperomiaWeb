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
    alert('リクエストに失敗しました。メッセージ: ' + error.message)
  })
}

export default httpPlugin
