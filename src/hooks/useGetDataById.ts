import { useQuery } from "@tanstack/react-query";
import { TQueryKey } from "./types";

type TGetDataById<T> = {
  id: string, 
  queryKeyName: TQueryKey, 
  fetchFn: (id: string) => Promise<T | null>
}

export function useGetDataById<T>({
  id,
  queryKeyName,
  fetchFn
}: TGetDataById<T>) {
  return useQuery<T | null>({
    queryKey: [queryKeyName, id],
    queryFn: () => {
      if (!id) return null;
      return fetchFn(id);
    },
    enabled: !!id,
  });
}
