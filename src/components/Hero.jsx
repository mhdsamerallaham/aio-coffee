import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import heroVideo from '../assets/videos/hero.mp4';
import './Hero.css';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, []);

  return (
    <section id="home" className="hero">
      {/* Video background */}
      <video
        id="hero-video"
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark burgundy overlay */}
      <div className="hero-video-overlay"></div>

      {/* Content */}
      <div className={`hero-content ${videoLoaded ? 'loaded' : ''}`}>
        <h1 className="hero-title">
          {t('hero.title')}
        </h1>
        <p className="hero-subtitle">
          {t('hero.subtitle')}
        </p>
      </div>
    </section>
  );
};

export default Hero;
