import { useQuery } from "@tanstack/react-query";
import { TQueryKey } from "./types";

type TGetAllData<T> = {
  queryKeyName: TQueryKey;
  fetchFn: () => Promise<T[]>;
}

export function useGetAllData<T>({
  queryKeyName,
  fetchFn
}: TGetAllData<T>) {
  return useQuery<T[]>({
    queryKey: [queryKeyName],
    queryFn: fetchFn
  })
}