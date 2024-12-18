"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";

const DashboardPage: React.FC = () => {
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [saveProductLoading, setSaveProductLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Retrieve user object from local storage
  const user = React.useMemo(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  // Handler for Verify Now button
  const handleVerifyNow = () => {
    setVerifyLoading(true);
    setTimeout(() => {
      setVerifyLoading(false);
      router.push("/verify-account");
    }, 1000);
  };

  // Handler for Add Product button
  const handleAddProduct = () => {
    setProductLoading(true);
    setTimeout(() => {
      setProductLoading(false);
      setShowModal(true);
    }, 1000);
  };

  // Handler to close the modal
  const closeModal = () => {
    setShowModal(false);
    reset();
  };

  // Handler for saving the product
  const handleSaveProduct = async (data: any) => {
    setSaveProductLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category_id", data.category_id);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("description", data.description);
    formData.append("seller_id", user?.id.toString()); // Attach real user.id as seller_id
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await createProduct(formData);
      setSaveProductLoading(false);
      console.log("Product added successfully");
      closeModal();
    } catch (error) {
      setSaveProductLoading(false);
      console.error("Error creating product", error);
    }
  };

  return (
    <div className="w-full h-full relative p-5 bg-gray-50">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="bg-zinc-100 rounded-[15px] p-5 w-[321px] h-[99px]">
            <h2 className="text-black text-xl text-center font-medium">Products</h2>
            <h2 className="text-black text-sm text-center font-medium">1</h2>
          </div>
          <div className="bg-zinc-100 rounded-[15px] p-5 w-[321px] h-[99px]">
            <h2 className="text-black text-xl text-center font-medium">Orders</h2>
            <h2 className="text-black text-sm text-center font-medium">2</h2>
          </div>
        </div>

        {/* Add Product Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-stone-50 p-6 rounded-[15px]">
            <div>
              <h3>Verify Account</h3>
              <p>Complete identity verification to access all Stebofarm services</p>
            </div>
            <div className="mt-4">
              <button 
                onClick={handleVerifyNow}
                className="bg-yellow-400 rounded-[15px] w-[175px] h-[50px]"
              >
                {verifyLoading ? "Verifying..." : "Verify Now"}
              </button>
            </div>
          </div>
          <div className="bg-zinc-100 p-6 rounded-[15px]">
            <div>
              <h3>Add Product</h3>
              <p>Add your first product</p>
            </div>
            <div className="mt-4">
              <button 
                onClick={handleAddProduct}
                className="bg-yellow-400 rounded-[15px] w-[198px] h-[50px]"
              >
                {productLoading ? "Processing..." : "Add Product"}
              </button>
            </div>
          </div>
        </div>

        {/* Product Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-[400px]">
              <h3 className="text-black text-xl font-semibold">Add Product</h3>
              <form onSubmit={handleSubmit(handleSaveProduct)}>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Product Name"
                    {...register("name", { required: true })}
                    className="border p-2 rounded mb-4"
                  />
                  <select
                    {...register("category_id", { required: true })}
                    className="border p-2 rounded mb-4"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Description"
                    {...register("description")}
                    className="border p-2 rounded mb-4"
                  />
                  <input 
                    type="number" 
                    placeholder="Price"
                    {...register("price", { required: true })}
                    className="border p-2 rounded mb-4"
                  />
                  <input 
                    type="number" 
                    placeholder="Quantity"
                    {...register("quantity", { required: true })}
                    className="border p-2 rounded mb-4"
                  />
                  <input 
                    type="file" 
                    {...register("image")}
                    className="border p-2 rounded mb-4"
                  />
                </div>
                <div className="flex justify-between">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    className="bg-gray-300 rounded-[15px] w-[80px] h-[40px]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-yellow-400 rounded-[15px] w-[80px] h-[40px]"
                  >
                    {saveProductLoading ? "Adding..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
