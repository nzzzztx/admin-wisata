import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TambahDestinasiModal = ({ open, onClose, onSubmit, editData }) => {

    const [form, setForm] = useState({
        nama: "",
        kategori: "Gunung",
        harga: "",
        jam: "",
        durasi: "",
        lokasi: "",
        rating: "4.5",
        deskripsi: "",
        fasilitas: "",
        highlight: "",
        maps: "",
        image: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...form,
            fasilitas: form.fasilitas.split(",").map(i => i.trim()),
            highlight: form.highlight.split(",").map(i => i.trim())
        };

        onSubmit(data);
        onClose();
        showNotif(`Destinasi ${data.nama} berhasil ditambahkan`, "success");
    };

    useEffect(() => {

        if (editData) {
            setForm({
                ...editData,
                fasilitas: editData.fasilitas?.join(", ") || "",
                highlight: editData.highlight?.join(", ") || ""
            });
        }

    }, [editData]);

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">

                    <h2 className="text-lg font-semibold">
                        {editData ? "Edit Destinasi" : "Tambah Destinasi Baru"}
                    </h2>

                    <button onClick={onClose}>
                        <X size={20} />
                    </button>

                </div>


                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* NAMA */}
                    <div>
                        <label className="text-sm font-medium">Nama Wisata</label>
                        <input
                            name="nama"
                            value={form.nama}
                            onChange={handleChange}
                            placeholder="Contoh: Ranto Canyon"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* KATEGORI */}
                    <div>
                        <label className="text-sm font-medium">Kategori</label>
                        <select
                            name="kategori"
                            value={form.kategori}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        >
                            <option>Wisata Alam</option>
                            <option>Edukasi & Sejarah</option>
                            <option>Kuliner</option>
                            <option>Wisata Buatan</option>
                        </select>
                    </div>


                    {/* HARGA */}
                    <div>
                        <label className="text-sm font-medium">Harga</label>
                        <input
                            name="harga"
                            value={form.harga}
                            onChange={handleChange}
                            placeholder="Rp50.000"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* JAM */}
                    <div>
                        <label className="text-sm font-medium">Jam Operasional</label>
                        <input
                            name="jam"
                            value={form.jam}
                            onChange={handleChange}
                            placeholder="08.00 - 16.00 WIB"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* DURASI */}
                    <div>
                        <label className="text-sm font-medium">Durasi Kunjungan</label>
                        <input
                            name="durasi"
                            value={form.durasi}
                            onChange={handleChange}
                            placeholder="2-3 jam"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* LOKASI */}
                    <div>
                        <label className="text-sm font-medium">Lokasi</label>
                        <input
                            name="lokasi"
                            value={form.lokasi}
                            onChange={handleChange}
                            placeholder="Salem, Brebes Selatan"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* RATING */}
                    <div>
                        <label className="text-sm font-medium">Rating</label>
                        <input
                            name="rating"
                            value={form.rating}
                            onChange={handleChange}
                            placeholder="4.7"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* DESKRIPSI */}
                    <div>
                        <label className="text-sm font-medium">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* FASILITAS */}
                    <div>
                        <label className="text-sm font-medium">Fasilitas</label>
                        <input
                            name="fasilitas"
                            value={form.fasilitas}
                            onChange={handleChange}
                            placeholder="Parkir, Toilet, Spot Foto"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* HIGHLIGHT */}
                    <div>
                        <label className="text-sm font-medium">Yang Menarik</label>
                        <input
                            name="highlight"
                            value={form.highlight}
                            onChange={handleChange}
                            placeholder="Body rafting, Tebing batu alam"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* MAPS */}
                    <div>
                        <label className="text-sm font-medium">Embed Google Maps</label>
                        <textarea
                            name="maps"
                            value={form.maps}
                            onChange={handleChange}
                            rows="2"
                            placeholder="iframe maps"
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* IMAGE */}
                    <div>
                        <label className="text-sm font-medium">URL Gambar</label>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>


                    {/* BUTTON */}
                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-sm"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm"
                        >
                            {editData ? "Update Destinasi" : "Tambah Destinasi"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};

export default TambahDestinasiModal;