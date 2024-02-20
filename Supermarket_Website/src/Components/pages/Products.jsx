import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../api/products';
import { Link } from 'react-router-dom';
import AddProductModal from '../admin/shared/AddProductModal ';
import UpdateProductModal from '../admin/shared/UpdateProductModal';

export default function Products() {
	const[products, setProducts]=useState([]);
	const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
	const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
	const[product, setProduct]=useState(null);
	const fetchProducts=async()=>{
		const{type,products}=await getProducts();
		console.log(products);
		if(type==='error') return type
		setProducts(products);
		
	}
	const handleDeleteProduct = async (productId) => {
		console.log(productId);
		const{type ,message}=await deleteProduct(productId);
		if(type==='Error') return message;
	
		fetchProducts();
		
	  };
	  const handleAddProduct = async (newProduct) => {
		console.log(newProduct);
			const{message,product}=await createProduct(newProduct);
			console.log(message);
			if(message==='error') return message;
			
			if(product) {
				return fetchProducts();
			 }
			  setAddProductModalOpen(false);
	  };
	  const handleInfo=async (id) => {
		const{message,product}=await getProduct(id)
		if(message==='error') return message;
		if(product) {
		setProduct(product)

		console.log(product);
		setUpdateProductModalOpen(true);
		}
		
	  }
	  const handleUpdateProduct=async(product)=>{
		const id =product._id;
		const infoProduct={
			name: product.name,
			category: product.category,
			price: product.price,
			priceDiscount: product.priceDiscount,
			quantity: product.quantity,
			sold: product.sold,
			isOutOfStock: product.isOutOfStock,
			description: product.description,
		}
		console.log(infoProduct);
		const{type,message}=await updateProduct(id,infoProduct)
		if(type==='Error') return message;
		
		fetchProducts();
		
	  }

	useEffect(() => {
		
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
	  return (
		<div className="container mx-auto p-8 relative w-full" id='productDashboard'>
		  <h1 className="text-3xl font-bold mb-4">Product Dashboard</h1>
	
		  {/* Add Product Button */}
		  
			<button
			 onClick={() => setAddProductModalOpen(true)}
			 className="bg-blue-500 text-white px-4 py-2 rounded">
			  Add Product
			</button>
	
	
		  {/* Product Table */}
		  <table className="mt-8 w-full border-collapse border border-gray-400">
			<thead>
			  <tr className="bg-gray-200">
				<th className="py-2 px-4 border">Name</th>
				<th className="py-2 px-4 border">Image</th>
				<th className="py-2 px-4 border">Quantity</th>
				<th className="py-2 px-4 border">Sold</th>
				<th className="py-2 px-4 border">Ratings</th>
				<th className="py-2 px-4 border">Price</th>
				<th className="py-2 px-4 border">Actions</th>
				{/* Add more table headers as needed */}
			  </tr>
			</thead>
			<tbody>
			  {products.map(product => (
				<tr key={product._id} className="hover:bg-gray-100 cursor-pointer">
				  <td className="py-2 px-4 border" onClick={()=>handleInfo(product._id)}>
					{product.name}
				  </td>
				  <td className="py-2 px-4 border">
					<img
					  src={product.mainImage}
					  alt={product.name}
					  className="w-16 h-16 object-cover"
					/>
				  </td>
				  <td className="py-2 px-4 border">{product.quantity}</td>
				  <td className="py-2 px-4 border">{product.sold}</td>
				  <td className="py-2 px-4 border">{product.ratingsAverage}</td>
				  <td className="py-2 px-4 border">${product.price}</td>
				  <td className="py-2 px-4 border">
					<button
					  onClick={() => handleDeleteProduct(product._id)}
					  className="bg-red-500 text-white px-2 py-1 rounded"
					>
					  Delete
					</button>
				  </td>
				  {/* Add more table cells as needed */}
				</tr>
			  ))}
			</tbody>
		  </table>
				<AddProductModal
				isOpen={isAddProductModalOpen}
				onRequestClose={() => setAddProductModalOpen(false)}
				onAddProduct={handleAddProduct}
			/>
			{
				product ?
			<UpdateProductModal
			isOpen={isUpdateProductModalOpen}
			onRequestClose={() => setUpdateProductModalOpen(false)}
			product={{...product}}
			onUpdateProduct={handleUpdateProduct}
			/> : <div></div>
				}
		</div>
	  );
	};