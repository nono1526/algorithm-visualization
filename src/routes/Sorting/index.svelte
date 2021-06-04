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
Insertion
<Insertion nums={getNums(nums)}></Insertion>
Selection
<Selection nums={getNums(nums)}></Selection>
Bubble
<Bubble nums={getNums(nums)}></Bubble> 
Quick
<Quick nums={getNums(nums)}></Quick>
Shell
<Shell nums={getNums(nums)}></Shell>
Merge
<Merge nums={getNums(nums)}></Merge>