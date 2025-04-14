<script>
	import { goto } from '$app/navigation';
	import { Backspace } from 'phosphor-svelte';
	import { MagnifyingGlass } from 'phosphor-svelte';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();
	const { initialData } = data;

	let search = $state('');
	const brands = $state(initialData);
	const displayed_brands = $derived(
		brands.filter((v) => v.brand.toLowerCase().includes(search.toLowerCase()))
	);
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900">TUTTOFOOD per Vittorio</h1>
			<p class="mt-2 text-lg text-gray-600">Search brands and get their contact</p>
		</div>

		<div class="mb-6">
			<label for="search" class="sr-only">Search brands</label>
			<div class="relative rounded-md shadow-sm">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<MagnifyingGlass />
				</div>
				<input
					type="text"
					id="search"
					class="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
					placeholder="Search brands or URLs..."
					bind:value={search}
				/>
				{#if search}
					<button
						aria-label="search"
						onclick={() => (search = '')}
						class="absolute inset-y-0 right-0 pr-3 flex items-center"
					>
						<Backspace />
					</button>
				{/if}
			</div>
		</div>

		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<ul class="divide-y divide-gray-200">
				{#each displayed_brands as b, i}
					<li class="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150">
						<div class="flex items-center justify-between">
							<div class="flex items-center min-w-0">
								<div class="min-w-0 flex-1">
									<p class="text-sm font-medium text-green-700 truncate">
										{b.brand}
									</p>
									<a
										href={b.url}
										target="_blank"
										class="text-sm text-gray-500 truncate hover:underline overflow-ellipsis"
									>
										{b.url}
									</a>
								</div>
							</div>
							<div class="ml-4 flex-shrink-0">
								<button
									onclick={() => goto(`/${i}`)}
									class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
								>
									View Details
								</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
