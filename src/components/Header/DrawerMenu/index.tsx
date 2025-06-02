"use client";

import { useToggle } from "@/hooks";
import { Drawer } from "./Drawer";

export function DrawerMenu() {
  const [isOpen, toggle, setToggle] = useToggle(false);

  return (
    <>
      <Drawer.Button onClick={toggle} />
      <Drawer.Container isOpen={isOpen} toggle={toggle} setToggle={setToggle}>
        <Drawer.Content />
      </Drawer.Container>
    </>
  );
}
