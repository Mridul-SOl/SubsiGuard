"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

type Case = {
    id: string;
    beneficiary: string;
    scheme: "PM-KISAN" | "PDS" | "MGNREGA";
    status: "Verified" | "Flagged" | "Pending";
    riskScore: number;
    amount: number;
    date: string;
};

const data: Case[] = [
    { id: "CASE-001", beneficiary: "Ramesh Kumar", scheme: "PM-KISAN", status: "Flagged", riskScore: 88, amount: 6000, date: "2024-02-10" },
    { id: "CASE-002", beneficiary: "Sita Devi", scheme: "PDS", status: "Verified", riskScore: 12, amount: 800, date: "2024-02-11" },
    { id: "CASE-003", beneficiary: "Abdul Rahim", scheme: "MGNREGA", status: "Flagged", riskScore: 92, amount: 12500, date: "2024-02-12" },
    { id: "CASE-004", beneficiary: "John Doe", scheme: "PM-KISAN", status: "Pending", riskScore: 45, amount: 6000, date: "2024-02-12" },
    { id: "CASE-005", beneficiary: "Priya Singh", scheme: "PDS", status: "Verified", riskScore: 5, amount: 1200, date: "2024-02-13" },
];

export function RecentCasesTable() {
    const columns: ColumnDef<Case>[] = [
        {
            accessorKey: "id",
            header: "Case ID",
            cell: ({ row }) => <span className="font-mono text-xs text-slate-500">{row.getValue("id")}</span>,
        },
        {
            accessorKey: "beneficiary",
            header: "Beneficiary Name",
            cell: ({ row }) => <span className="font-medium text-gov-navy">{row.getValue("beneficiary")}</span>,
        },
        {
            accessorKey: "scheme",
            header: "Scheme",
            cell: ({ row }) => (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {row.getValue("scheme")}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let colorClass = "bg-slate-100 text-slate-700 border-slate-200";
                if (status === "Flagged") colorClass = "bg-red-50 text-red-700 border-red-200";
                if (status === "Verified") colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
                if (status === "Pending") colorClass = "bg-amber-50 text-amber-700 border-amber-200";

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "riskScore",
            header: "Risk Score",
            cell: ({ row }) => {
                const score = row.getValue("riskScore") as number;
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${score > 80 ? 'bg-red-500' : score > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${score}%` }}
                            />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{score}%</span>
                    </div>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <Link href={`/results/${row.original.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gov-navy">
                        <Eye className="h-4 w-4" />
                    </Button>
                </Link>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="rounded-md border border-slate-200 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-gov-navy font-bold text-xs uppercase tracking-wider">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className="hover:bg-slate-50/50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
