import { LucideIcon } from "lucide-react";
import Link from "next/link";
interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
  link: string;
}

export const FeatureCard = ({ title, description, Icon, bgColor, iconColor, link }: FeatureCardProps) => (
  <Link href={link} className="flex flex-col items-center text-center p-6 border border-zinc-100 rounded-3xl hover:shadow-xl transition-shadow">
    <div className={`w-16 h-16 ${bgColor} ${iconColor} rounded-2xl flex items-center justify-center mb-6`}>
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-zinc-500">{description}</p>
  </Link>
);