import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { FC, ReactElement } from "react";
import { Toaster } from "#/components/ui/sonner.tsx";
import { resolveSession, type TSession } from "#/libs/auth/session.ts";
import { setPermissions } from "#/libs/permissions/permissions-store.ts";
import type { TPermission } from "#/libs/permissions/permissions.ts";
import TanStackQueryDevtools from "#/libs/tanstack-query/devtools.tsx";
import { getQueryClient } from "#/libs/tanstack-query/index.ts";

export type TRouterContext = {
	queryClient: QueryClient;
	session: TSession | null;
	permissions: readonly TPermission[];
};

const RootLayout: FC = (): ReactElement => (
	<QueryClientProvider client={getQueryClient()}>
		<Outlet />
		<Toaster />
		{import.meta.env.DEV && (
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		)}
	</QueryClientProvider>
);

export const Route = createRootRouteWithContext<TRouterContext>()({
	beforeLoad: async ({ context }) => {
		const { session, permissions } = await resolveSession(context.queryClient);
		setPermissions(permissions);
		return { session, permissions };
	},
	component: RootLayout,
});
