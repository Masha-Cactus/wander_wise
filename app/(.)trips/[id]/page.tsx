import { TripLong } from "@/app/components/TripLong";
import Modal from "@/app/components/Modal";
import { TripLongType } from "@/app/types/TripType";
import { promises as fs } from 'fs';

async function getCard(id: string) {
  const file = await fs.readFile(process.cwd() + `/public/cards/${id}.json`, 'utf8');
  const card: TripLongType = JSON.parse(file);

  return card;
}

export default async function TripModal({
  params,
}: {
  params: { id: string }
}) {
  const card = await getCard(params.id);

  console.log('cardModalPage');

  return (
    <div className="h-screen bg-grey-800 bg-opacity-80" id="bla">
      <Modal navigate> 
        <TripLong card={card}/> 
      </Modal>
    </div>
  );
}