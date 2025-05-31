import { BrandLogo } from "../BrandLogo";
import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Menu />
      <BrandLogo model="minimalist" />
    </header>
  );
}
