import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { ProtectedLayout } from "#/components/layouts/protected-layout.tsx";

const AuthenticatedLayoutRoute: FC = (): ReactElement => {
	const { session } = Route.useRouteContext();

	return (
		<ProtectedLayout
			userName={session?.user.name}
			userEmail={session?.user.email}
		>
			<Outlet />
		</ProtectedLayout>
	);
};

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context }) => {
		if (!context.session) {
			throw redirect({ to: "/login" });
		}
	},
	component: AuthenticatedLayoutRoute,
});
