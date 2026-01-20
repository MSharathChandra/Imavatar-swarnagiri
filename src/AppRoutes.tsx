// import React from "react";
// import { Text } from "react-native";
// import * as Linking from "expo-linking";
// import type { LinkingOptions } from "@react-navigation/native";
// import {
//   NavigationContainer,
//   createNavigationContainerRef,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// /** ========= 1) Screen names ========= */
// export const R = {
//   HOME: "HOME",
//   ABOUT_TIRUPATI: "ABOUT_TIRUPATI",
//   SERVICES: "SERVICES",
//   PLAN_YOUR_VISIT: "PLAN_YOUR_VISIT",
//   PLACES_OF_INTEREST: "PLACES_OF_INTEREST",
//   EVENTS: "EVENTS",
//   HALL_BOOKINGS: "HALL_BOOKINGS",
//   EXCLUSIVE_STORE: "EXCLUSIVE_STORE",
//   FAQS: "FAQS",

//   // Nested example
//   SERVICE_DETAIL: "SERVICE_DETAIL",

//   NOT_FOUND: "NOT_FOUND",
// } as const;

// export type RootStackParamList = {
//   HOME: undefined;
//   ABOUT_TIRUPATI: undefined;
//   SERVICES: undefined;
//   PLAN_YOUR_VISIT: undefined;
//   PLACES_OF_INTEREST: undefined;
//   EVENTS: undefined;
//   HALL_BOOKINGS: undefined;
//   EXCLUSIVE_STORE: undefined;
//   FAQS: undefined;

//   SERVICE_DETAIL: { id: string };

//   NOT_FOUND: undefined;
// };

// /** ========= 2) Paths (optional helper constants) ========= */
// export const PATH = {
//   HOME: "/",
//   ABOUT_TIRUPATI: "/about-tirupati",
//   SERVICES: "/services",
//   PLAN_YOUR_VISIT: "/plan-your-visit",
//   PLACES_OF_INTEREST: "/places",
//   EVENTS: "/events",
//   HALL_BOOKINGS: "/hall-bookings",
//   EXCLUSIVE_STORE: "/store",
//   FAQS: "/faqs",

//   SERVICE_DETAIL: (id: string) => `/services/${id}`,
// } as const;

// /** ========= 3) Linking (deeplinks + nested) ========= */
// const linking: LinkingOptions<RootStackParamList> = {
//   prefixes: [Linking.createURL("/")],
//   config: {
//     screens: {
//       [R.HOME]: "",
//       [R.ABOUT_TIRUPATI]: "about-tirupati",

//       [R.SERVICES]: {
//         path: "services",
//         screens: {
//           [R.SERVICE_DETAIL]: ":id",
//         },
//       },

//       [R.PLAN_YOUR_VISIT]: "plan-your-visit",
//       [R.PLACES_OF_INTEREST]: "places",
//       [R.EVENTS]: "events",
//       [R.HALL_BOOKINGS]: "hall-bookings",
//       [R.EXCLUSIVE_STORE]: "store",
//       [R.FAQS]: "faqs",

//       [R.NOT_FOUND]: "*",
//     },
//   },
// };

// /** ========= 4) Global navigation (no hooks needed) ========= */
// /** ========= 4) Global navigation (no hooks needed) ========= */
// export const navRef = createNavigationContainerRef<RootStackParamList>();

// export function go<RouteName extends keyof RootStackParamList>(
//   name: RouteName
// ): void;
// export function go<RouteName extends keyof RootStackParamList>(
//   name: RouteName,
//   params: RootStackParamList[RouteName]
// ): void;
// export function go<RouteName extends keyof RootStackParamList>(
//   name: RouteName,
//   params?: RootStackParamList[RouteName]
// ) {
//   if (!navRef.isReady()) return;

//   if (params === undefined) {
//     navRef.navigate(name);
//   } else {
//     navRef.navigate(name, params);
//   }
// }

// /** Optional: URL -> screen mapping (STATIC ONLY is recommended) */
// export function goUrl(path: string) {
//   if (!navRef.isReady()) return;

//   if (path === PATH.HOME) return go(R.HOME);
//   if (path === PATH.ABOUT_TIRUPATI) return go(R.ABOUT_TIRUPATI);
//   if (path === PATH.SERVICES) return go(R.SERVICES);
//   if (path === PATH.PLAN_YOUR_VISIT) return go(R.PLAN_YOUR_VISIT);
//   if (path === PATH.PLACES_OF_INTEREST) return go(R.PLACES_OF_INTEREST);
//   if (path === PATH.EVENTS) return go(R.EVENTS);
//   if (path === PATH.HALL_BOOKINGS) return go(R.HALL_BOOKINGS);
//   if (path === PATH.EXCLUSIVE_STORE) return go(R.EXCLUSIVE_STORE);
//   if (path === PATH.FAQS) return go(R.FAQS);

//   return go(R.NOT_FOUND);
// }

// /** ========= 5) Screens (your imports) ========= */
// import HomeTab from "./Dashboard/tabs/Home";
// import AboutTirupatiTab from "./Dashboard/tabs/AboutTirupatiTab";
// import ServicesTab from "./Dashboard/tabs/ServicesTab";
// import PlanYourVisitTab from "./Dashboard/tabs/PlanYourVisitTab";
// import PlacesTab from "./Dashboard/tabs/PlacesOfInterestTab";
// import EventsTab from "./Dashboard/tabs/EventsTab";
// import HallBookingsTab from "./Dashboard/tabs/HallBookingsTab";
// import StoreTab from "./Dashboard/tabs/ExclusiveStoreTab";
// import FaqsTab from "./Dashboard/tabs/FaqsTab";

// function ServiceDetailScreen({ route }: any) {
//   return <Text>Service detail: {route.params?.id}</Text>;
// }

// function NotFoundScreen() {
//   return <Text>404 - Not Found</Text>;
// }

// /** ========= 6) Navigator ========= */
// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppRoutes() {
//   return (
//     <NavigationContainer ref={navRef} linking={linking} fallback={<Text />}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name={R.HOME} component={HomeTab} />
//         <Stack.Screen name={R.ABOUT_TIRUPATI} component={AboutTirupatiTab} />
//         <Stack.Screen name={R.SERVICES} component={ServicesTab} />
//         <Stack.Screen name={R.PLAN_YOUR_VISIT} component={PlanYourVisitTab} />
//         <Stack.Screen name={R.PLACES_OF_INTEREST} component={PlacesTab} />
//         <Stack.Screen name={R.EVENTS} component={EventsTab} />
//         <Stack.Screen name={R.HALL_BOOKINGS} component={HallBookingsTab} />
//         <Stack.Screen name={R.EXCLUSIVE_STORE} component={StoreTab} />
//         <Stack.Screen name={R.FAQS} component={FaqsTab} />

//         {/* nested */}
//         <Stack.Screen name={R.SERVICE_DETAIL} component={ServiceDetailScreen} />

//         {/* catch-all */}
//         <Stack.Screen name={R.NOT_FOUND} component={NotFoundScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
