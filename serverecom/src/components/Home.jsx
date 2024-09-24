import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Home = () => {
    const [state, setState] = useState([]);
    const [siz, setSiz] = useState([]);
    const [cart, setCart] = useState();
    const [filteredItems, setFilteredItems] = useState([]);

    const fetchdata = async () => {
        try {
            const res = await axios.get("http://localhost:3004/Products");
            const value = res.data;
            setState(value);
            setSiz(value);  // Initially show all items
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = (e) => {
        let filteredSize = state.filter((val) => {
            return e === val.size;
        });
        setSiz(filteredSize);
    };

    // Update: No need for preventDefault here, just filter by searchTerm
    const handleSearch = (searchTerm) => {
        const filteredProducts = state.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSiz(filteredProducts);
    };

    const handleback = () => {
        setSiz(state);
    };

    const fetchcart = async () => {
        try {
            const res = await axios.get("http://localhost:3004/Cart");
            const vall = res.data;
            setCart(vall);
        } catch (err) {
            console.log(err);
        }
    };

    const handlecart = async (e) => {
        try {
            const addedItems = cart.find((item) => item.id === e.id);
            if (addedItems) {
                const updatedQuantity = addedItems.quantity + 1;
                await axios.patch(`http://localhost:3004/Cart/${addedItems.id}`, {
                    quantity: updatedQuantity,
                });
            } else {
                await axios.post("http://localhost:3004/Cart", e);
                fetchcart();
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchdata();
        fetchcart();
    }, []);

    return (
        <div>
            <Navbar handleSearch={handleSearch} />
            <div className="sizecontainer">
                <ul className="allsizes">
                    <li><button className="size" onClick={() => handleClick("XL")}>XL</button></li>
                    <li><button className="size" onClick={() => handleClick("XS")}>XS</button></li>
                    <li><button className="size" onClick={() => handleClick("M")}>M</button></li>
                    <li><button className="size" onClick={() => handleClick("S")}>S</button></li>
                    <li><button className="size" onClick={() => handleClick("L")}>L</button></li>
                    <li><button className="size" onClick={() => handleClick("XXL")}>XXL</button></li>
                    <li><button className="size" onClick={handleback}>All</button></li>
                </ul>
            </div>
            <div className="container mt-4">
                <h2>Product List :</h2>
                <div className="row">
                    {siz.map((product) => (
                        <div key={product.name} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.image} alt={product.name} className="card-img-top" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Size: {product.size}</p>
                                    <p className="card-text">Price: {product.price}</p>
                                    <button className="btn Enter" onClick={() => handlecart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

