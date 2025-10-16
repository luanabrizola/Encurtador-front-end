import { useState, useEffect } from "react";
import { FaLink, FaRegCalendar, FaRegClone, FaRegEdit, FaRegTrashAlt, FaChartBar, FaExternalLinkAlt } from "react-icons/fa";

function Home() {
    const [form, setForm] = useState({ legenda: "", url: "" });
    const [links, setLinks] = useState([]);
    const API_URL = "http://localhost:3000";

    useEffect(() => {
        fetch(`${API_URL}/links`)
            .then((res) => res.json())
            .then((data) => setLinks(data))
            .catch((err) => console.error("Erro ao buscar links:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Erro ao criar link");
                return;
            }

            setLinks([...links, result.link]);
            setForm({ legenda: "", url: "" });
        } catch (error) {
            console.error("Erro ao criar link:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Deseja realmente excluir este link?")) return;
        try {
            const response = await fetch(`${API_URL}/links/${id}`, { method: "DELETE" });

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

    const handleCopy = (codigo) => {
        const urlCurta = `${API_URL}/link/${codigo}`;
        navigator.clipboard.writeText(urlCurta);
        alert("Link copiado!");
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
                            <p>{link.legenda}</p>
                            <div className="text-gray-500 flex items-center space-x-1">
                                <FaChartBar />
                                <span>{link.visualizacoes ?? 0}</span>
                            </div>
                        </div>

                        <div className="text-blue-600 flex items-center space-x-1">
                            <p>{`${API_URL}/link/${link.codigo}`}</p>
                            <FaExternalLinkAlt />
                        </div>

                        <p className="text-gray-500 break-all">
                            {link.url}
                        </p>

                        <div className="text-gray-500 flex items-center space-x-1">
                            <FaRegCalendar />
                            <span>
                                Criado em{" "}
                                {link.criado_em
                                    ? new Date(link.criado_em).toLocaleString("pt-BR")
                                    : "—"}
                            </span>
                        </div>

                        <hr className="border-0 h-px bg-gray-300 my-4" />

                        <div className="flex justify-between">
                            <button
                                className="w-[88%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center space-x-2"
                                onClick={() => handleCopy(link.codigo)}
                            >
                                <FaRegClone />
                                <span>Copiar</span>
                            </button>

                            <button className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center">
                                <FaRegEdit />
                            </button>

                            <button
                                className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center"
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
