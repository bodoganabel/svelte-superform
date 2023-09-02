import type { Writable } from "svelte/store";

export const CONTEXT_KEY_FORM = 'CONTEXT_KEY_FORM';

export interface IFormContext {
    formValues: Writable<any>,
    touchedFields: Writable<any>,
    formErrors: Writable<any>,
    handleBlur:  (event: any) => void,
    handleChange: (event: any) => Promise<void>
}