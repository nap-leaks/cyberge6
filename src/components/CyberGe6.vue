<template>
  <div class="wrapper">
    <Ge6 v-for="ge6 of cyberge6es" 
                      :underFire="fire"
                      :key="ge6.id" 
                      :obj="ge6" 
                      :position="position"
                      @end="onGe6End"
    />
  </div>
</template>
<script>

import Ge6 from "@/components/Ge6.vue";
import { setInterval, clearInterval } from 'timers';

const maxGe6es = 10;

export default {
  name: "CyberGe6",
  components: {
    Ge6
  },
  data() {
    return {
      interval: null,
      position: {
        top: 0,
        left: 0,
        angle: 0
      },
      cyberge6es: [],
      cyberge6eCreated: 0,
      survived: 0
    };
  },
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    angle: {
      type: Number,
      default: 0
    },
    fire: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    top(val){
      var _self = this;
      _self.position.top = val;
    },
    left(val){
      var _self = this;
      _self.position.left = val;
    },
    angle(val){
      var _self = this;
      _self.position.angle = val;
    },
  },
  methods: {
    onGe6End(result){
      var _self = this;
      var index = _self.cyberge6es.findIndex(x => x.id == result.id);
      _self.cyberge6es.splice(index, 1);
      if(result.survived)
        _self.survived++;
      _self.updateStats();
    },
    updateStats(){
      var _self = this;
      _self.$emit('stats', {
        total: _self.cyberge6eCreated,
        survived: _self.survived,
        killed: _self.cyberge6eCreated - _self.survived - _self.cyberge6es.length
      })
    },
    setupCyberGe6() {
      var _self = this;
      _self.cyberge6es.push({
        id: new Date().getTime() + 1,
        top:0,
        left:0
      });
      _self.cyberge6eCreated++;
      _self.updateStats();

      _self.interval = setInterval(()=>{
        if(_self.cyberge6es.length < maxGe6es){
          _self.cyberge6es.push({
            id: new Date().getTime() + Math.random() * (10000),
            left: Math.random() * (window.innerWidth)
          });
          _self.cyberge6eCreated++;
          _self.updateStats();
        }
      }, 1000)
    }
  },
  beforeDestroy(){
    var _self = this;
    if(_self.interval)
      clearInterval(_self.interval);
  },
  mounted() {
    var _self = this;
    _self.setupCyberGe6();
  }
};
</script>
<style>
.wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
}
</style>