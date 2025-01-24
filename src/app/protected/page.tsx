import { useAuth } from '@clerk/nextjs';

const FetchProtectedData = () => {
  const { getToken } = useAuth();

  const fetchData = async () => {
    const token = await getToken({ template: process.env.CLERK_JWT_TEMPLATE });

    const response = await fetch('/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <button
      onClick={fetchData}
      className="bg-indigo-500 text-white px-4 py-2 rounded"
    >
      Fetch Protected Data
    </button>
  );
};

export default FetchProtectedData;
