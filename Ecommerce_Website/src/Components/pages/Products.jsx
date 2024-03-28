import React, { useEffect, useState } from 'react'
import { createProduct, deleteProduct, getProduct, getProducts, getProductsByApartment, updateProduct } from '../../api/products';
import AddProductModal from '../admin/shared/AddProductModal ';
import UpdateProductModal from '../admin/shared/UpdateProductModal';
import { IoSearchOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { TbCurrencyDong } from "react-icons/tb";
import { MdDeleteForever ,MdEdit} from "react-icons/md";

export default function Products() {
	const[products, setProducts]=useState([]);
	const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
	const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
	const[product, setProduct]=useState(null);
	const fetchProducts = async () => {
        const { type, products } = await getProducts();
        console.log(products);
        if (type === 'error') return type;
        setProducts(products);
    }

    const handleDeleteProduct = async (productId) => {
        console.log(productId);
        const { type, message } = await deleteProduct(productId);
        if (type === 'Error') return message;

        fetchProducts();
    };

    const handleAddProduct = async (newProduct) => {
        console.log(newProduct);
        const { message, product } = await createProduct(newProduct);
        console.log(message);
        if (message === 'error') return message;

        if (product) {
            return fetchProducts();
        }
        setAddProductModalOpen(false);
    };

    const handleInfo = async (id) => {
        const { message, product } = await getProduct(id)
        if (message === 'error') return message;
        if (product) {
            setProduct(product)
            console.log(product);
            setUpdateProductModalOpen(true);
        }
    }

    const handleUpdateProduct = async (product) => {
        const id = product._id;
        const infoProduct = {
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
        const { type, message } = await updateProduct(id, infoProduct)
        if (type === 'Error') return message;

        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto p-8 relative w-full" id='productDashboard'>
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-medium font-sans">Quản lý sản phẩm</h1>
                <button onClick={() => setAddProductModalOpen(true)} className="bg-yellow-400 text-white px-4 py-2 rounded font-sans font-medium">
                    Thêm sản phẩm mới
                </button>
            </div>
			<div>
			<div className="flex items-center space-x-4 ">
                    <span className='font-sans  font-medium'>Tất cả</span>
                    <span className='font-sans  font-medium text-yellow-400 underline  underline-offset-8   '>Đang hoạt động</span>
                    <span className='font-sans  font-medium'>Bị hủy bỏ</span>
                    <span className='font-sans  font-medium'>Đang xét duyệt</span>
                    <span className='font-sans  font-medium'>Bị đình chỉ</span>
                    <span className='font-sans  font-medium'>Nháp</span>
                    <span className='font-sans  font-medium'>Đã xóa</span>
                </div>
			</div>

            <div className="mb-4 mt-4 font-sans border rounded flex flex-col md:flex-row md:justify-between pt-8 pb-8 pl-4 pr-4 bg-gray-200">
				<div className="w-full  mb-4 md:mb-0 mr-2">
					<div className="relative">
						<input type="text" placeholder="Tìm kiếm..." className="w-full px-4 py-2 border rounded focus:outline-none hover:border-yellow-500" />
						<span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
						<IoSearchOutline />
						</span>
					</div>
				</div>
				<div className="w-full font-sans  md:w-auto flex space-x-4 ">
					<select className="w-full md:w-auto px-4 py-2 border rounded  cursor-pointer focus:outline-none hover:border-yellow-500 ">
						<option className='font-sans py-4  '>Giá từ thấp đến cao</option>
						<option className='font-sans py-2 '>Giá từ cao đến thấp</option>
					</select>
					<select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
						<option className='font-sans  ' >Bán chạy</option>
                        
						{/* Thêm các lựa chọn loại sản phẩm vào đây */}
					</select>
                    <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
						<option className="font-sans p-4 hover:bg-yellow-500">Trạng thái</option>
                        <option className='font-sans py-2  ' >Hết hàng</option>
                        <option className='font-sans py-2 '>Còn ít hàng</option>
						{/* Thêm các lựa chọn loại sản phẩm vào đây */}
					</select>
				</div>
			</div>


            <div className="w-full">
				{/* Dòng tiêu đề */}
				<div className="flex bg-gray-200 mb-2 ">
					<div className="w-1/4 py-2 px-4 font-sans font-medium justify-center flex ">Sản phẩm</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Số lượng</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Đã bán</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Đánh giá</div>
					<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Giá bán</div>
                    
					<div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div>
				</div>

				{/* Các dòng sản phẩm */}
				{products.map((product, index) => (
					<div key={product._id} className={`flex rounded bg-white ${index !== 0 ? 'mt-2' : ''}`}>
						<div className="w-1/4  p-4 flex items-center space-x-4 cursor-pointer">
							<img src={product.mainImage} alt={product.name} className="w-10 h-10 object-cover  font-sans " />
							<span className=' font-sans font-medium '>{product.name}</span>
						</div>
						<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{product.quantity}</div>
						<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{product.sold}</div>
						<div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">{product.ratingsAverage} <FaStar className='text-yellow-400 justify-center' /></div>
						<div className="w-1/6  font-sans font-medium justify-center flex p-4 items-center">{product.price} <TbCurrencyDong /></div>
						<div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
							<button onClick={() => handleDeleteProduct(product._id)} className="bg-yellow-400 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded">
                            <MdDeleteForever />
							</button>
                            <button  onClick={() => handleInfo(product._id)} className="bg-yellow-400 text-white px-2 py-1 font-sans font-medium rounded">
                            <MdEdit />
							</button>
						</div>
					</div>
				))}
               
			</div>
            <AddProductModal
                isOpen={isAddProductModalOpen}
                onRequestClose={() => setAddProductModalOpen(false)}
                onAddProduct={handleAddProduct}
                />
           
            {product &&
                <UpdateProductModal
                    isOpen={isUpdateProductModalOpen}
                    onRequestClose={() => setUpdateProductModalOpen(false)}
                    product={{ ...product }}
                    onUpdateProduct={handleUpdateProduct}
                />
            }
        </div>
    );
};
