<template>
  <div ref="canvas" :class="[$options.name]"></div>
</template>

<script>
import * as THREE from 'three/build/three.module'
const fragmentShader = require('./PrimeWaves/PrimeWaves.frag')
const vertexShader = require('./PrimeWaves/PrimeWaves.vert')

export default {
  name: 'Shader',
  data: () => {
    return {
      scene: null,
      camera: null,
      renderer: null,
      uniforms: null,
      context: null,
      material: null,
      geometry: null,
      startTime: null,
    }
  },
  mounted() {
    this.startTime = Date.now()
    console.log('vertexShader: ', vertexShader)
    console.log('fragmentShader: ', fragmentShader)
    this.initShaders()
    this.animate()
  },
  methods: {
    initShaders() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

      // uniforms.resolution.value.x = window.innerWidth;
      // uniforms.resolution.value.y = window.innerHeight;
      this.uniforms = {
        time: { value: 1.0 },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      }

      this.geometry = new THREE.PlaneGeometry(2, 2)
      this.material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        fragmentShader: fragmentShader.default,
        vertexShader: vertexShader.default,
      })

      const mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(mesh)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.canvas.appendChild(this.renderer.domElement)

      this.renderer.render(this.scene, this.camera)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render() {
      const elapsedMilliseconds = Date.now() - this.startTime
      const elapsedSeconds = elapsedMilliseconds / 1000
      this.uniforms.time.value = elapsedSeconds
      this.renderer.render(this.scene, this.camera)
    },
  },
}
</script>

<style src="./Shader.scss" lang="scss" scoped />
