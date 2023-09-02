import type { Writable } from "svelte/store";

export const CONTEXT_KEY_FORM = 'CONTEXT_KEY_FORM';


export interface IFieldValidations { [key: string]: IValidationFunction }

export interface IFormContext {
    formValues: Writable<any>,
    touchedFields: Writable<any>,
    formErrors: Writable<any>,
    fieldValidations: IFieldValidations, // New Line
    handleBlur:  (event: any) => void,
    handleChange: (event: any) => Promise<void>
}

export type IValidationFunction = (value: any) => Promise<string | null>;
