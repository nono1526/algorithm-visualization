<script>
  import { onMount } from 'svelte'
  export let nums = []
  let _i = 0
  let _j = 0
  function * mergeSortGenerator (array, front, end) {
    if (front >= end) return
    let mid = Math.floor((front + end) / 2)
    yield * mergeSortGenerator(array, front, mid)
    yield * mergeSortGenerator(array, mid + 1, end)
    yield * merge(array, front, mid + 1, end + 1)
    return array
  }

  function * merge (array, front, mid, end) {
    const left = array.slice(front, mid)
    const right = array.slice(mid, end)
    let leftMinIndex = 0
    let rightMinIndex = 0
    for (let i = front; i < end; i++) {
      _i = i
      yield
      const leftMin = left.length === leftMinIndex ? Infinity : left[leftMinIndex]
      const rightMin = right.length === rightMinIndex ? Infinity: right[rightMinIndex]
      if (leftMin > rightMin) {
        _j = rightMinIndex + mid
        array[i] = rightMin
        rightMinIndex++
      } else {
        _j = leftMinIndex + front
        array[i] = leftMin
        leftMinIndex++
      }
    }
     
  }
  onMount(() => {
    nums = nums.map(num => num.value)
    const generator = mergeSortGenerator(nums, 0, nums.length - 1)
    const timer = window.setInterval(() => {
      const { done, value } = generator.next()
      nums = nums
      if (done) {
        window.clearTimeout(timer)
      }
    }, 100)
    return () => {
      window.clearTimeout(timer)
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
    margin: 1px 0px;
  }
</style>
<div class="wrapper">
  {#each nums as num, index (index)}
    <div
      class="row"
      style={`
        width: ${num}px;
        height: 5px;
        background-color: ${index === _i
          ? 'red'
          : index === _j
            ? 'blue'
            : 'white'
        }
      `}
    ></div>
  {/each}
</div>