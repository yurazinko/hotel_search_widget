// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import React from 'react';
import { createRoot } from 'react-dom/client';
import SearchWidget from './components/SearchWidget';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('search-widget');
  if (el) createRoot(el).render(<SearchWidget />);
});