<script>
	import TreeNode from './TreeNode.js'
	import Node from './Node.svelte'
	import { crossfade, fade } from 'svelte/transition';
	import { onMount, setContext } from 'svelte'
	
	setContext('node-key', {
		getActiveLeft: () => leftKey,
		getActiveRight: () => rightKey
	})
	
	const [send, receive] = crossfade({
			duration: d => Math.sqrt(d * 300),
			fallback: fade
	});
	let timer
  let createTimer
	let leftKey
	let rightKey
	let treeArr = [1,2,3,4,5,6,7]
	let inputTree = '1,2,3,4,5,6,7'
	
	let tree = treeArr[0]

	function * createTreeGenarator (arr) {
		for (let i = 0; 2 * (i + 1) <= arr.length; i++ ) {
			let node
			if (i === 0) {
				arr[i] = new TreeNode(arr[i])
			}
			node = arr[i]
      yield(arr[i])
			let leftId = 2 * i + 1
			let rightId = 2 * (i + 1)
			arr[leftId] = new TreeNode(arr[leftId])
			arr[rightId] = new TreeNode(arr[rightId])
			node.left = arr[leftId]
			node.right = arr[rightId]
		}
		return arr
	}
	
	function * invertTree (tree) {
		const stack = [tree]
		while (stack.length > 0) {
			const node = stack.pop()
			if (node.left || node.right) {
        stack.push(node.left, node.right)
				leftKey = node.left.key
				rightKey = node.right.key
				yield(swap(node, tree))
			}
		}
	}
	
  function createNewTree (arr) {
    return new Promise(resolve => {
      const step = createTreeGenarator(arr)
      const {value} = step.next()
      tree = value // first is binary tree head
      createTimer = window.setInterval(() => {
        const { done } = step.next()
        tree = tree // refresh tree
        if (done) {
          window.clearInterval(createTimer)
          resolve(tree)
        }
      }, 500)
    })
  }

	async function startInvertTree () {
		if (timer) window.clearInterval(timer)
    if (createTimer) window.clearInterval(createTimer)
		const inputArr = inputTree.split(',').map(v => {
      v = v.trim()
      return v.trim() === 'null' ? null : v
    })
		tree = await createNewTree(inputArr)
		const swapper = invertTree(tree)
		timer = window.setInterval(() => {
			const {done} = swapper.next()
			tree = tree
			if (done) {
				leftKey = null
				rightKey = null
			 window.clearInterval(timer)
			}
		}, 2000)
	}
	
	function swap (node) {
		const temp = node.left
		node.left = node.right
		node.right = temp
		return tree
	}
	
	onMount(() => {
    startInvertTree()
		return () => {
      window.clearInterval(timer)
      window.clearInterval(createTimer)
    }
	})
</script>

<style>
</style>

<main>
	Input Tree:
	<input type="text" bind:value={inputTree}>
	<button on:click={startInvertTree}>
		start
	</button>
	<Node node={tree}/>
</main>