// src/app/page.tsx

import BrinquedosDestaque from "@/components/home/BrinquedosDestaque";
import ContatoRedes from "@/components/home/ContatoRedes";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrinquedosDestaque />
      <ContatoRedes />
    </>
  );
}
