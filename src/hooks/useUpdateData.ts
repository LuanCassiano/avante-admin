import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TQueryKey } from "./types";
import { useToast } from "./useToast";
import { goBack } from "../service/NavigationService";

type TUpdateData<T> = {
  id: string;
  mutationName: TQueryKey,
  fetchFn: (id: string, data: T) => Promise<T | null>;
}

type MutationArg<T> = {
  id: string;
  data: T;
};

export function useUpdateData<T>({
  fetchFn,
  id,
  mutationName,
}: TUpdateData<T>) {
  const { success, error } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: MutationArg<T>) => fetchFn(id, data),
    onSuccess: () => {
      success("Dados alterados com sucesso", () => {
        goBack();
      });
      queryClient.invalidateQueries({
        queryKey: [mutationName],
      });
    },
    onError: () => {
      error("Não foi possível alterar as informações");
    }
  })
}