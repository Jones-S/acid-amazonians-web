<template>
  <main :class="['Page', 'Page--home', $options.name]">
    <Shader />
    <h1 class="Page__title">Acid</h1>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  head() {},
}
</script>
