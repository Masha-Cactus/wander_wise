import { CardLongType, CardShortType } from "../types/TripType";
import { client } from "./client";

export const getCards = () => {
  // return client.get<CardShortType[]>('/cards');
  return client.get<CardShortType[]>('/cards.json');
};

export const getCardById = (id: number) => {
  return client.get<CardLongType>(`/cards/${id}`);
};