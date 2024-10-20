// src/components/AddProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css'; // Importer le fichier CSS

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [addDate, setAddDate] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [products, setProducts] = useState([]); // État pour stocker les produits ajoutés

    // Fonction pour récupérer les produits depuis l'API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Appeler la fonction lors du chargement du composant
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/products', {
                productName,
                addDate,
                batchNumber,
            });
            setProducts([...products, response.data]); // Ajouter le produit à la liste
            setProductName('');
            setAddDate('');
            setBatchNumber('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Ajouter un produit</h1>
                <div>
                    <label>Nom du produit:</label>
                    <input 
                        type="text" 
                        value={productName} 
                        onChange={(e) => setProductName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Date d'ajout:</label>
                    <input 
                        type="date" 
                        value={addDate} 
                        onChange={(e) => setAddDate(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Numéro de lot:</label>
                    <input 
                        type="text" 
                        value={batchNumber} 
                        onChange={(e) => setBatchNumber(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Ajouter le produit</button>
            </form>

            <h2>Produits ajoutés :</h2>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.productName} - {new Date(product.addDate).toLocaleDateString()} - {product.batchNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddProduct;
