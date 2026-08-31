import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const PRODUCT_SECTIONS = [
  'Women',
  'Men',
  'Electronics',
  'Home & Kitchen',
  'Books'
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => p.name && p.name.toLowerCase().includes(search.toLowerCase()));

  const [selectedSection, setSelectedSection] = useState('All');

  const sectionProducts = PRODUCT_SECTIONS.map((section) => ({
    section,
    items: filteredProducts.filter((product) => product.category === section)
  }));

  const visibleSections = selectedSection === 'All'
    ? [{ section: 'All Products', items: filteredProducts }]
    : sectionProducts.filter(({ section }) => section === selectedSection);

  return (
    <div className="shop-container">
      <h2>All Products</h2>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button
          type="button"
          onClick={() => setSelectedSection('All')}
          style={{
            background: selectedSection === 'All' ? '#f97316' : '#18181b',
            color: '#fff',
            border: '1px solid #f97316',
            borderRadius: '999px',
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          All
        </button>
        {PRODUCT_SECTIONS.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => setSelectedSection(section)}
            style={{
              background: selectedSection === section ? '#f97316' : '#18181b',
              color: '#fff',
              border: '1px solid #f97316',
              borderRadius: '999px',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {visibleSections.map(({ section, items }) => (
            items.length > 0 ? (
              <div key={section} style={{ marginBottom: '40px' }}>
                <h3 style={{ color: '#f97316', margin: '20px 0 15px' }}>{section}</h3>
                <div className="product-grid">
                  {items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            ) : null
          ))}

          {filteredProducts.length === 0 && (
            <p style={{ color: '#a1a1aa' }}>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;