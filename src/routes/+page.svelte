<script lang="ts">
	import Field from '$lib/components/form/Field.svelte';
	import Form from '$lib/components/form/Form.svelte';
	import * as yup from 'yup';

	let isBusiness = false;

	function onSubmit(values: any) {
		// Your custom submit logic here
		console.log('Form submitted with values:', values);
	}

	function onChange(values: any) {
		// Handle value changes if needed
		console.log('values:');
		console.log(values);
		return values;
	}
</script>

<Form {onSubmit} {onChange}>
	<div>
		<Field
			label="Name"
			name="name"
			defaultValue=""
			validation={async (value) =>
				(await yup.string().required('Name is required').min(2, 'Name is too short').isValid(value))
					? null
					: 'Invalid name'}
		/>
	</div>
	<div>
		<Field
			label="Address"
			name="address"
			defaultValue=""
			validation={async (value) =>
				(await yup
					.string()
					.required('Address is required')
					.min(2, 'Address is too short')
					.isValid(value))
					? null
					: 'Invalid address'}
		/>
	</div>
	<div>
		<input type="checkbox" bind:checked={isBusiness} />
		<label for="isBusiness">Is Business?</label>
	</div>
	{#if isBusiness}
		<div>
			<Field
				label="Business Address"
				name="businessAddress"
				defaultValue=""
				validation={async (value) =>
					(await yup
						.string()
						.required('Address is required')
						.min(2, 'Address is too short')
						.isValid(value))
						? null
						: 'Invalid business address'}
			/>
		</div>
	{/if}
	<button type="submit">Submit</button>
</Form>
