import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import {
  getProductsNotApproved,
  updateProductApproved,
} from "../..//api/products";
export default function ManagerProduct({ number, sellerId }) {
  const [recentProducts, setRecentProducts] = useState([]);
  const [productInfo, setProductInfo] = useState(null);
  const [indexOrder, setIndexOrder] = useState(null);
  const fecthRecentOrders = async () => {
    const { type, products } = await getProductsNotApproved();
    if (type === "Success") {
      setRecentProducts(products);
      return products; // Trả về orders
    }
    return [];
  };

  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    const { type, message } = await updateProductApproved(id, {
      isApproved: newStatus,
    });
    if (type === "error") return message;
    console.log(message);
    const updatedOrders = await fecthRecentOrders();

    setProductInfo(updatedOrders[indexOrder]);
  };
  // const convertISOToDateFormat = (isoDateString) => {
  //   const date = new Date(isoDateString);
  //   const formattedDate = `${date.getDate()}-${
  //     date.getMonth() + 1
  //   }-${date.getFullYear()}`;
  //   return formattedDate;
  // };
  const handleInfoOrder = (index) => {
    console.log(index);

    setProductInfo(recentProducts[index]);
    setIndexOrder(index);
  };
  useEffect(() => {
    fecthRecentOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex relative  h-full w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-4" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                {/* <CardTitle>Your Orders</CardTitle> */}
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      Products
                    </span>{" "}
                    management list.
                  </h1>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                  <mark class="px-2 text-white bg-yellow-400 rounded ">
                    Control
                  </mark>{" "}
                  products for seller
                </h1>
              </CardFooter>
            </Card>
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 gap-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Export</span>
                </Button>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Recent products from your seller.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Apartment
                        </TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProducts.map((product, index) => (
                        <TableRow
                          key={index}
                          className="bg-accent"
                          onClick={() => handleInfoOrder(index)}
                        >
                          <TableCell>
                            <div className="font-medium font-sans">
                              {product.name}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline font-sans">
                              {product.category.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell ">
                            Seller
                          </TableCell>
                          <TableCell className="hidden sm:table-cell font-sans">
                            <Badge className="text-xs" variant="secondary">
                              {product.isApproved
                                ? "Approved"
                                : " Not Approved"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell font-sans ">
                            {product.apartment.name}
                          </TableCell>
                          <TableCell className="text-right font-sans">
                            {" "}
                            {product.seller.username}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          {productInfo ? (
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Product... {productInfo._id?.slice(-3)}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Name:{productInfo.name}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      {productInfo.isApproved ? "Approved" : "Not Approved"}
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(productInfo._id, true)
                        }
                      >
                        Approved
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(productInfo._id, false)
                        }
                      >
                        Not approved
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Product Details</div>
                  <ul className="grid gap-3 font-sans">
                    {/* {orderInfo
                      ? orderInfo.products.map((product) => (
                          <li
                            key={product._id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground font-sans">
                              {product.nameProduct} x{" "}
                              <span>{product.totalProductQuantity}</span>
                            </span>
                            <span>{product.totalProductPrice}đ</span>
                          </li>
                        ))
                      : ""} */}
                    {productInfo.description}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    {/* <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{productInfo.category.name}</span>
                    </li> */}
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Seller</span>
                      <span>{productInfo.seller.username} </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span> {productInfo.seller.phone}</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Email</span>
                      <span>{productInfo.seller.email}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Address Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{productInfo.seller.address}</span>
                      <span> {productInfo.apartment.name}</span>
                    </address>
                  </div>
                  {/* <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Time delivery</div>
                    <div className="text-muted-foreground font-sans">
                      {productInfo.sizes[0].size}
                    </div>
                  </div> */}
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Product Information</div>

                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Category</dt>
                      <dd> {productInfo.category.name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Quantity</dt>
                      <dd> {productInfo.quantity}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Price</dt>
                      <dd>
                        <a href="mailto:"> {productInfo.price} đ</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">
                        Price after discount
                      </dt>
                      <dd>
                        <a href="tel:">{productInfo.priceAfterDiscount} đ</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Sizes</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        {/* <CreditCard className="h-4 w-4" /> */}
                        {productInfo.sizes[0].size}
                      </dt>
                      {/* <dd>{productInfo.category.name}</dd> */}
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated{" "}
                  <time dateTime="2023-11-23">
                    {/* {convertISOToDateFormat(productInfo.updatedAt)} */}
                  </time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          ) : (
            ""
          )}
        </div>
      </main>
    </div>
  );
}
