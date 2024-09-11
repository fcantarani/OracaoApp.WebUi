import {
  MdChecklist,
  MdOutlineFeed,
  MdOutlineFormatAlignLeft,
  MdOutlineHome,
} from "react-icons/md";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ItemsMenuComponent from "../ItemsMenu";
import { Link } from "react-router-dom";

export default function DrawerMenuComponent() {
  return (
    <Sheet>
      <SheetTrigger>
        <MdOutlineFormatAlignLeft size={24} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>MENU</SheetTitle>
          <SheetDescription>
            <div className="flex h-full flex-col gap-4">
              <SheetClose asChild>
                <Link to="/home">
                  <ItemsMenuComponent caption="Home" Icon={MdOutlineHome} />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/my-prayers">
                  <ItemsMenuComponent
                    caption="Minhas orações"
                    Icon={MdOutlineFeed}
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <ItemsMenuComponent
                  caption="Estou orando por..."
                  Icon={MdChecklist}
                />
              </SheetClose>
              <SheetClose asChild>
                <ItemsMenuComponent caption="Testemunhos" Icon={MdChecklist} />
              </SheetClose>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
