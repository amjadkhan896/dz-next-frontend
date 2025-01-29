import Cart from "./Cart";

export default function Header(props: any) {
    const { hideCart } = props;

    return (
        <header className="bg-gray-100 border-b px-6 py-6 flex justify-between space-x-4 sm:space-x-6 shadow-md">
            <div className="flex items-center space-x-4">
                <a href="/" className="text-4xl font-bold hover:text-blue-500">
                    <span className="text-blue-500">E</span>Commerce
                </a>
                <nav className="hidden sm:flex flex-row space-x-6 mt-2 ml-5">
                    <a href="/products" className="hover:text-blue-500">
                        Products
                    </a>
                    <a href="/categories" className="hover:text-blue-500">
                        Categories
                    </a>
                    <a href="/orders" className="hover:text-blue-500">
                        Orders
                    </a>
                </nav>
            </div>
            {!hideCart && (
                <Cart />
            )}

        </header>
    );
}
