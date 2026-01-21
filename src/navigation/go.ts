// src/navigation/go.ts
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./routes";

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function go<RouteName extends keyof RootStackParamList>(
  navigation: Nav,
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) {
  const [screen, params] = args as [RouteName, RootStackParamList[RouteName]];
  if (params === undefined) {
    navigation.navigate(screen);
  } else {
    navigation.navigate(screen, params);
  }
}
