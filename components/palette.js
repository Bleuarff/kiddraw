'use strict'

// Show color palette & send event on selection
Vue.component('my-palette', {
  props: {
    color: {type: String, default: 'ff0000'}
  },
  data: function(){
    return {
      // list available colors
      palette: ['#ffffff', '#2f2f2f', '#ff0000', '#00ff00', '#0000ff', '#e86f00'],
      selectedIdx: 2,
    }
  },
  methods: {
    // on click sends an even with color
    select: function(color){
      this.selectedIdx = this.palette.findIndex(x => x === color)
      this.$emit('color-select', color)
    }
  },
  template: `
    <div id="palette">
      <div v-for="(colr, i) in palette"
            class="color" v-bind:class="[i === selectedIdx ? 'selected' : '']"
            v-bind:style="{background: colr}"
            v-on:click="select(colr)">
      </div>
    </div>
  `
})
