import { useNavigate, useRouter } from "@tanstack/react-router";
import { cookies } from "#/libs/auth/cookies.ts";
import { clearPermissions } from "#/libs/permissions/permissions-store.ts";

export const useSignOut = () => {
	const router = useRouter();
	const navigate = useNavigate();

	return async (): Promise<void> => {
		cookies.clearAccessToken();
		clearPermissions();
		await router.invalidate();
		await navigate({ to: "/login" });
	};
};
