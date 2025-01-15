import { Link, useParams } from "react-router-dom";
import { data } from "../../data.js";
const SingleProduct = () => {
  const { productId } = useParams();
  const product = data.find((item) => item.id == productId);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <Link to="/products" className="text-blue-600 hover:text-blue-800 mb-6">
        Back to Products
      </Link>
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-6">{productId}</h1>
        <p className="text-lg text-gray-800 mb-2">{product.name}</p>
        <p className="text-lg text-gray-800">{product.model}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
