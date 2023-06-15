import { useFetch } from "./infra";

export type Order = {
  orderId: number;
  timestamp: string;
  userId: number;
  orderPrice: number;
};

export function useOrders(id: number | undefined) {
  var url;
  if(id === 1){
    url = "/orders/"; //for admin
  } else {
    url = `/orders/${id}`;
  }
  const r = useFetch<Order[]>(url);
  return {
    orders: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}

export type OrderDetail = {
  id: number;
  orderId: number;
  timestamp: string
  userId: number;
  orderPrice: number;
  bookNum: number;
  bookId: number;
  isbn: string;
  name: string;
  type: string;
  author: string;
  price: number;
  description: string;
  inventory: number;
  image: string;
}

export function useOrdersDetail(id: number | undefined) {
  var url;
  if(id === 1){
    url = "/orders_detail/"; //for admin
  } else {
    url = `/orders_detail/${id}`;
  }
  const r = useFetch<OrderDetail[]>(url);
  console.log("useOrdersDetail: ", r);
  return {
    ordersDetail: (r.error ? undefined : r.data) ?? [],
    ...r,
  };
}