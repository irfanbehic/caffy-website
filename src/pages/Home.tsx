import { Hero } from "../components/Hero";
import { Calculator } from "../components/Calculator";
import { Features } from "../components/Features";
import { Science } from "../components/Science";
import { FAQ } from "../components/FAQ";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <main>
      <Hero />
      <Calculator />
      <Features />
      <Science />
      <FAQ />
      <CTA />
    </main>
  );
}
