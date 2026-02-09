import "./style.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We wrap everything in a div that forces full width and height
    // 'min-h-screen' ensures the background covers the whole phone display
    <div className={`${inter.className} auth-background min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8`}>
      {children}
    </div>
  );
}