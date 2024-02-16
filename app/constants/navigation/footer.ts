import { IconType } from "react-icons";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaYoutube } from "react-icons/fa6";

interface SocialLink {
  name: string;
  href: string;
  icon: IconType
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'Twitter',
    href: "#",
    icon: FaTwitter
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram
  },
  {
    name: "YouTube",
    href: "#",
    icon: FaYoutube
  }
]

type QuickLink = Omit<SocialLink, "icon">

export const QUICK_LINKS: QuickLink[] = [
  {
    name: "About",
    href: "#"
  },
  {
    name: "Governance",
    href: "#"
  },
  {
    name: "Docs",
    href: "#"
  },
  {
    name: "Security",
    href: "#"
  },
]

export const COMMUNITY_LINKS: QuickLink[] = [
  {
    name: "How it works",
    href: "#"
  },
  {
    name: "Get in touch",
    href: "#"
  }
]
