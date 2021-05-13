<template>
  <nav v-if="menu" id="main-navigation" :class="$options.name">
    <ul>
      <li
        v-for="item in menu"
        :key="item._id"
        :class="`${$options.name}__list-item`"
      >
        <NuxtLink :class="`${$options.name}__link`" :to="`/${item._id}`">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import query from './TheMainNavigation.gql'

export default {
  name: 'TheMainNavigation',
  data() {
    return {
      menu: [],
    }
  },
  async fetch() {
    const { allDocument } = await this.$graphql.default.request(query)
    if (!allDocument || !allDocument.length) {
      throw new Error('No Pages found in TheMainNavigation')
    }
    this.menu = allDocument
  },
}
</script>

<style src="./TheMainNavigation.scss" lang="scss" scoped />
