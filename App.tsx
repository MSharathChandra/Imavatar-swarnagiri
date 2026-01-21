// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text, Pressable } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Navbar from "./src/GlobalComponents/Navbar";
import AnnouncementBar from "./src/Dashboard/components/AnnouncementBar";
import HeroCarousel from "./src/Dashboard/components/HeroCarousel";

import SecondaryNavTabs, {
  SecondaryTabKey,
} from "./src/Dashboard/components/SecondaryNavTabs";

import HomeContentTab from "./src/Dashboard/tabs/Home";
import AboutTirupatiTab from "./src/Dashboard/tabs/AboutTirupatiTab";
import ServicesTab from "./src/Dashboard/tabs/ServicesTab";
import PlanYourVisitTab from "./src/Dashboard/tabs/PlanYourVisitTab";
import PlacesOfInterestTab from "./src/Dashboard/tabs/PlacesOfInterestTab";
import EventsTab from "./src/Dashboard/tabs/EventsTab";
import HallBookingsTab from "./src/Dashboard/tabs/HallBookingsTab";
import ExclusiveStoreTab from "./src/Dashboard/tabs/ExclusiveStoreTab";
import FaqsTab from "./src/Dashboard/tabs/FaqsTab";

import { linking, RootStackParamList, Routes } from "./src/navigation/routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

function tabKeyToRoute(tab: SecondaryTabKey): keyof RootStackParamList {
  switch (tab) {
    case "HOME":
      return Routes.HOME;
    case "ABOUT TIRUPATI":
      return Routes.ABOUT_TIRUPATI;
    case "SERVICES":
      return Routes.SERVICES;
    case "PLAN YOUR VISIT":
      return Routes.PLAN_YOUR_VISIT;
    case "PLACES OF INTEREST":
      return Routes.PLACES_OF_INTEREST;
    case "EVENTS":
      return Routes.EVENTS;
    case "HALL BOOKINGS":
      return Routes.HALL_BOOKINGS;
    case "EXCLUSIVE STORE":
      return Routes.EXCLUSIVE_STORE;
    case "FAQ'S":
      return Routes.FAQS;
  }
}

function routeToTabKey(route: keyof RootStackParamList): SecondaryTabKey {
  switch (route) {
    case Routes.HOME:
      return "HOME";
    case Routes.ABOUT_TIRUPATI:
      return "ABOUT TIRUPATI";
    case Routes.SERVICES:
      return "SERVICES";
    case Routes.PLAN_YOUR_VISIT:
      return "PLAN YOUR VISIT";
    case Routes.PLACES_OF_INTEREST:
      return "PLACES OF INTEREST";
    case Routes.EVENTS:
      return "EVENTS";
    case Routes.HALL_BOOKINGS:
      return "HALL BOOKINGS";
    case Routes.EXCLUSIVE_STORE:
      return "EXCLUSIVE STORE";
    case Routes.FAQS:
      return "FAQ'S";

    // ✅ nested screens: keep SERVICES tab highlighted
    case Routes.SERVICE_CATEGORY:
    case Routes.SERVICE_DETAIL:
      return "SERVICES";
  }
}

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

      {/* Navbar now navigates by routes */}
      <Navbar currentPage="Home" />
      {/* <Navbar /> */}

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

        <SecondaryNavTabs activeTab={activeTab} onTabChange={onTabChange} />

        {children}
      </ScrollView>
    </View>
  );
}

// ✅ Example nested screens (replace with your real ones)
function ServiceCategoryScreen({ route }: any) {
  return (
    <View style={{ padding: 16 }}>
      <Text>Category: {route.params.categoryId}</Text>
    </View>
  );
}

function ServiceDetailScreen({ route }: any) {
  return (
    <View style={{ padding: 16 }}>
      <Text>
        Category: {route.params.categoryId} | Service: {route.params.serviceId}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={null}
      // fallback can be a loader; React Navigation recommends fallback while resolving deep link
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.HOME}
      >
        <Stack.Screen
          name={Routes.HOME}
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
          name={Routes.ABOUT_TIRUPATI}
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
          name={Routes.SERVICES}
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <ServicesTab />
            </Shell>
          )}
        />

        {/* ✅ nested URLs under /services/... */}
        <Stack.Screen
          name={Routes.SERVICE_CATEGORY}
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <ServiceCategoryScreen route={route} />
            </Shell>
          )}
        />

        <Stack.Screen
          name={Routes.SERVICE_DETAIL}
          children={({ navigation, route }) => (
            <Shell
              activeTab={routeToTabKey(route.name)}
              onTabChange={(tab) => navigation.navigate(tabKeyToRoute(tab))}
            >
              <ServiceDetailScreen route={route} />
            </Shell>
          )}
        />

        <Stack.Screen
          name={Routes.PLAN_YOUR_VISIT}
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
          name={Routes.PLACES_OF_INTEREST}
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
          name={Routes.EVENTS}
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
          name={Routes.HALL_BOOKINGS}
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
          name={Routes.EXCLUSIVE_STORE}
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
          name={Routes.FAQS}
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
