<template>
  <div class="container">
    <div class="col h-100">
        <div v-if="error.statusCode === 404">
            <h1>Page not found</h1>
            <p>{{ error.message }}</p>
        </div>
        <div v-else>
            <h1>An error occurred</h1>
        </div>
        <n-link to="/">Home page</n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default'
}
</script>