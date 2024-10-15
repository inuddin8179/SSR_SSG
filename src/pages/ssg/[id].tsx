import React from "react";
import { useRouter } from "next/router";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UserProps {
  user: UserData;
}

const User: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

 
  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div>
      <h1>Details for userId {id}</h1>
      <ul>
        <li>ID: {user.id}</li>
        <li>First Name: {user.first_name}</li>
        <li>Last Name: {user.last_name}</li>
        <li>Email: {user.email}</li>
      </ul>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`https://reqres.in/api/users`);
  const result = await response.json();

  const paths = result.data.map((user: { id: number }) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: 'blocking' }; 
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const response = await fetch(`https://reqres.in/api/users/${params.id}`);
  const result = await response.json();


  if (!result.data) {
    return {
      notFound: true, 
    };
  }

  return {
    props: {
      user: result.data, 
    }, 
  };
}

export default User;

