<script>
import Insertion from './components/Insertion.svelte'
import Selection from './components/Selection.svelte'
import Bubble from './components/Bubble.svelte'
import Quick from './components/Quick.svelte'
import Shell from './components/Shell.svelte'
import Merge from './components/Merge.svelte'
let nums = Array.from({ length: 25 })
  .map((_, i) => ({value: 10 + Math.random() * 140, key: i}))

function getNums (arr) {
  return JSON.parse(JSON.stringify(arr))
}
</script>
<style>
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  .col {
    padding: 0 12px;
  }
</style>
<div class="row">
  <div class="col">
    Insertion
    <Insertion nums={getNums(nums)}></Insertion>
  </div>
  <div class="col">
    Selection
    <Selection nums={getNums(nums)}></Selection>
  </div>
  <div class="col">
    Bubble
  <Bubble nums={getNums(nums)}></Bubble> 
  </div>
  <div class="col">
    Quick
    <Quick nums={getNums(nums)}></Quick>
  </div>
  <div class="col">
    Shell
    <Shell nums={getNums(nums)}></Shell>
  </div>
  <div class="col">
    Merge
    <Merge nums={getNums(nums)}></Merge>
  </div>
</div>