// import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header/>
        {/* <Navbar /> */}
        {children}
    </>
  );
}
