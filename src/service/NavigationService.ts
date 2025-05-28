import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "../routes/routes";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  screen: RouteName, 
  params?: RootStackParamList[RouteName]
 ) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen as any, params);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
