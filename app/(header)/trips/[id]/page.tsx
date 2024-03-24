import { TripLong } from "@/app/components/shared/TripLong";
import { TripLongType } from "@/app/types/TripType";
import { promises as fs } from 'fs';
// import Link from "next/link";

async function getTrip(id: string) {
  const file = await fs.readFile(process.cwd() + `/public/cards/${id}.json`, 'utf8');
  const card: TripLongType = JSON.parse(file);

  return card;
}

export default async function CardPage({
  params,
}: {
  params: { id: string }
}) {

  const card = await getTrip(params.id);

  console.log('hi from trip');

  return (
    <div className="relative w-2/3 h-2/3 bg-pink-800">
      {/* <Link href="/home">
      </Link> */}

      <div className="absolute inset-0">
        <div className="flex items-center justify-center h-screen">
          <h1>from Page</h1>
          <div className="w-1/2">
            <TripLong card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}

// function BackIcon(props) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       {...props}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M10 19l-7-7m0 0l7-7m-7 7h18"
//       />
//     </svg>
//   );
// }