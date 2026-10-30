import type { FC, ReactElement } from "react";
import { SidebarTrigger } from "#/components/ui/sidebar.tsx";

export const Navbar: FC = (): ReactElement => (
	<header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
		<SidebarTrigger />
		<span className="font-semibold">MNFS.DEV</span>
	</header>
);
