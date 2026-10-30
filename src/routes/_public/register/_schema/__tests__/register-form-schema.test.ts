import { describe, expect, it } from "vitest";
import { registerSchema } from "../register-form-schema.ts";

describe("registerSchema", () => {
	it("validates valid registration values", () => {
		const valid = {
			name: "Demo",
			email: "demo@example.com",
			password: "password123",
			confirmPassword: "password123",
		};
		const parsed = registerSchema.safeParse(valid);
		expect(parsed.success).toBe(true);
	});

	it("fails when passwords do not match", () => {
		const mismatch = {
			name: "Demo",
			email: "demo@example.com",
			password: "password123",
			confirmPassword: "password456",
		};
		const parsed = registerSchema.safeParse(mismatch);
		expect(parsed.success).toBe(false);
		if (!parsed.success) {
			expect(parsed.error.issues[0]?.message).toBe("Passwords do not match");
		}
	});

	it("fails when password is too short", () => {
		const tooShort = {
			name: "Demo",
			email: "demo@example.com",
			password: "short",
			confirmPassword: "short",
		};
		const parsed = registerSchema.safeParse(tooShort);
		expect(parsed.success).toBe(false);
	});
});
