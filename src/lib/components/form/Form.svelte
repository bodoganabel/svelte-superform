<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type * as yup from 'yup';
	import { CONTEXT_KEY_FORM, type IFormContext } from './formContext';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let initialValues: any = {};
	export let validationSchema: yup.ObjectSchema<any>;
	export let onSubmit: (values: any) => void;
	export let onChange:
		| ((values: typeof initialValues) => { values: typeof initialValues })
		| undefined = undefined;

	const formValues = writable(initialValues);
	const touchedFields = writable({});
	const formErrors = writable({});

	function validateField(name: string, value: any) {
		try {
			validationSchema.validateSyncAt(name, { [name]: value }, { abortEarly: false });
			return '';
		} catch (err: any) {
			console.error('Validation error:', err);
			return err.errors[0];
		}
	}

	function handleBlur(event: any) {
		console.log('Blurred:', event.target.name);
		const { name, value } = event.target;
		touchedFields.update((fields) => ({ ...fields, [name]: true }));
		formErrors.update((errors) => ({
			...errors,
			[name]: validateField(name, value)
		}));
	}

	async function handleChange(event: any) {
		console.log('Changed:', event.target.name);
		const { name, value } = event.target;
		formValues.update((values) => ({ ...values, [name]: value }));
		const updatedValues = onChange ? await onChange($formValues) : $formValues;
		if (updatedValues) {
			formValues.set(updatedValues);
		}
	}

	setContext<IFormContext>(CONTEXT_KEY_FORM, {
		formValues,
		touchedFields,
		formErrors,
		handleBlur,
		handleChange
	});

	$: {
		console.log('Form values:', $formValues);
		console.log('Touched fields:', $touchedFields);
		console.log('Form errors:', $formErrors);
	}
</script>

<div on:submit|preventDefault={onSubmit}>
	<slot />
</div>
