import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Guard } from "../guard.tsx";
import { clearPermissions, setPermissions } from "../permissions-store.ts";

describe("Guard component", () => {
	afterEach(() => {
		act(() => {
			clearPermissions();
		});
	});

	it("renders fallback when permission is not granted", () => {
		act(() => {
			setPermissions([]);
		});
		render(
			<Guard permissions={["dashboard:read"]} fallback={<span>No access</span>}>
				<span>Secret content</span>
			</Guard>,
		);
		expect(screen.queryByText("Secret content")).toBeNull();
		expect(screen.getByText("No access")).toBeInTheDocument();
	});

	it("renders children when permission is granted", () => {
		act(() => {
			setPermissions(["dashboard:read"]);
		});
		render(
			<Guard permissions={["dashboard:read"]} fallback={<span>No access</span>}>
				<span>Secret content</span>
			</Guard>,
		);
		expect(screen.getByText("Secret content")).toBeInTheDocument();
		expect(screen.queryByText("No access")).toBeNull();
	});
});
