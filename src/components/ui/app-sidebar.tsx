import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { FC, ReactElement } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar.tsx";
import { useVisibleNav } from "#/hooks/use-visible-nav.ts";
import { useSignOut } from "#/libs/auth/use-sign-out.ts";

type TProps = {
	userName?: string;
	userEmail?: string;
};

export const AppSidebar: FC<TProps> = ({
	userName,
	userEmail,
}): ReactElement => {
	const signOut = useSignOut();
	const navItems = useVisibleNav();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<span className="truncate px-2 font-semibold text-sm">MNFS.DEV</span>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<Link to={item.to}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<div className="flex items-center justify-between px-2 py-1">
					<span className="text-muted-foreground truncate text-sm">
						{userName || userEmail || "Account"}
					</span>
					<Button variant="ghost" size="icon-sm" onClick={() => void signOut()}>
						<LogOut />
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
