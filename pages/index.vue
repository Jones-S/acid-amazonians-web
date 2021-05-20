<template>
  <main :class="['Page', 'Page--home', $options.name]">
    <Shader />
    <DrippyHeading class="Page__title"
      ><h1>ACID<br />AMAZONIANS</h1></DrippyHeading
    >
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  head() {},
}
</script>
