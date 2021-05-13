<template>
  <main v-if="page" :class="['Page', 'Page--home', $options.name]">
    <h1 class="Page__title">{{ page.title }}</h1>
  </main>
</template>

<script>
import homePageQuery from '~/graphql/queries/homePage.gql'

export default {
  name: 'HomePage',
  async asyncData({ app, $graphql, error }) {
    const variables = {
      id: 'show',
    }
    const { page } = await $graphql.default.request(homePageQuery, variables)
    if (page == null) {
      error({ statusCode: 404, message: app.i18n.t('error.message404') })
    }
    return { page }
  },
  head() {
    return this.$craftSEOmatic(this.page?.seomatic)
  },
}
</script>
