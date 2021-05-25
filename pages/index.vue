<template>
  <main :class="['Page', 'Page--home', $options.name]">
    <Shader />
    <DrippyHeading class="Page__title"
      ><h1>ACID<br />AMAZONIANS</h1></DrippyHeading
    >
    <Blob />
  </main>
</template>

<script>
import Blob from '~/components/Blob/Blob.vue'
export default {
  name: 'HomePage',
  components: { Blob },
  head() {},
}
</script>
