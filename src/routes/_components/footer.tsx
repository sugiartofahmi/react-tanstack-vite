import type { FC, ReactElement } from "react";

export const Footer: FC = (): ReactElement => (
	<footer className="text-muted-foreground border-t py-8 text-center text-sm">
		© {new Date().getFullYear()} MNFS.DEV. All rights reserved.
	</footer>
);
