import HeaderComponent from "@/components/headerComponent";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeaderComponent title="Vibe Flow"/>
      <h2>Tutaj ma być landing page, czyli wyjasnienie projektu, mozliwosc zalogowania/zarejestrowania oraz przejscie do aplikacji muzycznej</h2>
      <Link className="text-red-500" href={`/music/`}>Muzyka</Link>
    </>
    
  );
}
