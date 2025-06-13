import React, { useState } from "react";
import { Card, CardBody, Typography, Button, IconButton } from "@material-tailwind/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import OrderCreate from "./OrderCreate";
import OrderEdit from "./OrderEdit";
import OrderDelete from "./OrderDelete";

const initialOrders = [
  {
    id: 1,
    customer: "Ali Valiyev",
    phone: "+998 90 123 45 67",
    product: "iPhone 15 Pro",
    months: 12,
    monthly: 2000000,
    total: 24000000,
  },
  {
    id: 2,
    customer: "Dilnoza Karimova",
    phone: "+998 91 234 56 78",
    product: "Samsung Galaxy S24",
    months: 9,
    monthly: 1800000,
    total: 16200000,
  },
  {
    id: 3,
    customer: "Jasur Akbarov",
    phone: "+998 93 345 67 89",
    product: "MacBook Air M2",
    months: 18,
    monthly: 3500000,
    total: 63000000,
  },
  {
    id: 4,
    customer: "Shahnoza Rustamova",
    phone: "+998 94 456 78 90",
    product: "iPad Pro 12.9",
    months: 10,
    monthly: 2200000,
    total: 22000000,
  },
  {
    id: 5,
    customer: "Sardorbek Xudoyberdiyev",
    phone: "+998 95 567 89 01",
    product: "PlayStation 5",
    months: 6,
    monthly: 1500000,
    total: 9000000,
  },
];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
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
    <div className="p-4">
      <Card className="bg-white rounded-2xl shadow-xl border border-gray-200">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
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
              Yangi Buyurtma
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Ismi</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Telefon</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Mahsulot</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Bo'lib to'lash (oy)</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Oylik to'lov</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Umumiy narx</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2 text-gray-900">{idx + 1}</td>
                    <td className="px-4 py-2 text-gray-900">{order.customer}</td>
                    <td className="px-4 py-2 text-gray-900">{order.phone}</td>
                    <td className="px-4 py-2 text-gray-900">{order.product}</td>
                    <td className="px-4 py-2 text-gray-900">{order.months}</td>
                    <td className="px-4 py-2 text-gray-900">{order.monthly.toLocaleString()} so'm</td>
                    <td className="px-4 py-2 text-gray-900">{order.total.toLocaleString()} so'm</td>
                    <td className="px-4 py-2 flex gap-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      {openCreate && (
        <OrderCreate
          onCreate={handleCreate}
          onCancel={() => setOpenCreate(false)}
        />
      )}
      {openEdit && editOrder && (
        <OrderEdit
          order={editOrder}
          onEdit={handleEdit}
          onCancel={() => {
            setOpenEdit(false);
            setEditOrder(null);
          }}
        />
      )}
      {openDelete && deleteOrder && (
        <OrderDelete
          order={deleteOrder}
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