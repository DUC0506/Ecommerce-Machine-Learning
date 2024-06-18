import React, { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProduct,
  // getProducts,
  // getProductsByApartment,
  getProductsBySeller,
  updateProduct,
} from "../../api/products";
import AddProductModal from "../admin/shared/AddProductModal ";
import UpdateProductModal from "../admin/shared/UpdateProductModal";

import { TbCurrencyDong } from "react-icons/tb";

import { useAuth, useNotification } from "../../hooks";
// import productGif from "../../assets/product.gif.gif";
// import { VscDebugContinue } from "react-icons/vsc";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import NoItem from "../admin/shared/NoItem";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setUpdateProductModalOpen] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [product, setProduct] = useState(null);
  // const [showGif, setShowGif] = useState(false);
  const { authInfo } = useAuth();
  const { updateNotification } = useNotification();
  const fetchProducts = async () => {
    const { type, products } = await getProductsBySeller(
      authInfo.profile._id,
      pagination
    );

    if (type === "Success") {
      console.log(products);
      setProducts(products);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const { type, message } = await deleteProduct(productId);
    if (type === "Error") return message;
    updateNotification("success", "Product successfully deleted");
    fetchProducts();
  };

  const handleAddProduct = async (newProduct) => {
    const { message, product } = await createProduct(newProduct);
    console.log(message);
    if (message === "error") return message;

    if (product) {
      setAddProductModalOpen(false);
      updateNotification("success", "Product successfully added");
      return fetchProducts();
    }
  };

  const handleInfo = async (id) => {
    const { message, product } = await getProduct(id);
    if (message === "error") return message;
    if (product) {
      setProduct(product);
      console.log(product);
      setUpdateProductModalOpen(true);
    }
  };

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
    };
    console.log(infoProduct);
    const { type, message } = await updateProduct(id, infoProduct);
    if (type === "Error") return message;
    updateNotification("success", "Product successfully updated");
    fetchProducts();
  };
  // const handleShowGif = () => {
  //   setShowGif(false);
  // };
  const handleModalOpen = () => {
    // setShowGif(false);
    setAddProductModalOpen(true);
  };
  const handlePre = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };
  const handleNext = () => {
    setPagination(pagination + 1);
  };

  useEffect(() => {
    // setShowGif(true);
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  // return (
  //     <div className="container mx-auto p-8 relative w-full" id='productDashboard'>

  //         <div className="flex justify-between mb-4">
  //             <h1 className="text-3xl font-medium font-sans">Quản lý sản phẩm</h1>
  //             <button onClick={() => setAddProductModalOpen(true)} className="bg-yellow-400 flex items-center hover:bg-yellow-500 text-white px-4 py-2 rounded font-sans font-medium">
  //                 <FaPlus className='mr-1' /> Thêm sản phẩm mới
  //             </button>
  //         </div>
  // 		<div>
  // 		<div className="flex items-center space-x-4 ">
  //                 <span className='font-sans  font-medium'>Tất cả</span>
  //                 <span className='font-sans  font-medium text-yellow-400 underline  underline-offset-8   '>Đang hoạt động</span>
  //                 <span className='font-sans  font-medium'>Bị hủy bỏ</span>
  //                 <span className='font-sans  font-medium'>Đang xét duyệt</span>
  //                 <span className='font-sans  font-medium'>Bị đình chỉ</span>
  //                 <span className='font-sans  font-medium'>Nháp</span>
  //                 <span className='font-sans  font-medium'>Đã xóa</span>
  //             </div>
  // 		</div>

  //         <div className="mb-4 mt-4 relative font-sans border rounded flex flex-col md:flex-row md:justify-between pt-8 pb-8 pl-4 pr-4 bg-gray-200">
  //             <div className={`absolute h-screen mb-4 w-full z-50 bg-white  p-2 rounded ${showGif ?'flex':'hidden' }`    }>
  //                 <div className='w-1/3'>
  //                     <div className='font-sans text-xl font-semibold p-4'>
  //                         Tải sản phẩm đầu tiên lên
  //                     </div>
  //                     <div className='p-4'>
  //                         <div className='font-sans flex items-center'>
  //                          <FaCheckCircle className='mr-1 text-2xl text-yellow-400 w-1/6' />
  //                          <div className='w-5/6 font-sans'>
  //                             Điền thông tin sản phẩm theo yêu cầu.
  //                             Thông tin sản phẩm chất lượng có thể tăng doanh  số bán hàng trực tuyến của bạn.
  //                         </div>
  //                         </div>
  //                         <div className='font-sans flex items-center mt-4'>
  //                             <FaCheckCircle className='mr-1 text-2xl text-yellow-400 w-1/6' />
  //                             <div className='w-5/6 font-sans'>
  //                             Sản phẩm sẽ được hiển thị công khai
  //                             </div>
  //                         </div>
  //                         <div className='mt-8 flex ml-auto justify-center'>
  //                         <button onClick={() => handleModalOpen()} className="bg-yellow-400 flex items-center hover:bg-yellow-500 text-white px-4 py-2 rounded font-sans font-medium">
  //                             <FaPlus className='mr-1' /> Thêm sản phẩm mới
  //                         </button>
  //                         </div>
  //                         <div className='mt-2' onClick={()=>handleShowGif()}>
  //                             <div className='flex items-center font-sans hover:text-yellow-500 text-yellow-400 justify-center cursor-pointer p-2 '><VscDebugContinue className='ml-2' /> <h3 className='font-sans'> Tiếp tục</h3> </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div className='w-2/3 relative h-fit'>
  //                     <div className='absolute  border-4 border-white top-0 w-full'></div>
  //                     <img src={productGif} alt="product" className='bg-white'/>
  //                     <div className='absolute  border-4 border-white bottom-0 w-full'></div>
  //                 </div>
  //             </div>
  //             <div className="w-full  mb-4 md:mb-0 mr-2">
  // 				<div className="relative">
  // 					<input type="text" placeholder="Tìm kiếm..." className="w-full px-4 py-2 border rounded focus:outline-none hover:border-yellow-500" />
  // 					<span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
  // 					<IoSearchOutline />
  // 					</span>
  // 				</div>
  // 			</div>
  // 			<div className="w-full font-sans  md:w-auto flex space-x-4 ">
  // 				<select className="w-full md:w-auto px-4 py-2 border rounded  cursor-pointer focus:outline-none hover:border-yellow-500 ">
  // 					<option className='font-sans py-4  '>Giá từ thấp đến cao</option>
  // 					<option className='font-sans py-2 '>Giá từ cao đến thấp</option>
  // 				</select>
  // 				<select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
  // 					<option className='font-sans  ' >Bán chạy</option>

  // 					{/* Thêm các lựa chọn loại sản phẩm vào đây */}
  // 				</select>
  //                 <select className="w-full font-sans md:w-auto px-4 py-2 border rounded cursor-pointer focus:outline-none hover:border-yellow-500">
  // 					<option className="font-sans p-4 hover:bg-yellow-500">Trạng thái</option>
  //                     <option className='font-sans py-2  ' >Hết hàng</option>
  //                     <option className='font-sans py-2 '>Còn ít hàng</option>
  // 					{/* Thêm các lựa chọn loại sản phẩm vào đây */}
  // 				</select>
  // 			</div>
  // 		</div>

  //         <div className={`w-full ${showGif ? 'hidden': ''}`}>
  // 			{/* Dòng tiêu đề */}
  // 			<div className="flex bg-gray-200 mb-2 ">
  // 				<div className="w-1/4 py-2 px-4 font-sans font-medium justify-center flex ">Sản phẩm</div>
  // 				<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Số lượng</div>
  // 				<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Đã bán</div>
  // 				<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Đánh giá</div>
  // 				<div className="w-1/6 py-2 px-4 font-sans font-medium justify-center flex">Giá bán</div>

  // 				<div className="w-1/6 py-2 px-4 font-sans font-medium ">Hành động</div>
  // 			</div>

  // 			{/* Các dòng sản phẩm */}
  // 			{products.map((product, index) => (
  // 				<div key={product._id} className={`flex rounded bg-white ${index !== 0 ? 'mt-2' : ''}`}>
  // 					<div className="w-1/4  p-4 flex items-center space-x-4 cursor-pointer">
  // 						<img src={product.mainImage} alt={product.name} className="w-10 h-10 object-cover  font-sans " />
  // 						<span className=' font-sans font-medium '>{product.name}</span>
  // 					</div>
  // 					<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{product.quantity}</div>
  // 					<div className="w-1/6  font-sans font-medium justify-center flex  p-4 items-center">{product.sold}</div>
  // 					<div className="w-1/6  font-sans font-medium justify-center flex items-center  p-4">{product.ratingsAverage} <FaStar className='text-yellow-400 justify-center' /></div>
  // 					<div className="w-1/6  font-sans font-medium justify-center flex p-4 items-center">{product.price} <TbCurrencyDong /></div>
  // 					<div className="w-1/6  font-sans font-medium  p-4 md:flex items-center">
  // 						<button onClick={() => handleDeleteProduct(product._id)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 mr-0.5 py-1 font-sans font-medium rounded">
  //                         <MdDeleteForever />
  // 						</button>
  //                         <button  onClick={() => handleInfo(product._id)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 font-sans font-medium rounded">
  //                         <MdEdit />
  // 						</button>
  // 					</div>
  // 				</div>
  // 			))}

  // 		</div>
  //         <AddProductModal
  //             isOpen={isAddProductModalOpen}
  //             onRequestClose={() => setAddProductModalOpen(false)}
  //             onAddProduct={handleAddProduct}
  //             />

  //         {product &&
  //             <UpdateProductModal
  //                 isOpen={isUpdateProductModalOpen}
  //                 onRequestClose={() => setUpdateProductModalOpen(false)}
  //                 product={{ ...product }}
  //                 onUpdateProduct={handleUpdateProduct}
  //             />
  //         }
  //     </div>

  // )
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 relative">
      {product && (
        <UpdateProductModal
          isOpen={isUpdateProductModalOpen}
          onRequestClose={() => setUpdateProductModalOpen(false)}
          product={{ ...product }}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {/* <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger> */}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1 bg-yellow-400 hover:bg-yellow-500"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span
                className="sr-only sm:not-sr-only sm:whitespace-nowrap"
                onClick={() => handleModalOpen()}
              >
                Add Product
              </span>
            </Button>
          </div>
        </div>
        {products.length === 0 && products && pagination === 1 ? (
          <NoItem
            title={"Welcome sellers to the product management page"}
            body={
              "Please add your first product to your sales. If you encounter problems during product management, please contact us to have your questions resolved."
            }
          />
        ) : (
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                  <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    Products
                  </span>{" "}
                  management list
                </h1>
                {/* <CardTitle className="text-yellow-400">Products</CardTitle> */}
                <CardDescription>
                  <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                    <mark class="px-2 text-white bg-yellow-400 rounded ">
                      Manage
                    </mark>{" "}
                    your products and view their sales performance
                  </h1>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Quality
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TableRow key={product.id}>
                        <TableCell className="hidden sm:table-cell">
                          {/* <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                  /> */}
                          <img
                            src={product.mainImage}
                            alt=""
                            className="w-16 h-16 object-cover rounded-md aspect-square"
                          />
                        </TableCell>
                        <TableCell className="font-medium font-sans">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-yellow-500 cursor-pointer"
                          >
                            {product.isApproved
                              ? "Approved"
                              : "Pending Approval"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-sans ">
                          <div className="flex items-center">
                            {product.price}
                            <TbCurrencyDong />
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-sans">
                          {" "}
                          {product.quantity}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-sans">
                          {product.sold}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="text-yellow-400">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => handleInfo(product._id)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Page <strong>{pagination}</strong>
                  <div class="flex mt-2">
                    <div
                      onClick={handlePre}
                      class="flex mr-2 cursor-pointer items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </div>

                    <div
                      onClick={handleNext}
                      class="flex cursor-pointer  items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onRequestClose={() => setAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </main>
  );
}
