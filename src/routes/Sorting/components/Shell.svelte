<script>
import { onMount } from 'svelte'
export let nums = []
let _j
let _group = []
function * shellSortGenerator (arrs) {
  for (let i = parseInt(arrs.length / 2); i > 0; i = parseInt(i / 2) ) {
    let arr = []
    for (let j = 0; j < arrs.length; j += i) {
      arr.push(arrs[j])
    }
    _group = arr.map(arr => arr.key)
    yield * insertSort(arr)
  }
  return arrs
}

function * insertSort (nums) {
  for (let i = 1; i < nums.length; i++) {
    const key = nums[i].value
    let j = i - 1
    for (j; j >= 0; j--) {
      if (nums[j].value < key) {
        break
      }
      yield movingToRight(j, nums)
    }
    nums[j + 1].value = key
  }
  return nums
}

function movingToRight (j, nums) {
  _j = j
  nums[j + 1].value = nums[j].value
  return nums
}

onMount(() => {
  const sortGenerator = shellSortGenerator(nums)
  const timer = window.setInterval(() => {
    const { done, value } = sortGenerator.next()
    nums = nums
    if (done) {
      window.clearTimeout(timer)
      _group = []
    }
  }, 100)
  return () => {
    window.clearInterval(timer)
  }
})

</script>

<style>
  .wrapper {
    width: 150px;
    height: 150px;
    border-left: 1px solid white;
    border-bottom: 1px solid white;
  }
  .row {
    background-color: #fff;
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
        border: 1px solid ${_group.includes(index) ? 'red' : 'white'};
      `}
    ></div>
  {/each}
</div>