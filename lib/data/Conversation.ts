import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface ChatData {
  image: string | StaticImport;
  title?: string;
  desc?: string;
  date?: string;
  notif?: number;
  online?: boolean;
  success?: boolean;
  status?: string;
  createdAt?: string;
  id?:number;
}
export const Conversation: ChatData[] = [
  {
    image: "/svg/default_profile/user-profile.svg",
    title: "Amir_Amini",
    desc: "--متن پیام",
    date: "02:27",
    notif: 4,
    online: false,
    id: 1
  },
  {
    image: "/svg/default_profile/user-profile.svg",
    title: "Behzad_jannesar",
    desc: "--متن پیام",
    date: "02:27",
    notif: 3,
    online: true,
    id: 2
  },
  {
    image: "/svg/default_profile/user-profile.svg",
    title: "Alireza_Ebadi",
    desc: "--متن پیام",
    date: "02:27",
    notif: 0,
    online: false,
    id: 3
  },
];
