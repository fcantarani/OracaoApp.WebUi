import CardComponent from "@/components/Card";
import LoadingComponent from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

export default function MyPrayersPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prayers, setPrayers] = useState<IPrayerModel[] | undefined>();

  const auth = useAuth();

  const prayersService = useMemo(
    () => new PrayersService(auth.accessToken),
    [auth.accessToken],
  );
  const userId = auth.profile?.sub ?? "";

  useEffect(() => {
    setIsLoading(true);
    prayersService
      .getAllByUserId(userId)
      .then((r) => setPrayers(r.data))
      .finally(() => setIsLoading(false));
  }, [prayersService, userId]);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Meus pedidos de oração</span>
              <div className="flex items-center gap-2"></div>
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
                  {prayers?.map((p) => (
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
                      <TableCell className="flex items-center gap-2">
                        <Button size={"sm"} className="gap-2 bg-primary">
                          <MdOutlineModeEdit size={16} />
                          <span>Editar</span>
                        </Button>
                        <Button size={"sm"} className="gap-2 bg-destructive">
                          <MdDeleteOutline size={16} />
                          <span>Deletar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardComponent>
          </div>
        </>
      )}
    </>
  );
}
