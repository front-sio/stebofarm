import React from 'react';
import './ProductsPage.css';

const MyProductsPage: React.FC = () => {
  return (
    <div className="products-page">
      <div className="header">
        <div className="card">
          <p>products</p>
          <h1>1</h1>
        </div>
        <div className="card">
            <div className="text-black text-xl font-['Lexend Tera']">
              <h3>Add Product</h3>
              <p className="text-neutral-700 text-sm">Add your first product</p>
            </div>
            <div className="mt-4">
              <button 
                
                className="bg-yellow-400 text-neutral-700 rounded-[15px] w-[198px] h-[50px]"
              >
                Add Product
              </button>
            </div>
        </div>
        <div className="card">
        <div className="text-black text-xl font-['Lexend Tera']">
              <h3>Create an offer</h3>
              <p className="text-neutral-700 text-sm">create your first product offer</p>
            </div>
            <div className="mt-4">
              <button 
                
                className="bg-yellow-400 text-neutral-700 rounded-[15px] w-[198px] h-[50px]"
              >
                create offer
              </button>
            </div>
        </div>
      </div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Korosho</td>
            <td>Korosho</td>
            <td>Korosho</td>
            <td>1400</td>
            <td>35000/1kg</td>
            <td><a href="#">Create an Offer</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>230</td>
            <td>230</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td><a href="#">Create an offer</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>400</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">create an offer</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>23</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">Create an offer</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>100</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">Trade</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>100</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">Trade</a></td>
          </tr>
          <tr>
            <td>Korosho</td>
            <td>700</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">Trade</a></td>
          </tr>
          <tr>
            <td>tumbaku</td>
            <td>15</td>
            <td>2045</td>
            <td>35000/1kg</td>
            <td>35000/1kg</td>
            <td><a href="#">Trade</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyProductsPage;

