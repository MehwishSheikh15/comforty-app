
"use client"
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignIn, useAuth } from '@clerk/nextjs';

const SignInPage = () => {
  const { userId } = useAuth(); // Access user ID from Clerk
  const [discountToken, setDiscountToken] = useState<string | null>(null);

  // Generate a discount token when the user signs in
  useEffect(() => {
    if (userId) {
      const token = `DISCOUNT-${userId.slice(-6)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setDiscountToken(token);
    }
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back</h1>

        {/* Sign-In Component */}
        <SignedOut>
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                card: 'shadow-lg border rounded-lg p-6',
                headerTitle: 'text-indigo-600 font-semibold text-lg',
                input: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2 rounded',
                button: 'bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded',
              },
            }}
          />
        </SignedOut>

        {/* Token Display Section */}
        <SignedIn>
          <div className="text-center mt-6">
            {discountToken ? (
              <div className="bg-green-100 text-green-700 p-4 rounded">
                <p className="font-semibold">Your Discount Token:</p>
                <p className="text-lg font-mono">{discountToken}</p>
                <p className="text-sm mt-2">Use this token at checkout to enjoy 10% off!</p>
              </div>
            ) : (
              <p className="text-gray-500">Generating your discount token...</p>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default SignInPage;
