import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WorkPage from './work/WorkPage';
import './styles/app.css';
import './styles/sliders.css';
import './styles/nda.css';
import './styles/work.css';

createRoot(document.getElementById('root')!).render(<StrictMode><WorkPage /></StrictMode>);
