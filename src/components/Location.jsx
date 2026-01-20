import './Location.css';

const Location = () => {
  return (
    <section id="location" className="location">
      <div className="location-container">
        <h2 className="location-title">Find Us</h2>
        
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7b3b5%3A0x4e5c7e5c7e5c7e5c!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890"
            className="map-iframe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AIO Coffee Location"
          />
        </div>
        
        <div className="location-info">
          <p className="location-address">
            123 Coffee Street<br />
            New York, NY 10001<br />
            United States
          </p>
          <p className="location-contact">
            Phone: (555) 123-4567<br />
            Email: hello@aiocoffee.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Location;
