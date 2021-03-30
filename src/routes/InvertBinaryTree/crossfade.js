import { crossfade, fade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

const [send, receive] = crossfade({
  duration: d => Math.sqrt(d * 3000),
  fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
          duration: 600,
          easing: quintOut,
          css: t => `
              transform: ${transform} scale(${t});
              opacity: ${t}
          `
      };
  }
});

export { send, receive }
