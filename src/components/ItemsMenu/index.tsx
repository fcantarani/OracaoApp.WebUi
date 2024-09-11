import { IconType } from "react-icons";

interface IItemsMenuProps {
  Icon: IconType;
  caption: string;
  handleClick?: () => void;
}

export default function ItemsMenuComponent({
  Icon,
  caption,
  handleClick,
}: IItemsMenuProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-md p-2 hover:cursor-pointer hover:bg-primary-foreground"
      onClick={handleClick}
    >
      <Icon size={20} />
      {caption}
    </div>
  );
}
