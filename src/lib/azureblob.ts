import { BlobServiceClient } from '@azure/storage-blob';

const sasToken = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN as string;
const containerName = "model";
const storageAccountName = "cakescheduler";

const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net?${sasToken}`
);

export const uploadFile = async (fileName: string, file: File): Promise<string> => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    try {
        await blockBlobClient.uploadBrowserData(file);
        console.log(`File ${fileName} uploaded successfully`);
        return blockBlobClient.url; // Retorna a URL do arquivo
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};

export const deleteFile = async (fileName: string): Promise<void> => {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    try {
        await blockBlobClient.delete();
        console.log(`File ${fileName} deleted successfully`);
    } catch (error) {
        console.error('Delete failed:', error);
    }
};
