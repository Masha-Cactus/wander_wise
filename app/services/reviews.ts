import { promises as fs } from 'fs';
import { ReviewType } from "../types/ReviewType";

export async function getReviews() {
  const file = await fs.readFile(
    process.cwd() + "/public/reviews.json",
    "utf8"
  );
  const reviews: ReviewType[] = JSON.parse(file);

  return reviews;
}
