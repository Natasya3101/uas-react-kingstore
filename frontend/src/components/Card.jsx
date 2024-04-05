/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { SquarePen, Trash2} from 'lucide-react';
import { Info } from 'lucide-react';


export default function Card({product, openPopupEdit}){
    return ( 
        <div key={product.id} className="p-2 border rounded border-slate-600 flex flex-col place-items-center">
            <img src={product.gambar} width={150}/>
            <h4>{product.nama}</h4>
            <h4>Harga : Rp.{product.harga}</h4>
            <h4>Kategori : {product.kategori}</h4>
            <div className='flex gap-3'>
                <SquarePen color={"blue"} className="cursor-pointer" onClick={() => openPopupEdit(product)}/>
                <Trash2 color={"red"} className="cursor-pointer"/>
            </div>
        </div>
    );
}