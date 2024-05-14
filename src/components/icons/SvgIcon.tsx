import { AiFillFacebook } from '@react-icons/all-files/ai/AiFillFacebook';
import { AiFillLinkedin } from '@react-icons/all-files/ai/AiFillLinkedin';
import { AiFillYoutube } from '@react-icons/all-files/ai/AiFillYoutube';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { BiRightArrowAlt } from '@react-icons/all-files/bi/BiRightArrowAlt';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';
import { HiChevronDown } from '@react-icons/all-files/hi/HiChevronDown';
import { HiChevronLeft } from '@react-icons/all-files/hi/HiChevronLeft';
import { HiChevronRight } from '@react-icons/all-files/hi/HiChevronRight';
import { HiCloudUpload } from '@react-icons/all-files/hi/HiCloudUpload';
import { HiCog } from '@react-icons/all-files/hi/HiCog';
import { HiLockClosed } from '@react-icons/all-files/hi/HiLockClosed';
import { HiMenu } from '@react-icons/all-files/hi/HiMenu';
import { HiOutlineX } from '@react-icons/all-files/hi/HiOutlineX';
import { HiRefresh } from '@react-icons/all-files/hi/HiRefresh';
import { HiShieldCheck } from '@react-icons/all-files/hi/HiShieldCheck';
import { type SVGProps } from 'react';
export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  CloudUpload: HiCloudUpload,
  Cog: HiCog,
  LockClosed: HiLockClosed,
  Refresh: HiRefresh,
  ShieldCheck: HiShieldCheck,
  Copy: FaRegCopy,
  Facebook: AiFillFacebook,
  Twitter: AiOutlineTwitter,
  Linkedin: AiFillLinkedin,
  Youtube: AiFillYoutube,
  ChevronDown: HiChevronDown,
  ChevronLeft: HiChevronLeft,
  ChevronRight: HiChevronRight,
  Close: HiOutlineX,
  Menu: HiMenu,
  ArrowRight: BiRightArrowAlt,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export const SvgIcon = ({ name, ...props }: Props) => {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
};
