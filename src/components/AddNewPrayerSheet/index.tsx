import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/AuthHook";
import { PrayersService } from "@/services/PrayersService";
import { ICreatePrayerModel } from "@/models/CreatePrayerModel";
import CategoryItems from "../CategoryItems";

const createPrayerSchema = z.object({
  title: z.string().min(3, "Titulo obrigatório."),
  description: z.string().min(3, "Descrição obrigatória."),
  prayingForName: z.string().min(3, "Campo Obrigatório."),
  isPublic: z.string(),
});

type CreatePrayerSchema = z.infer<typeof createPrayerSchema>;

export function AddNewPrayerComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePrayerSchema>({
    resolver: zodResolver(createPrayerSchema),
  });

  function handleCreatePrayer(data: CreatePrayerSchema) {
    console.log(data);

    const request: ICreatePrayerModel = {
      title: data.title,
      description: data.description,
      prayingForName: data.prayingForName,
      isPublic: isPublic,
      prayerCategoryId: categoryId,
    };

    prayersService.createPrayer(request);
  }

  const auth = useAuth();

  const prayersService = useMemo(
    () => new PrayersService(auth.accessToken),
    [auth.accessToken],
  );

  const [isPublic, setIsPublic] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SheetTitle>Deseja adicionar um pedido de oração?</SheetTitle>
          <SheetDescription className="flex flex-1 flex-col py-2">
            <form
              onSubmit={handleSubmit(handleCreatePrayer)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Categoria</Label>
                <CategoryItems setCategoryId={setCategoryId} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Titulo</Label>
                <Input
                  type="text"
                  placeholder="Breve descrição do seu pedido"
                  {...register("title")}
                />
                <span className="text-red-500">
                  {errors.title && <p>{errors.title.message}</p>}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="prayingFor">Oração por</Label>
                <Input
                  type="text"
                  placeholder="Nome da pessoa"
                  {...register("prayingForName")}
                />
                <span className="text-red-500">
                  {errors.prayingForName && (
                    <p>{errors.prayingForName.message}</p>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Descrição da oração</Label>
                <Textarea
                  rows={5}
                  placeholder="Descreva seu pedido de oração"
                  {...register("description")}
                />
                <span className="text-red-500">
                  {errors.description && <p>{errors.description.message}</p>}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPublic"
                  {...register("isPublic")}
                  onCheckedChange={(e) => setIsPublic(e == true ? true : false)}
                />
                <label
                  htmlFor="isPublic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Oração publica?
                </label>
              </div>
              <SheetClose>
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
              </SheetClose>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
