// src/navigation/routes.ts
import type { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

export const Routes = {
  HOME: "HOME",
  ABOUT_TIRUPATI: "ABOUT_TIRUPATI",
  SERVICES: "SERVICES",
  PLAN_YOUR_VISIT: "PLAN_YOUR_VISIT",
  PLACES_OF_INTEREST: "PLACES_OF_INTEREST",
  EVENTS: "EVENTS",
  HALL_BOOKINGS: "HALL_BOOKINGS",
  EXCLUSIVE_STORE: "EXCLUSIVE_STORE",
  FAQS: "FAQS",

  // ✅ Nested example routes (add/remove based on your real screens)
  SERVICE_CATEGORY: "SERVICE_CATEGORY",
  SERVICE_DETAIL: "SERVICE_DETAIL",
} as const;

export type RootStackParamList = {
  HOME: undefined;
  ABOUT_TIRUPATI: undefined;
  SERVICES: undefined;
  PLAN_YOUR_VISIT: undefined;
  PLACES_OF_INTEREST: undefined;
  EVENTS: undefined;
  HALL_BOOKINGS: undefined;
  EXCLUSIVE_STORE: undefined;
  FAQS: undefined;

  // ✅ nested params (dynamic URL segments)
  SERVICE_CATEGORY: { categoryId: string };
  SERVICE_DETAIL: { categoryId: string; serviceId: string };
};

export const linking: LinkingOptions<RootStackParamList> = {
  // Expo helper: generates correct dev/prod prefix automatically
  // Add your production domain(s) here too when you have them.
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      HOME: "",
      ABOUT_TIRUPATI: "about-tirupati",
      SERVICES: "services",
      PLAN_YOUR_VISIT: "plan-your-visit",
      PLACES_OF_INTEREST: "places-of-interest",
      EVENTS: "events",
      HALL_BOOKINGS: "hall-bookings",
      EXCLUSIVE_STORE: "exclusive-store",
      FAQS: "faqs",

      // ✅ nested urls (examples)
      SERVICE_CATEGORY: "services/:categoryId",
      SERVICE_DETAIL: "services/:categoryId/:serviceId",
    },
  },
};
