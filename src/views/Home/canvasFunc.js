import headImg from "@img/headImg.png"
export default {
  data(vm) {
    return {
      logoCanvas:{},
      imageData:{},
      logoImg:{},
      dotList:[],
      Dot:class {
        constructor(centerX,centerY,radius,color) {
          this.color = color;
          this.x = centerX;
          this.y = centerY;
          this.radius = radius;
          this.frameNum = 0;
          this.frameCount = Math.ceil(2000 / (1000 / 60));
          this.sx = parseInt(vm.randomNum(- window.innerWidth + vm.logoImg.width,window.innerWidth));
          this.sy = parseInt(vm.randomNum(- window.innerHeight + vm.logoImg.height,window.innerHeight));
          this.delay = this.frameCount*Math.random();
          this.delayCount = 0;
        }
      },
      rafId:null,
      finishCount:0,
      frameCount:0,
      frameNum:0,
      curX:{},
      curY:{}
    }
  },
  methods: {
    drawLogo() {
      this.imgInit();
    },
    imgInit() {
      this.logoImg = new Image();
      this.logoImg.src = headImg;
      this.logoImg.onload = () => {
        this.getImagePixel();
        this.getDotList();
        // this.renderDot();  //绘制静态的点
        this.renderAniDot();
      }
    },
    getImagePixel() {
      let imgWidth = this.logoImg.width;
      let imgHeight = this.logoImg.height;
      let sx = window.innerWidth / 2 - imgWidth / 2;
      let sy = window.innerHeight / 2 - imgHeight / 2;
      this.logoCanvas.drawImage(this.logoImg,sx,sy);
      this.imageData = this.logoCanvas.getImageData(sx,sy,imgWidth,imgHeight);
    },
    getDotList() {
      for (let x = 0; x < this.imageData.width; x+=6) {
        for (let y = 0; y < this.imageData.height; y+=6) {
          let i = (y * this.imageData.width + x) * 4;
          let dot = new this.Dot(x,y,2,`rgba(${this.imageData.data[i]},${this.imageData.data[i + 1]},${this.imageData.data[i + 2]},${this.imageData.data[i + 3]})`);
          if (this.imageData.data[i + 3] > 128) {
            this.dotList.push(dot);
          }
        }
      }
      console.log(this.dotList);
      
    },
    renderDot() {
      this.logoCanvas.clearRect(0,0,window.innerWidth,window.innerHeight);
      let sx = window.innerWidth / 2 - this.logoImg.width / 2;
      let sy = window.innerHeight / 2 - this.logoImg.height / 2;
      this.dotList.forEach(item => {
        this.logoCanvas.fillStyle = item.color;
        this.logoCanvas.save();
        this.logoCanvas.beginPath();
        this.logoCanvas.arc(sx + item.x,sy + item.y,item.radius,0,2 * Math.PI);
        this.logoCanvas.fill();
        this.logoCanvas.restore();
      })
    },
    renderAniDot() {
      this.logoCanvas.clearRect(0,0,window.innerWidth,window.innerHeight);
      let sx = window.innerWidth / 2 - this.logoImg.width / 2;
      let sy = window.innerHeight / 2 - this.logoImg.height / 2;
      this.dotList.forEach((item,index,arr) => {
        this.frameNum = item.frameNum;
        this.frameCount = item.frameCount;
        this.logoCanvas.fillStyle = item.color;
        if (item.delayCount < item.delay) {
          item.delayCount += 1;
          return;
        }
        this.logoCanvas.save();
        this.logoCanvas.beginPath();
        if (this.frameNum < this.frameCount) {
          this.curX = this.easeInOutCubic(this.frameNum,item.sx,item.x - item.sx,item.frameCount);
          this.curY = this.easeInOutCubic(this.frameNum,item.sy,item.y - item.sy,item.frameCount);
          this.logoCanvas.arc(sx + this.curX,sy + this.curY,item.radius,0,2 * Math.PI);
          item.frameNum += 1;
        } else {
          this.logoCanvas.arc(sx + item.x,sy + item.y,item.radius,0,2 * Math.PI);
          this.finishCount += 1
        }
        this.logoCanvas.fill();
        this.logoCanvas.restore();
        if (this.finishCount >= arr.length) {
          cancelAnimationFrame(this.rafId);
          return
        }
      })
      this.rafId = requestAnimationFrame(this.renderAniDot);
    },
    // Ease-in-out动画函数
    // t:当前时间 b:初始值 c:总位移 d:总时间
    easeInOutCubic(t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
    }
  },
  mounted() {
    this.logoCanvas = this.$refs.logoWrapper.getContext('2d');
    this.drawLogo();
    
  },
  computed: {
    canvasSize() {
      return {
        width:window.innerWidth,
        height:window.innerHeight
      }
    }
  },
}