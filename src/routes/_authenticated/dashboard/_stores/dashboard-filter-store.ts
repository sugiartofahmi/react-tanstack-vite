import { Store } from "@tanstack/store";

type TDashboardFilterState = {
	searchQuery: string;
};

export const dashboardFilterStore = new Store<TDashboardFilterState>({
	searchQuery: "",
});

export const setSearchQuery = (searchQuery: string): void => {
	dashboardFilterStore.setState((state) => ({ ...state, searchQuery }));
};

export const clearSearchQuery = (): void => {
	dashboardFilterStore.setState(() => ({ searchQuery: "" }));
};
