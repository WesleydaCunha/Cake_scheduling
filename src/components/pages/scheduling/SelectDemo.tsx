import MultipleSelector, { Option } from '@/components/pages/global/multiple-selector';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
}

export function SelectDemo({ onSelect }: { onSelect?: (selected: User | undefined) => void }) {
    const [options, setOptions] = useState<Option[]>([]);
    const [users, setUsers] = useState<User[]>([]); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await api.get('/user/get', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const fetchedUsers: User[] = await response.data;
                const userOptions: Option[] = fetchedUsers.map((user) => ({
                    label: user.name,
                    value: user.email, 
                }));

                setOptions(userOptions);
                setUsers(fetchedUsers); 
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (selected: Option[]) => {
        const selectedEmail = selected.length > 0 ? selected[0]?.value : undefined;
        const selectedUser = selectedEmail ? users.find(user => user.email === selectedEmail) : undefined;

        onSelect?.(selectedUser);
    };


    return (
        <div className="flex" >
            <MultipleSelector
                maxSelected={1}
                options={options}
                onChange={handleChange}
                placeholder=""
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Resultados não encontrados.
                    </p>
                }
            />
        </div>
    );
}
