import Link from "next/link";
import AddToCart from "~/src/components/AddToCart";
import Header from "~/src/components/Header";
export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  // Fetching data from the API
  const { productId } = params;
  const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
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
          <h1 className="text-3xl font-bold my-5">{data.name}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.images.map((image: string) => (
              <img key={image} className="w-full h-auto" src={image} alt={data.name} />
            ))}
          </div>
          <p className="text-xl my-5">{data.description}</p>

          <p className="text-2xl font-bold my-4">${data.price.amount}</p>
          <AddToCart product={data} />
          <div className="flex flex-row justify-between my-6 py-6">
            <Link href="/products" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded-full text-center w-40">
              Back
            </Link>
            <Link href="/checkout" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded-full text-center w-40">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}





