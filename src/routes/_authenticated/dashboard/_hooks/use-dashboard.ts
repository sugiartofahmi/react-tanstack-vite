import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";
// Real axios call:
// import { api } from "#/libs/axios/client.ts";

export const dashboardActivitySchema = z.object({
	id: z.string(),
	title: z.string(),
	createdAt: z.string(),
});

export type TDashboardActivity = z.infer<typeof dashboardActivitySchema>;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardActivities = async (): Promise<
	TDashboardActivity[]
> => {
	// TODO real call:
	// const { data } = await api.get("/dashboard/activities");
	// return z.array(dashboardActivitySchema).parse(data);

	await delay(200);
	return [
		{
			id: "1",
			title: "System initialized",
			createdAt: new Date().toISOString(),
		},
		{
			id: "2",
			title: "Initial setup verified",
			createdAt: new Date(Date.now() - 3600000).toISOString(),
		},
	];
};

export const DASHBOARD_ACTIVITIES_QUERY_KEY = [
	"dashboard",
	"activities",
] as const;

export const dashboardActivitiesQueryOptions = () =>
	queryOptions({
		queryKey: DASHBOARD_ACTIVITIES_QUERY_KEY,
		queryFn: fetchDashboardActivities,
	});

type TUseDashboardReturn = {
	activities: TDashboardActivity[];
	isEmpty: boolean;
};

export const useDashboardActivities = (): TUseDashboardReturn => {
	const { data } = useSuspenseQuery(dashboardActivitiesQueryOptions());
	return {
		activities: data,
		isEmpty: data.length === 0,
	};
};
