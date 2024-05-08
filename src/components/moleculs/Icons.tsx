import {
  IoIosClose,
  IoMdHeartEmpty,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { GiRobotAntennas } from "react-icons/gi";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";

const Icons = {
  close: IoIosClose,
  heart: IoMdHeartEmpty,
  share: IoShareSocialOutline,
  report: MdErrorOutline,
  user: HiOutlineUserCircle,
  jpt: GiRobotAntennas,
  left: IoIosArrowBack,
  right: IoIosArrowForward,
  down: IoIosArrowDown,
  up: IoIosArrowUp,
  arrowLeft: TiArrowLeftThick,
  arrowRight: TiArrowRightThick,
  edit: FiEdit2,
  location: GrLocation,
  delete: RiDeleteBinLine,
  mail: MdOutlineMail,
  global: RiGlobalLine,
};

export default Icons;
