import Footer from "../components/Share/Footer";
import Navbar from "../components/Share/Navbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex flex-col">
        <Navbar />

        <main className="w-full ">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
