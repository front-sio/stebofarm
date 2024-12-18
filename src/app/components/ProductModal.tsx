// import React, { useState } from 'react';

// const AddProductModal = ({ closeModal, handleSaveProduct, saveProductLoading }) => {
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productCategory, setProductCategory] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productQuantity, setProductQuantity] = useState('');
//   const [productImage, setProductImage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setProductImage(file);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Please select a valid image file');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!productName || !productCategory || !productPrice || !productQuantity) {
//       setErrorMessage('Please fill in all fields');
//       return;
//     }

//     // Prepare form data to send to the backend
//     const formData = new FormData();
//     formData.append('name', productName);
//     formData.append('category_id', productCategory);
//     formData.append('price', productPrice);
//     formData.append('quantity', productQuantity);
//     formData.append('description', productDescription);
//     formData.append('seller_id', 1); // Assuming seller_id is known or passed in
//     if (productImage) formData.append('image', productImage);

//     try {
//       // Make the API request to create the product
//       const response = await fetch('/api/products', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         handleSaveProduct(); // Close the modal or handle success
//       } else {
//         setErrorMessage('Failed to add product');
//       }
//     } catch (error) {
//       setErrorMessage('Error adding product');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg w-[400px]">
//         <h3 className="text-black text-xl font-semibold font-['Lexend Tera']">Add Product</h3>
//         <div className="mt-4">
//           <div className="product-group row grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Product Name"
//               className="border p-2 rounded mb-4 w-full"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Product Description"
//               className="border p-2 rounded mb-4 w-full"
//               value={productDescription}
//               onChange={(e) => setProductDescription(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Product Category"
//               className="border p-2 rounded mb-4 w-full"
//               value={productCategory}
//               onChange={(e) => setProductCategory(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Product Price"
//               className="border p-2 rounded mb-4 w-full"
//               value={productPrice}
//               onChange={(e) => setProductPrice(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Product Quantity"
//               className="border p-2 rounded mb-4 w-full"
//               value={productQuantity}
//               onChange={(e) => setProductQuantity(e.target.value)}
//             />
//             <input
//               type="file"
//               className="border p-2 rounded mb-4 w-full"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//           </div>

//           <div className="flex justify-between">
//             <button
//               onClick={closeModal}
//               className="bg-gray-300 text-neutral-700 rounded-[15px] w-[80px] h-[40px]"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="bg-yellow-400 text-neutral-700 rounded-[15px] w-[80px] h-[40px]"
//               disabled={saveProductLoading}
//             >
//               {saveProductLoading ? 'Adding...' : 'Save'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductModal;
