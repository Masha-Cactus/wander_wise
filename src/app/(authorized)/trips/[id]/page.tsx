import TripPage from "@/src/components/pages/TripPage";
// import { getCard } from "@/src/services/cards";
// import { getReviews } from "@/app/services/reviews";

export default async function CardPage({ params }: { params: { id: string } }) {
//   const card = await getCard(params.id);
//   const reviews = await getReviews();

  return (<TripPage card={data} reviews={reviews}/>);
}
