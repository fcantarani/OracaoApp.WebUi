import { FaPray } from "react-icons/fa";
import { Button } from "../ui/button";

interface IPrayButtonProps {
  handleClick: () => void;
}

export default function PrayButton({ handleClick }: IPrayButtonProps) {
  return (
    <Button size={"sm"} className="gap-2" onClick={handleClick}>
      <FaPray size={16} />
      <span>Orar</span>
    </Button>
  );
}
