import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { cookies } from "#/libs/auth/cookies.ts";
import { loginSchema } from "../_schema/login-schema.ts";
// Real axios call:
// import { api } from "#/libs/axios/client.ts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useLoginForm = () => {
	const router = useRouter();
	const navigate = useNavigate();

	return useForm({
		defaultValues: { email: "", password: "" },
		validators: {
			onSubmit: loginSchema,
			onSubmitAsync: async ({ value: _value }) => {
				try {
					// TODO real call:
					// const { data } = await api.post("/auth/login", value);
					// cookies.setAccessToken(data.data.access_token);

					await delay(500);
					cookies.setAccessToken("mock-access-token");
					await router.invalidate();
					await navigate({ to: "/dashboard" });
					return null;
				} catch (error) {
					return error instanceof Error ? error.message : "Sign-in failed";
				}
			},
		},
	});
};

export type TLoginForm = ReturnType<typeof useLoginForm>;

type TUseLoginReturn = {
	form: TLoginForm;
};

export const useLogin = (): TUseLoginReturn => ({ form: useLoginForm() });
