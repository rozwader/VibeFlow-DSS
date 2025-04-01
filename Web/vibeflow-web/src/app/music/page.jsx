import HeaderComponent from "@/components/HeaderComponent";
import Link from "next/link";

const musicPage = () => {
    return(
        <>
            <HeaderComponent title="skibidi"/>
            <h2>Tutaj ma być cała aplikacji itp</h2>
            <Link className="text-red-500" href='/'>Powrót</Link>
        </>
        
    );
}

export default musicPage;