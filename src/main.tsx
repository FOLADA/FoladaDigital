import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // 🧠 THIS LINE INITIALIZES THE TRANSLATIONS

// Optimize initial render
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

// Enable React concurrent features
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}