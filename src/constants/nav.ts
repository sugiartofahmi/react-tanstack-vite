import { LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PERMISSION } from "#/libs/permissions/permissions.ts";
import type { TPermission } from "#/libs/permissions/permissions.ts";

export type TNavItem = {
	title: string;
	to: string;
	icon: LucideIcon;
	permission: TPermission;
};

export const NAV_ITEMS: readonly TNavItem[] = [
	{
		title: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard,
		permission: PERMISSION.DASHBOARD_READ,
	},
];
