import Navbar from '@/components/Navbar';
import React from 'react';
import UseDataFetch from '../../hooks/UseDataFetch';
import { GetStaticProps } from 'next';

interface Users {
    id:number;
  name:string;
  email:string;
}

interface Props {
    initialTodos: Users[];
    error: string | null; 
}

const Index: React.FC<Props> = ({ initialTodos, error }) => {
   
    const { data: users = initialTodos, isLoading } = UseDataFetch<Users[]>('https://jsonplaceholder.typicode.com/users', 'users');

    return (
        <div>
            <Navbar />
            <h1>Static Site Generation with TanStack Query</h1>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error fetching todos: {error}</div>}
            <ul>
                {users.map((users:Users ) => (
                    <li key={users.id}>{users.name}--{users.email}</li>
                ))}
            </ul>
        </div>
    );
};


export const getStaticProps: GetStaticProps = async () => {
    let initialTodos: Users[] = [];
    let error: string | null = null;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        initialTodos = await response.json();
    } catch (err) {
        error = err instanceof Error ? err.message : 'An unknown error occurred';
    }

    return {
        props: {
            initialTodos,
            error,
        },
       
    };
};

export default Index;

