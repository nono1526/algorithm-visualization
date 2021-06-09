<script>
  import { onMount } from 'svelte'
  export let nums = []
  let _j = 0

  function * makeHeapSorting (nums) {
    const maxHeap = yield * buildMaxHeap(nums)
    for (let i = maxHeap.length - 1; i >= 2; i--) {

      swap(maxHeap, 1, i)
      yield * maxHeapify(maxHeap, 1, i - 1)
    }
    return maxHeap.slice(1)
  }

  function * buildMaxHeap (array) {
    // index 0 not use
    const heap = [undefined, ...array]
    for (let i = Math.floor((heap.length) / 2); i > 0; i--) {
      yield * maxHeapify(heap, i, heap.length - 1)
    }
    return heap
  }

  function * maxHeapify (heap, index, length) {
    yield heap.slice(1)
    const root = (heap[index] || {}).value
    const leftChildIdx = 2 * index // 4
    const rightChildIdx = 2 * index + 1 // 5  
    const left = (heap[leftChildIdx] || {}).value || -Infinity
    const right = (heap[rightChildIdx] || {}).value || -Infinity
    let nextIndex = null
    let max = null
    if (leftChildIdx <= length && left > root) {
      nextIndex = leftChildIdx
      max = left
    } else {
      nextIndex = rightChildIdx
      max = root
    }
    if (rightChildIdx <= length && right > root) {
      nextIndex = rightChildIdx
    }
    if (root !== max) {
      swap(heap, nextIndex, index)
      yield * maxHeapify(heap, nextIndex, length)
    }
  }

  function swap (array, i, j) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  onMount(() => {
    const generator = makeHeapSorting(nums)
    const timer = window.setInterval(() => {
      const { done, value } = generator.next()
      nums = value
      if (done) {
        window.clearInterval(timer)
      }
    }, 1000)
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
    margin: 1px 0px;
  }
</style>

<div class="wrapper">
  {#each nums as num, index (index)}
    <div
      class="row"
      style={`
        width: ${num.value}px;
        height: 5px;
        background-color: white ;
      `}
    ></div>
  {/each}
</div>