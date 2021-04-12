<script>
import { link } from 'svelte-spa-router'


</script>

<style>
  .nav {
    display: flex;
    margin: 0px;
    padding: 0px;
    list-style: none;
    border-bottom: 1px solid white;
    margin-bottom: 32px;
  }
  li {
    padding: 12px;
    border-right: 1px solid white;
  }
  a {
    color: white;
  }
</style>

<ul class="nav">
  <li><a href="/find-primes" use:link={'/find-primes'}>Find Primes</a></li>
  <li><a href="/invert-binary-tree" use:link={'/invert-binary-tree'}>Invert binary tree</a></li>
  <li><a href="/sorting" use:link={'/sorting'}>sorting</a></li>
</ul>