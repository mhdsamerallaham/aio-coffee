import aboutImage from '../assets/images/about.jpg';
import { useLanguage } from '../contexts/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-image">
            <img 
              src={aboutImage} 
              alt="About AIO Coffee" 
              className="about-img"
            />
          </div>
          
          <div className="about-text">
            <h2 className="about-title">{t('about.title')}</h2>
            <div className="about-description">
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
              <p>{t('about.description3')}</p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 21a8 8 0 0 1 13.292-6.706 8 8 0 0 1 2.706 5.292A8 8 0 0 1 2 21z"/>
                      <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"/>
                      <path d="M12 2v4"/>
                      <path d="M12 18v4"/>
                      <path d="M4.93 4.93l2.83 2.83"/>
                      <path d="M16.24 16.24l2.83 2.83"/>
                      <path d="M2 12h4"/>
                      <path d="M18 12h4"/>
                      <path d="M4.93 19.07l2.83-2.83"/>
                      <path d="M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </div>
                  <span className="feature-text">{t('about.features.feature1')}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                  </div>
                  <span className="feature-text">{t('about.features.feature2')}</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="feature-text">{t('about.features.feature3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
