import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsBySeller } from '../../api/products';
import { useAuth, useNotification } from '../../hooks';
import { getPromotion } from '../../api/promotion';
import { AiTwotoneShopping } from 'react-icons/ai';
import { addCampaign } from '../../api/campaign';

export default function Campaign() {
    const { idPromotion } = useParams(); 
    // Lấy ID chiến dịch từ URL
    const[promotion,setPromotion]=useState({}); //
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [discountRate, setDiscountRate] = useState(0);
    
    const {updateNotification}= useNotification();
    const{authInfo}=useAuth()
    const navigate=useNavigate()

    useEffect(() => {
        // Fetch promotion details based on promotionId
        // Ví dụ: Đây là nơi bạn sẽ gửi yêu cầu API để lấy thông tin chiến dịch từ ID
      
        fetchProductBySeller()
        fetchPromotionById()
    }, []);
    const fetchProductBySeller= async () => {
        const {type,message,products} = await getProductsBySeller(authInfo.profile._id)
        
        setProducts(products)
    }
    const fetchPromotionById= async () => {
        const{type, message, promotion} = await getPromotion(idPromotion)
     
            setPromotion(promotion)
    }
    console.log("Selected products:", selectedProducts);
    const handleProductSelect = (productId) => {
        const index = selectedProducts.indexOf(productId);
        console.log(index);
        if (index === -1) {
           
            setSelectedProducts([...selectedProducts, productId]);
        } else {
          
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        }
       
    };
    const formData=new FormData()
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Logic to submit selectedProducts and discountRate
        console.log("Selected products:", selectedProducts);
        console.log("Discount rate:", discountRate);
        formData.append('promotion',idPromotion)
        formData.append('discountRate',discountRate)
        formData.append('products',selectedProducts)
        // Reset form
        const {type,message,campaign}= await addCampaign(formData)
        console.log(type);
        if(type==='Error') 
        {
            return updateNotification('error',message)
        }
    
        updateNotification('success',message);
        setSelectedProducts([]);
        setDiscountRate(0);
        navigate(`/dashboard/promotions`)
    };

    // if (!promotion) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className='p-4'>
          
            <div className='border-2 border-slate-200 rounded mt-4' key={promotion.id}>
                        <div className='flex justify-between p-6 bg-yellow-500 rounded-t mb-4'>
                            <div>
                                <h2 className='text-2xl font-sans font-bold mt-2 mb-2'>{`${promotion.name} 【${new Date(promotion.startDate).toDateString()} - ${new Date(promotion.endDate).toDateString()}】`}</h2>
                                <p>{`${new Date(promotion.startDate).toDateString()} (GMT+7) - ${new Date(promotion.endDate).toDateString()} (GMT+7)`}</p>
                            </div>
                            <div><img className='w-32 h-auto rounded-md' src={promotion.mainImage} alt="sale" /></div>
                        </div>
                       
                    </div>
            <form onSubmit={handleSubmit}>
               
               
                <div className="grid grid-cols-2 gap-4 bg-white p-4 mt-8 rounded">
                    {products.map(product => (
                        <div key={product._id}>
                            <label className="flex items-center font-sans text-medium">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product._id)}
                                    onChange={() => handleProductSelect(product._id)}
                                    className="mr-2"
                                />
                                {product.name}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">Discount Rate (%)</label>
                    <input
                        id="discountRate"
                        type="number"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-yellow-400 text-white font-medium py-2 px-4 rounded hover:bg-yellow-500 mt-4">Submit</button>
            </form>
        </div>
    );
}
