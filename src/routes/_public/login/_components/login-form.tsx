import { Link } from "@tanstack/react-router";
import type { FC, FormEvent, ReactElement } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import type { TLoginForm } from "../_hooks/use-login.ts";

type TProps = {
	form: TLoginForm;
};

export const LoginForm: FC<TProps> = ({ form }): ReactElement => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		event.stopPropagation();
		void form.handleSubmit();
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Log in</CardTitle>
			</CardHeader>
			<CardContent>
				<form noValidate onSubmit={handleSubmit} className="space-y-4">
					<form.Field name="email">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Email</Label>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
								{field.state.meta.errors.length > 0 && (
									<p className="text-destructive text-sm">
										{field.state.meta.errors[0]?.message}
									</p>
								)}
							</div>
						)}
					</form.Field>

					<form.Field name="password">
						{(field) => (
							<div className="space-y-2">
								<Label htmlFor={field.name}>Password</Label>
								<Input
									id={field.name}
									name={field.name}
									type="password"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(event) => field.handleChange(event.target.value)}
								/>
								{field.state.meta.errors.length > 0 && (
									<p className="text-destructive text-sm">
										{field.state.meta.errors[0]?.message}
									</p>
								)}
							</div>
						)}
					</form.Field>

					<form.Subscribe
						selector={(state) =>
							[state.errorMap.onSubmit, state.isSubmitting] as const
						}
					>
						{([submitError, isSubmitting]) => (
							<>
								{typeof submitError === "string" && (
									<p className="text-destructive text-sm">{submitError}</p>
								)}
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Logging in..." : "Log in"}
								</Button>
							</>
						)}
					</form.Subscribe>

					<p className="text-muted-foreground text-center text-sm">
						No account?{" "}
						<Link to="/register" className="underline">
							Register
						</Link>
					</p>
				</form>
			</CardContent>
		</Card>
	);
};
