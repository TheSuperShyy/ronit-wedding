import { useState } from 'react';
import GateIntro from './components/intro/GateIntro';
import Redesign from './components/redesign/Redesign';

export default function App() {
  // The gate plays first; once it opens we flip `ready`, which boots the
  // Lenis + ScrollTrigger scroll system for the page behind it.
  const [ready, setReady] = useState(false);
  return (
    <>
      {!ready && <GateIntro onDone={() => setReady(true)} />}
      <Redesign ready={ready} />
    </>
  );
}
