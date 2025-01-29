export default function Categories(props: any) {
    const { categories } = props;


    return (
        <div className="mx-auto my-4 w-fit">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                {categories.map((category: any) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-md p-8 mb-5 mx-5">
                        <div className="flex flex-col items-center">
                            <img src={category.image} alt={category.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                            <h2 className="text-2xl font-semibold">{category.name}</h2>
                        </div>
                        <p className="text-sm font-light">{category.description}</p>
                        <div className="mt-4 flex items-center justify-center">
                            <a href={`/categories/${category.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                View details
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};