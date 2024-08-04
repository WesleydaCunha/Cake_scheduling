import { ReactNode, useState, useMemo } from 'react';
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { TbListDetails } from "react-icons/tb";
import { BsFillChatTextFill } from "react-icons/bs";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useDate } from '@/context/DateContext';


export function CanceledOrder() {
    const { date, formatDate } = useDate();

    const orders = useMemo(() => [
        { id: 1, name: "Lucas da Rosa dos Santos", phone: "28992572462", time: "17:45", amount: 45.00 },
        { id: 2, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 3, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 4, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 5, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 8, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 9, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 10, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 15, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 13, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
        { id: 12, name: "Maria Silva", phone: "28992572463", time: "18:00", amount: 50.00 },
    ], []);




    const columns: ColumnDef<typeof orders[0]>[] = [
        {
            accessorKey: "name",
            header: "Nome",
        },
        {
            accessorKey: "phone",
            header: "Telefone",
            cell: info => (
                <div className="flex items-center space-x-3">
                    <span>{info.getValue() as ReactNode}</span>
                    <button className="text-blue-500 hover:text-blue-700">
                        <BsFillChatTextFill />
                    </button>
                </div>
            )
        },
        {
            accessorKey: "time",
            header: "Horário",
        },
        {
            accessorKey: "amount",
            header: "Valor",
            cell: info => (
                <span>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(info.getValue() as number)}
                </span>
            )
        },
        {
            id: "details",
            header: "Detalhes",
            cell: (info) => (
                <button onClick={() => redirectToOrder(info.row.original.id)}
                    className="text-blue-500 hover:text-blue-700">
                    <TbListDetails className="text-2xl" />
                </button>
            )
        },
    ];

    const navigate = useNavigate();

    function redirectToOrder(id: number) {

        navigate(`/order/${id}`);
    }


    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = useMemo(() =>
        orders.filter(order =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.amount).toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.time.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm, orders]);

    const table = useReactTable({
        data: filteredOrders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <TabsContent value="cancelada">
            <Card className="p-6 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-4">{date ? formatDate(date) : 'Nenhuma data selecionada'}</h2>
                    <div className="flex pb-2 w-full max-w-sm items-center space-x-2">
                        <Input
                            type="search"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button type="button">
                            <FaSearch />
                        </Button>
                    </div>

                    <Separator className="mb-2" />
                    <ScrollArea className="sm:min-w-[300px] lg:min-w-[550px] xl:min-w-[700px] 2xl:min-w-[950px]  h-[350px]">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableHead key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
        </TabsContent>
    );
}
