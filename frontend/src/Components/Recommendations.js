import React from 'react';
import './Recommendations.css';

function Recommendations() {
    return (
        <section className="recommendations">
            <h2>Empfehlungen</h2>
            <div className="product-images">
                <img src="product1.jpg" alt="Product 1" />
                <img src="product2.jpg" alt="Product 2" />
                <img src="product3.jpg" alt="Product 3" />
            </div>
        </section>
    );
}

export default Recommendations;
