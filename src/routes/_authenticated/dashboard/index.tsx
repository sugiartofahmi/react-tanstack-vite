import { createFileRoute } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { SectionBoundary } from "#/components/section-boundary.tsx";
import { PERMISSION } from "#/libs/permissions/permissions.ts";
import { checkRoutePermissions } from "#/libs/permissions/route-guard.ts";
import { ActivityCalendar } from "./_components/activity-calendar.tsx";
import { ActivityChart } from "./_components/activity-chart.tsx";
import { ActivityList } from "./_components/activity-list.tsx";
import {
	dashboardActivitiesQueryOptions,
	useDashboardActivities,
} from "./_hooks/use-dashboard.ts";

const DashboardContent: FC = (): ReactElement => {
	const { activities, isEmpty } = useDashboardActivities();

	return (
		<div className="space-y-4">
			<h1 className="font-bold text-2xl">Dashboard</h1>
			<div className="grid gap-4 lg:grid-cols-2">
				<ActivityChart />
				<ActivityCalendar />
			</div>
			<ActivityList activities={activities} isEmpty={isEmpty} />
		</div>
	);
};

const DashboardPage: FC = (): ReactElement => (
	<SectionBoundary errorMessage="Dashboard activities could not be loaded.">
		<DashboardContent />
	</SectionBoundary>
);

export const Route = createFileRoute("/_authenticated/dashboard/")({
	beforeLoad: checkRoutePermissions({
		permissions: [PERMISSION.DASHBOARD_READ],
	}),
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(dashboardActivitiesQueryOptions()),
	component: DashboardPage,
});
