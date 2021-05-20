<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span :class="$options.name" v-html="content" />
</template>

<script>
export default {
  name: 'Template',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style src="./Template.scss" lang="scss" scoped />
