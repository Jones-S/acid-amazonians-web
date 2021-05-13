<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
export default {
  head() {
    // Update lang attribute of HTML element (i18n only):
    return {
      title: 'default seo titlte',
    }
  },
}
</script>
