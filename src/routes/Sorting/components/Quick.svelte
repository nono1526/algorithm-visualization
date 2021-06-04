<script>
  import { onMount } from 'svelte'
  export let nums = []
  let _j
  let _i
  let _p
  function quicksort (arrs, start, end) {
    function * helper (ans, start, end) {
      if (end <= start) return
      const pivot = ans[end]
      _p = end
      let mid = start - 1
      for (let i = start; i < end; i++) {
        if (ans[i].value < pivot.value) {
          mid++
          _i = i
          _j = mid

          yield swap(ans, mid, i)
        }
      }
      yield swap(ans, end, mid + 1)
      yield* helper(ans, start, mid)
      yield* helper(ans, mid + 2, end)
      
    }

    return helper(arrs, start, end)
  }



  function swap (arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr
  }

  onMount(() => {
    const generator = quicksort(nums, 0, nums.length - 1)
    const timer = window.setInterval(() => {
      const { done } = generator.next()
      if (done) {
        window.clearInterval(timer)
        return
      }
      nums = nums
    }, 100)
    return () => window.clearInterval(timer)
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
    {#each nums as num, index (num.key)}
      <div
        class="row"
        style={`
          width: ${num.value}px;
          height: 5px;
          background-color: ${_j === index || _i === index || _p === index
            ? _p === index
              ? 'blue'
              : 'red'
            : 'white'};
        `}
      ></div>
    {/each}
  </div>