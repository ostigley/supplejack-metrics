<template>
  <div class="selectors">
    <select v-on:change="update" id='id'>
      <option v-for="option in options" v-bind:value="option">{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'selectors',
  props: ['options', 'id'],
  methods: {
    update (e) {
      this.$root.updateSelection(this.id, e.target.value)
    }
  }
}
</script>
