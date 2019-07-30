<template>
  <div class="home">
    <div class="logo-wrapper" ref="canvasWrapper">
      <canvas ref="logoWrapper" :width="canvasSize.width" :height="canvasSize.height"></canvas>
    </div>
    <div class="enter-button" @click="goRouter">Enter</div>
  </div>
</template>
<script>
import canvasFunc from "./canvasFunc"
export default {
  mixins:[canvasFunc],
  data() {
    return {
      
    }
  },
  methods: {
    goRouter() {
      this.$router.push('/surprise')
    }
  },
  mounted() {
    
  },
  computed:{
    
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .logo-wrapper {
    width: 100%;
    height: 100%;
    canvas {
      margin: 0 auto;
    }
  }
  .enter-button {
    position: absolute;
    border: 2px solid #333;
    color: #333;
    bottom: 10%;
    padding: 10px 60px;
    letter-spacing: .2rem;
    left: 50%;
    transform: translate(-50%);
    cursor: pointer;
    transition: .5s all;
    &:hover {
      color: #fff;
      background-color: #333;
    }
  }
}
</style>