import Hero from "./Home/page"
export default function Home() {
  return (
    <div>
      <Hero/>
    </div>
  );
}
// "use client";
// import Hero from "./Home/page"
// import dynamic from "next/dynamic";
// // import StripePayment from "./components/StripePayment";

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('@/app/checkout/page'),
//   { ssr: false }
// )

// export default function Home() {
//   return (
//     <main>
//       <DynamicComponentWithNoSSR />
//       <Hero/>
//     </main>
//   );
// }