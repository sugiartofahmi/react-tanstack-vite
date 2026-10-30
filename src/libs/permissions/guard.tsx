import { A } from "@mobily/ts-belt";
import { Fragment } from "react";
import type { FC, ReactElement, ReactNode } from "react";
import { match } from "ts-pattern";
import type { TPermission } from "./permissions.ts";
import { usePermissions } from "./use-permissions.ts";

type TGuardProps = {
	permissions: readonly TPermission[];
	mode?: "all" | "any";
	fallback?: ReactNode;
	children: ReactNode;
};

export const Guard: FC<TGuardProps> = ({
	permissions,
	mode = "all",
	fallback = null,
	children,
}): ReactElement => {
	const { can } = usePermissions();
	const allowed = match(mode)
		.with("all", () => A.every(permissions, can))
		.with("any", () => A.some(permissions, can))
		.exhaustive();

	return match(allowed)
		.with(true, () => <Fragment>{children}</Fragment>)
		.otherwise(() => <Fragment>{fallback}</Fragment>);
};
