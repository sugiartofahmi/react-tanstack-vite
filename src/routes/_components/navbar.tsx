import { Link } from "@tanstack/react-router";
import type { FC, ReactElement } from "react";

const navLinks = ["Work", "About", "Contact"];

export const Navbar: FC = (): ReactElement => (
	<header className="border-b">
		<div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
			<Link to="/" className="text-sm font-semibold tracking-tight">
				MNFS.DEV
			</Link>
			<nav className="flex items-center gap-6">
				{navLinks.map((link) => (
					<a
						key={link}
						href={`#${link.toLowerCase()}`}
						className="text-muted-foreground hover:text-foreground text-sm"
					>
						{link}
					</a>
				))}
				<Link
					to="/login"
					className="text-muted-foreground hover:text-foreground text-sm"
				>
					Sign in
				</Link>
			</nav>
		</div>
	</header>
);
