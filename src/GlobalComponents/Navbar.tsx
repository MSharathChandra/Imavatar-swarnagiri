// components/Navbar.tsx
import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface NavbarProps {
  currentPage: string;
}

const ALL_LOCATIONS = ["Home", "Work", "Friend House", "Temple", "Office"];

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Home");

  const navItems = [
    "Home",
    "Worship Places",
    "Spiritual Guides",
    "Store",
    "Partner With Us",
    "Media",
  ];

  const locationsToShow = useMemo(
    () => ALL_LOCATIONS.filter((l) => l !== selectedLocation),
    [selectedLocation]
  );

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  return (
    <View style={styles.navbarWrapper}>
      <View style={styles.navBar}>
        {/* Left: Logo + Location */}
        <View style={styles.navLeft}>
          <Text style={styles.logoText}>imavatar</Text>

          {/* Anchor container (dropdown will be positioned relative to this) */}
          <View style={styles.locationAnchor}>
            <Pressable
              style={[
                styles.navLocation,
                showLocationDropdown && styles.navLocationActive,
              ]}
              onPress={() => setShowLocationDropdown((v) => !v)}
            >
              <Feather name="map-pin" size={14} color="#555" />
              <Text style={styles.navLocationText}>{selectedLocation} ▾</Text>
            </Pressable>

            {/* Dropdown EXACTLY below the button */}
            {showLocationDropdown && (
              <View style={styles.dropdownContainer}>
                {locationsToShow.map((location) => (
                  <Pressable
                    key={location}
                    style={styles.dropdownOption}
                    onPress={() => handleLocationSelect(location)}
                  >
                    <Text style={styles.dropdownOptionText}>{location}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Right: Menu + Login */}
        <View style={styles.navRightContent}>
          <View style={styles.navCenter}>
            {navItems.map((item) => (
              <Pressable key={item} style={styles.navItem}>
                <Text
                  style={[
                    styles.navItemText,
                    currentPage === item && styles.navItemTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  // Make sure navbar (and dropdown) can appear above the content below
  navbarWrapper: {
    zIndex: 99999,
    elevation: 50,
  },

  navBar: {
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ff5722",
  },

  // IMPORTANT: relative anchor so dropdown is placed exactly below the button
  locationAnchor: {
    position: "relative",
  },

  navLocation: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    gap: 6,
  },

  navLocationActive: {
    borderColor: "#ff5722",
    borderWidth: 1,
    backgroundColor: "#fff",
  },

  navLocationText: {
    fontSize: 12,
    color: "#555",
  },

  // Dropdown: directly below the Pressable, same left edge
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 6,

    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e8e8e8",

    minWidth: 170,

    zIndex: 999999,
    elevation: 80,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  dropdownOptionText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },

  navRightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  navCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  navItem: {
    paddingVertical: 4,
  },

  navItemText: {
    fontSize: 14,
    color: "#666",
  },

  navItemTextActive: {
    color: "#ff5722",
    fontWeight: "600",
  },

  loginButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ff6b6b",
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
