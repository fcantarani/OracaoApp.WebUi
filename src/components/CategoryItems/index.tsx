import { useAuth } from "@/hooks/AuthHook";
import { IPrayerCategoryModel } from "@/models/PrayerCategoryModel";
import { CategoryService } from "@/services/CategoryService";
import { useEffect, useMemo, useState } from "react";

interface CategoryItemsProps {
  setCategoryId: (value: number) => void;
  handleChange: () => void;
}

export default function CategoryItems({ setCategoryId }: CategoryItemsProps) {
  const auth = useAuth();

  const categoryService = useMemo(
    () => new CategoryService(auth.accessToken),
    [auth.accessToken],
  );

  const [categories, setCategories] = useState<IPrayerCategoryModel[]>();

  useEffect(() => {
    categoryService.getAll().then((r) => setCategories(r.data));
  }, [categoryService]);

  return (
    <select
      className="rounded-md border border-slate-800 bg-transparent p-1.5"
      name="categories"
      id="categories"
      onChange={(e) => setCategoryId(parseInt(e.target.value))}
    >
      <option value={0}>--- Selecione ---</option>
      {categories?.map((c) => (
        <option value={c.id.toString()}>{c.name}</option>
      ))}
    </select>
  );
}
