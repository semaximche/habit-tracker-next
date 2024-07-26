import Link from "next/link";

export default function Home() {
    return (
        <main className="p-4">
            <h2>Landing Page</h2>
            <Link className="text-blue-500 underline" href="/login">Login</Link>
        </main>
    );
}