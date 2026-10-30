import { describe, expect, it } from "vitest";
import { canAll, canAny } from "../permissions.ts";

describe("permissions logic", () => {
	const granted = ["dashboard:read", "user:manage"] as const;

	it("canAll returns true when all permissions are granted", () => {
		expect(canAll(granted, ["dashboard:read"])).toBe(true);
		expect(canAll(granted, ["dashboard:read", "user:manage"])).toBe(true);
	});

	it("canAll returns false if any permission is missing", () => {
		expect(canAll(granted, ["dashboard:read", "unknown:permission"])).toBe(
			false,
		);
	});

	it("canAny returns true if at least one permission is granted", () => {
		expect(canAny(granted, ["dashboard:read", "unknown:permission"])).toBe(
			true,
		);
	});

	it("canAny returns false if none are granted", () => {
		expect(canAny(granted, ["other:permission", "unknown:permission"])).toBe(
			false,
		);
	});
});
