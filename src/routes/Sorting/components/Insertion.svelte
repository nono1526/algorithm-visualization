<script>
import { onMount } from 'svelte'
export let nums = []
let _j
let temp
let key
onMount(() => {
  const genarator = insertionSortGenarator(nums)

  const timer = window.setInterval(() => {
    const { done } = genarator.next()
    if (done) window.clearInterval(timer)
  }, 100)
  return () => window.clearInterval(timer)
})

function * insertionSortGenarator () {
  for (let i = 1; i < nums.length; i++) {
    key = nums[i].value
    let j = i - 1
    while (j >= 0 && key < nums[j].value) {
      _j = j
      yield moving(i, j)
      j--
    }
    nums[j+1].value = key
  }
  return nums
}

function moving (i, j) {
  temp = nums[j].value
  nums[j + 1].value = temp
  nums[j].value = key

}

</script>

<style>
  .wrapper {
    width: 150px;
    height: 150px;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
  }
  .row {
    margin: 1px 0px;
  }
</style>
<div class="wrapper">
  {#each nums as num, index (num.key)}
    <div
      class="row"
      style={`
        width: ${num.value}px;
        height: 5px;
        background-color: ${_j === index ? 'red' : 'white'};
      `}
    ></div>
  {/each}
</div>