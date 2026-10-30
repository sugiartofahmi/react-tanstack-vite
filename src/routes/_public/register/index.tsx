import { createFileRoute } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { RegisterForm } from "./_components/register-form.tsx";
import { useRegister } from "./_hooks/use-register.ts";

const RegisterPage: FC = (): ReactElement => {
	const { form } = useRegister();
	return <RegisterForm form={form} />;
};

export const Route = createFileRoute("/_public/register/")({
	component: RegisterPage,
});
