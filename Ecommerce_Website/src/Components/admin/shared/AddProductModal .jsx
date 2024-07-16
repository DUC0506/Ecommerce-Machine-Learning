/* eslint-disable jsx-a11y/img-redundant-alt */
// AddProductModal.js

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getCategory } from "../../../api/category";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { IoMdImages } from "react-icons/io";
import useValidation from "../../../utils/validator";
const AddProductModal = ({ isOpen, onRequestClose, onAddProduct }) => {
  const { validateProduct } = useValidation();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    priceDiscount: "",
    colors: "",
    sizes: "",
    priceSizes: "",
    quantity: "",
    sold: "",
    isOutOfStock: false,
    mainImage: "",
    images: [],
  });
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  // const [errors, setErrors] = useState({});

  const fetchCategory = async () => {
    const { type, categories } = await getCategory();
    if (type === "error") return type;
    setCategories(categories);
  };
  // const validateForm = () => {
  //   const newErrors = {};
  //   Object.keys(formData).forEach((key) => {
  //     if (formData[key] === "" && key !== "isOutOfStock") {
  //       // Kiểm tra nếu trường rỗng và không phải là trường isOutOfStock (checkbox)
  //       newErrors[key] = `${key} is required`;
  //     }
  //   });
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  // };
  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    const reader = new FileReader();
    reader.onload = () => {
      setMainImageUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleImagesChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: [...prevData.images, ...files],
    }));
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrls((prevImageUrls) => [...prevImageUrls, reader.result]);
    };
    Array.from(files).forEach((file) => reader.readAsDataURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData1 = new FormData();
    const bool = validateProduct(formData);
    if (!bool) {
      return;
    }
    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((image) => {
          formData1.append(key, image);
        });
      } else {
        formData1.append(key, formData[key]);
      }
    }

    onAddProduct(formData1);

    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      priceDiscount: "",
      colors: "",
      sizes: "",
      priceSizes: "",
      quantity: "",
      sold: "",
      isOutOfStock: false,
      mainImage: "",
      images: [],
    });
    setMainImageUrl("");
    setImageUrls([]);
    onRequestClose();
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div
      class={`absolute  z-10 w-full top-1/2 left-1/2  md:top-1/2  h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <main className="grid flex-1 items-end gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4 ">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={onRequestClose}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Pro Controller
            </h1>
            <Badge variant="outline" className="ml-auto sm:ml-0">
              In stock
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" onClick={onRequestClose}>
                {" "}
                Discard
              </Button>
              <Button
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-500"
                onClick={handleSubmit}
              >
                Save Product
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle className="text-yellow-500 rounded w-fit p-2">
                    Product Details
                  </CardTitle>
                  <CardDescription>
                    Name and description of the product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        className="font-sans"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle className="text-yellow-500 rounded w-fit p-2">
                    Info
                  </CardTitle>
                  <CardDescription>
                    Price , Quantity, Sold , Out of stock, Regions, Sizes for
                    product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex ">
                      <div className="grid gap-3  mr-4">
                        <Label htmlFor="name">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Price Discount</Label>
                        <Input
                          id="priceDiscount"
                          name="priceDiscount"
                          value={formData.priceDiscount}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="grid gap-3 mr-4">
                        <Label htmlFor="name">Regions</Label>
                        <Input
                          id="colors"
                          name="colors"
                          value={formData.colors}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Sizes</Label>
                        <Input
                          id="sizes"
                          name="sizes"
                          value={formData.sizes}
                          onChange={handleChange}
                          type="text"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Price corresponds to size</Label>
                      <Input
                        id="priceSizes"
                        name="priceSizes"
                        value={formData.priceSizes}
                        onChange={handleChange}
                        type="text"
                        className="w-full"
                      />
                    </div>
                    <div className="flex ">
                      <div className="grid gap-3 mr-4">
                        <Label htmlFor="name">Quality</Label>
                        <Input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Sold</Label>
                        <Input
                          type="number"
                          id="sold"
                          name="sold"
                          value={formData.sold}
                          onChange={handleChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Is Out Of Stock</Label>
                      <Input
                        type="checkbox"
                        id="isOutOfStock"
                        name="isOutOfStock"
                        checked={formData.isOutOfStock}
                        onChange={() =>
                          setFormData((prevData) => ({
                            ...prevData,
                            isOutOfStock: !prevData.isOutOfStock,
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle className="text-yellow-500 rounded w-fit p-2">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-1">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        name="category"
                        id="category"
                        onValueChange={handleSelectChange("category")}
                      >
                        <SelectTrigger>
                          <SelectValue value="" placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            //             <option  className='font-sans' key={category._id} value={category._id}>{category.name}</option>
                            //           ))}
                            //         </select>
                            <SelectItem
                              key={category._id}
                              value={category._id}
                              className="font-sans"
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle className="text-yellow-500 rounded w-fit p-2">
                    Product Images
                  </CardTitle>
                  <CardDescription>
                    Images must be at least 300x300px and in JPG, PNG,
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div class=" bg-white rounded p-4">
                      <div className="mb-8">
                        <label
                          htmlFor="mainImage"
                          className="flex mb-2 font-sans font-medium"
                        >
                          <p className="text-red-500">*</p>
                          Main image
                        </label>
                        <label
                          htmlFor="mainImage"
                          className="w-full  rounded bg-yellow-400  focus:outline-none focus:border-yellow-500 cursor-pointer"
                        >
                          <input
                            type="file"
                            id="mainImage"
                            name="mainImage"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <span className="font-sans flex items-center bg-yellow-400 rounded w-fit p-2 ">
                            <IoMdImages className="text-xl mr-1" /> Main image
                          </span>
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {mainImageUrl && (
                            <img
                              src={mainImageUrl}
                              alt="Main Image"
                              className="w-20 h-20 rounded  mt-1 object-cover"
                            />
                          )}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label
                          htmlFor="images"
                          className="flex mb-2 font-sans font-medium"
                        >
                          <p className="text-red-500 font-sans">*</p>Secondary
                          images (maximum 3 images)
                        </label>
                        <label
                          htmlFor="images"
                          className="w-full  rounded bg-yellow-400 focus:outline-none focus:border-yellow-500 cursor-pointer"
                        >
                          <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleImagesChange}
                            className="hidden"
                            multiple
                          />
                          <span className="font-sans flex items-center bg-yellow-400 rounded w-fit p-2 ">
                            <IoMdImages className="text-xl mr-1" /> Secondary
                            images
                          </span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {imageUrls.map((imageUrl, index) => (
                            <img
                              key={index}
                              src={imageUrl}
                              alt={`Image${index + 1}`}
                              className="w-20 h-20 rounded mt-4 ml-2 object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  src="/placeholder.svg"
                  width="300"
                /> */}

                    <div className="grid grid-cols-3 gap-2">
                      <button>
                        {/* <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src="/placeholder.svg"
                      width="84"
                    /> */}
                      </button>
                      <button>
                        {/* <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src="/placeholder.svg"
                      width="84"
                    /> */}
                      </button>
                      {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-5">
                <CardHeader>
                  <CardTitle className="text-yellow-500">
                    Rating Product
                  </CardTitle>
                  <CardDescription>
                    Default rating for this product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-yellow-500 flex items-center justify-center gap-1 text-lg font-sans font-semibold">
                    4.5
                    <FaStar />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </main>
    </div>
  );
  // return (
  //   <div
  //     class={`absolute w-full top-1/3 left-1/2 h-full md:top-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
  //       isOpen ? "block" : "hidden"
  //     }`}
  //   >
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

  //     <div class="mb-8 bg-white rounded p-4">
  //       <div className="flex w-full">
  //         <div className="w-1/2">
  //           <label for="name" class=" mb-2 flex font-sans font-medium">
  //             <p className="text-red-500">*</p>Tên sản phẩm{" "}
  //           </label>
  //           <input
  //             type="text"
  //             id="name"
  //             placeholder="Sầu riêng An Giang"
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             class="w-full border p-2 mb-2 focus:outline-none  focus:border-yellow-500 font-sans  rounded"
  //           />
  //           {errors.name && <p className="text-red-500">{errors.name}</p>}
  //         </div>
  //         <div className="w-1/4 ml-2">
  //           <label for="category" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Mặt hàng
  //           </label>
  //           <select
  //             id="category"
  //             name="category"
  //             value={formData.category}
  //             onChange={handleChange}
  //             class="w-full border p-2 mb-4 font-sans font-normal focus:outline-none  focus:border-yellow-500  rounded"
  //           >
  //             <option className="font-sans" value="" disabled>
  //               Vui lòng chọn mặt hàng
  //             </option>
  //             {categories.map((category) => (
  //               <option
  //                 className="font-sans"
  //                 key={category._id}
  //                 value={category._id}
  //               >
  //                 {category.name}
  //               </option>
  //             ))}
  //           </select>
  //           {errors.category && (
  //             <p className="text-red-500">{errors.category}</p>
  //           )}
  //         </div>
  //       </div>
  //       <div className=" flex">
  //         <div className="w-1/3">
  //           <label for="price" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500 ">*</p>Giá
  //           </label>
  //           <input
  //             type="number"
  //             placeholder="123.000 đ"
  //             id="price"
  //             name="price"
  //             value={formData.price}
  //             onChange={handleChange}
  //             class="w-full  rounded font-sans border p-2 mb-2 focus:outline-none  focus:border-yellow-500"
  //           />
  //           {errors.price && <p className="text-red-500">{errors.price}</p>}
  //         </div>
  //         <div className="w-1/3 ml-2">
  //           <label for="priceDiscount" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Giảm giá
  //           </label>
  //           <input
  //             type="number"
  //             id="priceDiscount"
  //             placeholder="20 %"
  //             name="priceDiscount"
  //             value={formData.priceDiscount}
  //             onChange={handleChange}
  //             class="w-full  rounded border font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500"
  //           />
  //           {errors.priceDiscount && (
  //             <p className="text-red-500">{errors.priceDiscount}</p>
  //           )}
  //         </div>
  //       </div>
  //       <div className="flex">
  //         <div className="w-1/3">
  //           <label for="colors" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Màu sắc
  //           </label>
  //           <input
  //             type="text"
  //             id="colors"
  //             name="colors"
  //             value={formData.colors}
  //             onChange={handleChange}
  //             class="w-full rounded border p-2 mb-4 font-sans focus:outline-none  focus:border-yellow-500"
  //           />
  //           {errors.colors && <p className="text-red-500">{errors.colors}</p>}
  //         </div>
  //         <div className="w-1/3 ml-2">
  //           <label for="sizes" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Kích thước
  //           </label>
  //           <input
  //             type="text"
  //             id="sizes"
  //             placeholder="Lớn..."
  //             name="sizes"
  //             value={formData.sizes}
  //             onChange={handleChange}
  //             class="w-full rounded border p-2 mb-4 focus:outline-none font-sans  focus:border-yellow-500"
  //           />
  //           {errors.sizes && <p className="text-red-500">{errors.sizes}</p>}
  //         </div>
  //       </div>
  //       <div className="flex">
  //         <div className="w-1/3">
  //           <label for="quantity" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Số lượng sản phẩm{" "}
  //           </label>
  //           <input
  //             type="number"
  //             id="quantity"
  //             name="quantity"
  //             placeholder="99"
  //             value={formData.quantity}
  //             onChange={handleChange}
  //             class="w-full rounded border  font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500"
  //           />
  //           {errors.quantity && (
  //             <p className="text-red-500">{errors.quantity}</p>
  //           )}
  //         </div>

  //         <div className="w-1/3 ml-2">
  //           <label for="priceSizes" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Giá tương ứng với kích thước
  //           </label>
  //           <input
  //             type="text"
  //             id="priceSizes"
  //             placeholder="0.5 , 1..."
  //             name="priceSizes"
  //             value={formData.priceSizes}
  //             onChange={handleChange}
  //             class="w-full rounded border p-2 mb-4 focus:outline-none font-sans  focus:border-yellow-500"
  //           />
  //           {errors.priceSizes && (
  //             <p className="text-red-500">{errors.priceSizes}</p>
  //           )}
  //         </div>
  //       </div>
  //       <div className="flex ">
  //         <div className="w-1/3">
  //           <label for="sold" class="flex mb-2 font-sans font-medium">
  //             <p className="text-red-500">*</p>Đã bán
  //           </label>
  //           <input
  //             type="number"
  //             id="sold"
  //             name="sold"
  //             placeholder="2"
  //             value={formData.sold}
  //             onChange={handleChange}
  //             class="w-full border rounded font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500"
  //           />
  //         </div>

  //         <div className="w-full">
  //           <label for="isOutOfStock" class="block mb-2 font-sans font-medium">
  //             Hết hàng
  //           </label>
  //           <input
  //             className="ml-2 appearance-none w-5 h-5 border border-yellow-400 rounded-sm checked:bg-yellow-500 checked:border-transparent focus:outline-none"
  //             type="checkbox"
  //             id="isOutOfStock"
  //             name="isOutOfStock"
  //             checked={formData.isOutOfStock}
  //             onChange={() =>
  //               setFormData((prevData) => ({
  //                 ...prevData,
  //                 isOutOfStock: !prevData.isOutOfStock,
  //               }))
  //             }
  //           />
  //         </div>
  //       </div>
  //       {errors.sold && <p className="text-red-500">{errors.sold}</p>}
  //     </div>
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh sản phẩm</h2>
  //     <div class=" bg-white rounded p-4">
  //       <div className="mb-8">
  //         <label
  //           htmlFor="mainImage"
  //           className="flex mb-2 font-sans font-medium"
  //         >
  //           <p className="text-red-500">*</p>Ảnh chính sản phẩm
  //         </label>
  //         <label
  //           htmlFor="mainImage"
  //           className="w-full border p-2 bg-yellow-400 rounded mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer"
  //         >
  //           <input
  //             type="file"
  //             id="mainImage"
  //             name="mainImage"
  //             onChange={handleFileChange}
  //             className="hidden"
  //           />
  //           <span className="font-sans">Chọn ảnh chính sản phẩm</span>
  //         </label>

  //         {mainImageUrl && (
  //           <img
  //             src={mainImageUrl}
  //             alt="Main Image"
  //             className="w-32 h-32 mt-2"
  //           />
  //         )}
  //       </div>
  //       {errors.mainImage && <p className="text-red-500">{errors.mainImage}</p>}

  //       <div className="mb-8">
  //         <label htmlFor="images" className="flex mb-2 font-sans font-medium">
  //           <p className="text-red-500">*</p>Ảnh phụ sản phẩm (tối đa 3 ảnh)
  //         </label>
  //         <label
  //           htmlFor="images"
  //           className="w-full border bg-yellow-400 rounded p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer"
  //         >
  //           <input
  //             type="file"
  //             id="images"
  //             name="images"
  //             onChange={handleImagesChange}
  //             multiple
  //             className="hidden"
  //           />
  //           <span className="font-sans">Chọn hình ảnh phụ</span>
  //         </label>
  //         <div className="flex">
  //           {imageUrls.map((imageUrl, index) => (
  //             <img
  //               key={index}
  //               src={imageUrl}
  //               alt={`Image ${index + 1}`}
  //               className="w-32 h-32 mt-2 ml-2"
  //             />
  //           ))}
  //         </div>
  //         {errors.images && <p className="text-red-500">{errors.images}</p>}
  //       </div>
  //     </div>
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
  //     <div class=" bg-white rounded p-4 mb-4">
  //       <div class="mb-8">
  //         <label for="description" class="flex mb-2 font-sans font-medium">
  //           <p className="text-red-500">*</p>Thông tin sản phẩm
  //         </label>
  //         <textarea
  //           id="description"
  //           name="description"
  //           value={formData.description}
  //           onChange={handleChange}
  //           class="w-full font-sans border p-2 mb-4 focus:outline-none  focus:border-yellow-500"
  //         ></textarea>
  //       </div>
  //       {errors.description && (
  //         <p className="text-red-500">{errors.description}</p>
  //       )}
  //     </div>

  //     <div class="flex justify-end">
  //       <button
  //         type="submit"
  //         class="bg-yellow-500 font-sans text-white px-4 py-2 rounded mr-2"
  //         onClick={handleSubmit}
  //       >
  //         Thêm sản phẩm{" "}
  //       </button>
  //       <button
  //         class="bg-gray-500 text-white px-4 py-2 rounded font-sans"
  //         onClick={onRequestClose}
  //       >
  //         Cancel
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default AddProductModal;
