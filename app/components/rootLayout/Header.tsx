import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <Link href="/" className="text-3xl font-bold text-red-800">LOGO</Link>
      <div className="flex gap-4">
        <Link href="/saved">Saved</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
}