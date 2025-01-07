// import React from "react";

// const page = () => {
//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4 bg-slate-400">
//       <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">
//         Questions Looks Here
//       </h1>
//       <p className="text-center text-gray-600 mb-12">
//         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             What types of chairs do you offer?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             How can we get in touch with you?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             Do your chairs come with a warranty?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             What will be delivered? And When?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             Can I try a chair before purchasing?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//         <div className="border bg-gray-100 rounded-lg shadow-sm p-5">
//           <h2 className="text-lg font-medium flex justify-between items-center">
//             How do I clean and maintain my Comforty chair?
//             <span className="text-gray-400">+</span>
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quis modi ullam amet debitis libero
//             veritatis enim repellat optio natus eum delectus deserunt.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
'use client';
import React, { useState } from "react";

const Page = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle visibility
  };

  const generateAnswer = (index: number) => {
    // You can replace this with a dynamic answer or an API call
    return `This is the answer for question. We offer a wide variety of chairs, including sofas, armchairs, wing chairs, desk chairs, wooden chairs, and park benches. Each chair is designed for comfort and style, ensuring that you find the perfect piece for your home or office.`;
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 rounded-lg shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-gray-200 mb-12">
        Here are some of the most common questions we get about our chairs. If you need more information, feel free to contact us!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          "What types of chairs do you offer?",
          "How can we get in touch with you?",
          "Do your chairs come with a warranty?",
          "What will be delivered? And When?",
          "Can I try a chair before purchasing?",
          "How do I clean and maintain my Comforty chair?",
        ].map((question, index) => (
          <div
            key={index}
            className="border bg-white rounded-lg shadow-lg p-5 transition-all duration-300 hover:scale-105"
          >
            <h2
              className="text-lg font-medium flex justify-between items-center cursor-pointer text-gray-800"
              onClick={() => toggleAnswer(index)}
            >
              {question}
              <span className="text-gray-400 text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </h2>
            <div
              className={`${
                openIndex === index ? "max-h-[1000px]" : "max-h-0"
              } overflow-hidden transition-all duration-500 ease-in-out`}
            >
              {openIndex === index && (
                <p className="text-sm text-gray-600 mt-4">
                  {generateAnswer(index)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
