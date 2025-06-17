import { BrandLogo } from "../BrandLogo";
import { DrawerMenu } from "./DrawerMenu";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 shadow-sm sticky top-0 z-10 bg-background">
      <DrawerMenu />
      <BrandLogo model="minimalist" />
    </header>
  );
}
