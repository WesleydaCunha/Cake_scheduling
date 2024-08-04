import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { IoAddCircleOutline } from "react-icons/io5";
import { SelectDemo } from '@/components/SelectDemo';
import { useState } from "react";
import { User } from '@/components/SelectDemo';

export function SheetDemo() {
    const [selectedUser, setSelectedUser] = useState<User | undefined>(); 

    const handleSelect = (user: User | undefined) => {
        setSelectedUser(user); 
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="p-4 hover:bg-slate-600 mt-16 rounded-xl flex items-center">
                    <IoAddCircleOutline className='text-xl mr-2' />
                    Novo Agendamento
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-[300px] md:w-[500px] lg:w-[650px] xl:w-[800px] 2xl:w-[1050px]">
                <SheetHeader>
                    <SheetTitle>Realizar agendamento</SheetTitle>
                    <SheetDescription>
                        <Separator className="border-b bg-white" />
                    </SheetDescription>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex ">
                        <Label htmlFor="name" className="p-2.5">Cliente</Label>
                        <div className="ms-2">
                            <SelectDemo onSelect={handleSelect} />
                        </div>
                    </div>
                    {!selectedUser ? (
                        null
                    ) : (
                        <div className="">
                            <p>ID : {selectedUser.id}</p>
                            <p>Email é {selectedUser.email}</p>
                            <p>O telefone é {selectedUser.phone}</p>
                        </div>
                    )}
                </div>
                
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
