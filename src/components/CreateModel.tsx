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
import { FileUploadDropzone } from "./DropzoneOptions";


//import { useState } from "react";


export function CreateModel() {
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className=" ms-auto  hover:bg-slate-600  rounded-xl flex items-center">
                    <IoAddCircleOutline className='text-xl mr-2' />
                    Novo Modelo
                </Button>
            </SheetTrigger>
            <SheetContent  className="sm:w-[300px] md:w-[500px] lg:w-[650px] xl:w-[800px] 2xl:w-[1050px]">
                <SheetHeader>
                    <SheetTitle>Cadastrar Modelo</SheetTitle>
                    <SheetDescription>
                        <Separator className="border-b bg-white" />
                    </SheetDescription>
                </SheetHeader>

                <div className="grid gap-4 py-4">
                    <div className="">
                        <Label htmlFor="name" className="pt-4 ps-4 pb-0">Upload da imagem Modelo</Label>
                        <div className="ms-2">
                            <FileUploadDropzone />
                           
                        </div>
                    </div>
                    
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
