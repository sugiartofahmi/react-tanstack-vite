import { createFileRoute, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { FC, ReactElement } from "react";
import { Footer } from "./_components/footer.tsx";
import { Navbar } from "./_components/navbar.tsx";

const LandingPage: FC = (): ReactElement => (
	<div className="flex min-h-screen flex-col">
		<Navbar />

		<main className="mx-auto flex w-full max-w-3xl flex-1 items-center px-4 py-24">
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="space-y-6"
			>
				<div className="from-primary to-primary/40 size-16 rounded-full bg-gradient-to-br" />
				<h1 className="text-3xl font-bold tracking-tight">Hi, I'm MNFS.</h1>
			</motion.div>
		</main>

		<Footer />
	</div>
);

export const Route = createFileRoute("/")({
	beforeLoad: ({ context }) => {
		if (context.session) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: LandingPage,
});
