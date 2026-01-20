import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SecondaryTabKey =
  | "HOME"
  | "ABOUT TIRUPATI"
  | "SERVICES"
  | "PLAN YOUR VISIT"
  | "PLACES OF INTEREST"
  | "EVENTS"
  | "HALL BOOKINGS"
  | "EXCLUSIVE STORE"
  | "FAQ'S";

// Must match your navigator route names
type RootStackParamList = {
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

const TABS: SecondaryTabKey[] = [
  "HOME",
  "ABOUT TIRUPATI",
  "SERVICES",
  "PLAN YOUR VISIT",
  "PLACES OF INTEREST",
  "EVENTS",
  "HALL BOOKINGS",
  "EXCLUSIVE STORE",
  "FAQ'S",
];

function tabToRoute(tab: SecondaryTabKey): keyof RootStackParamList {
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

function routeToTab(routeName: keyof RootStackParamList): SecondaryTabKey {
  switch (routeName) {
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

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  /** Keep these props so your old App.tsx won’t break immediately */
  activeTab?: SecondaryTabKey;
  onTabChange?: (tab: SecondaryTabKey) => void;
};

export default function SecondaryNavTabs({ activeTab, onTabChange }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 1024;

  const navigation = useNavigation<Nav>(); // navigate from child component [web:118]
  const route = useRoute();

  // Highlight from route if possible, fallback to prop
  const routeName = route.name as keyof RootStackParamList;
  const currentTab = (routeName ? routeToTab(routeName) : activeTab) ?? "HOME";

  const Row = (
    <View style={styles.row}>
      {TABS.map((tab, idx) => {
        const isActive = tab === currentTab;
        const isLast = idx === TABS.length - 1;

        return (
          <Pressable
            key={tab}
            onPress={() => {
              // 1) React Navigation routing
              navigation.navigate(tabToRoute(tab));
              // 2) Optional: keep old state in sync if you still pass it
              onTabChange?.(tab);
            }}
            style={[
              styles.tabButton,
              isWide && styles.tabButtonWide,
              isActive && styles.tabButtonActive,
              !isLast && styles.tabButtonSeparator,
            ]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab}
            </Text>
            {isActive ? <View style={styles.activeUnderline} /> : null}
          </Pressable>
        );
      })}
    </View>
  );

  if (isWide) return <View style={styles.container}>{Row}</View>;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Row}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff6f61",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 52,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    position: "relative",
    backgroundColor: "#ff6f61",
  },
  tabButtonWide: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tabButtonSeparator: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255,255,255,0.35)",
  },
  tabButtonActive: {
    backgroundColor: "#ff6758",
  },
  tabText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  tabTextActive: {
    color: "#ffffff",
  },
  activeUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#ff0000ff",
  },
});
