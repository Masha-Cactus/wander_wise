import { TripShort } from "@/app/components/TripShort";
import { TripShortType } from "@/app/types/TripType";
import { promises as fs } from 'fs';

const atmospheres = ['relax', 'loud', 'quiet', 'sunny'];
const styles = ['cultural', 'sightseeing', 'adventure', 'nature'];

async function getCards() {
  const file = await fs.readFile(process.cwd() + '/public/cards.json', 'utf8');
  const cards: TripShortType[] = JSON.parse(file);

  return cards;
  // const res = await fetch('/cards.json');
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }
  // return res.json();
}

export default async function Home() {
  const cards: TripShortType[] = await getCards();

  return (
    <main className="grid grid-cols-4 grid-rows-3">
      <form
        action=""
        className="flex flex-col gap-6 border-2
          border-red-800 p-4 col-span-1 row-span-3"
      >
        <div className="flex flex-col">
          <h2>Where are you now?</h2>
          <input 
            type="text" 
            placeholder="enter location" 
            className="text-zinc-950 px-2 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <h2>Atmosphere</h2>
          <div className="flex flex-wrap gap-2">

            {atmospheres.map((atmosphere) => (
              <option 
                key={atmosphere} 
                value={atmosphere} 
                className="border-2 border-red-800 w-min rounded-lg p-2"
              >{atmosphere}</option>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h2>Style</h2>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <option key={style} 
                value={style} 
                className="border-2 border-red-800 w-min rounded-lg p-2"
              >{style}</option>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h2>People amount</h2>
          <option 
            value="1" 
            className="border-2 border-red-800 w-min rounded-lg p-2"
          >Just me</option>
          <option 
            value="1-5" 
            className="border-2 border-red-800 w-min rounded-lg p-2"
          >1-5</option>
          <option 
            value="?" 
            className="border-2 border-red-800 w-min rounded-lg p-2"
          >custom input</option>
        </div>

        <div className="">
          <h2>Budget</h2>
          <p>$</p>
          <input 
            type="range" 
            placeholder="enter budget" 
            className="text-zinc-950 px-2 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="destination">Destination</label>
          <input 
            type='number' 
            placeholder="enter destination" 
            id="destination" 
            className="text-zinc-950 px-2 outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button className="bg-green-500 w-full">Apply</button>
          <button className="bg-red-500 w-full">Clear</button>
        </div>
      </form>

      <div className="flex flex-col items-center gap-6 col-span-3">
        <h2 
          className="text-3xl font-bold mt-6"
        >Don&apos;t know where to begin?</h2>
        <div className="flex gap-4 justify-center">
          <span 
            className="border-2 border-red-800 px-6 py-6"
          >Rest with family</span>
          <span 
            className="border-2 border-red-800 px-6 py-6"
          >Fun with friends</span>
          <span 
            className="border-2 border-red-800 px-6 py-6"
          >History places</span>
          <span 
            className="border-2 border-red-800 px-6 py-6"
          >Art galleries</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 
      col-start-2 col-span-3 row-start-2">
        
        {cards.map((card) => (
          <TripShort key={card.id} card={card} />
        ))}
      </div>
      
      <div className="flex flex-col gap-4 justify-center
        col-start-2 col-span-3 row-start-3 items-center">
        <button 
          className="border-2 border-red-800 h-min w-2/3">See more</button>
        <button className="border-2 border-red-800 h-min w-2/3">Save</button>
      </div>
    </main>
  );
}