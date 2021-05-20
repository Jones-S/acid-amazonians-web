<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <span :class="$options.name">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'DrippyHeading',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style src="./DrippyHeading.scss" lang="scss" scoped />
