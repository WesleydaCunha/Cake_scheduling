import { useState, useEffect, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { api } from "@/lib/axios";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Model {
    id: number;
    cake_name: string;
    image: string;
}

export function ListModels() {
    const [searchTerm, setSearchTerm] = useState("");
    const [models, setModels] = useState<Model[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await api.get("cake/models");
                setModels(response.data);
            } catch (error) {
                console.error('Failed to fetch models:', error);
            }
        };

        fetchModels();
    }, []);

    const filteredModels = useMemo(() => models.filter(model =>
        model.id.toString().includes(searchTerm.toLowerCase()) ||
        model.cake_name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm, models]);

    const columns: ColumnDef<Model>[] = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: true,
        },
        {
            accessorKey: "cake_name",
            header: "Nome",
            enableSorting: true,
        },
        {
            id: "image",
            header: "Imagem",
            accessorKey: "image",
            enableSorting: true,
            cell: info => {
                const imageUrl = info.getValue<string>();
                return (
                    <img
                        src={imageUrl}
                        alt={info.getValue<string>()}
                        className="w-16 h-16 object-cover rounded"
                    />
                );
            }
        },
        {
            id: "edit",
            header: "Editar", 
            cell: () => (
                <button className="text-green-500 hover:text-green-700">
                    <FaEdit className="text-xl" />
                </button>
            )
        },
        {
            id: "delete",
            header: "Excluir",
            cell: () => (
                <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt className="text-xl" />
                </button>
            )
        },
    ], []);

    const table = useReactTable({
        data: filteredModels,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    });

    return (
        <Card className="p-4 shadow-lg">
            <div className="p-4">
                <div className="flex pb-2 w-full max-w-sm items-center space-x-2">
                    <Input
                        type="search"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="button">
                        <FaSearch />
                    </Button>
                </div>

                <Separator className="mb-2" />
                <ScrollArea className="sm:min-w-[650px] lg:min-w-[550px] xl:min-w-[700px] 2xl:min-w-[950px] h-[350px]">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            <span>
                                                {header.column.getIsSorted() === 'asc' ?  <IoIosArrowUp /> : header.column.getIsSorted() === 'desc' ?  <IoIosArrowDown/> : ''}
                                            </span>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </Card>
    );
}
