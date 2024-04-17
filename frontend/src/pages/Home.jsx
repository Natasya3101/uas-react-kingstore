/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AllContext } from "@/App";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Popup from "@/components/Pop-up";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [edit, setEdit] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const { navigate, admin, setAdmin } = useContext(AllContext);
  function openPopupAdd() {
    setProduct({});
    setPopUp(true);
    setEdit(false);
  }
  function closePopup() {
    setPopUp(false);
    setReq({
      kategori: 1,
      nama_pakaian: "",
      jenis: "",
      harga: "Rp. ",
      stok: 0,
      foto: "",
    });
    setProduct({});
  }
  function openPopupEdit(product) {
    setPopUp(true);
    setEdit(true);
    setProduct(product);
    setReq({
      nama_pakaian: product.nama_pakaian,
      kategori: product.id_kategori,
      jenis: product.jenis,
      harga: formatRupiah(product.harga.toString(), "Rp. "),
      stok: product.stok,
      foto: product.foto,
    });
  }
  const [req, setReq] = useState({
    kategori: 1,
    nama_pakaian: "",
    jenis: "",
    harga: "",
    stok: 0,
    foto: "",
  });
  const handleChange = (e) => {
    setReq({
      ...req,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeHarga = (e) => {
    setReq({
      ...req,
      [e.target.name]: formatRupiah(e.target.value, "Rp. "),
    });
  };
  const formatRupiah = (value, prefix) => {
    const hargaString = value.replace(/[^,\d]/g, "").toString();
    const split = hargaString.split(",");
    const sisa = split[0].length % 3;
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    let rupiah = split[0].substr(0, sisa);
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  };
  const editProduct = async (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/api/v1/pakaian/editById/" + product.id, req, {
        headers: { Authorization: `Bearer ${admin.token ? admin.token : token}` },
      })
      .then((res) => {
        alert(res.data.msg);
      });
    setReq({
      kategori: 1,
      nama_pakaian: "",
      jenis: "",
      harga: "Rp. ",
      stok: 0,
    });
    setPopUp(false);
  };
  const addProduct = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/pakaian/addPakaian", req, {
        headers: { Authorization: `Bearer ${admin.token ? admin.token : token}` },
      })
      .then((res) => {
        alert(res.data.msg);
      });
    setReq({
      kategori: 1,
      nama_pakaian: "",
      jenis: "",
      harga: "Rp. ",
      stok: 0,
      foto: "",
    });
    setPopUp(false);
  };
  const [search, setSearch] = useState({
    nama_pakaian: "",
    sort: "",
  });
  const handleSearch = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };
  const getPakaian = async () => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJENjbDN3ZDZrT3FralIwYnV0cmdaeE93RlBuenZ2WmIyMEtFQ0ZKTUVsRFhyRVI1L3cwQkVhIiwiaWF0IjoxNzEzMTE1MTAwfQ.p_wNDJaMTwHfFkuhhj_Vkt_4is_KWR6PNxXuKQ2G9PQ'
    await fetch(
      `http://localhost:3000/api/v1/pakaian/getPakaian/?nama_pakaian=${search.nama_pakaian}&sort=${search.sort}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${admin.token ? admin.token : token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.result);
      });
  };
  const deleteById = async (product) => {
    if (confirm(`yakin ingin menghapus product ?`)) {
      await fetch(
        `http://localhost:3000/api/v1/pakaian/deleteById/${product.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${admin.token ? admin.token : token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          alert(res.msg);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getPakaian();
  };
  useEffect(() => {
    if (admin.token || token) {
      setTimeout(() => {
        editProduct;
        deleteById;
        addProduct;
        getPakaian();
      }, 500);
    }
    if (!admin.token) {
      setAdmin({
        token: token,
        msg: "login berhasil!!"
      })
    }
  });
  if (admin.token|| token) {
    
    return (
      <>
        <title>Home</title>
        <main
          className="p-2 m-auto w-4/5 mt-4 flex flex-col gap-4"
        >
          <form action="/home" onSubmit={handleSubmit}>
            <input
              name="nama_pakaian"
              type="text"
              className="placeholder:text-center m-auto sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block sm:w-2/4 w-full p-1 bg-slate-400 border-gray-600 placeholder-black text-black"
              required
              placeholder="Cari Nama Pakaian"
              onChange={handleSearch}
            />
          </form>
          <div className="w-full flex justify-between">
            <select
              onChange={handleSearch}
              name="sort"
              className="text-sm h-min text-center cursor-pointer border rounded-full border-slate-500"
            >
              <option value="">Default Sort</option>
              <option value="asc">Sort by harga: low to high</option>
              <option value="desc">Sort by harga: high to low</option>
            </select>
            <Button onClick={openPopupAdd}>Add Product</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {products &&
              products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  openPopupEdit={openPopupEdit}
                  deleteById={deleteById}
                />
              ))}
          </div>
        </main>
        {popUp && (
          <Popup
            closePopup={closePopup}
            title={edit ? "Edit Product" : "Add Product"}
          >
            <form
              className="space-y-4 md:space-y-2"
              onSubmit={edit ? editProduct : addProduct}
            >
              <div>
                <label
                  htmlFor="nama_pakaian"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nama Pakaian
                </label>
                <input
                  name="nama_pakaian"
                  type="text"
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                  defaultValue={product.nama_pakaian}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="jenis"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Jenis Pakaian
                </label>
                <input
                  name="jenis"
                  type="text"
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                  defaultValue={product.jenis}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2 justify-between">
                <div>
                  <label
                    htmlFor="harga"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Harga
                  </label>
                  <input
                    type="text"
                    name="harga"
                    value={req.harga}
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    onChange={handleChangeHarga}
                  />
                </div>
                <div>
                  <label
                    htmlFor="harga"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Stock Product
                  </label>
                  <input
                    type="number"
                    name="stok"
                    className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    required
                    defaultValue={product.stok}
                    min={0}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="kategori"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Kategori
                  </label>
                  <select
                    defaultValue={product.id_kategori}
                    name="kategori"
                    onChange={handleChange}
                  >
                    <option value={1}>Man</option>
                    <option value={2}>Woman</option>
                    <option value={3}>Unisex</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="foto"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  URL Gambar Product
                </label>
                <input
                  type="text"
                  name="foto"
                  className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  required
                  min={0}
                  defaultValue={product.foto}
                  onChange={handleChange}
                />
              </div>
              <button
                className={`w-full cursor-pointer flex items-center gap-2 bg-slate-500 hover:bg-slate-400 text-white p-2 [&>svg]:w-4 [&>svg]:h-4 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center`}
              >
                {edit ? "Save" : "Add"}
              </button>
            </form>
          </Popup>
        )}
      </>
    );
  } else {
    return (
      <div>
        {setTimeout(() => {
          navigate("/");
        }, 100)}
      </div>
    );
  }
}
