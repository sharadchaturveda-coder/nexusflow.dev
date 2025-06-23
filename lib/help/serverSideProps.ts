import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // No specific data needed for this page initially
  };
};
