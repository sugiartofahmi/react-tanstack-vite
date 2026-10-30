import { Link } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { isForbiddenError } from "#/libs/permissions/route-guard.ts";

export const RouteErrorScreen: FC<ErrorComponentProps> = ({
	error,
	reset,
}): ReactElement => {
	const errorObj: Error =
		error instanceof Error ? error : new Error("An unexpected error occurred.");

	if (isForbiddenError(errorObj)) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-destructive text-xl">
							Access Denied
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground text-sm">
							You do not have permission to view this page.
						</p>
						<Button variant="outline" size="sm" asChild>
							<Link to="/dashboard">Go to Dashboard</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-[50vh] items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-destructive text-xl">
						Something went wrong
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground text-sm">{errorObj.message}</p>
					<div className="flex gap-2">
						<Button variant="default" size="sm" onClick={reset}>
							Try again
						</Button>
						<Button variant="outline" size="sm" asChild>
							<Link to="/dashboard">Go to Dashboard</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
