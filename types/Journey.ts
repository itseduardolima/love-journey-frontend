interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: {
    data: number[];
    type: string;
  };
  photoMimeType: string;
}

export type Journey = {
  id: string;
  partner1: string;
  partner2: string;
  title: string;
  startDate: string;
  memories: Memory[];
};

