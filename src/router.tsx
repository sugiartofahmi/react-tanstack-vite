import { createRouter } from "@tanstack/react-router";
import { NotFoundPage } from "#/components/not-found.tsx";
import { RouteErrorScreen } from "#/components/route-error-screen.tsx";
import { getQueryClient } from "#/libs/tanstack-query/index.ts";
import { routeTree } from "./routeTree.gen.ts";

export const getRouter = () =>
	createRouter({
		routeTree,
		context: {
			queryClient: getQueryClient(),
			session: null,
			permissions: [],
		},
		defaultErrorComponent: RouteErrorScreen,
		defaultNotFoundComponent: NotFoundPage,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
