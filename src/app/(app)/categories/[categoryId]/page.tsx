import Router from "next/router";
import Header from "~/src/components/Header";
export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  // Fetching data from the API
  const { categoryId } = params;
  const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const { data } = await response.json(); // Extracting the products array

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6 flex">
        <div className="w-full">
          <h1 className="text-3xl font-bold my-8">{data.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <img key={data.image} className="rounded-lg w-full h-auto" src={data.image} alt={data.name} />

          </div>
          <div className="mb-10 pb-10">
            <p className="text-xl my-5">{data.description}</p>
            <a className="text-blue-500 hover:underline" href={`/products?category=${data.slug}`}>View Category Products</a>
          </div>

        </div>
      </div>
    </div>
  );
}





