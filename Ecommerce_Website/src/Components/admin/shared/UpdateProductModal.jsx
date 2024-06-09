/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { getCategory } from "../../../api/category";
import { Button } from "../../ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../ui/table";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { FaImage } from "react-icons/fa6";
// import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
const UpdateProductModal = ({
  isOpen,
  onRequestClose,
  product,
  onUpdateProduct,
}) => {
  console.log(product);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [categories, setCategories] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedValue =
      type === "checkbox"
        ? checked
        : name === "priceDiscount"
        ? parseFloat(value)
        : value;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: updatedValue,
    }));
  };
  const handleSelectChange = (name) => (value) => {
    setEditedProduct((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(editedProduct);
  const handleUpdate = () => {
    onUpdateProduct(editedProduct);
    onRequestClose();
  };

  const fetchCategory = async () => {
    const { type, categories } = await getCategory();
    if (type === "error") return type;
    setCategories(categories);
  };
  // Function to handle file change for main image
  // Function to handle file change for main image
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Update main image in editedProduct state
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files[0],
    }));

    // Display main image preview
    const reader = new FileReader();
    reader.onload = () => {
      setMainImageUrl(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // Function to handle file change for additional images
  const handleImagesChange = (e) => {
    const { name, files } = e.target;
    // Update images array in editedProduct state
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: [...prevProduct[name], ...files],
    }));

    // Display additional images preview
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrls((prevImageUrls) => [...prevImageUrls, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setEditedProduct({ ...product });
    }
    setEditedProduct({ ...product });
    fetchCategory();
  }, [isOpen, product]);

  // return (
  //   <div class={`absolute w-full top-1/2 left-1/2 md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
  //     isOpen ? 'block' : 'hidden'
  //   }`}>
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin cơ bản</h2>

  //     <div class="mb-8 bg-white rounded p-4">
  //       <div className='flex'>
  //         <div className='w-1/3'>
  //         <label for="name" class=" mb-2 flex font-sans font-medium"><p className='text-red-500'>*</p>Tên sản phẩm </label>
  //         <input type="text" id="name" placeholder='Sầu riêng An Giang' name="name" value={editedProduct.name} onChange={handleChange}
  //         class="w-full rounded border font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //         <div className='ml-2 w-1/3'>
  //         <label for="category" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Mặt hàng</label>
  //         <select id="category" name="category" value={editedProduct.category} onChange={handleChange} class="w-full rounded border p-2 mb-4 font-sans font-normal focus:outline-none  focus:border-yellow-500">
  //           <option className='font-sans' value="" disabled >Vui lòng chọn mặt hàng</option>
  //           {categories.map((category) => (
  //             <option  className='font-sans' key={category._id} value={category._id}>{category.name}</option>
  //           ))}
  //         </select>
  //         </div>
  //       </div>
  //        <div className='flex'>
  //         <div className='w-1/3'>
  //           <label for="price" class="flex mb-2 font-sans font-medium"><p className='text-red-500 '>*</p>Giá</label>
  //           <input type="number" id="price" name="price" value={editedProduct.price} onChange={handleChange} class="w-full font-sans  rounded border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //         <div  className='ml-2 w-1/3'>
  //           <label for="priceDiscount" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Giá giảm</label>
  //           <input type="number" id="priceDiscount" name="priceDiscount" value={editedProduct.priceDiscount} onChange={handleChange} class=" rounded font-sans w-full border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //       </div>
  //       <div className='flex'>
  //         <div className='w-1/3'>
  //           <label for="colors" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Màu sắc </label>
  //           <input type="text" id="colors" name="colors" value={editedProduct.colors[0].color} onChange={handleChange} class="w-full font-sans rounded border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //         <div className='w-1/3 ml-2'>
  //           <label for="sizes" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Kích thước</label>
  //           <input type="text" id="sizes" name="sizes" value={editedProduct.sizes.map(size => size.size).join(', ')}  onChange={handleChange} class="w-full font-sans rounded border p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //       </div>
  //       <div className='flex'>
  //       <div className='w-1/3'>
  //           <label for="quantity" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Số lượng sản phẩm</label>
  //           <input type="number" id="quantity" name="quantity" value={editedProduct.quantity} onChange={handleChange} class="w-full rounded border font-sans p-2 mb-4 focus:outline-none  focus:border-yellow-500" />
  //         </div>
  //         <div className='w-1/3 ml-2'>

  //           <label for="sizes" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Kích thước</label>
  //           <input type="text" id="sizes" name="sizes" value={editedProduct.sizes.map(size => size.ratioPrice).join(', ')}  onChange={handleChange} class="w-full rounded border p-2 mb-4 focus:outline-none font-sans  focus:border-yellow-500" />
  //         </div>
  //       </div>
  //        <div className="flex">
  //         <div className='w-full'>
  //           <label for="sold" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Đã bán</label>
  //           <input type="number" id="sold" name="sold" value={editedProduct.sold} onChange={handleChange} class="w-full font-sans border p-2 mb-4 focus:outline-none rounded  focus:border-yellow-500" />
  //         </div>
  //         <div className='w-full'>
  //           <label for="isOutOfStock" class="block mb-2 font-sans font-medium">Hết hàng</label>
  //           <input
  //           className="ml-2 appearance-none w-5 h-5 border border-yellow-400 rounded-sm checked:bg-yellow-500 checked:border-transparent focus:outline-none"
  //            type="checkbox" id="isOutOfStock" name="isOutOfStock" checked={editedProduct.isOutOfStock} onChange={handleChange} class="ml-2" />
  //         </div>
  //       </div>
  //     </div>
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Ảnh sản phẩm</h2>
  //     <div class=" bg-white rounded p-4">
  //       <div className="mb-8">
  //         <label htmlFor="mainImage" className="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>
  //         Ảnh chính</label>
  //         <label htmlFor="mainImage" className="w-full border rounded bg-yellow-400 p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer">
  //         <input
  //           type="file"
  //           id="mainImage"
  //           name="mainImage"
  //           onChange={handleFileChange}
  //           className="hidden"
  //         />
  //         <span className='font-sans '>Chọn ảnh chính sản phẩm</span>
  //         </label>
  //         {editedProduct.mainImage && <img src={editedProduct.mainImage} alt="Main Image" className="w-32 h-auto mt-4" />}
  //         {mainImageUrl && <img src={mainImageUrl} alt="Main Image" className="w-32 h-auto" />}
  //       </div>

  //       <div className="mb-8">
  //         <label htmlFor="images" className="flex mb-2 font-sans font-medium"><p className='text-red-500 font-sans'>*</p>Ảnh phụ sản phẩm (tối đa 3 ảnh )</label>
  //         <label htmlFor="images" className="w-full border rounded bg-yellow-400 p-2 mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer">
  //         <input
  //           type="file"
  //           id="images"
  //           name="images"
  //           onChange={handleImagesChange}
  //           className="hidden"
  //           multiple
  //         />
  //          <span className='font-sans'>Chọn hình ảnh phụ</span>
  //         </label>
  //         <div className="flex">
  //         {editedProduct.images && editedProduct.images.map((imageUrl, index) => (
  //           // eslint-disable-next-line jsx-a11y/img-redundant-alt
  //           <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-32 h-auto mt-4 ml-2" />
  //         ))}
  //           <div className="flex">
  //           {imageUrls.map((imageUrl, index) => (
  //             <img key={index} src={imageUrl} alt={`Image ${index + 1}`} className="w-32 h-auto  ml-2" />
  //           ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <h2 class="text-2xl  mb-4 font-sans font-medium">Thông tin chi tiết</h2>
  //     <div class=" bg-white rounded p-4 mb-4">
  //       <div class="mb-8">
  //         <label for="description" class="flex mb-2 font-sans font-medium"><p className='text-red-500'>*</p>Thông tin sản phẩm</label>
  //         <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} class="w-full font-sans border p-2 mb-4 focus:outline-none focus:border-yellow-500 resize-y min-h-[80px]"></textarea>
  //       </div>
  //     </div>
  //     <div class="flex justify-end">
  //       <button type="button" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update Product</button>
  //       <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onClick={onRequestClose}>Close</button>
  //     </div>
  //   </div>
  // );
  return (
    <div
      class={`absolute z-50 w-full top-1/2 left-1/2  md:top-1/2 h-full transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 p-8 rounded shadow-md overflow-y-auto max-h-full ${
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
            <h1 className="flex-1 text-yellow-400 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
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
                onClick={handleUpdate}
                className="bg-yellow-400 hover:bg-yellow-500"
              >
                Save Product
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Product Details
                  </CardTitle>
                  <CardDescription>
                    Details about products for sale in apartment buildings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name"> Product name</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        className="font-sans"
                        value={editedProduct.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        className="font-sans"
                        value={editedProduct.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Info Product
                  </CardTitle>
                  <CardDescription className="font-sans">
                    Details about price, color, size, quantity, and quantity
                    sold of the product
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
                          value={editedProduct.price}
                          onChange={handleChange}
                          type="text"
                          className="w-full font-sans"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Price Discount</Label>
                        <Input
                          id="priceDiscount"
                          name="priceDiscount"
                          value={editedProduct.priceDiscount}
                          onChange={handleChange}
                          type="text"
                          className="w-full font-sans"
                        />
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="grid gap-3 mr-4">
                        <Label htmlFor="name">Color</Label>
                        <Input
                          id="colors"
                          name="colors"
                          value={editedProduct.colors[0].color}
                          onChange={handleChange}
                          type="text"
                          className="w-full font-sans"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Sizes</Label>
                        <Input
                          id="sizes"
                          name="sizes"
                          value={editedProduct.sizes
                            .map((size) => size.size)
                            .join(", ")}
                          onChange={handleChange}
                          type="text"
                          className="w-full font-sans"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Price corresponds to size</Label>
                      <Input
                        id="priceSizes"
                        name="priceSizes"
                        value={editedProduct.priceSizes}
                        onChange={handleChange}
                        type="text"
                        className="w-full font-sans"
                      />
                    </div>
                    <div className="flex ">
                      <div className="grid gap-3 mr-4">
                        <Label htmlFor="name">Quality</Label>
                        <Input
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={editedProduct.quantity}
                          onChange={handleChange}
                          className="w-full font-sans"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Sold</Label>
                        <Input
                          type="number"
                          id="sold"
                          name="sold"
                          value={editedProduct.sold}
                          onChange={handleChange}
                          className="w-full font-sans"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Is Out Of Stock</Label>
                      <Input
                        type="checkbox"
                        id="isOutOfStock"
                        name="isOutOfStock"
                        checked={editedProduct.isOutOfStock}
                        onChange={handleChange}
                        className="w-full font-sans"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  {/* <Button size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                  </Button> */}
                </CardFooter>
              </Card>
              {/* <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="category" className="font-sans">
                        Category
                      </Label>
                      <Select
                        name="category"
                        className="font-sans"
                        id="category"
                        onValueChange={handleSelectChange("category")}
                      >
                        <SelectTrigger
                          id="category"
                          className="font-sans"
                          aria-label="Select category"
                          value={editedProduct.category}
                        >
                          <SelectValue placeholder="Select category" />
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
              </Card> */}
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              {/* <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Product Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger
                          id="status"
                          aria-label="Select status"
                          className="font-sans"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="font-sans" value="draft">
                            Draft
                          </SelectItem>
                          <SelectItem className="font-sans" value="published">
                            Active
                          </SelectItem>
                          <SelectItem className="font-sans" value="archived">
                            Archived
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Product Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="category" className="font-sans">
                        Category
                      </Label>
                      <Select
                        name="category"
                        className="font-sans"
                        id="category"
                        value={editedProduct.category._id}
                        onValueChange={handleSelectChange("category")}
                      >
                        <SelectTrigger
                          id="category"
                          className="font-sans"
                          aria-label="Select category"
                          value={editedProduct.category._id}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="font-sans">
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
                  <CardTitle className="text-yellow-400">
                    Product Images
                  </CardTitle>
                  <CardDescription className="font-sans">
                    Main photo and secondary photos of the product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div class=" bg-white rounded p-4">
                      <div className="mb-8">
                        {/* <label
                          htmlFor="mainImage"
                          className="flex mb-2 font-sans font-medium"
                        >
                          <p className="text-red-500">*</p>
                          Main Image
                        </label> */}
                        <label
                          htmlFor="mainImage"
                          className=" rounded hover:bg-yellow-500 bg-yellow-400  mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer"
                        >
                          <input
                            type="file"
                            id="mainImage"
                            name="mainImage"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <span className="font-sans  w-fit flex items-center font-semibold hover:bg-yellow-500 bg-yellow-400 px-4 py-2  rounded ">
                            <FaImage className="text-xl mr-1" /> Main image{" "}
                          </span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {editedProduct.mainImage && (
                            <img
                              src={editedProduct.mainImage}
                              alt={editedProduct.name}
                              className="w-20 h-20 mt-4 object-cover rounded"
                            />
                          )}

                          {mainImageUrl && (
                            <img
                              src={mainImageUrl}
                              alt={mainImageUrl}
                              className="w-20 h-20 mt-4 object-cover rounded"
                            />
                          )}
                        </div>
                      </div>

                      <div className="mb-8">
                        {/* <label
                          htmlFor="images"
                          className="flex mb-2 font-sans font-medium"
                        >
                          <p className="text-red-500 font-sans">*</p>Product
                          secondary photos (maximum 3 photos)
                        </label> */}
                        <label
                          htmlFor="images"
                          className=" rounded hover:bg-yellow-500 bg-yellow-400  mb-4 focus:outline-none focus:border-yellow-500 cursor-pointer"
                        >
                          <input
                            type="file"
                            id="images"
                            name="images"
                            onChange={handleImagesChange}
                            className="hidden"
                            multiple
                          />
                          <span className="font-sans  w-fit flex items-center font-semibold hover:bg-yellow-500 bg-yellow-400 px-4 py-2  rounded">
                            <FaImage className="text-xl mr-1" />
                            Secondary images
                          </span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {editedProduct.images &&
                            editedProduct.images.map((imageUrl, index) => (
                              // eslint-disable-next-line jsx-a11y/img-redundant-alt
                              <button key={index}>
                                <img
                                  src={imageUrl}
                                  alt={`Image${index + 1}`}
                                  className="w-20 h-20 mt-4 ml-2 object-cover rounded"
                                />
                              </button>
                            ))}

                          {imageUrls.map((imageUrl, index) => (
                            <button>
                              <img
                                key={index}
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-20 h-20 ml-2 object-cover rounded"
                              />
                            </button>
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
                  <CardTitle>Archive Product</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div></div>
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
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
};

export default UpdateProductModal;
