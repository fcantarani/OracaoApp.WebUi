import { useState } from "react";
import SelectItemsCategory from "../CategoryItems";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";

export function AddNewPrayerComponent() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle>Deseja adicionar um pedido de oração?</SheetTitle>
          <SheetDescription className="flex flex-1 flex-col py-2">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Categoria</Label>
                <SelectItemsCategory />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  type="text"
                  placeholder="Breve descrição do seu pedido"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="prayingFor">Oração por</Label>
                <Input type="text" placeholder="Nome da pessoa" />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descrição da oração</Label>
                <Textarea
                  rows={5}
                  placeholder="Descreva seu pedido de oração"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPublic"
                  onChange={() => setIsVisible(!isVisible)}
                />
                <label
                  htmlFor="isPublic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Oração visivel para todos?
                </label>
              </div>
            </form>
          </SheetDescription>
          <SheetFooter>
            <Button className="flex-1">Salvar</Button>
          </SheetFooter>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
