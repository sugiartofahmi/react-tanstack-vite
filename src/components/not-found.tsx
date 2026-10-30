import { Link } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";

export const NotFoundPage: FC = (): ReactElement => (
	<div className="flex min-h-[50vh] items-center justify-center p-4">
		<Card className="w-full max-w-md text-center">
			<CardHeader>
				<CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-muted-foreground text-sm">
					The page you are looking for does not exist or has been moved.
				</p>
				<Button asChild>
					<Link to="/">Back to Home</Link>
				</Button>
			</CardContent>
		</Card>
	</div>
);
