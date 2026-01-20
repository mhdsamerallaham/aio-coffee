import './Location.css';

const Location = () => {
  return (
    <section id="location" className="location">
      <div className="location-container">
        <h2 className="location-title">Find Us</h2>
        
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.735746234567!2d28.97716391531738!3d41.05378797929462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab765a5c5c5c5c%3A0x123456789abcdef!2sCumhuriyet%2C%20Rumeli%20Cd.%2094%2FA%2C%2034380%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1234567890"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AIO Coffee Location"
          />
        </div>
        
        <div className="location-info">
          <p className="location-address">
            Cumhuriyet, Rumeli Cd. 94/A<br />
            34380 Şişli/İstanbul<br />
            Türkiye
          </p>
          <p className="location-contact">
            Telefon: +90 212 123 45 67<br />
            Email: info@aiocoffee.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Location;
