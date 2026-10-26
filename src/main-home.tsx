import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './home/Home';
import './styles/app.css';
import './styles/sliders.css';
import './styles/nda.css';
import './styles/home.css';

createRoot(document.getElementById('root')!).render(<StrictMode><Home /></StrictMode>);
