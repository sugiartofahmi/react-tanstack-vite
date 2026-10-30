import { useStore } from "@tanstack/react-store";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ChangeEvent, FC, ReactElement } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { Input } from "#/components/ui/input.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import type { TDashboardActivity } from "../_hooks/use-dashboard.ts";
import {
	dashboardFilterStore,
	setSearchQuery,
} from "../_stores/dashboard-filter-store.ts";

const columns: ColumnDef<TDashboardActivity>[] = [
	{
		accessorKey: "title",
		header: "Activity",
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<Button
				variant="ghost"
				size="sm"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Date
				<ArrowUpDown className="ml-2 size-3.5" />
			</Button>
		),
		cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
	},
];

type TActivityListProps = {
	activities: TDashboardActivity[];
	isEmpty: boolean;
};

export const ActivityList: FC<TActivityListProps> = ({
	activities,
	isEmpty,
}): ReactElement => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const searchQuery = useStore(
		dashboardFilterStore,
		(state) => state.searchQuery,
	);

	const filteredActivities = useMemo(() => {
		if (!searchQuery.trim()) return activities;
		const query = searchQuery.toLowerCase();
		return activities.filter((activity) =>
			activity.title.toLowerCase().includes(query),
		);
	}, [activities, searchQuery]);

	const table = useReactTable({
		data: filteredActivities,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	if (isEmpty) {
		return (
			<Card>
				<CardContent className="text-muted-foreground py-8 text-center">
					No activity yet.
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle className="text-base">Recent Activities</CardTitle>
				<div className="relative w-64">
					<Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
					<Input
						placeholder="Filter activities..."
						value={searchQuery}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setSearchQuery(e.target.value)
						}
						className="pl-8"
					/>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="text-muted-foreground py-6 text-center text-sm"
								>
									No activities matching "{searchQuery}"
								</TableCell>
							</TableRow>
						) : (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
