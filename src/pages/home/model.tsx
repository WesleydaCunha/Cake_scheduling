//import { useContext, useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
//import { Toolbar } from '@material-ui/core';
import { Separator } from "@/components/ui/separator";

//import { Button } from '@/components/ui/button';
//import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//import { useDate } from '@/context/DateContext';
//import { IoAddCircleOutline } from "react-icons/io5";
import { Navbar } from "@/components/Navbar";
import { CreateModel } from '@/components/CreateModel';



export function Model() {
    //const { date, setDate } = useDate();
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-1 border-s align-top mb-2 bg-secondary-color">
                <Navbar />
                <Separator className='mb-1 bgc' />
                <div className="flex p-3">
                    <CreateModel />
                </div>
                
            </main>
        </div>
    );
}