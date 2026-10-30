import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { FC, ReactElement, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { Skeleton } from "#/components/ui/skeleton.tsx";

type TSectionBoundaryProps = {
	children: ReactNode;
	pending?: ReactNode;
	errorMessage?: string;
};

export const SectionBoundary: FC<TSectionBoundaryProps> = ({
	children,
	pending,
	errorMessage = "This section could not be loaded.",
}): ReactElement => (
	<QueryErrorResetBoundary>
		{({ reset }) => (
			<ErrorBoundary
				onReset={reset}
				fallbackRender={({ resetErrorBoundary }) => (
					<Card className="border-destructive/50">
						<CardHeader>
							<CardTitle className="text-destructive text-base">
								Error
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground text-sm">{errorMessage}</p>
							<Button variant="outline" size="sm" onClick={resetErrorBoundary}>
								Try again
							</Button>
						</CardContent>
					</Card>
				)}
			>
				<Suspense fallback={pending ?? <Skeleton className="h-48 w-full" />}>
					{children}
				</Suspense>
			</ErrorBoundary>
		)}
	</QueryErrorResetBoundary>
);
