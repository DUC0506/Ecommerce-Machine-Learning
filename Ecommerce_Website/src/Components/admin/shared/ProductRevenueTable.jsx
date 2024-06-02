import React from 'react';
import { TbCurrencyDong } from "react-icons/tb";

const ProductRevenueTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Loại sản phẩm</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Số lượng đã bán</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Giảm giá/trả lại hàng</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Doanh thu thực</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-sans font-medium text-gray-500 uppercase tracking-wider">Tổng doanh thu</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((product, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-6 py-4 whitespace-nowrap font-sans">{product.category.name}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans justify-center flex">{product.sold}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans   ">{product.price*product.sold}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans flex items-center justify-center ">{(product.priceDiscount/100)*product.price*product.sold}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans   ">{product.priceAfterDiscount*product.sold}</td>
              <td className="px-6 py-4 whitespace-nowrap font-sans flex items-center justify-center ">{product.priceAfterDiscount*product.sold}<TbCurrencyDong /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductRevenueTable;
