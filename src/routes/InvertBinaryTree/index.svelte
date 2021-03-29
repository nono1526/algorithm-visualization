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
	let leftKey
	let rightKey
	let treeArr = [1,2,3,4,5,6,7]
	let inputTree = '1,2,3,4,5,6,7'
	
	let tree = treeArr[0]

	function createTree (arr) {
		for (let i = 0; 2 * (i + 1) <= arr.length; i++ ) {
			let node
			if (i === 0) {
				arr[i] = new TreeNode(arr[i])
			}
			node = arr[i]
			let leftId = 2 * i + 1
			let rightId = 2 * (i + 1)
			arr[leftId] = new TreeNode(arr[leftId])
			arr[rightId] = new TreeNode(arr[rightId])
			node.left = arr[leftId]
			node.right = arr[rightId]
		}
		return arr
	}
	
	function * reserveTree (tree) {
		const stack = [tree]
		while (stack.length > 0) {
			const node = stack.pop()
			if (node.left || node.right) {
				leftKey = node.left.key
				rightKey = node.right.key
				yield(swap(node, tree))
				stack.push(node.left, node.right)
			}
		}
		tree = tree
	}
	
	function startReserveTree () {
		if (timer) window.clearInterval(timer)
		const inputArr = inputTree.split(',')
		tree = createTree(inputArr)[0]
    console.log(tree)
		const swapper = reserveTree(tree)
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
		tree = createTree(treeArr)[0]
		const swapper = reserveTree(tree)
		const timer = window.setInterval(() => {
			const {done, value} = swapper.next()
			tree = tree
			if (done) {
				leftKey = null
				rightKey = null
			 window.clearInterval(timer)
			}
		}, 1500)
		return () => window.clearInterval(timer)
	})
</script>

<style>
</style>

<main>
	Input Tree:
	<input type="text" bind:value={inputTree}>
	<button on:click={startReserveTree}>
		start
	</button>
	<Node node={tree}/>
</main>