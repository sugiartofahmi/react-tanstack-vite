import { A } from "@mobily/ts-belt";
import { NAV_ITEMS, type TNavItem } from "#/constants/nav.ts";
import { usePermissions } from "#/libs/permissions/use-permissions.ts";

export const useVisibleNav = (): readonly TNavItem[] => {
	const { can } = usePermissions();
	return A.filter(NAV_ITEMS, (item) => can(item.permission));
};
