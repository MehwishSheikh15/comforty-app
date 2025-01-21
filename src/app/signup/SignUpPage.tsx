import { SignUp } from '@clerk/nextjs';
import Head from 'next/head';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up - Comforty</title>
        <meta name="description" content="Sign up to Comforty" />
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-indigo-950 mb-6">Create Your Account</h2>

          {/* SignUp component with correct props */}
          <SignUp path="/signup(.*)" routing="path" signInUrl="/login(.*)" />
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
