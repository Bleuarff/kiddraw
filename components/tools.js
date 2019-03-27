'use strict'

// Handles tool list display & selection
Vue.component('my-tools', {
  props: {

  },
  data: function(){
    return {
      // existing tools
      tools: [{
        type: 'fill', label: 'Remplir'
      },{
        type: 'pen', label: 'Pinceau'
      }],
      selectedIdx: 1
    }
  },
  methods: {
    select: function(idx){
      this.selectedIdx = idx
      this.$emit('tool-select', this.tools[idx].type)
    }
  },
  template: `
    <div id="tools">
    <div v-for="(tool, i) in tools"
          class="tool" v-bind:class="[i === selectedIdx ? 'selected' : '']"
          v-on:click="select(i)"
          :title="tool.label">
          {{tool.label.substr(0, 1)}}
    </div>
    </div>
  `
})
