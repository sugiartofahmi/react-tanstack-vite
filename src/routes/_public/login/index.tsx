import { createFileRoute } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { LoginForm } from "./_components/login-form.tsx";
import { useLogin } from "./_hooks/use-login.ts";

const LoginPage: FC = (): ReactElement => {
	const { form } = useLogin();
	return <LoginForm form={form} />;
};

export const Route = createFileRoute("/_public/login/")({
	component: LoginPage,
});
