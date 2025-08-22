import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import NavLinks from "@/components/NavLinks/NavLinks";
import Profile from "@/components/Profile/Profile";

export default function Home() {
  return (
    // <Splash>
      <div className="snap-y snap-mandatory font-sans ">
        {/* <SplashScreen/> */}
        <Navbar />
        <div className="snap-start flex flex-col items-start  h-screen w-full bg-violet-800 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px]">
          <Profile/>
          <NavLinks/>
        </div>
        <Banner/>
        <section className="snap-start h-[200vh] w-full bg-green-400 bg-[radial-gradient(white_1.2px,transparent_0.5px)] [background-size:30px_30px]"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-yellow-300 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px]"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-red-500 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px]"></section>
        <Banner/>
        <section className="snap-start h-screen w-full bg-orange-600 bg-[radial-gradient(white_1.3px,transparent_0.5px)] [background-size:30px_30px]"></section>
      </div>
    // </Splash>
  );
}
