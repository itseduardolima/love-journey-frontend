import timeline1Image from "@/public/assests/images/casal1.png";
import timeline2Image from "@/public/assests/images/casal2.png";

interface TimelineExampleProps {
  id: string;
  imageSrc: any;
  coupleName: string;
  link: string;
}

export const mockTimelineData: TimelineExampleProps[] = [
  {
    id: "sofia-miguel",
    imageSrc: timeline1Image,
    coupleName: "Camila e Thiago",
    link: "https://lovejourney.vercel.app/journey/29191c16-026b-4a57-90ed-2288d666d968",
  },
  {
    id: "ana-pedro",
    imageSrc: timeline2Image,
    coupleName: "Ana e Pedro",
    link: "https://lovejourney.vercel.app/journey/cab4351f-1170-40ad-afcd-dc68fd76b3ed",
  },
];
