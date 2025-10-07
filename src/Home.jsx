import { useState } from "react";
import { FaLink, FaRegCalendar, FaRegClone, FaRegEdit, FaRegTrashAlt, FaChartBar, FaExternalLinkAlt } from "react-icons/fa";

function Home() {
    const [form] = useState({ legenda: "", url: "" });

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-3xl flex items-center font-bold mb-2">
                <FaLink className="text-blue-500 text-2xl mr-2" />
                Encurtador de Links
            </h1>
            <p className="text-lg mb-6">
                Transforme links longos em URLs curtas e fáceis de compartilhar
            </p>

            <form className="p-4 w-full">
                <div className="text-left mb-5">
                    <label className="block text-sm font-medium mb-1">Legenda do link</label>
                    <input
                        type="text"
                        value={form.legenda}
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
                            className="border border-gray-300 rounded p-2 w-[80%]"
                            placeholder="https://exemplo.com/repository......"
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
                <h1 className="text-3xl font-bold">
                    Meus Links
                </h1>
                <p className="text-gray-500">
                    1 link
                </p>
            </div>

            <div className="w-full p-4">
                <div className="bg-white border border-gray-300 rounded p-4">
                    <div className="flex justify-between">
                        <p className="">
                            Exame Seleção Técnico 2026
                        </p>
                        <div className="text-gray-500 flex items-center space-x-1">
                            <FaChartBar />
                            <span>124</span>
                        </div>
                    </div>
                    <div className="text-blue-600 flex items-center space-x-1">
                        <p className="justify-self-start">
                            https://short.ly/ersb6d
                        </p>
                        < FaExternalLinkAlt />
                    </div>
                    <p className="text-gray-500 justify-self-start">
                        https://www.utfpr.edu.br/editais/graduacao-e-educacao-profis...
                    </p>
                    <div className="text-gray-500 flex items-center space-x-1">
                        <FaRegCalendar /> 
                        <span>Criado em 01/10/2025, 09:06</span>
                    </div>
                    <hr className="border-0 h-px bg-gray-300 my-4" />

                    <div className="flex justify-between">
                        <button className="w-[88%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center space-x-2">
                            < FaRegClone />
                            <span>Copiar</span>
                        </button>

                        <button className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center">
                            < FaRegEdit />
                        </button>

                        <button className="w-[5%] bg-gray-100 border border-gray-300 rounded flex justify-center items-center">
                            < FaRegTrashAlt />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home