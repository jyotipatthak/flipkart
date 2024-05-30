import React,{useState,useEffect} from "react";


const ProductModal = ({ product, onClose }) => {
    if (!product) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-black">Close</button>
          <img className="w-full mb-2 h-60" src={product.image} alt={product.title} />
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
         
          <p className="text-md font-bold mb-2">Price: ${product.price}</p>
          <button className="hover:bg-black bg-[#35383b] text-white font-serif ml-32 py-1 px-2 mt-4 rounded-xl">
                        Add to Cart
                      </button>
        </div>
      </div>
    );
  };


function Trending() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products/category/women%27s%20clothing?limit=4')
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(json => {
          setProducts(json);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);

     
  
    const handleImageClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
      };


    return (
    
    <div className="container mx-auto p-4">
   

    <h2 className="text-3xl font-bold text-left p-2 text-green-900 underline">Shopping Now</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-8">
        
        <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 rounded-lg shadow-md">
        {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="w-full h-36 object-cover mb-4"
          onClick={() => handleImageClick(product)} />
          <h2 className="text-md ">{product.title}</h2>
          
          <p className="text-xl font-semibold mt-2">${product.price}</p>
        </div>
      ))} 
        </div>
        
    <div className=''>
        <div className=" grid grid-cols-1  sm:grid-cols-2 p-6 md:grid-cols-1 gap-2 rounded-lg shadow-md">
        <img src="./src/assets/wp.webp" alt="error"  />
        <img src="./src/assets/shop.webp" alt="error"  />
    </div>
    {/* <div className=''>
        <img src="./src/assets/f.webp" alt="error"  />
    </div> */}
    </div>
</div>
{isModalOpen && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
</div>
);
}

export default Trending; 