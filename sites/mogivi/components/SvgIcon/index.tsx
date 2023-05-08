import React from "react";
import dynamic from "next/dynamic";
import DefaultMissingBlock from "components/DefaultMissingBlock";

const Position = dynamic(() => import("./components/Position"));
const Mail = dynamic(() => import("./components/Mail"));
const Phone = dynamic(() => import("./components/Phone"));
const Search = dynamic(() => import("./components/Search"));
const AngleRight = dynamic(() => import("./components/AngleRight"));
const Facebook = dynamic(() => import("./components/Facebook"));
const Linkedin = dynamic(() => import("./components/Linkedin"));
const Twitter = dynamic(() => import("./components/Twitter"));
const Whatsapp = dynamic(() => import("./components/Whatsapp"));
const Play = dynamic(() => import("./components/Play"));
const ChevronLeft = dynamic(() => import("./components/ChevronLeft"));
const ChevronRight = dynamic(() => import("./components/ChevronRight"));
const Clock = dynamic(() => import("./components/Clock"));
const Chat = dynamic(() => import("./components/Chat"));
const Bath = dynamic(() => import("./components/Bath"));
const Bed = dynamic(() => import("./components/Bed"));
const Comment = dynamic(() => import("./components/Comment"));
const Ruler = dynamic(() => import("./components/Ruler"));
const Eye = dynamic(() => import("./components/Eye"));
const Location = dynamic(() => import("./components/Location"));
const Home = dynamic(() => import("./components/Home"));
const Building = dynamic(() => import("./components/Building"));
const ChervonDown = dynamic(() => import("./components/ChervonDown"));
const ChervonUp = dynamic(() => import("./components/ChervonUp"));
const Close = dynamic(() => import("./components/Close"));
const City = dynamic(() => import("./components/City"));
interface SvgIconsProps extends React.HTMLProps<HTMLElement> {
  icon:
    | string
    | "linkedin"
    | "position"
    | "mail"
    | "phone"
    | "search"
    | "angleRight"
    | "facebook"
    | "twitter"
    | "whatsapp"
    | "play"
    | "chevronLeft"
    | "clock"
    | "chevronRight"
    | "chat"
    | "bed"
    | "bath"
    | "eye"
    | "location"
    | "ruler"
    | "comment"
    | "home"
    | "building"
    | "chervonDown"
    | "chervonUp"
    | "close"
    | "city";
  className?: string;
}

const Icons = {
  position: Position,
  mail: Mail,
  phone: Phone,
  search: Search,
  angleRight: AngleRight,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  whatsapp: Whatsapp,
  play: Play,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clock: Clock,
  chat: Chat,
  bath: Bath,
  bed: Bed,
  comment: Comment,
  ruler: Ruler,
  eye: Eye,
  location: Location,
  home: Home,
  building: Building,
  chervonDown: ChervonDown,
  chervonUp: ChervonUp,
  close: Close,
  city: City,
};

const SvgIcon = (props: SvgIconsProps) => {
  const { icon, ...restProps } = props;
  const Component = Icons[icon as keyof typeof Icons] || DefaultMissingBlock;
  return <Component {...restProps} />;
};

export default SvgIcon;
