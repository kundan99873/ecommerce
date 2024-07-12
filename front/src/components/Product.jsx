import { redirect, useNavigate } from "react-router-dom";

const Product = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div>
      {!products ? (
        <h2 className="text-center text-xl">Product not Found</h2>
      ) : (
        <div className="mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white min-w-7 rounded-lg shadow-md p-4 hover-animate hover-animate:hover"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product?.image.url}
                  alt={"product_image"}
                  className="w-full h-52 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-2">
                  {product.description.length < 55
                    ? product.description
                    : product.description.substring(0, 55) + "..."}
                </p>
                <p className="text-gray-900 font-bold">Rs. {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
