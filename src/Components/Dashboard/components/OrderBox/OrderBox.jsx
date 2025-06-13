import React, { useState } from "react";
import { Card, CardBody, Typography, Button, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import OrderBoxCreate from "./OrderBoxCreate";
import BoxEdit from "./OrderBoxEdit";
import BoxDelete from "./OrderBoxDelete";

// MOCK ORDER DATA
const initialOrders = [
  {
    id: 1,
    owner: "Aliyev Diyorbek",
    orderNumber: "ORD-001",
    product: "iPhone 15 Pro",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1692923778669",
    monthly: 110,
    months: 12,
    total: 1320,
  },
  {
    id: 2,
    owner: "Karimova Dilnoza",
    orderNumber: "ORD-002",
    product: "Samsung Galaxy S24",
    image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-s921-sm-s921bzadegy-thumb-539898429",
    monthly: 105,
    months: 10,
    total: 1050,
  },
  {
    id: 3,
    owner: "Rustamov Aziz",
    orderNumber: "ORD-003",
    product: "MacBook Air M2",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-13-midnight-gallery1-20220606?wid=4000&hei=3072&fmt=jpeg&qlt=80&.v=1654122880566",
    monthly: 95,
    months: 18,
    total: 1710,
  },
  {
    id: 4,
    owner: "Saidova Maftuna",
    orderNumber: "ORD-004",
    product: "iPad Pro 12.9",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-11-select-202210?wid=470&hei=556&fmt=png-alpha&.v=1664411206422",
    monthly: 115,
    months: 12,
    total: 1380,
  },
  {
    id: 5,
    owner: "Tursunov Bekzod",
    orderNumber: "ORD-005",
    product: "PlayStation 5",
    image: "https://m.media-amazon.com/images/I/51QxA-98QzL._AC_UF894,1000_QL80_.jpg",
    monthly: 125,
    months: 6,
    total: 750,
  },
];

export default function OrderBox() {
  const [orders, setOrders] = useState(initialOrders);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const handleCreate = (order) => {
    setOrders(prev => [
      ...prev,
      { ...order, id: prev.length ? prev[prev.length - 1].id + 1 : 1 }
    ]);
    setOpenCreate(false);
  };

  const handleEdit = (order) => {
    setOrders(prev =>
      prev.map(item => (item.id === order.id ? order : item))
    );
    setOpenEdit(false);
    setEditOrder(null);
  };

  const handleEditOpen = (order) => {
    setEditOrder(order);
    setOpenEdit(true);
  };

  const handleDeleteOpen = (order) => {
    setDeleteOrder(order);
    setOpenDelete(true);
  };

  const handleDelete = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    setOpenDelete(false);
    setDeleteOrder(null);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <Typography variant="h5" className="text-gray-900 font-bold">
          Buyurtmalar ro'yxati
        </Typography>
        <Button
          color="green"
          className="flex items-center gap-2"
          onClick={() => setOpenCreate(true)}
          size="sm"
        >
          <PlusIcon className="w-5 h-5" />
          Yangi buyurtma
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 max-w-6xl mx-auto">
        {orders.map((order) => (
          <Card key={order.id} className="w-full bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col">
            <CardBody className="flex flex-col items-start p-4">
              <div className="w-full mb-4 flex items-center gap-3">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-16 h-16 object-contain rounded-xl bg-gray-100 border"
                />
                <div>
                  <Typography variant="h6" className="text-gray-900 font-bold mb-1">
                    {order.product}
                  </Typography>
                  <div className="text-xs text-gray-500">Buyurtma raqami: <span className="font-semibold">{order.orderNumber}</span></div>
                </div>
              </div>
              <div className="mb-2 w-full">
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold">Egasining ismi:</span> {order.owner}
                </div>
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold">Bo'lib to'lash:</span> {order.months} oy
                </div>
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold">Oylik to'lov:</span> {order.monthly} USD
                </div>
                <div className="text-gray-800 text-sm">
                  <span className="font-semibold">Umumiy to'lov:</span> {order.total} USD
                </div>
              </div>
              <div className="flex gap-2 mt-auto ml-auto">
                <IconButton
                  variant="text"
                  color="blue"
                  onClick={() => handleEditOpen(order)}
                  size="sm"
                >
                  <PencilIcon className="w-5 h-5" />
                </IconButton>
                <IconButton
                  variant="text"
                  color="red"
                  onClick={() => handleDeleteOpen(order)}
                  size="sm"
                >
                  <TrashIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {openCreate && (
        <OrderBoxCreate
          onCreate={handleCreate}
          onCancel={() => setOpenCreate(false)}
        />
      )}
      {openEdit && editOrder && (
        <BoxEdit
          product={editOrder}
          onEdit={handleEdit}
          onCancel={() => {
            setOpenEdit(false);
            setEditOrder(null);
          }}
        />
      )}
      {openDelete && deleteOrder && (
        <BoxDelete
          product={deleteOrder}
          onDelete={handleDelete}
          onCancel={() => {
            setOpenDelete(false);
            setDeleteOrder(null);
          }}
        />
      )}
    </div>
  );
}