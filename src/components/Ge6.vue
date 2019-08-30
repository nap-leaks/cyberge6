<template>
  <div ref="wrapper" class="inner-wrapper hide">
    <canvas
      :style="`top: ${height - (height / movingStep) * 100 + Math.round(position.top)}px; left: ${Math.round(obj.left + position.left)}px`"
      ref="canvas"
      class="splash"
    ></canvas>
    <img
      :style="`top: ${height - (height / movingStep) * 100 + Math.round(position.top)}px; left: ${Math.round(obj.left + position.left)}px; transform: rotate(${position.angle}deg)`"
      ref="cyberge6"
      class="cyberge6"
      src="@/assets/ge6.png"
      alt="КиберGe6"
    />
  </div>
</template>
<script>
import particle from "@/fragments/Particle.js";
import { setInterval, setTimeout } from 'timers';

export default {
  name: "Ge6",
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      particlesLength: 5,
      particles: [],
      context: null,
      cyberge6es: [],
      armed: false,
      dead: false,
      active: false,
      movingStep: 0
    };
  },
  props: {
    underFire: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default() {
        return {
          top: 0,
          left: 0
        };
      }
    },
    position: {
      type: Object,
      default() {
        return {
          top: 0,
          left: 0,
          angle: 0
        };
      }
    }
  },
  watch: {
    'position.top'(val){
      this.checkIsInCrosshair();
    },
    'position.left'(val){
      this.checkIsInCrosshair();
    },
    armed(val){
      if(this.dead)
        return;

      if(this.underFire){
        this.die();
      }
      else if(!this.active) {
        this.active = true;
        this.activate();
      }
    }
  },
  methods: {
    show(){
      //expand from 0
    },
    randomTalk(){
      var talksLength = Object.keys(this.$root.talks).length - 3; 
      var randomIndex = ~~(Math.random() * talksLength);
      // this.$root.sound.talks.stop();
      this.$root.sound.talks.play(randomIndex + '');
    },
    activate(){
      //
      this.activate = false;
    },
    die(){
      this.dead = true;
      this.onEnd(false);
      this.randomTalk();
    },
    survive(){
      this.onEnd(true);
      this.$root.sound.survived.stop();
      this.$root.sound.survived.play();
    },
    onEnd(state){
      var _self = this;
      if(_self.$refs.wrapper)
        _self.$refs.wrapper.classList.add('hide');
        
      setTimeout(()=>{
        _self.$emit('end', {
          survived: state,
          id: _self.obj.id
        })
      }, 400);
    },
    step(){
      this.movingStep++;
      if(this.movingStep >= window.innerHeight){
        this.survive();
      }
      else{
        if(this.underFire)
          this.checkIsInCrosshair();
        setTimeout(this.step, 10);
      }
    },
    checkIsInCrosshair(){
      var left = Math.round(this.obj.left + this.position.left);
      var top = this.height - (this.height / this.movingStep) * 100 + Math.round(this.position.top);
      var leftCenter = this.width / 2;
      var topCenter = this.height / 2;
      this.armed = leftCenter + 50 > left && leftCenter -50 < left && topCenter + 50 > top && topCenter -50 < top;
    },
    setupParticles() {
      var _self = this;
      function addParticles() {
        for (var i = 0; i < _self.particlesLength; i++) {
          _self.particles.push(
            particle.create(
              window.innerWidth / 2,
              window.innerHeight / 2,
              Math.random() * 10 + 1,
              Math.random() * Math.PI * 2
            )
          );
        }
      }
      setInterval(() => {
        addParticles();
      }, 1500);
      addParticles();
    },
    updateParticles() {
      var _self = this;
      _self.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (var i = 0; i < _self.particles.length; i++) {
        _self.particles[i].update();
        while (_self.particles.length && _self.particles[i].opacity <= 0) {
          _self.particles.splice(i, 1);
          if (_self.particles[i]) _self.particles[i].update();
        }
        if (!_self.particles.length) break;

        _self.context.beginPath();
        _self.context.arc(
          _self.particles[i].position.getX(),
          _self.particles[i].position.getY(),
          3,
          0,
          2 * Math.PI,
          false
        );
        _self.context.fillStyle = `rgba(255, 0, 0, ${_self.particles[i]
          .opacity / 100})`;

        _self.context.fill();
      }

      requestAnimationFrame(_self.updateParticles);
    }
  },
  mounted() {
    var _self = this;
    _self.context = _self.$refs.canvas.getContext("2d");
    //attach this to eventlistener instead!!
    window.onresize = function() {
      _self.$refs.canvas.width = window.innerWidth;
      _self.$refs.canvas.height = window.innerHeight;
    };
    window.onresize(); // called to initially set the height.

    _self.updateParticles();
    _self.setupParticles();
    _self.show();
    _self.step();

    setTimeout(() => {
      _self.$refs.wrapper.classList.remove('hide');
		}, 1);
  }
};
</script>
<style>
.inner-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
}
.cyberge6 {
  width: 100px;
  height: 100px;
  position: absolute;
  margin-left: -50px;
  margin-top: -50px;
  left: 50%;
  top: 50%;
  opacity: 1;
}
.splash {
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: -50vw;
  margin-top: -50vh;
  opacity: 1;
}
.cyberge6, .splash{
  -webkit-transition: height .4s ease-out, width .4s ease-out, opacity ease .4s;
  -moz-transition: height .4s ease-out, width .4s ease-out, opacity ease .4s;
  -o-transition: height .4s ease-out, width .4s ease-out, opacity ease .4s;
  transition: height .4s ease-out, width .4s ease-out, opacity ease .4s;
}
.hide .cyberge6, .hide .splash{
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>