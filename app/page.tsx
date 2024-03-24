import Link from "next/link";
import Content from "./components/home/Content";

export default function Home() {


  return (
    // <main className="flex min-h-screen items-center justify-between p-24">
    <main>
      {/* <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl font-bold">About</h1>
        <p 
          className="max-w-lg"
        >{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, iste! Voluptatem atque officiis quos cum corrupti. Cumque aperiam aliquid iure, architecto cum, nostrum tempore, rerum quos excepturi quae iusto tenetur!`}</p>
      </div> */}

      {/* <div className="flex flex-col justify-center items-center gap-4 w-2/4">
        <Link 
          href="/trips"
          className="inline-block border-2
            border-red-800 px-6 py-6 w-2/4 font-bold text-2xl"
        >Let&apos;s start</Link> */}

      {/* <button
          className="rounded-full border border-black bg-black p-1.5 
          px-4 text-sm text-white transition-all 
          hover:bg-white hover:text-black"
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </button> */}

      {/* <Link 
          href="/login"
          className="border-2 border-red-800 px-4 py-2 w-56 font-bold"
        >I have an account</Link>
      </div> */}
      <Content />
    </main>
  );
}
