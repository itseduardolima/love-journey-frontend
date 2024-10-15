import { Memory } from "./Memory";

export type Journey = {
  id: string;
  partner1: string;
  partner2: string;
  title: string;
  startDate: string;
  memories: Memory[];
};

