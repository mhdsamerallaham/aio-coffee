import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Location from './components/Location';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <About />
          <Products />
          <Location />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
