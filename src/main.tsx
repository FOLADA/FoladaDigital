import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
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
  // Remove the minimal content that was in index.html
  rootElement.innerHTML = '';
  
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}