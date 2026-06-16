import SplashScreen from './components/ui/SplashScreen';
import ScrollProgress from './components/ui/ScrollProgress';
import Divider from './components/ui/Divider';
import Hero from './components/sections/Hero';
import FilmStrip from './components/sections/FilmStrip';
import Intro from './components/sections/Intro';
import ForBride from './components/sections/ForBride';
import WhatsIncluded from './components/sections/WhatsIncluded';
import CinematicQuote from './components/sections/CinematicQuote';
import PerfectFor from './components/sections/PerfectFor';
import WhyUs from './components/sections/WhyUs';
import Gallery from './components/sections/Gallery';
import VideoMoment from './components/sections/VideoMoment';
import VideoGallery from './components/sections/VideoGallery';
import LeadForm from './components/sections/LeadForm';
import ClosingQuote from './components/sections/ClosingQuote';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <SplashScreen />
      <ScrollProgress />
      <Hero />
      <FilmStrip />
      <Intro />
      <ForBride />
      <WhatsIncluded />
      <CinematicQuote />
      <PerfectFor />
      <WhyUs />
      <Divider />
      <Gallery />
      <VideoMoment />
      <VideoGallery />
      <LeadForm />
      <ClosingQuote />
      <Footer />
    </main>
  );
}
