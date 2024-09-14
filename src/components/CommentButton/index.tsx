import { MdOutlineAddComment } from "react-icons/md";
import { Button } from "../ui/button";

interface ICommentButtonProps {
  handleClick: () => void;
}

export default function CommentButton({ handleClick }: ICommentButtonProps) {
  return (
    <Button
      variant="secondary"
      size={"sm"}
      className="gap-2"
      onClick={handleClick}
    >
      <MdOutlineAddComment size={16} />
      <span>Comentar</span>
    </Button>
  );
}
