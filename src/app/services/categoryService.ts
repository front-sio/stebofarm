import { apiFetch } from "../utils/api";
import { Category } from "../utils/type";

export const createCategory = async (categoryData: { name: string }) => {
  const response = await apiFetch("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryData),
  });

  if (typeof response === "string") {
    throw new Error("Failed to create category: " + response);
  }

  return response;
};

export const getCategories = async () => {
  const response = await apiFetch("/categories", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (typeof response === "string") {
    console.error("Error fetching categories:", response);
    throw new Error("Failed to fetch categories: " + response);
  }

  return response;
};
