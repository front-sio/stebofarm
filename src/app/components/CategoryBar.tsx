import React from 'react';
import { useRouter } from 'next/router'; // For navigation

export interface Category {
  name: string;
  link: string; // Add the link property here
}


interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const handleNavigation = (link: string) => {
    router.push(link); // Navigate to the category's link
  };

  return (
    <div className="Categories w-[884px] h-6 relative flex gap-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="NavLink text-black text-base font-normal font-['Inter'] leading-normal cursor-pointer"
          onClick={() => handleNavigation(category.link)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
