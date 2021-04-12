<!-- App.svelte -->
<script>
  import Router from 'svelte-spa-router'
  import TheNav from './components/TheNav.svelte'
  import routes from './routes/index.js'
</script>

<TheNav></TheNav>
<Router {routes}>
  
</Router>