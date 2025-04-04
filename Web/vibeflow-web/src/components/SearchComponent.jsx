const SearchComponent = () => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const query = formData.get("searchQuery");

        try{
            const request = fetch("/api/search/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            })
        }catch(err){
            console.log(`Couldn't resolve query | ${err}`);
        }
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="searchQuery" placeholder="Search"/>
                <button type="submit">Szukaj</button>
            </form>
        </div>
    );
}

export default SearchComponent;