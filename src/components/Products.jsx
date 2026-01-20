import './Products.css';
import filtreImage from '../assets/images/filtre.jpg';
import icelatteImage from '../assets/images/icelatte.jpg';
import espressoImage from '../assets/images/espresso.jpg';
import { useLanguage } from '../contexts/LanguageContext';

const Products = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 1,
      name: t('products.items.filter.name'),
      description: t('products.items.filter.description'),
      image: filtreImage
    },
    {
      id: 2,
      name: t('products.items.latte.name'),
      description: t('products.items.latte.description'),
      image: icelatteImage
    },
    {
      id: 3,
      name: t('products.items.espresso.name'),
      description: t('products.items.espresso.description'),
      image: espressoImage
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-container">
        <h2 className="products-title">{t('products.title')}</h2>
        
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
