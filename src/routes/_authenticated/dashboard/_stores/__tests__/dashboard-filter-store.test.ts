import { afterEach, describe, expect, it } from "vitest";
import {
	clearSearchQuery,
	dashboardFilterStore,
	setSearchQuery,
} from "../dashboard-filter-store.ts";

describe("dashboardFilterStore", () => {
	afterEach(() => {
		clearSearchQuery();
	});

	it("initializes with empty search query", () => {
		expect(dashboardFilterStore.state.searchQuery).toBe("");
	});

	it("updates search query via setSearchQuery action", () => {
		setSearchQuery("sync");
		expect(dashboardFilterStore.state.searchQuery).toBe("sync");
	});

	it("clears search query via clearSearchQuery action", () => {
		setSearchQuery("sync");
		clearSearchQuery();
		expect(dashboardFilterStore.state.searchQuery).toBe("");
	});
});
