<template>
  <main v-if="page" :class="['Page', 'Page--slug', $options.name]">
    <h1 class="Page__title">{{ page.title }}</h1>
  </main>
</template>

<script>
/**
 * * The `_.vue` file will handle requests that do not match a more specific route.
 * https://nuxtjs.org/docs/2.x/features/file-system-routing#unknown-dynamic-nested-routes
 * ! Handling 404 pages is up to the logic of the _.vue page.
 */
import slugPageQuery from '~/graphql/queries/slugPage.gql'

export default {
  name: 'SlugPage',
  async asyncData({ app, route, $graphql, error }) {
    const variables = {
      id: 'show',
    }
    const { page } = await $graphql.default.request(slugPageQuery, variables)
    console.log('page: ', page)
    if (page == null) {
      error({ statusCode: 404, message: 'Page not found.' })
    }
    return { page }
  },
  head() {
    // return this.$craftSEOmatic(this.page?.seomatic)
  },
}
</script>
