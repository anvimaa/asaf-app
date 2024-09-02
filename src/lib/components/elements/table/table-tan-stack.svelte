<script lang="ts">
	import { writable } from 'svelte/store';
	import { selectedItems } from '@/stores';

	import * as Table from '@/components/ui/table';
	import { Input } from '@/components/ui/input';
	import * as Select from '@/components/ui/select';
	import { Button } from '@/components/ui/button';
	import * as DropdownMenu from '@/components/ui/dropdown-menu';
	import { Separator } from '@/components/ui/separator';
	import * as Card from '$lib/components/ui/card/index.js';

	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table';

	import type {
		ColumnDef,
		TableOptions,
		FilterFn,
		SortDirection,
		VisibilityState,
		OnChangeFn
	} from '@tanstack/svelte-table';

	import { rankItem } from '@tanstack/match-sorter-utils';
	import {
		ChevronLeft,
		ChevronRight,
		ChevronsLeft,
		ChevronsRight,
		Eye,
		RefreshCw,
		Search
	} from 'lucide-svelte';

	let globalFilter = '';
	let pageSizes = [1, 5, 10, 25, 50, 100];

	export let itens: any[] = [];
	export let columns: ColumnDef<any>[];
	export let showPrinter: boolean = false;
	export let title: string = '';

	function getSortSymbol(isSorted: boolean | SortDirection) {
		return isSorted ? (isSorted === 'asc' ? '🔼' : '🔽') : '';
	}

	const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
		// Rank the item
		const itemRank = rankItem(row.getValue(columnId), value);

		// Store the itemRank info
		addMeta({ itemRank });

		// Return if the item should be filtered in/out
		return itemRank.passed;
	};

	let columnVisibility: VisibilityState = {};

	const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}));
	};

	const options = writable<TableOptions<any>>({
		data: itens,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter
		},
		enableMultiRowSelection: true,
		getPaginationRowModel: getPaginationRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: fuzzyFilter,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility,
			pagination: {
				pageSize: 10,
				pageIndex: 0
			}
		}
	});

	function setCurrentPage(page: number) {
		options.update((old: any) => {
			return {
				...old,
				state: {
					...old.state,
					pagination: {
						...old.state.pagination,
						pageIndex: page
					}
				}
			};
		});
	}

	function setPageSize(value: number) {
		options.update((old: any) => {
			return {
				...old,
				state: {
					...old.state,
					pagination: {
						...old.state?.pagination,
						pageSize: value
					}
				}
			};
		});
	}

	function handleCurrPageInput(e: Event) {
		const target = e.target as HTMLInputElement;
		setCurrentPage(parseInt(target.value) - 1);
	}

	const handleKeyUp = (e: any) => {
		$table.setGlobalFilter(String(e?.target?.value));
	};

	function clickDownload() {
		//exportExcel($table, title, true);
	}

	const rerender = () => {
		options.update((options) => ({
			...options,
			data: itens
		}));
	};

	const table = createSvelteTable(options);

	let items: any[] = [];
	let selected: any[] = [];
	function toggleSelection(item: any) {
		if (selected.includes(item)) {
			selected = selected.filter((i) => i !== item);
		} else {
			selected = [...selected, item];
		}
		selectedItems.set(selected);
	}
</script>

<div class="flex flex-col">
	<Card.Root
		data-x-chunk-name="dashboard-04-chunk-1"
		data-x-chunk-description="A form to update the store name."
	>
		<Card.Header>
			<Card.Title>
				{title}
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="flex gap-x-2">
				<div class="hidden md:block">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button variant="outline" builders={[builder]}>
								<Eye class="h-4 w-4" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-56">
							<DropdownMenu.Label>Ver Colunas</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.CheckboxItem
								checked={$table.getIsAllColumnsVisible()}
								onCheckedChange={(e) => {
									console.info($table.getToggleAllColumnsVisibilityHandler()(e));
								}}
							>
								Todas Colunas
							</DropdownMenu.CheckboxItem>

							{#each $table.getAllLeafColumns() as column}
								<div class="form-control px-1">
									<label class="label cursor-pointer">
										<input
											checked={column.getIsVisible()}
											on:change={column.getToggleVisibilityHandler()}
											type="checkbox"
											class="checkbox"
										/>
										<span class="label-text ml-2">
											{column.id}
										</span>
									</label>
								</div>
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					<Button on:click={() => rerender()} class="btn btn-circle btn-accent">
						<RefreshCw class="h-4 w-4" />
					</Button>
				</div>

				<div class="relative w-full flex-1">
					<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Pesquisar"
						class="w-full appearance-none bg-background pl-8 shadow-none"
						bind:value={globalFilter}
						on:keyup={handleKeyUp}
					/>
				</div>
			</div>

			<Separator />

			<div class="relative overflow-x-auto">
				<Table.Root>
					<Table.Header>
						{#each $table.getHeaderGroups() as headerGroup}
							<Table.Row>
								{#if showPrinter}
									<Table.Head class="text-center">-</Table.Head>
								{/if}

								{#each headerGroup.headers as header, idx}
									<Table.Head scope="col">
										{#if !header.isPlaceholder}
											<button
												class=""
												class:is-disabled={!header.column.getCanSort()}
												disabled={!header.column.getCanSort()}
												on:click={header.column.getToggleSortingHandler()}
											>
												<svelte:component
													this={flexRender(header.column.columnDef.header, header.getContext())}
												/>
												<span class="pl-1">
													{getSortSymbol(header.column.getIsSorted())}
												</span>
											</button>
										{/if}
									</Table.Head>
								{/each}
							</Table.Row>
						{/each}
					</Table.Header>

					<Table.Body>
						{#if itens.length > 0}
							{#each $table.getRowModel().rows as row}
								<Table.Row>
									{#if showPrinter}
										<Table.Cell class="text-center">
											<input
												type="checkbox"
												class="checkbox checkbox-primary"
												on:change={() => toggleSelection(row.original)}
											/>
										</Table.Cell>
									{/if}
									{#each row.getVisibleCells() as cell}
										<Table.Cell>
											<svelte:component
												this={flexRender(cell.column.columnDef.cell, cell.getContext())}
											/>
										</Table.Cell>
									{/each}
								</Table.Row>
							{/each}
						{:else}
							<p class="mt-8 text-2xl font-bold">Nenhum dado encontrado</p>
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
		</Card.Content>
		<Card.Footer class="flex items-center justify-between">
			<div class=" hidden items-center justify-center lg:flex">
				<span class="mr-2">
					Página {$table.getState().pagination.pageIndex + 1} de {$table.getPageCount()} |
					{$table.getPrePaginationRowModel().rows.length} Registros
				</span>

				<Select.Root
					selected={{
						label: `Ver ${$table.getState().pagination.pageSize} registros`,
						value: $table.getState().pagination.pageSize
					}}
					onSelectedChange={(v) => {
						setPageSize(v?.value || 10);
					}}
				>
					<Select.Trigger value={$table.getState().pagination.pageSize} class="w-[180px]">
						<Select.Value placeholder="Registros" />
					</Select.Trigger>
					<Select.Content>
						{#each pageSizes as pageSize}
							<Select.Item value={pageSize} label={`Ver ${pageSize} registros`} />
						{/each}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="join items-center justify-center">
				<button
					class="btn"
					on:click={() => setCurrentPage(0)}
					class:is-disabled={!$table.getCanPreviousPage()}
					disabled={!$table.getCanPreviousPage()}
				>
					<ChevronsLeft class="h-4 w-4" />
				</button>
				<button
					class="btn"
					on:click={() => setCurrentPage($table.getState().pagination.pageIndex - 1)}
					class:is-disabled={!$table.getCanPreviousPage()}
					disabled={!$table.getCanPreviousPage()}
				>
					<ChevronLeft class="h-4 w-4" />
				</button>

				<button
					class="btn"
					on:click={() => setCurrentPage($table.getState().pagination.pageIndex + 1)}
					class:is-disabled={!$table.getCanNextPage()}
					disabled={!$table.getCanNextPage()}
				>
					<ChevronRight class="h-4 w-4" />
				</button>
				<button
					class="btn"
					on:click={() => setCurrentPage($table.getPageCount() - 1)}
					class:is-disabled={!$table.getCanNextPage()}
					disabled={!$table.getCanNextPage()}
				>
					<ChevronsRight class="h-4 w-4" />
				</button>
			</div>
		</Card.Footer>
	</Card.Root>
</div>

<style>
	.btn {
		@apply m-1 rounded border border-gray-300 bg-white p-2 text-xs text-gray-800 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-slate-900 dark:text-white;
	}
</style>
