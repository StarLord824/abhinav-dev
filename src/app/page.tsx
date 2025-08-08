import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import Profile from "@/components/Profile/Profile";

export default function Home() {
  return (
    // <Splash>
      <div className="snap-y snap-mandatory font-sans ">
        {/* <SplashScreen/> */}
        <Navbar />
        <section className="snap-start h-screen w-full bg-violet-800 bg-[radial-gradient(white_0.5px,transparent_0.5px)] [background-size:30px_30px]">
          <Profile/>
        </section>
        <Banner/>
        <section className="snap-start h-[200vh] w-full bg-green-400 bg-[radial-gradient(white_1px,transparent_0.5px)] [background-size:30px_30px]"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-yellow-300"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-red-500"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-orange-600"></section>
      </div>
    // </Splash>
  );
}
