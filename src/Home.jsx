import { useState } from "react";
import { FaLink } from "react-icons/fa";

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

            <form className="p-4  w-full">
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
                    <input
                        type="url"
                        value={form.url}
                        className="w-full border border-gray-300 rounded p-2 mb-2"
                        placeholder="https://exemplo.com/repository......"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Encurtar
                    </button>
                </div>


            </form>

            
        </div>
    );
}

export default Home