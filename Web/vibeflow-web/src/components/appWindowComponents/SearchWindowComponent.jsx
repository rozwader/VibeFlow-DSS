import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchWindowComponent = () => {
    const [queryResponse, setQueryResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const query = formData.get("searchQuery");

        const token = localStorage.getItem("S_TOKEN");
        if (!token) return;

        const headers = {
        Authorization: `Bearer ${token}`,
        };

        try {
        const request = await fetch("/api/search/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query, headers }),
        });

        if(request.ok){
            const data = await request.json();
            console.log(data);
        }else{

        }
        } catch (err) {
        console.log(`Couldn't resolve query | ${err}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="fixed z-[1]">
                <div className="relative w-100 shadow-md rounded-4xl">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <BsSearch />
                </div>

                <input
                    type="text"
                    name="searchQuery"
                    placeholder="What you're looking for?"
                    className="w-full py-3 pl-12 pr-28 focus:outline-none bg-white rounded-4xl"
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 border border-black bg-black text-white px-4 py-2 rounded-4xl hover:bg-white hover:text-black transition cursor-pointer"
                >
                    Search
                </button>
                </div>
            </form>
            
        </div>
    );
}

export default SearchWindowComponent;