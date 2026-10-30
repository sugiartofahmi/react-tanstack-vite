import { describe, expect, it } from "vitest";
import { loginSchema } from "../login-schema.ts";

describe("loginSchema", () => {
	it("validates valid login requests", () => {
		const parsed = loginSchema.safeParse({
			email: "demo@example.com",
			password: "password123",
		});
		expect(parsed.success).toBe(true);
	});

	it("fails for invalid email", () => {
		const parsed = loginSchema.safeParse({
			email: "invalid-email",
			password: "password123",
		});
		expect(parsed.success).toBe(false);
	});

	it("fails for empty password", () => {
		const parsed = loginSchema.safeParse({
			email: "demo@example.com",
			password: "",
		});
		expect(parsed.success).toBe(false);
	});
});
