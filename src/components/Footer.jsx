import './Footer.css';
import logoImage from '../assets/images/logo.png';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={logoImage} alt="AIO Coffee" className="footer-logo-image" />
          </div>
          <p className="footer-slogan">
            {t('footer.slogan')}
          </p>
        </div>
        
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-section-title">{t('footer.visit')}</h4>
            <a
              href="https://maps.app.goo.gl/XDvJ6cygcnvpLAd89"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-address-link"
            >
              <address className="footer-address" dangerouslySetInnerHTML={{ __html: t('location.address') }} />
            </a>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">{t('footer.contact')}</h4>
            <div className="footer-contact">
              <p dangerouslySetInnerHTML={{ __html: t('location.contact.phone') }} />
              <p dangerouslySetInnerHTML={{ __html: t('location.contact.email') }} />
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">{t('footer.follow')}</h4>
            <div className="footer-social">
              <a href="https://www.instagram.com/aio.allinonecoffee?igsh=aWZxZjk2MmR1bnhj&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
