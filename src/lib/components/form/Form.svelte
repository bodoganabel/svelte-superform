<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { CONTEXT_KEY_FORM, type IFieldValidations, type IFormContext } from './types';

	// Optional values which will be read from fields on mount event.
	export let defaultValues: { [key: string]: any } = {};
	export let onSubmit: (values: any) => void;
	export let onChange: ((values: any) => void) | undefined = undefined;

	const formValues = writable<{ [key: string]: any }>(defaultValues);
	const touchedFields = writable({});
	const formErrors = writable({});

	// Create an object to store validation functions from fields
	const fieldValidations: IFieldValidations = {};

	async function validateField(name: string, value: any) {
		if (fieldValidations[name]) {
			const errorMessage = await fieldValidations[name](value);
			return errorMessage;
		}
		return '';
	}

	async function handleBlur(event: any) {
		const { name, value } = event.target;
		touchedFields.update((fields) => ({ ...fields, [name]: true }));
		const errorMessage = await validateField(name, value);
		formErrors.update((errors) => ({
			...errors,
			[name]: errorMessage
		}));
	}

	async function handleChange(event: any) {
		const { name, value } = event.target;
		formValues.update((values) => ({ ...values, [name]: value }));
		const updatedValues = onChange ? await onChange($formValues) : $formValues;
		if (updatedValues) {
			formValues.set(updatedValues);
		}
	}

	async function handleSubmit() {
		let isValid = true;
		const currentErrors: { [key: string]: string | null } = {};
		const currentTouchedFields: { [key: string]: boolean } = {};
		// Loop through all registered fields and validate them
		for (const [fieldName, validationFn] of Object.entries(fieldValidations)) {
			currentTouchedFields[fieldName] = true;
			const fieldValue = $formValues[fieldName];
			const errorMessage = await validateField(fieldName, fieldValue);
			if (errorMessage) {
				isValid = false;
				currentErrors[fieldName] = errorMessage;
			}
		}
		touchedFields.update((fields) => ({ ...currentTouchedFields }));
		// Update the form errors
		formErrors.set(currentErrors);

		// Only submit the form if all fields are valid
		if (isValid) {
			onSubmit($formValues);
		}
	}

	setContext<IFormContext>(CONTEXT_KEY_FORM, {
		formValues,
		touchedFields,
		formErrors,
		handleBlur,
		handleChange,
		fieldValidations
	});

	// ...
</script>

<form on:submit|preventDefault={handleSubmit}>
	<slot />
</form>
