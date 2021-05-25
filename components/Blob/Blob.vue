<template>
  <div
    class="Blob"
    data-morph-path="M 189,80.37 C 232.6,46.67 352.5,67.06 350.9,124.1 349.5,173.4 311.7,168 312.4,248.1 312.9,301.1 382.5,319.2 368.5,379.1 349.4,460.6 137.7,467.5 117.6,386.3 98.68,309.7 171.5,292.2 183.6,240.1 195.7,188.2 123.8,130.7 189,80.37 Z"
  >
    <svg
      class="Blob__svg"
      viewBox="0 0 450 450"
      @mouseover="hover"
      @mouseout="hoverOut"
    >
      <clipPath v-uni-id>
        <path
          ref="path"
          class="Blob__clippath"
          d="M 189,80.37 C 243,66.12 307.3,87.28 350.9,124.1 389.3,156.6 417,211.2 418.1,263.4 419.1,305.7 401.8,355.6 368.5,379.1 298.8,428 179.2,446.4 117.6,386.3 65.4,335.3 78.55,230.3 105.5,160.5 119.7,123.6 152.6,89.85 189,80.37 Z"
        />
      </clipPath>
      <g :clip-path="`url(#{v-uni-id})`">
        <rect width="494.5" height="494.5" :fill="fillColor" />
      </g>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import anime from 'animejs/lib/anime.es.js'

// Import the mixin generator
import { createUniqIdsMixin } from 'vue-uniq-ids'

// Create the mixin
const uniqIdsMixin = createUniqIdsMixin(/* options */)

export default {
  name: 'Blob',
  mixins: [uniqIdsMixin],
  props: {
    fillColor: {
      type: String,
      default: '#000',
    },
  },
  data: () => {
    return {
      animation: {
        duration: 1500,
        delay: 0,
        easing: 'easeOutElastic',
        elasticity: 400,
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0,
        rotate: 0,
      },
      paths: {
        start: null,
        end: null,
      },
      isHovered: false,
    }
  },
  mounted() {
    this.paths.start = this.$refs.path.getAttribute('d')
    this.paths.end = this.$el.dataset.morphPath
    console.log('uniqIdsMixin: ', uniqIdsMixin)
    Vue.directive('vue-uni-id', function (value) {
      console.log('value: ', value) // Object {color: 'white', text: 'hello!'}
    })
  },
  methods: {
    animate() {
      anime({
        targets: this.$refs.path,
        d: this.isHovered ? this.paths.end : this.paths.start,
        ...this.animation,
      })
    },
    hover() {
      console.log('animte')
      this.isHovered = true
      this.animate()
    },
    hoverOut() {
      this.isHovered = false
      this.animate()
    },
  },
}
</script>

<style src="./Blob.scss" lang="scss" scoped />
