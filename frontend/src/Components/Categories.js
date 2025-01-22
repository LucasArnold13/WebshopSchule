import React from 'react';
import './Categories.css';

function Categories() {
    return (
        <section className="categories">
            <h2>Kategorien</h2>
            <div className="category-images">
                <img src="category1.jpg" alt="Category 1" />
                <img src="category2.jpg" alt="Category 2" />
                <img src="category3.jpg" alt="Category 3" />
            </div>
        </section>
    );
}

export default Categories;
