import { useState } from 'react';
import GateIntro from './components/intro/GateIntro';
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import ForBride from './components/sections/ForBride';
import WhatsIncluded from './components/sections/WhatsIncluded';
import CinematicQuote from './components/sections/CinematicQuote';
import VideoMoment from './components/sections/VideoMoment';
import PerfectFor from './components/sections/PerfectFor';
import Gallery from './components/sections/Gallery';
import WhyUs from './components/sections/WhyUs';
import VideoGallery from './components/sections/VideoGallery';
import ClosingQuote from './components/sections/ClosingQuote';
import LeadForm from './components/sections/LeadForm';
import Footer from './components/sections/Footer';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      {!introDone && <GateIntro onDone={() => setIntroDone(true)} />}
      <main className="overflow-x-clip">
        <Hero />
        <Intro />
        <ForBride />
        <WhatsIncluded />
        <CinematicQuote />
        <VideoMoment />
        <PerfectFor />
        <Gallery />
        <WhyUs />
        <VideoGallery />
        <ClosingQuote />
        <LeadForm />
        <Footer />
      </main>
    </>
  );
}
