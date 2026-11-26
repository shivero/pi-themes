import { createElement, useEffect, useRef, useState, type ComponentType, type ReactElement } from "react";
import type { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";

/** Props that {@link withForm} injects into the wrapped component. */
export interface InjectedFormProps<TValues extends FieldValues> {
	form: UseFormReturn<TValues>;
	submitting: boolean;
	errors: FieldErrors<TValues>;
}

export type OuterProps<TOuter, TValues extends FieldValues> = Omit<TOuter, keyof InjectedFormProps<TValues>>;

async function submitToServer<TValues extends FieldValues>(values: TValues): Promise<{ id: string }> {
	const response = await fetch("/api/forms", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(values),
	});

	if (!response.ok) {
		throw new Error(`Submit failed with status ${response.status}`);
	}

	return (await response.json()) as { id: string };
}

/**
 * HOC that binds a react-hook-form instance to a component: it focuses the
 * first field on mount, tracks the in-flight submission and forwards field
 * errors so the wrapped component can render them without extra plumbing.
 */
export function withForm<TOuter extends object, TValues extends FieldValues = FieldValues>(
	Wrapped: ComponentType<TOuter & InjectedFormProps<TValues>>,
	useFormHook: () => UseFormReturn<TValues>,
) {
	return function FormBoundary(props: OuterProps<TOuter, TValues>): ReactElement {
		const form = useFormHook();
		const [submitting, setSubmitting] = useState(false);
		const firstField = useRef<HTMLInputElement | null>(null);

		useEffect(() => {
			firstField.current?.focus({ preventScroll: true });
			return () => firstField.current?.blur();
		}, []);

		const onSubmit = form.handleSubmit(async (values) => {
			setSubmitting(true);
			try {
				await submitToServer(values);
				form.reset();
			} finally {
				setSubmitting(false);
			}
		});

		return createElement(Wrapped, {
			...props,
			form,
			submitting,
			errors: form.formState.errors,
			onSubmit,
			ref: firstField,
		} as TOuter & InjectedFormProps<TValues>);
	};
}
