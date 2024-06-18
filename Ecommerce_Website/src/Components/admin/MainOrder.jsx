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
  CreditCard,
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
import { getTotalOrders, orderStatus } from "../../api/order";
import { useNotification } from "../../hooks";
import NoItem from "./shared/NoItem";
export default function MainOrder({ sellerId }) {
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderInfo, setOrderInfo] = useState(null);
  const [indexOrder, setIndexOrder] = useState(null);
  const { updateNotification } = useNotification();
  const [pagination, setPagination] = useState(1);
  const fecthRecentOrders = async () => {
    const { type, orders } = await getTotalOrders(10, sellerId, pagination);
    if (type === "Success") {
      console.log(orders);
      setRecentOrders(orders);
      return orders; // Trả về orders
    }
    return [];
  };
  let totalPrice = recentOrders.reduce((total, order) => {
    return total + order.totalPrice;
  }, 0);
  console.log(totalPrice);

  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    const { type, message } = await orderStatus(id, newStatus);
    if (type === "error") return message;
    updateNotification("success", "Status updated successfully");
    const updatedOrders = await fecthRecentOrders();

    setOrderInfo(updatedOrders[indexOrder]);
  };
  const convertISOToDateFormat = (isoDateString) => {
    const date = new Date(isoDateString);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  const handleInfoOrder = (index) => {
    console.log(index);

    setOrderInfo(recentOrders[index]);
    setIndexOrder(index);
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
    fecthRecentOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);
  return (
    <div className="flex relative  h-full w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                {/* <CardTitle>Your Orders</CardTitle> */}
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  <h1 class=" text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                      My order
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
                  orders for shoppers
                </h1>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Total Order</CardDescription>
                <CardTitle className="text-4xl text-yellow-500">
                  {recentOrders.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {recentOrders.length > 0 ? "+25% from last week" : ""}
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-1 ">
                <CardDescription>Amount</CardDescription>
                <CardTitle className="text-2xl text-yellow-500 text-wrap">
                  {totalPrice} đ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {recentOrders.length > 0 ? " +10% from last month" : ""}
                </div>
              </CardContent>
              <CardFooter></CardFooter>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Fulfilled
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Refunded
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

            {recentOrders.length === 0 && recentOrders && pagination === 1 ? (
              <NoItem
                title={"Welcome sellers to the order management page"}
                body={
                  "You can track and manage orders on this page.If you have difficulty managing your order, please contact us to resolve your query."
                }
              />
            ) : (
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order, index) => (
                          <TableRow
                            key={index}
                            className="bg-accent"
                            onClick={() => handleInfoOrder(index)}
                          >
                            <TableCell>
                              <div className="font-medium">
                                {order.user?.username}
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {order.user?.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              Sale
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge
                                className="text-xs bg-yellow-500"
                                variant="secondary"
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {convertISOToDateFormat(order.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                              {" "}
                              {order.totalPrice}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
        <div>
          {orderInfo ? (
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order... {orderInfo._id?.slice(-3)}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Date: {convertISOToDateFormat(orderInfo.createdAt)}
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1 bg-yellow-400 hover:bg-yellow-500"
                  >
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      {orderInfo.status}
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
                          handleStatusChange(orderInfo._id, "Processing")
                        }
                      >
                        Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(orderInfo._id, "Shipped")
                        }
                      >
                        Shipped
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(orderInfo._id, "Delivered")
                        }
                      >
                        Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(orderInfo._id, "Cancelled")
                        }
                      >
                        Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    {orderInfo
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
                      : ""}
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{orderInfo.totalPrice}đ</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>0 đ</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span> 0 đ</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>{orderInfo.totalPrice}đ</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{orderInfo.shippingAddress.address}</span>
                      <span>{orderInfo.shippingAddress.city}</span>
                      <span>{orderInfo.shippingAddress.country}</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Time delivery</div>
                    <div className="text-muted-foreground font-sans">
                      {orderInfo.timeDelivery}
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd> {orderInfo.user.username}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:"> {orderInfo.user.email}</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+{orderInfo.user.phone}</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payments</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Method
                      </dt>
                      <dd>{orderInfo.paymentMethod}</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated{" "}
                  <time dateTime="2023-11-23">
                    {convertISOToDateFormat(orderInfo.updatedAt)}
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
