<template>
  <main :class="['Page', 'Page--home', $options.name]">
    <h1 class="Page__title">Acid</h1>
    <Shader />
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  head() {},
}
</script>
