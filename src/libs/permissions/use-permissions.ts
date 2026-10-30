import { A } from "@mobily/ts-belt";
import { useStore } from "@tanstack/react-store";
import type { TPermission } from "./permissions.ts";
import { permissionsStore } from "./permissions-store.ts";

type TUsePermissionsReturn = {
	granted: readonly TPermission[];
	can: (permission: TPermission) => boolean;
};

export const usePermissions = (): TUsePermissionsReturn => {
	const granted = useStore(permissionsStore);
	return {
		granted,
		can: (permission: TPermission): boolean => A.includes(granted, permission),
	};
};
