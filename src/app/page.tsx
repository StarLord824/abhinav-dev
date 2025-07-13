import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div >
      <Navbar />
      <section className="h-screen w-full bg-violet-800"></section>
      <Banner/>
      <section className="h-screen w-full bg-green-400"></section>
      <Banner/>
      <section className="h-screen w-full bg-yellow-300"></section>
      <Banner/>
      <section className="h-screen w-full bg-red-500"></section>
      <Banner/>
      <section className="h-screen w-full bg-orange-600"></section>
    </div>
  );
}
