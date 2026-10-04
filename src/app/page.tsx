import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import BrinquedosDestaque from "@/components/home/BrinquedosDestaque";
import ContatoRedes from "@/components/home/ContatoRedes"; 
export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <BrinquedosDestaque />
      <ContatoRedes /> 
    </main>
  );
}