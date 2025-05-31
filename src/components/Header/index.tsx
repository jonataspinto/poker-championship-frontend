import { BrandLogo } from "../BrandLogo";
import { DrawerMenu } from "./DrawerMenu";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <DrawerMenu />
      <BrandLogo model="minimalist" />
    </header>
  );
}
