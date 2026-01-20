// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking"; // ✅ add this (expo install expo-linking) [page:1]

import Navbar from "./GlobalComponents/Navbar";
import AnnouncementBar from "./Dashboard/components/AnnouncementBar";
import HeroCarousel from "./Dashboard/components/HeroCarousel";

import SecondaryNavTabs, {
  SecondaryTabKey,
} from "./Dashboard/components/SecondaryNavTabs";

import HomeContentTab from "./Dashboard/tabs/Home";
import AboutTirupatiTab from "./Dashboard/tabs/AboutTirupatiTab";
import ServicesTab from "./Dashboard/tabs/ServicesTab";
import PlanYourVisitTab from "./Dashboard/tabs/PlanYourVisitTab";
import PlacesOfInterestTab from "./Dashboard/tabs/PlacesOfInterestTab";
import EventsTab from "./Dashboard/tabs/EventsTab";
import HallBookingsTab from "./Dashboard/tabs/HallBookingsTab";
import ExclusiveStoreTab from "./Dashboard/tabs/ExclusiveStoreTab";
import FaqsTab from "./Dashboard/tabs/FaqsTab";

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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function tabKeyToRoute(tab: SecondaryTabKey): keyof RootStackParamList {
  switch (tab) {
    case "HOME":
      return "HOME";
    case "ABOUT TIRUPATI":
      return "ABOUT_TIRUPATI";
    case "SERVICES":
      return "SERVICES";
    case "PLAN YOUR VISIT":
      return "PLAN_YOUR_VISIT";
    case "PLACES OF INTEREST":
      return "PLACES_OF_INTEREST";
    case "EVENTS":
      return "EVENTS";
    case "HALL BOOKINGS":
      return "HALL_BOOKINGS";
    case "EXCLUSIVE STORE":
      return "EXCLUSIVE_STORE";
    case "FAQ'S":
      return "FAQS";
  }
}

function routeToTabKey(route: keyof RootStackParamList): SecondaryTabKey {
  switch (route) {
    case "HOME":
      return "HOME";
    case "ABOUT_TIRUPATI":
      return "ABOUT TIRUPATI";
    case "SERVICES":
      return "SERVICES";
    case "PLAN_YOUR_VISIT":
      return "PLAN YOUR VISIT";
    case "PLACES_OF_INTEREST":
      return "PLACES OF INTEREST";
    case "EVENTS":
      return "EVENTS";
    case "HALL_BOOKINGS":
      return "HALL BOOKINGS";
    case "EXCLUSIVE_STORE":
      return "EXCLUSIVE STORE";
    case "FAQS":
      return "FAQ'S";
  }
}

// ✅ URL paths (web) + deep links (native)
const linking = {
  // For Expo this generates the correct dev/prod prefix automatically [page:1]
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
    },
  },
};

// Common layout wrapper (keeps hero + tabs visible for every screen)
function Shell({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: SecondaryTabKey;
  onTabChange: (tab: SecondaryTabKey) => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <Navbar currentPage="Home" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AnnouncementBar />

        <View style={styles.heroSection}>
          <HeroCarousel height={600} intervalMs={5000} />

          <View style={styles.heroOverlay}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroTitleLine}>OM NAMO</Text>
              <Text style={styles.heroTitleLine}>VENKATESAYA</Text>

              <Pressable style={styles.heroCtaButton}>
                <Text style={styles.heroCtaText}>BOOK A DARSHAN NOW</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* <SecondaryNavTabs activeTab={activeTab} onTabChange={onTabChange} /> */}

        {children}
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking} fallback={null}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HOME"
      >
        <Stack.Screen
          name="HOME"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <HomeContentTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="ABOUT_TIRUPATI"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <AboutTirupatiTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="SERVICES"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <ServicesTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="PLAN_YOUR_VISIT"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <PlanYourVisitTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="PLACES_OF_INTEREST"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <PlacesOfInterestTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="EVENTS"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <EventsTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="HALL_BOOKINGS"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <HallBookingsTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="EXCLUSIVE_STORE"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <ExclusiveStoreTab />
            </Shell>
          )}
        />

        <Stack.Screen
          name="FAQS"
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <FaqsTab />
            </Shell>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fafafa" },
  scrollContent: { paddingBottom: 32 },

  heroSection: { height: 600, position: "relative" },
  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLeft: { maxWidth: 320 },
  heroTitleLine: {
    fontSize: 40,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 2,
  },
  heroCtaButton: {
    marginTop: 24,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  heroCtaText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
