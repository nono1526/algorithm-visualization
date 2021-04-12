<!-- App.svelte -->
<script>
  import { Router, Link, Route } from "svelte-routing";
  import FindPrimes from "./routes/FindPrimes.svelte";
  import InvertBinaryTree from './routes/InvertBinaryTree/index.svelte'
  export let url = "";
</script>

<Router url="{url}" basepath="/algorithm-visualization/public/">
  <nav>
    <Link to="/">Home</Link>
    <Link to="/find-primes">Find Primes</Link>
    <Link to="/invert-binary-tree">Invert Binary Tree</Link>
  </nav>
  <div>
    <Route path="find-primes" component="{FindPrimes}" />
    <Route path="invert-binary-tree" component="{InvertBinaryTree}" />
    <Route path='*' component="{FindPrimes}" />
  </div>
</Router>