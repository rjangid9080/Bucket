<script lang="ts">
	let brand : string = "Welcome to the Bucket"
</script>
<h1 class="w-full justify-center flex text-red-500">{brand}</h1>
<button class="rounded shadow text-gray-700 bg-gray-100 hover:bg-gray-300 pt-2 pb-2 pr-3 pl-3">
	<a href="./auth/signIn">Sign In</a>
</button>
<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
