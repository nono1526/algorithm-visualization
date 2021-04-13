<script>
  import { onMount } from 'svelte'
  let nums = Array.from({ length: 25 }).map((_, i) => 10 + Math.random() * 140)
  let _j
  onMount(() => {
    const genarator = bubbleSortGenarator(nums)
  
    const timer = window.setInterval(() => {
        const { done } = genarator.next()
        if (done) window.clearInterval(timer)
    }, 100)
    return () => window.clearInterval(timer)
  })
  
  function * bubbleSortGenarator () {
    for (let i = 0; i < nums.length; i++) {
      for (let j = nums.length; j > i; j--) {
        yield setJ(j)
        if (nums[j] < nums[j - 1]) {
          swap(j, j - 1)
        }
      }
    }
    return nums
  }
  
  function setJ (j) {
    _j = j
  }

  function swap (i, j) {
    let temp = nums[i]
      nums[i] = nums[j]
      nums[j] = temp
  
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
    {#each nums as num, index (num)}
      <div
        class="row"
        style={`
          width: ${num}px;
          height: 5px;
          background-color: ${index === _j ? 'red' : 'white'} ;
        `}
      ></div>
    {/each}
  </div>