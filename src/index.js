import './css/style.css';
import App from './js/app';

document.addEventListener('DOMContentLoaded', () => {
  try {
    new App();
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
});