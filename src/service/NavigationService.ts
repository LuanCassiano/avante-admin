import { createNavigationContainerRef } from "@react-navigation/native";
import { GlobalParamList } from "../routes/types";

export const navigationRef = createNavigationContainerRef<GlobalParamList>();

export function navigate<RouteName extends keyof GlobalParamList>(
  screen: RouteName, 
  params?: GlobalParamList[RouteName]
 ) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name: screen, params } as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
