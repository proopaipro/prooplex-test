import Hero from "@/components/Hero";
import NerveCenter from "@/components/NerveCenter";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Architecture from "@/components/Architecture";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <NerveCenter />
      <Features />
      <Stats />
      <Architecture />
      <Footer />
    </main>
  );
}
