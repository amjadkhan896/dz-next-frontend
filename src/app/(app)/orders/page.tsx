// this is the listing page of all orders
import Header from "~/src/components/Header";
import ProductItem from "~/src/components/ProductItem";

export default async function OrdersPage({ searchParams }: { searchParams: { orderId?: string } }) {
  const { orderId } = searchParams;
  // Fetching data from the API
  const response = await fetch(`http://localhost:3000/api/orders${orderId ? '?category=' + orderId : ''}`, {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }


  const { data } = await response.json(); // Extracting the products array


  function renderOrdersList(orders: any[]) {
    return (
      <div className="mx-auto md:mx-20 lg:mx-32 xl:mx-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {orders.map((order) => (
          <div className="max-w-md mx-auto w-[390px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            {/* Order Header */}
            <div className="flex justify-between items-center bg-gray-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">Order #{order.id.slice(-6)}</h2>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${order.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-700">
                <p className="text-gray-500">Username:</p>
                <span className="font-medium">{order.user.name}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <p className="text-gray-500">Timestamp:</p>
                <span className="font-medium">{new Date(order.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Order Items */}
            <ul className="px-6 space-y-3 mb-6">
              {order.cart.items.map((item: any) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-bold">{item.quantity}×</span>
                    <span>{item.price.amount} {item.price.currency}</span>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${item.type === "PRODUCT" ? "bg-blue-600 text-white" : "bg-yellow-500 text-white"
                      }`}
                  >
                    {item.type}
                  </span>
                </li>
              ))}
            </ul>

            {/* Order Summary */}
            <div className="px-6 py-4 bg-gray-100 border-t">
              <div className="flex justify-between text-gray-700">
                <p>Subtotal:</p>
                <span className="font-medium">
                  {order.cart.subtotal.amount} {order.cart.subtotal.currency}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <p>Tax:</p>
                <span className="font-medium">{(order.cart.tax * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-600 border-t pt-3">
                <p>Total:</p>
                <span>
                  {order.cart.total.amount.toFixed(2)} {order.cart.total.currency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


    );
  }

  return (
    <div>
      <Header />

      <div className="mx-auto my-4 w-fit">
        {renderOrdersList(orderId ? data.filter((order: any) => order.id === orderId) : data)}
      </div>
    </div>
  );
}






