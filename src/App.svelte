<script>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  let primes = []
  let nowSettingNumber = null
  const total = 200
  let nowColor = ''
  function * findPrimes (n, nums) {
    
    
    nums[0].isPrime = false
    nums[1].isPrime = false
    for (let i = 2; i * i < n; i++) {
      if (!nums[i].isPrime) continue
      nowColor = getRandomColor()
      for (let j = i * i; j < n; j += i) {
        yield setPrime(i, nums[j])
        primes = nums.slice(2) // svelte reload array
      }
    }
  }


  function setPrime (i, target) {
      target.isPrime = false
      target.color = nowColor
      return i
  }

  function getRandomColor() {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  onMount(() => {
    primes = new Array(total)
      .fill('')
      .map(_ => ({
        isPrime: true,
        color: '#777'
      }))
      // findPrimes(total, primes)
      const finder = findPrimes(total, primes)
      const intervalId = window.setInterval(() => {
        const { done, value } = finder.next()
        nowSettingNumber = value
        if (done) window.clearInterval(intervalId)
      }, 50)
  })
</script>

<style>

  main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .num-block {
    height: 48px;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s;
    border: 4px solid rgb(241, 241, 241);
  }

</style>

<main>
	{#each primes as prime, i (i)}
    <div class="num-block"
      transition:fly
      style="
        background-color: {prime.color};
        border-color: {nowSettingNumber === i + 2 ? nowColor : 'rgb(241, 241, 241)'};
      "
    >{i + 2}</div>
  {/each}
</main>