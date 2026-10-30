import type { FC, ReactElement, ReactNode } from "react";

type TPublicLayoutProps = {
	children: ReactNode;
};

export const PublicLayout: FC<TPublicLayoutProps> = ({
	children,
}): ReactElement => (
	<div className="flex min-h-screen items-center justify-center p-4">
		{children}
	</div>
);
