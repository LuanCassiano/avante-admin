import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./useToast";
import { goBack } from "../service/NavigationService";
import { TQueryKey } from "./types";

type TAddData<T> = {
  mutationName: TQueryKey;
  fetchFn: (data: T) => Promise<T>;
}

export function useAddData<T>({
  mutationName,
  fetchFn
}: TAddData<T>) {
  const { success, error } = useToast();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFn,
    onSuccess: () => {
      success("Criado com sucesso", () => {
        goBack();
      });
      queryClient.invalidateQueries({
        queryKey: [mutationName],
      });
    },
    onError: () => {
      error("Não foi possível criar o item");
    },
  })
}