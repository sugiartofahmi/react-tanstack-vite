import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { PublicLayout } from "#/components/layouts/public-layout.tsx";

const PublicLayoutRoute: FC = (): ReactElement => (
	<PublicLayout>
		<Outlet />
	</PublicLayout>
);

export const Route = createFileRoute("/_public")({
	beforeLoad: ({ context }) => {
		if (context.session) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: PublicLayoutRoute,
});
