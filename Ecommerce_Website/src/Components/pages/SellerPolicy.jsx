import React from "react";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
export default function SellerPolicy() {
  return (
    <div className="container mx-auto p-4  w-full  ">
      <div className="ml-2">
        <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
          List of
          <span class=" ml-1 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            policies for sellers.
          </span>{" "}
        </h1>
        <h1 class="mb-4 mt-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          <mark class="px-2 text-white bg-yellow-400 rounded ">Protect</mark>{" "}
          the rights of both sellers and customers.
        </h1>
      </div>
      <div className="mx-auto w-full ">
        <div className="mb-8 fixed bottom-4   right-2 bg-slate-100 cursor-pointer p-4 rounded">
          <h2 className="text-xl font-semibold mb-2 font-sans">
            Bạn cần hỗ trợ gì thêm?
          </h2>
          <div className="flex justify-between w-full py-2 px-4 mr-2">
            <div className="py-2 px-4 bg-white rounded flex items-center font-sans mr-2   ">
              <FaHeadphonesAlt className="text-xl text-yellow-400 mr-1" /> Hỗ
              trợ trực tuyến ?
            </div>
            <div className="flex items-center">
              <AiOutlineMessage className="text-yellow-400 text-3xl bg-yellow-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold mb-6 font-sans ">
        Chính sách của nhà bán hàng
      </h1> */}
      <div className="bg-white shadow-md p-6 rounded-md">
        <div className="mb-8">
          <span class="text-blue-600 dark:text-blue-500">
            {" "}
            #1. Chính sách về sản phẩm
          </span>

          <p class="text-lg font-semibold text-gray-900 font-sans">
            Nhà bán hàng cam kết cung cấp các sản phẩm chất lượng và đáng tin
            cậy cho khách hàng. Mô tả sản phẩm phải đúng sự thật và minh bạch.
            Bất kỳ thông tin về sản phẩm, bao gồm giá cả, kích thước, màu sắc và
            chất liệu, cần phải được cung cấp một cách chính xác và chi tiết.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2 font-sans">
            2. Chính sách giao hàng
          </h2>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            Chúng tôi cam kết giao hàng đúng hẹn và đảm bảo sản phẩm được bảo
            quản tốt trong quá trình vận chuyển. Thời gian giao hàng có thể thay
            đổi tùy thuộc vào địa chỉ nhận hàng của khách hàng, nhưng chúng tôi
            sẽ cố gắng giao hàng một cách nhanh chóng và thuận tiện nhất có thể.
          </p>
        </div>
        <div className="mb-8 font-sans">
          <h2 className="text-xl font-semibold mb-2 font-sans">
            3. Chính sách đổi trả và hoàn tiền
          </h2>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            Nhà bán hàng chấp nhận đổi trả và hoàn tiền trong vòng 30 ngày kể từ
            ngày mua hàng, đảm bảo rằng sản phẩm không bị hỏng và vẫn ở trong
            trạng thái ban đầu. Khách hàng có thể yêu cầu đổi trả hoặc hoàn tiền
            nếu họ không hài lòng với sản phẩm đã mua, với điều kiện sản phẩm
            chưa sử dụng và vẫn trong bao bì gốc.
          </p>
        </div>
        <div className="mb-8 font-sans">
          <h2 className="text-xl font-semibold mb-2 font-sans">
            4. Chính sách thanh toán
          </h2>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            Chúng tôi chấp nhận thanh toán bằng nhiều phương thức khác nhau, bao
            gồm tiền mặt, thẻ tín dụng/debit và chuyển khoản ngân hàng. Thanh
            toán trực tuyến cũng được hỗ trợ thông qua các cổng thanh toán an
            toàn và đáng tin cậy.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 font-sans">
            5. Chính sách bảo mật thông tin
          </h2>
          <p class="text-lg font-semibold text-gray-900 font-sans">
            Nhà bán hàng cam kết bảo vệ thông tin cá nhân của khách hàng và
            không chia sẻ thông tin này với bất kỳ bên thứ ba nào mà không có sự
            đồng ý của khách hàng. Mọi thông tin cá nhân được thu thập sẽ được
            bảo mật và sử dụng chỉ cho mục đích cung cấp dịch vụ cho khách hàng.
          </p>
        </div>
      </div>
    </div>
  );
}
