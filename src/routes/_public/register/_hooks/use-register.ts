import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { cookies } from "#/libs/auth/cookies.ts";
import { registerSchema } from "../_schema/register-form-schema.ts";
// Real axios call:
// import { api } from "#/libs/axios/client.ts";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useRegisterForm = () => {
	const router = useRouter();
	const navigate = useNavigate();

	return useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onSubmit: registerSchema,
			onSubmitAsync: async ({ value: _value }) => {
				try {
					// TODO real call:
					// const { data } = await api.post("/auth/register", payload);
					// cookies.setAccessToken(data.data.access_token);

					await delay(500);
					cookies.setAccessToken("mock-access-token");
					await router.invalidate();
					await navigate({ to: "/dashboard" });
					return null;
				} catch (error) {
					return error instanceof Error ? error.message : "Registration failed";
				}
			},
		},
	});
};

export type TRegisterForm = ReturnType<typeof useRegisterForm>;

type TUseRegisterReturn = {
	form: TRegisterForm;
};

export const useRegister = (): TUseRegisterReturn => ({
	form: useRegisterForm(),
});
