import Categories from "~/src/components/Categories";
import Header from "~/src/components/Header";
import ProductItem from "~/src/components/ProductItem";

export default async function CategoriesPage() {
  // Fetching data from the API
  const response = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const { data: categories } = await response.json(); // Extracting the products array


  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 flex">
        <Categories categories={categories} />
      </div>
    </div>
  );
}





