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
  <li><a use:link={'/find-primes'}>Find Primes</a></li>
  <li><a use:link={'/invert-binary-tree'}>Invert binary tree</a></li>
</ul>