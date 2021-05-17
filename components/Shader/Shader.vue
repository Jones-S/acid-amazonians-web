<template>
  <div ref="canvas" :class="[$options.name]">
    Shady

    <!-- <script id="vertexshader" type="x-shader/x-vertex">

      void main() {
      	vv_vertShaderInit();
      }
    </script> -->
    <script id="vertexshader" type="x-shader/x-vertex">
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    </script>

    <script id="fragmentshader" type="x-shader/x-fragment">
      #ifdef GL_ES
      precision highp float;
      #endif

      vec2 distort(vec2 p)
      {
          float theta  = atan(p.y, p.x);
          float radius = length(p);
          radius = pow(radius, 1.0+depth);
          p.x = radius * cos(theta);
          p.y = radius * sin(theta);
          return 0.5 * (p + 1.0);
      }

      vec4 pattern(vec2 p)
      {
        vec2 m=mod(p.xy+p.x+p.y,2.)-1.;
        return vec4(length(m+p*0.1));
      }

      float hash(const float n)
      {
        return fract(sin(n)*29712.15073);
      }

      float noise(const vec3 x, float y, float z)
      {
        vec3 p=floor(x); vec3 f=fract(x);
        f=f*f*(3.0-2.0*f);
        float n=p.x+p.y*y+p.z*z;
        float r1=mix(mix(hash(n+0.0),hash(n+1.0),f.x),mix(hash(n+y),hash(n+y+1.0),f.x),f.y);
          float r2=mix(mix(hash(n+z),hash(n+z+1.0),f.x),mix(hash(n+y+z),hash(n+y+z+1.0),f.x),f.y);
        return mix(r1,r2,f.z);
      }
      void main( void ) {

        float RY = 0.0;	float RZ = 0.0;
        if (rxy <= 1.)			{	RY += 11.;	}
        else if (rxy <= 2.)		{	RY += 13.; 	}
        else if (rxy <= 3.)		{	RY += 17.; 	}
        else if (rxy <= 4.)		{	RY += 19.; 	}
        else if (rxy <= 5.)		{	RY += 23.; 	}
        else if (rxy <= 6.)		{	RY += 29.; 	}
        else if (rxy <= 8.)		{	RY += 31.; 	}
        else if (rxy <= 9.)		{	RY += 37.; 	}
        else if (rxy <= 10.)	{	RY += 41.; 	}
        else if (rxy <= 11.)	{	RY += 43.; 	}
        else if (rxy <= 12.)	{	RY += 47.; 	}
        else if (rxy <= 13.)	{	RY += 53.; 	}
        else if (rxy <= 14.)	{	RY += 59.; 	}
        else if (rxy <= 15.)	{	RY += 61.; 	}
        else if (rxy <= 16.)	{	RY += 67.; 	}
        if (rxz <= 1.)			{	RZ += 11.; 	}
        else if (rxz <= 2.)		{	RZ += 13.; 	}
        else if (rxz <= 3.)		{	RZ += 17.; 	}
        else if (rxz <= 4.)		{	RZ += 19.; 	}
        else if (rxz <= 5.)		{	RZ += 23.; 	}
        else if (rxz <= 6.)		{	RZ += 29.; 	}
        else if (rxz <= 8.)		{	RZ += 31.; 	}
        else if (rxz <= 9.)		{	RZ += 37.; 	}
        else if (rxz <= 10.)	{	RZ += 41.; 	}
        else if (rxz <= 11.)	{	RZ += 43.; 	}
        else if (rxz <= 12.)	{	RZ += 47.; 	}
        else if (rxz <= 13.)	{	RZ += 53.; 	}
        else if (rxz <= 14.)	{	RZ += 59.; 	}
        else if (rxz <= 15.)	{	RZ += 61.; 	}
        else if (rxz <= 16.)	{	RZ += 67.; 	}

        vec2 pos = ( gl_FragCoord.xy / RENDERSIZE.xy * zoom )+center;
        float col = noise(pos.xyx + (TIME*rate),RY,RZ);
        vec4 c = pattern(distort(pos+col));
          c.xy = distort(c.xy);
        gl_FragColor = vec4(c.x - col, sin(c.y) - col, cos(c.z), 1.0);

      }
    </script>
  </div>
</template>

<script>
import * as THREE from 'three/build/three.module'
// const fragmentShader = require('./PrimeWaves/PrimeWaves.frag')
// const vertexShader = require('./PrimeWaves/PrimeWaves.vert')

export default {
  name: 'Shader',
  data: () => {
    return {
      scene: null,
      camera: null,
      renderer: null,
      context: null,
      material: null,
      geometry: null,
    }
  },
  mounted() {
    this.initShaders()
    console.log(
      'document.getElementById).textContent: ',
      document.getElementById('vertexshader').textContent
    )
  },
  methods: {
    initShaders() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const uniforms = {
        time: { value: 1.0 },
      }
      // this.camera.position.z = 5

      this.geometry = new THREE.PlaneGeometry(2, 2)
      this.material = new THREE.ShaderMaterial({
        uniforms,
        // fragmentShader,
        // vertexShader,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
      })

      const mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(mesh)

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.$refs.canvas.appendChild(this.renderer.domElement)

      this.renderer.render(this.scene, this.camera)
    },
  },
}
</script>

<style src="./Shader.scss" lang="scss" scoped />
