import fetch from 'cross-fetch'
import { parseURL } from '@nuxt/ufo'
const consola = require('consola')

export default async function (apiUrl) {
  try {
    consola.info('🚀 Fetching routes to generate from ', apiUrl)
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `#graphql
          query {
            allDocument(where: {_type: { in: ["page", "game"]}}) {
              _id
              _type
              __typename
              ...on Page {
                title
              }
              ...on Game {
                title
              }
            }
          }
        `,
      }),
    })
    const jsonResponse = await response.json()
    console.log('jsonResponse: ', jsonResponse)
    if (jsonResponse.data == null || !jsonResponse.data.allDocument.length) {
      throw new Error(
        "❌ Couldn't get routes from CMS. Is API_URL defined in .env and your GraphQL endpoint working?"
      )
    }
    const fetchedRoutes = jsonResponse.data.allDocument.map(
      (item) => parseURL(item._id).pathname
    )
    consola.success(
      '✅ Successfully fetched routes to generate: ',
      fetchedRoutes
    )
    return fetchedRoutes
  } catch (error) {
    throw new Error(error)
  }
}
