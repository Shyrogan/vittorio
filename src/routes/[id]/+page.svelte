<script>
	import {
		ArrowLeft,
		FacebookLogo,
		TwitterLogo,
		InstagramLogo,
		LinkedinLogo,
		Envelope,
		Globe,
		Phone,
		MapPin,
		XCircle,
		SpinnerGap
	} from 'phosphor-svelte';

	/** @type {import('./$types').PageProps} */
	const { data } = $props();
	const { brand, result } = data;
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<div class="flex items-center mb-8">
			<a href="/" class="flex items-center text-green-700 hover:text-green-800 mr-4">
				<ArrowLeft size={20} class="mr-1" />
				<span class="text-sm font-medium">Back to search</span>
			</a>
			<div class="flex-1 text-center">
				<h1 class="text-3xl font-bold text-gray-900 inline-block">TUTTOFOOD per Vittorio</h1>
			</div>
		</div>

		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<div class="px-4 py-5 sm:px-6 border-b border-gray-200">
				<h2 class="text-lg font-medium text-gray-900">
					{brand.brand}
				</h2>
				<a href={brand.url} target="_blank" class="text-sm text-gray-500 hover:underline">
					{brand.url}
				</a>
			</div>

			<div class="px-4 py-5 sm:p-6">
				{#if result === undefined}
					<div class="flex justify-center items-center py-12">
						<SpinnerGap class="animate-spin h-8 w-8 text-green-600" />
					</div>
				{:else if result.status === 'failed'}
					<div class="rounded-md bg-red-50 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<XCircle class="h-5 w-5 text-red-400" />
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800">Failed to fetch data</h3>
								<div class="mt-2 text-sm text-red-700">
									<p>{result.error || 'Unknown error occurred'}</p>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div class="space-y-8">
						<div>
							<h3 class="text-md font-medium text-gray-900 mb-4">Contact Information</h3>
							<div class="space-y-4">
								{#if result.contact.address}
									<div class="flex items-start">
										<MapPin class="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
										<p class="ml-3 text-sm text-gray-700">{result.contact.address}</p>
									</div>
								{/if}

								{#if result.contact.phone}
									<div class="flex items-start">
										<Phone class="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
										<p class="ml-3 text-sm text-gray-700">{result.contact.phone}</p>
									</div>
								{/if}

								{#if result.contact.email}
									<div class="flex items-start">
										<Envelope class="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
										<a
											href={`mailto:${result.contact.email}`}
											class="ml-3 text-sm text-gray-700 hover:underline"
										>
											{result.contact.email}
										</a>
									</div>
								{/if}

								{#if result.contact.website}
									<div class="flex items-start">
										<Globe class="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5" />
										<a
											href={result.contact.website}
											target="_blank"
											class="ml-3 text-sm text-gray-700 hover:underline"
										>
											{result.contact.website}
										</a>
									</div>
								{/if}
							</div>
						</div>

						{#if Object.keys(result.contact.socialMedia).length > 0}
							<div>
								<h3 class="text-md font-medium text-gray-900 mb-4">Social Media</h3>
								<div class="flex space-x-4">
									{#if result.contact.socialMedia.facebook}
										<a
											href={result.contact.socialMedia.facebook}
											target="_blank"
											class="text-gray-400 hover:text-gray-500"
											title="Facebook"
										>
											<FacebookLogo size={24} />
										</a>
									{/if}

									{#if result.contact.socialMedia.twitter}
										<a
											href={result.contact.socialMedia.twitter}
											target="_blank"
											class="text-gray-400 hover:text-gray-500"
											title="Twitter"
										>
											<TwitterLogo size={24} />
										</a>
									{/if}

									{#if result.contact.socialMedia.instagram}
										<a
											href={result.contact.socialMedia.instagram}
											target="_blank"
											class="text-gray-400 hover:text-gray-500"
											title="Instagram"
										>
											<InstagramLogo size={24} />
										</a>
									{/if}

									{#if result.contact.socialMedia.linkedin}
										<a
											href={result.contact.socialMedia.linkedin}
											target="_blank"
											class="text-gray-400 hover:text-gray-500"
											title="LinkedIn"
										>
											<LinkedinLogo size={24} />
										</a>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
