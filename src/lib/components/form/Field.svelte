<script lang="ts">
	import { getContext, onMount, onDestroy } from 'svelte';
	import { CONTEXT_KEY_FORM, type IFormContext } from './formContext';

	const { formValues, touchedFields, formErrors, handleBlur, handleChange } =
		getContext<IFormContext>(CONTEXT_KEY_FORM);

	export let name: string;
	export let type = 'text';
	export let defaultValue: any = '';
	export let label: string = '';
	export let validation: () => string | null = () => null;

	// Initialize field with default value
	onMount(() => {
		formValues.update((values) => ({ ...values, [name]: defaultValue }));
		// Add validation rule to form context here
	});

	// Re-validate if validation function changes
	$: {
		// Add or update validation rule in form context here
	}
</script>

<div>
	<label for={name}>{label}</label>
	<input
		value={$formValues[name] || ''}
		{name}
		{type}
		on:blur={handleBlur}
		on:input={handleChange}
	/>
	{#if $touchedFields[name] && $formErrors[name]}
		<div class="text-error-400 text-sm">{$formErrors[name]}</div>
	{/if}
</div>
