<script>
  import { onMount } from 'svelte'
  let primes = []
  const total = 100

  function findPrimes (n, nums) {
    
    
    nums[0].isPrime = false
    nums[1].isPrime = false
    for (let i = 2; i * i < n; i++) {
      if (!nums[i].isPrime) continue
      const color = getRandomColor()
      for (let j = i * i; j < n; j += i) {
        nums[j].isPrime = false
        nums[j].color = color
      }
    }

    return nums.splice(2)
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
    const nums = new Array(total)
      .fill('')
      .map(_ => ({
        isPrime: true,
        color: 'white'
      }))
      primes = findPrimes(total, nums)
  })
</script>

<style>
  main {
    display: flex;
    flex-wrap: wrap;
    width: 360px;

  }

  .num-block {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

Sieve of Eratosthenes Visualization

<main>
	{#each primes as prime, i}
    <div class="num-block"
      style={`background-color: ${prime.color}`}
    >{i + 2}</div>
  {/each}
</main>