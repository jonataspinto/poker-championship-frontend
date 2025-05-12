import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Menu />

      <h1 className="text-2xl font-bold">My Application</h1>
    </header>
  );
}
