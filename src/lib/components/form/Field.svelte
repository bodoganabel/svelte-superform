<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	// import or define your own types

	import { CONTEXT_KEY_FORM, type IFormContext, type IValidationFunction } from './types';

	const { formValues, touchedFields, formErrors, handleBlur, handleChange, fieldValidations } =
		getContext<IFormContext>(CONTEXT_KEY_FORM);

	export let name: string;
	export let type = 'text';
	export let defaultValue: any = '';
	export let label: string = '';
	export let validation: IValidationFunction;

	onMount(() => {
		// Only update formValues with defaultValue if the field does not already exist
		formValues.update((values) => {
			if (values[name] === undefined) {
				return { ...values, [name]: defaultValue };
			}
			return values; // Otherwise, keep the existing value
		});
		fieldValidations[name] = validation;
	});

	onDestroy(() => {
		// Remove the validation function when the component is destroyed
		delete fieldValidations[name];
	});
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
