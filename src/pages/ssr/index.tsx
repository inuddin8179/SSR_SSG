import Navbar from '@/components/Navbar';
import React from 'react';
import { QueryClient, Hydrate,dehydrate } from '@tanstack/react-query';
import useDataFetch from '@/hooks/UseDataFetch';
import { GetServerSideProps } from 'next';

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface Props {
    initialTodos: Todo[];
    dehydratedState:Todo[]
    error: string | null;
}

const dataFetch = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    return response.json();
};

const Index: React.FC<Props> = ({ initialTodos,dehydratedState}) => {
    
  const {data:todos,isLoading,isError}=useDataFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos','todo',initialTodos)


    return (
        <Hydrate state={dehydratedState}>
             <div>
            <Navbar />
            <h1>Server Side Rendering with TanStack Query</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error...</div>}
            <ul>
                {todos?.slice(0,10).map((todo: Todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
        </Hydrate>
       
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

     await queryClient.prefetchQuery({
        queryKey: ['todos'],
        queryFn: dataFetch,
      })
      const initialTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

    return {
        props: {
            initialTodos,
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Index