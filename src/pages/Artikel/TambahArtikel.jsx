import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TambahArtikelModal = ({ open, onClose, onSubmit, editData }) => {

    const [form, setForm] = useState({
        judul: "",
        kategori: "Wisata Alam",
        penulis: "",
        tanggal: "",
        image: "",
        deskripsi: ""
    });

    useEffect(() => {
        if (editData) setForm(editData);
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="
                bg-white rounded-2xl shadow-xl
                w-full max-w-xl
                max-h-[90vh] overflow-y-auto
            ">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">

                    <h2 className="text-lg font-semibold">
                        {editData ? "Edit Artikel" : "Tambah Artikel Baru"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <X size={18} />
                    </button>

                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* JUDUL */}
                    <div>
                        <label className="text-sm font-medium">Judul Artikel</label>
                        <input
                            name="judul"
                            value={form.judul}
                            onChange={handleChange}
                            placeholder="Contoh: Ranto Canyon"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* KATEGORI */}
                    <div>
                        <label className="text-sm font-medium">Kategori</label>
                        <select
                            name="kategori"
                            value={form.kategori}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                        >
                            <option>Wisata Alam</option>
                            <option>Budaya & Kuliner</option>
                            <option>Edukasi</option>
                            <option>Berita</option>
                            <option>Event</option>
                        </select>
                    </div>

                    {/* PENULIS */}
                    <div>
                        <label className="text-sm font-medium">Penulis</label>
                        <input
                            name="penulis"
                            value={form.penulis}
                            onChange={handleChange}
                            placeholder="Admin"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>

                    {/* TANGGAL */}
                    <div>
                        <label className="text-sm font-medium">Tanggal</label>
                        <input
                            type="date"
                            name="tanggal"
                            value={form.tanggal}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="text-sm font-medium">URL Gambar</label>
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>

                    {/* DESKRIPSI */}
                    <div>
                        <label className="text-sm font-medium">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={form.deskripsi}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Isi artikel atau ringkasan..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm"
                        />
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                            {editData ? "Update Artikel" : "Tambah Artikel"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default TambahArtikelModal;