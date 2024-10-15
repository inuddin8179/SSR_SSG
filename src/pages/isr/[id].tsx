// import React from "react";
// import { useRouter } from "next/router";
// import UseDataFetch from '../../hooks/UseDataFetch';

// interface UserData {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   avatar: string;
// }

// interface UserProps {
//   user: UserData; 
// }

// const User: React.FC<UserProps> = ({ user }) => {
//   const router = useRouter();
//   const { id } = router.query;

 
//   const { data: userData=user, isLoading } = UseDataFetch<UserData>(
//     `user-${id}`,
//     id ? `http://localhost:5000/data/${id}` : ''
//   );

//   if (isLoading) return <div>Loading...</div>;


//   return (
//     <div>
//       <h1>Details for userId {id}</h1>
//       <ul>
//         <li>ID: {userData.id}</li>
//         <li>First Name: {userData.first_name}</li>
//         <li>Last Name: {userData.last_name}</li>
//         <li>Email: {userData.email}</li>
//       </ul>
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   const response = await fetch(`http://localhost:5000/data`);
//   const result = await response.json();

//   const paths = result.data.map((user: { id: number }) => ({
//     params: { id: user.id.toString() },
//   }));

//   return { paths, fallback: 'blocking' }; 
// }

// export async function getStaticProps({ params }: { params: { id: string } }) {
//   const response = await fetch(`http://localhost:5000/data/${params.id}`);
//   const result = await response.json();

//   return {
//     props: {
//       user: result.data,
//     },
//     revalidate: 10, 
//   };
// }

// export default User;
import React from 'react'

function Isr() {
  return (
    <div>
       hello
    </div>
  )
}

export default Isr



