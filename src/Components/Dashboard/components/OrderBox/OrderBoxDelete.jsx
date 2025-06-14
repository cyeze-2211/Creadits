import React, { useRef, useEffect, useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

export default function BoxDelete({ product, onDelete, onCancel }) {
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);

  // Modal tashqarisiga bosilganda yoki ESC bosilganda silliq yopiladi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setClosing(true);
      }
    };
    const handleEsc = (event) => {
      if (event.key === "Escape") setClosing(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Animatsiya tugaganda haqiqiy yopish
  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onCancel();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [closing, onCancel]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
        closing ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-sm ${closing ? "animate-modal-out" : "animate-modal-in"}`}
      >
        <Card className="bg-white rounded-2xl shadow-2xl border border-gray-200">
          <CardBody>
            <Typography variant="h6" className="text-gray-900 font-bold mb-4">
              Buyurtmani o'chirish
            </Typography>
            <Typography className="mb-4 text-gray-800">
              <span className="font-semibold">
                {product.product || product.name}
              </span>{" "}
              buyurtmasini o‘chirishni tasdiqlaysizmi?
            </Typography>
            <div className="flex justify-end gap-2">
              <Button
                variant="text"
                color="gray"
                onClick={() => setClosing(true)}
              >
                Bekor qilish
              </Button>
              <Button
                color="red"
                onClick={() => onDelete(product.id)}
              >
                O'chirish
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>);}
      