import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useDeleteData(mutationName: string, fetchFn: (id: string) => Promise<void>) {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFn,
    onSuccess: () => {
      success('Item removido com sucesso');
      queryClient.invalidateQueries({ queryKey: [mutationName] });
    },
    onError: () => {
      error('Erro ao remover o item');
    },
  });
}
