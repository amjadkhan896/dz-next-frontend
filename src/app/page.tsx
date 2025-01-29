import Header from "~/src/components/Header";
import ProductItem from "~/src/components/ProductItem";

export default async function Home({ searchParams }: { searchParams: { category: string } }) {
  const { category } = searchParams;
  // Fetching data from the API
  const response = await fetch(`http://localhost:3000/api/products${category ? '?category=' + category : ''}`, {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }


  const { data } = await response.json(); // Extracting the products array

  function renderProductList(products: any[]) {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="flex flex-col">
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto p-6 flex">
        {renderProductList(data)}
      </div>
    </div>
  );
}





