<script lang="ts">
	import ErrorMessage from '$lib/components/form/ErrorMessage.svelte';
	import Field from '$lib/components/form/Field.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import * as yup from 'yup';

	let useDifferentBusinessName = false;
	const initialValues = {
		name: '',
		phoneNumber: '',
		businessName: ''
	};

	const validationSchemaBasic = yup.object().shape({
		name: yup.string().required('Name is required'),
		phoneNumber: yup.string().required('Phone number is required')
	});

	let validationSchema: yup.ObjectSchema<any>;

	$: {
		validationSchema = yup.object().shape({
			...validationSchemaBasic.fields,
			...(false ? { businessName: yup.string().required('Business name is required') } : {})
		});
	}

	async function handleSubmit(values: typeof initialValues) {
		// Your custom submit logic here
		console.log('handleSubmit called with values:', values);
	}

	function handleChange(values: any) {
		//formValues = JSON.parse(JSON.stringify(values));
		if (values.useDifferentBusinessName) {
			useDifferentBusinessName = values.useDifferentBusinessName;
		}
		return values;
	}
</script>

<Form {initialValues} {validationSchema} onSubmit={handleSubmit} onChange={handleChange}>
	<div>
		<label for="name">Name2</label>
		<Field name="name" />
		<ErrorMessage name="name" />
	</div>

	<div>
		<label for="phoneNumber">Phone Number</label>
		<Field name="phoneNumber" />
		<ErrorMessage name="phoneNumber" />
	</div>

	<div>
		<Field name="useDifferentBusinessName" type="checkbox" />
		<label for="useDifferentBusinessName">Use different business name</label>
	</div>

	{#if useDifferentBusinessName}
		<div>
			<label for="businessName">Business Name</label>
			<Field name="businessName" />
			<ErrorMessage name="businessName" />
		</div>
	{/if}
	<button type="submit">Submit</button>
</Form>
