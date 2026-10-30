import type { FC, ReactElement, ReactNode } from "react";
import { AppSidebar } from "#/components/ui/app-sidebar.tsx";
import { Navbar } from "#/components/ui/navbar.tsx";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar.tsx";
import { TooltipProvider } from "#/components/ui/tooltip.tsx";

type TProtectedLayoutProps = {
	children: ReactNode;
	userName?: string;
	userEmail?: string;
};

export const ProtectedLayout: FC<TProtectedLayoutProps> = ({
	children,
	userName,
	userEmail,
}): ReactElement => (
	<TooltipProvider>
		<SidebarProvider>
			<AppSidebar userName={userName} userEmail={userEmail} />
			<SidebarInset>
				<Navbar />
				<main className="flex-1 p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	</TooltipProvider>
);
