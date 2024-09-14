import { AddNewPrayerComponent } from "@/components/AddNewPrayerSheet";
import CardComponent from "@/components/Card";
import CommentButton from "@/components/CommentButton";
import LoadingComponent from "@/components/Loading";
import PrayButton from "@/components/PrayButton";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/AuthHook";
import { IPrayerCategoryModel } from "@/models/PrayerCategoryModel";
import { IPrayerModel } from "@/models/PrayerModel";
import { CategoryService } from "@/services/CategoryService";
import { PrayersService } from "@/services/PrayersService";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [prayers, setPrayers] = useState<IPrayerModel[] | undefined>();
  const [categories, setCategories] = useState<
    IPrayerCategoryModel[] | undefined
  >();

  const auth = useAuth();

  const prayersService = useMemo(
    () => new PrayersService(auth.accessToken),
    [auth.accessToken],
  );

  const categoryService = useMemo(
    () => new CategoryService(auth.accessToken),
    [auth.accessToken],
  );

  const changeCategoryId = (value: string) => {
    setCategoryId(parseInt(value));
  };

  useEffect(() => {
    setIsLoading(true);
    prayersService
      .getAll()
      .then((r) => setPrayers(r.data))
      .finally(() => setIsLoading(false));
  }, [prayersService]);

  useEffect(() => {
    setIsLoading(true);
    categoryService
      .getAll()
      .then((r) => setCategories(r.data))
      .finally(() => setIsLoading(false));
  }, [categoryService]);

  useEffect(() => {
    setIsLoading(true);
    prayersService
      .getAllByCategoryId(categoryId)
      .then((r) => {
        setPrayers(r.data);
      })
      .finally(() => setIsLoading(false));
  }, [prayersService, categoryId]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Orações</span>
              <div className="flex items-center gap-2">
                <span>Categoria:</span>
                <select
                  className="rounded-md border border-slate-800 bg-transparent p-1.5"
                  name="categories"
                  id="categories"
                  onChange={(e) => changeCategoryId(e.target.value)}
                  value={categoryId}
                >
                  <option value={0}>--- TODAS ---</option>
                  {categories?.map((c) => (
                    <option value={c.id.toString()}>{c.name}</option>
                  ))}
                </select>
              </div>
              <AddNewPrayerComponent />
            </div>
            <CardComponent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-semibold">
                      #
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Criado em
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Categoria
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Título
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Descrição
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Orando por...
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Comentários
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Pessoas orando
                    </TableHead>
                    <TableHead className="text-center font-semibold">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prayers ? (
                    prayers?.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="text-center">{p.id}</TableCell>
                        <TableCell className="text-center">
                          {moment(p.createdDate).format("DD-MMM-YYYY")}
                        </TableCell>
                        <TableCell className="text-left">
                          {p.prayerCategory.name}
                        </TableCell>
                        <TableCell className="text-left">{p.title}</TableCell>
                        <TableCell className="text-left">
                          {p.description}
                        </TableCell>
                        <TableCell className="text-left">
                          {p.prayingForName}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">
                            {p.prayerComments.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">
                            {p.prayingFors.length}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex items-center gap-2 text-center">
                          <CommentButton
                            handleClick={() => console.log("Comentar")}
                          />
                          <PrayButton
                            handleClick={() => console.log("Clicado foi!")}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <></>
                  )}
                </TableBody>
              </Table>
            </CardComponent>
          </div>
        </>
      )}
    </>
  );
}
