<template>
  <div class="result-box">
    <h3 class="title">
      {{title}}
    </h3>
    <h1 class="number">
    {{number}}
    </h1>

    <p class="description">
      {{description}}
    </p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'resultBox',
  props: ['title', 'number', 'description']
}

</script>
