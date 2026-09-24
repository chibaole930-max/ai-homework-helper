import {StrictMode, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {AnimatePresence} from 'motion/react';
import App from './App.tsx';
import {IntroSplash} from './components/IntroSplash.tsx';
import './index.css';
import 'katex/dist/katex.min.css';

function Root() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {introDone ? (
        <App key="app" />
      ) : (
        <IntroSplash key="intro" onDone={() => setIntroDone(true)} />
      )}
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);