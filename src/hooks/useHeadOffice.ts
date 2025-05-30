import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addHeadOfficeService, getAllHeadOfficesService } from "../service/headOfficeService";
import { goBack } from "../service/NavigationService";
import { useToast } from "./useToast";

export function useHeadOffice() {
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const headOfficeQuery = useQuery({
    queryKey: ['headOffices'],
    queryFn: getAllHeadOfficesService,
  });

  const addHeadOfficeMutation = useMutation({
    mutationFn: addHeadOfficeService,
    onSuccess: () => {
      success("Local de treino criado com sucesso", () => {
        goBack();
      });
      queryClient.invalidateQueries({ queryKey: ['headOffices'] });
    },
    onError: () => {
      error("Error adding head office");
    },
  });

  return { headOfficeQuery, addHeadOfficeMutation }
}