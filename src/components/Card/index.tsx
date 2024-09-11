import { ReactNode } from "react";

interface ICardComponentProps {
  children: ReactNode;
}

export default function CardComponent({ children }: ICardComponentProps) {
  return (
    <div className="m-auto flex h-auto w-full rounded-md border border-border bg-card p-2 shadow-xl">
      {children}
    </div>
  );
}
