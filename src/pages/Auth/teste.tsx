import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/AuthHook";
import { IPrayerModel } from "@/models/PrayerModel";
import { PrayersService } from "@/services/PrayersService";
import { useMemo, useState } from "react";

export default function TestePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [prayers, setPrayers] = useState<IPrayerModel[] | undefined>();

  const auth = useAuth();

  const prayersService = useMemo(
    () => new PrayersService(auth.accessToken),
    [auth.accessToken],
  );

  const getItems = () => {
    setIsLoading(true);
    prayersService
      .getAll()
      .then((p) => {
        console.log("Prayers: ", p.data);
        setPrayers(p.data);
      })
      .catch((e) => console.error("Deu pau", e))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <h1 className="text-2xl">TESTE</h1>

      {isLoading ? (
        <p>aguarde fio....</p>
      ) : (
        <p>Retornou {prayers?.length ?? 0}</p>
      )}
      <Button onClick={() => auth.logout()}>Sair</Button>
      <Button onClick={getItems}>Clique-me</Button>

      <hr className="my-3" />

      <ul className="ms-10 list-disc">
        {prayers?.map((p, i) => (
          <li key={i}>
            {p.prayerCategory.name} {p.title} {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
