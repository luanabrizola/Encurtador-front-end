import { useState, useEffect } from "react";
import { FaLink, FaRegCalendar, FaRegClone, FaRegEdit, FaRegTrashAlt, FaChartBar, FaExternalLinkAlt, FaWhatsapp, FaTelegramPlane, FaFacebookF, FaTwitter } from "react-icons/fa";

function Home() {
    const [form, setForm] = useState({ legenda: "", url: "" });
    const [links, setLinks] = useState([]);
    // Prefer using env var VITE_API_URL; fallback para a URL pública sem barra final
    const API_URL = import.meta.env.VITE_API_URL || "https://encurtador-back-endd.onrender.com";
    const base = (path) => `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ legenda: "", url: "" });

    const [openShare, setOpenShare] = useState(null);

    useEffect(() => {
        fetch(base("/links"))
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setLinks(data);
                } else if (Array.isArray(data.links)) {
                    setLinks(data.links);
                } else {
                    setLinks([]);
                }
            })
            .catch((err) => console.error("Erro ao buscar links:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(base("/links"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Erro ao criar link");
                return;
            }

            const created = result.link || result;
            setLinks([...links, created]);
            setForm({ legenda: "", url: "" });
        } catch (error) {
            console.error("Erro ao criar link:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Deseja realmente excluir este link?")) return;
        try {
            const response = await fetch(base(`/links/${id}`), { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Erro ao excluir link.");
            }

            setLinks((prev) => prev.filter((link) => link.id !== id));
            alert("Link excluído com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir o link.");
        }

    };

    const handleCopy = async (codigo) => {
        const urlCurta = base(`/link/${codigo}`);
        try {
            await navigator.clipboard.writeText(urlCurta);
            alert("Link copiado!");
        } catch (err) {
            console.error("Erro ao copiar para a área de transferência:", err);
            alert("Não foi possível copiar o link. Copie manualmente:");
        }
    };

    const handleEditClick = (link) => {
        setEditId(link.id);
        setEditForm({ legenda: link.legenda, url: link.url });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(base(`/links/${editId}`), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            });

            if (!response.ok) {
                const result = await response.json();
                alert(result.error || "Erro ao atualizar link");
                return;
            }

            const updatedLink = await response.json();

            setLinks((prevLinks) =>
                prevLinks.map((link) => (link.id === editId ? updatedLink : link))
            );

            setEditId(null);
        } catch (error) {
            console.error("Erro ao atualizar link:", error);
            alert("Erro ao atualizar link.");
        }
    };

    const handleEditCancel = () => {
        setEditId(null);
    };

    const handleShare = (link, plataforma) => {
        const urlCurta = base(`/link/${link.codigo}`);

        let shareURL = "";

        switch (plataforma) {
            case "whatsapp":
                shareURL = `https://wa.me/?text=${encodeURIComponent(urlCurta)}`;
                break;
            case "telegram":
                shareURL = `https://t.me/share/url?url=${encodeURIComponent(urlCurta)}`;
                break;
            case "facebook":
                shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlCurta)}`;
                break;
            case "twitter":
                shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlCurta)}`;
                break;
            default:
                console.log("Plataforma não suportada");
                return;
        }

        window.open(shareURL, "_blank");
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-3xl flex items-center font-bold mb-2">
                <FaLink className="text-blue-500 text-2xl mr-2" />
                Encurtador de Links
            </h1>
            <p className="text-lg mb-6">
                Transforme links longos em URLs curtas e fáceis de compartilhar
            </p>

            <form className="p-4 w-full" onSubmit={handleSubmit}>
                <div className="text-left mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Legenda do link
                    </label>
                    <input
                        type="text"
                        value={form.legenda}
                        onChange={(e) =>
                            setForm({ ...form, legenda: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Ex: Link do nosso repositório"
                        required
                    />
                </div>

                <div className="mb-3 w-full text-left">
                    <label className="block text-sm font-medium mb-1">
                        URL para encurtar
                    </label>
                    <div className="w-[100%] flex space-x-4">
                        <input
                            type="url"
                            value={form.url}
                            onChange={(e) =>
                                setForm({ ...form, url: e.target.value })
                            }
                            className="border border-gray-300 rounded p-2 w-[80%]"
                            placeholder="https://exemplo.com/..."
                            required
                        />
                        <button
                            type="submit"
                            className="w-[20%] bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Encurtar
                        </button>
                    </div>
                </div>
            </form>

            <div className="flex justify-between items-center p-4 w-full">
                <h1 className="text-3xl font-bold">Meus Links</h1>
                <p className="text-gray-500">{links.length} link(s)</p>
            </div>

            <div className="w-full p-4 space-y-4">
                {links.map((link) => (
                    <div
                        key={link.id}
                        className="bg-white border border-gray-300 rounded p-4"
                    >
                        <div className="flex justify-between">
                            <p className="font-bold">{link.legenda}</p>
                            <div className="text-gray-500 flex items-center space-x-1">
                                <FaChartBar />
                                <span>{link.visualizacoes ?? 0}</span>
                            </div>
                        </div>

                        <div className="text-blue-600 flex items-center space-x-1">
                            <a
                                href={`${API_URL}/link/${link.codigo}`}
                                target="_blank"
                                className="flex items-center space-x-1"
                            >
                                <span>{`${API_URL}/link/${link.codigo}`}</span>
                                <FaExternalLinkAlt />
                            </a>
                        </div>

                        <p className="text-gray-500 break-all text-left">
                            {link.url}
                        </p>

                        <div className="text-gray-500 flex items-center space-x-1">
                            <FaRegCalendar />
                            <span>
                                Criado em{" "}
                                {link.criado_em
                                    ? new Date(link.criado_em).toLocaleString("pt-BR", {
                                        dateStyle: "short",
                                        timeStyle: "short",
                                    })
                                    : "—"}
                            </span>
                        </div>

                        <hr className="border-0 h-px bg-gray-300 my-4" />

                        <div className="flex justify-between h-[40px]">
                            <button
                                className="w-[75%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center space-x-2 cursor-pointer"
                                type="button"
                                onClick={() => handleCopy(link.codigo)}
                            >
                                <FaRegClone />
                                <span>Copiar</span>
                            </button>

                            <div className="flex flex-col relative w-[12%] h-[40px]">
                                <button
                                    className="w-full bg-gray-100 border border-gray-300 rounded flex justify-center items-center space-x-2 cursor-pointer h-full"
                                    type="button"
                                    onClick={() => setOpenShare(openShare === link.id ? null : link.id)}
                                >
                                    <span>Compartilhar</span>
                                </button>

                                {openShare === link.id && (
                                    <div className="absolute top-full w-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                                        <button
                                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 w-full cursor-pointer"
                                            type="button"
                                            onClick={() => handleShare(link, "whatsapp")}
                                        >
                                            <FaWhatsapp /> <span>WhatsApp</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 w-full cursor-pointer"
                                            type="button"
                                            onClick={() => handleShare(link, "telegram")}
                                        >
                                            <FaTelegramPlane /> <span>Telegram</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 w-full cursor-pointer"
                                            type="button"
                                            onClick={() => handleShare(link, "facebook")}
                                        >
                                            <FaFacebookF /> <span>Facebook</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 w-full cursor-pointer"
                                            type="button"
                                            onClick={() => handleShare(link, "twitter")}
                                        >
                                            <FaTwitter /> <span>Twitter</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {editId === link.id ? (
                                <form onSubmit={handleEditSubmit} className="flex flex-col space-y-2">
                                    <input
                                        type="text"
                                        value={editForm.legenda}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, legenda: e.target.value })
                                        }
                                        className="border border-gray-300 rounded p-2"
                                        required
                                    />
                                    <input
                                        type="url"
                                        value={editForm.url}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, url: e.target.value })
                                        }
                                        className="border border-gray-300 rounded p-2"
                                        required
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white py-1 px-2 rounded"
                                        >
                                            Salvar
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-gray-300 py-1 px-2 rounded"
                                            onClick={handleEditCancel}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <button
                                    className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center cursor-pointer"
                                    type="button"
                                    onClick={() => handleEditClick(link)}
                                >
                                    <FaRegEdit />
                                </button>
                            )}

                            <button
                                className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center cursor-pointer"
                                type="button"
                                onClick={() => handleDelete(link.id)}
                            >
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
