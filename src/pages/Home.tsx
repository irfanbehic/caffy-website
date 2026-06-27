import { Hero } from "../components/Hero";
import { Calculator } from "../components/Calculator";
import { Features } from "../components/Features";
import { Gallery } from "../components/Gallery";
import { Science } from "../components/Science";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <main>
      <Hero />
      <Calculator />
      <Features />
      <Gallery />
      <Science />
      <FAQ />
      <CTA />
    </main>
  );
}
