import { useAuth } from "@/hooks/AuthHook";
import { IPrayerCategoryModel } from "@/models/PrayerCategoryModel";
import { CategoryService } from "@/services/CategoryService";
import { useEffect, useMemo, useState } from "react";
import LoadingComponent from "../Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectItemsCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<IPrayerCategoryModel[]>();

  const auth = useAuth();

  const categoryService = useMemo(
    () => new CategoryService(auth.accessToken),
    [auth.accessToken],
  );

  useEffect(() => {
    setIsLoading(true);
    categoryService
      .getAll()
      .then((r) => setCategories(r.data))
      .finally(() => setIsLoading(false));
  }, [categoryService]);

  return (
    <h1>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent>
            {categories?.map((c) => (
              <SelectItem value={c.id.toString()}>{c.name} </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </h1>
  );
}
