import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import { Sidebar } from '@/components/Sidebar';
//import { Toolbar } from '@material-ui/core';
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { AcceptedOrder } from '@/components/AcceptedOrder';
import { PendingOrder } from '@/components/PendingOrder';
import { CanceledOrder } from '@/components/CanceledOrder';
import { DeliveredOrder } from '@/components/DeliveredOrder';
import { useDate } from '@/context/DateContext';
import { SheetDemo } from '@/components/CreateScheduling';
import { Navbar } from '@/components/Navbar';


export function Home() {
    const { date, setDate} = useDate();


    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error('ThemeContext must be used within a ThemeProvider');
    }

   

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-1 border-s align-top mb-2 bg-secondary-color">
                <Navbar />
                <Separator className='mb-1 bgc' />
                <div className="flex flex-col lg:flex-row gap-6 p-4">
                    <div className='flex flex-col lg:w-1/4'>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                            <SheetDemo/>
                        
                    </div>
                    <div className='flex flex-col lg:flex-3 border rounded-lg p-4'>
                        <Tabs defaultValue="pendente" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="pendente">Pendente</TabsTrigger>
                                <TabsTrigger value="concluido">Aceito</TabsTrigger>
                                <TabsTrigger value="entregue">Entregue</TabsTrigger>
                                <TabsTrigger value="cancelada">Cancelado</TabsTrigger>
                            </TabsList>
                            <TabsContent value="pendente"><PendingOrder /></TabsContent>
                            <TabsContent value="concluido"><AcceptedOrder /></TabsContent>
                            <TabsContent value="entregue"><DeliveredOrder /></TabsContent>
                            <TabsContent value="cancelada"><CanceledOrder /></TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}
