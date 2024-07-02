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
import { 
  FaPlus, 
  FaTwitter, 
  FaInstagram, 
  FaStar, 
  FaRegStar,
} from "react-icons/fa";
import { 
  MdErrorOutline, 
  MdOutlineMail, 
  MdOutlineFileDownload,
  MdOutlineFolder
} from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineUserCircle, HiMiniSquares2X2 } from "react-icons/hi2";
import { GiRobotAntennas } from "react-icons/gi";
import { TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { FiEdit2, FiGlobe } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { RiDeleteBinLine, RiGlobalLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash, FaCheck } from "react-icons/fa6";
import { TbLayoutListFilled } from "react-icons/tb";

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
  star: FaRegStar,
  filledStar: FaStar,
  plus: FaPlus,
  follow: IoMdExit,
  checked: FaCheck,
  twitter: FaTwitter,
  insta: FaInstagram,
  website: FiGlobe,
  download: MdOutlineFileDownload,
  folder: MdOutlineFolder,
  list: TbLayoutListFilled,
  gallery: HiMiniSquares2X2,
};

export default Icons;
