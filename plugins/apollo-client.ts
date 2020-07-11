const BASE_URL = process.env.API_HOST

export default function () {
  return {
    httpEndpoint: `${BASE_URL}graphql`,
  }
}
