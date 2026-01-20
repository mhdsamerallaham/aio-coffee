import './Products.css';
import filtreImage from '../assets/images/filtre.jpg';
import icelatteImage from '../assets/images/icelatte.jpg';
import espressoImage from '../assets/images/espresso.jpg';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Filtre Kahve',
      description: 'Pürüzsüz, dengeli ve mükemmel demlenmiş',
      image: filtreImage
    },
    {
      id: 2,
      name: 'Ice Latte',
      description: 'Espresso ve soğuk sütün ferahlatıcı karışımı',
      image: icelatteImage
    },
    {
      id: 3,
      name: 'Espresso',
      description: 'Zengin, cesur ve yoğun lezzetli',
      image: espressoImage
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-container">
        <h2 className="products-title">Favori Ürünlerimiz</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
