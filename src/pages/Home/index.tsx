import CardComponent from "@/components/Card";
import LoadingComponent from "@/components/Loading";
import PrayButton from "@/components/PrayButton";
import { AddNewPrayerComponent } from "@/components/Sheet";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/AuthHook";
import { IPrayerModel } from "@/models/PrayerModel";
import { PrayersService } from "@/services/PrayersService";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [prayers, setPrayers] = useState<IPrayerModel[] | undefined>();

  const auth = useAuth();

  const prayersService = useMemo(
    () => new PrayersService(auth.accessToken),
    [auth.accessToken],
  );

  const changeCategoryId = (value: string) => {
    console.log("CAT --->", parseInt(value));
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
    prayersService
      .getAllByCategoryId(categoryId)
      .then((r) => {
        console.log("Chama~", r);
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
                <Select
                  onValueChange={changeCategoryId}
                  value={categoryId.toString()}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Todas</SelectItem>
                    <SelectItem value="1">Casamento</SelectItem>
                    <SelectItem value="2">Saude</SelectItem>
                    <SelectItem value="3">Finanças</SelectItem>
                  </SelectContent>
                </Select>
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
                      Título
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Descrição
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Orando por...
                    </TableHead>
                    <TableHead className="text-left font-semibold">
                      Categoria
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
                        <TableCell className="text-left">{p.title}</TableCell>
                        <TableCell className="text-left">
                          {p.description}
                        </TableCell>
                        <TableCell className="text-left">
                          {p.prayingForName}
                        </TableCell>
                        <TableCell className="text-left">
                          {p.prayerCategory.name}
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
