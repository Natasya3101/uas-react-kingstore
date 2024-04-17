/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { SquarePen, Trash2 } from "lucide-react";

export default function Card({ product, openPopupEdit, deleteById }) {
  return (
    <div
      key={product.id}
      className="p-2 border rounded border-slate-600 place-items-center flex gap-2 flex-col w-3/4"
    >
      <img src={`${product.foto}`} className="h-40"/>
      <div className="text-center">
        <h4 className="font-bold">{product.nama_pakaian}</h4>
        <h4>{product.kategori}</h4>
        <h4>{product.jenis}</h4>
      </div>
      <div className="text-center">
        <h4>
          {product.harga.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </h4>
        <h4>Stok : {product.stok}</h4>
      </div>
      <div className="flex gap-3">
        <SquarePen
          color={"blue"}
          className="cursor-pointer"
          onClick={() => openPopupEdit(product)}
        />
        <Trash2 color={"red"} className="cursor-pointer" 
        onClick={() => deleteById(product)}/>
      </div>
    </div>
  );
}
