import { Link } from "react-router-dom";
import { data } from "../../data.js";

const Products = () => {
  return (
    <div className="mt-5 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product, id) => {
          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-5">
                <div className="font-mono text-2xl mb-2 text-gray-900">
                  {product.name}
                </div>
                <div className="font-mono text-base mb-4 text-gray-600">
                  {product.model}
                </div>
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-500 hover:text-blue-700 hover:underline"
                >
                  View Product
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
