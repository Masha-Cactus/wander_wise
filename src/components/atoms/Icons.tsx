import {
  IoIosClose,
  IoMdHeartEmpty,
  IoMdHeart,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdExit,
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
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";



const Icons = {
  close: IoIosClose,
  heart: IoMdHeartEmpty,
  heartFilled: IoMdHeart,
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
  eye: FaRegEye,
  eyeClosed: FaRegEyeSlash,
  star: CiStar,
  filledStar: FaStar,
  plus: FaPlus,
  follow: IoMdExit,
};

export default Icons;
