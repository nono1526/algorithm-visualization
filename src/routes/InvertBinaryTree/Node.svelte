<script>
import { receive, send } from './crossfade.js'
import { flip } from 'svelte/animate'
import { getContext } from 'svelte'
export let node

const { getActiveLeft, getActiveRight } = getContext('node-key')

</script>

<style>

	.node-wrapper {
		display: flex;
		flex-wrap: wrap;
		min-height: 60px;
		width: 100%;
		justify-content: center;
	}
	
	.node {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #eaeaea;
		color: #717171;
		text-align: center;
		line-height: 50px;
		margin: 10px;
		text-align: center;
	}
	
	.node__child {
		width: 100%;
		display: inline-flex;
		justify-content: space-around;
		margin: 0;
	}
</style>
<!-- Very bad but animate:flip must be child of a keyed each block-->
{#each [1] as n (node.key)}
<div
	class="node-wrapper"
	animate:flip
>

	{#if node.val && node.val !== 0}
		<div class="node"
				 style={`
				 background-color: ${getActiveLeft() === node.key 
				 	 ? '#3e3e3e' 
				   : getActiveRight() === node.key
				      ? '#cb722b'
				      : ''
				 };
				 color: ${getActiveLeft() === node.key || getActiveRight() === node.key ? '#fff' : '#717171'}
				 `}
					in:receive={{key: node.key}}		 
					out:send={{key: node.key}}
				>
					{node.val}
		</div>
	
		<div class="node__child" >
			{#if node.left}
						<svelte:self node={node.left} />
			{/if}
			{#if node.right}
						<svelte:self node={node.right}/>
			{/if}
		</div>
	{/if}
</div>
	{/each}
