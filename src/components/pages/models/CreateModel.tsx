import React, { useState } from 'react';
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
import { FileUploadDropzone } from "@/components/pages/models/FileUploadDropzone";
import { Input } from "@/components/ui/input";
import { api } from '@/lib/axios';
import { toast } from '@/components/ui/use-toast';



export function CreateModel() {
    const [nameModel, setNameModel] = useState<string>('');
    const [imageURL, setImageURL] = useState<string | null>(null);
   
    const [submitError, setSubmitError] = useState<string | null>(null);

   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nameModel || !imageURL) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "Por favor, preencha todos os campos."
            });
            return ;
        }
        setSubmitError(null);

        try {
            await api.post('cake/models/register', {
                cake_name: nameModel,
                image: imageURL
            });
            toast({
                title: "Sucesso!",
                description: "Modelo cadastrado com sucesso"
            });

            setNameModel('');
            setImageURL(null);
        } catch (error) {
            setSubmitError('Ocorreu um problema ao registrar o Modelo. Tente novamente mais tarde, se persistir contate o suporte!');
            toast({
                variant: "destructive",
                title: "Erro ao cadastrar modelo",
                description: submitError
            });
        } 
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="ms-auto hover:bg-slate-600 rounded-xl flex items-center">
                    <IoAddCircleOutline className='text-xl mr-2' />
                    Novo Modelo
                </Button>
            </SheetTrigger>
            <SheetContent className="p-6">
                <SheetHeader>
                    <SheetTitle className="text-center">Cadastrar Modelo</SheetTitle>
                    <SheetDescription>
                        <Separator className="border-b bg-gray-200 my-4" />
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6 py-4">
                        <div>
                            <Label htmlFor="name_model" className="block text-sm font-medium">Nome do bolo</Label>
                            <Input
                                id="name_model"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                required
                                value={nameModel}
                                onChange={(e) => setNameModel(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="upload_image" className="block text-sm font-medium pb-1">Upload da Imagem</Label>
                            <FileUploadDropzone onUploadURLChange={setImageURL} />
                        </div>
                    </div>

                    <SheetFooter className="flex justify-center">
                        <SheetClose asChild>
                            <Button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 ms-auto mr-auto p-6 mt-5 text-xl text-white"
                                disabled={!nameModel || !imageURL}
                            >
                                Salvar
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
