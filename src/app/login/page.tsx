
'use client';
import { SignIn, SignUp } from '@clerk/nextjs';

const CustomSignIn = () => {
  return (
    <div className="custom-sign-in-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Welcome Back! Please sign in</h2>
      <a 
        href="/signup" 
        className="text-blue-600 underline mb-6 hover:text-blue-800"
      >
        Click here to sign up
      </a>
      <SignIn routing="path" path="/sign-in(.*)" signUpUrl="/signup(.*)" />
      {/* SignUp Component for reference */}
      <SignUp path="/signup(.*)" routing="path" signInUrl="/sign-in(.*)" />
    </div>
  );
};

export default CustomSignIn;

