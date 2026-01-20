import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native"; // uncomment if using react-navigation

export default function AboutTirupatiTab() {
  // const navigation = useNavigation(); // uncomment if using react-navigation

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const languages = ["English", "हिन्दी"]; // Hindi

  const cardData = [
    {
      title: "Darshan Booking",
      image: require("../../../assets/dashboard_images/tirupati1.jpg"),
      screen: "services", // route name (example)
    },
    {
      title: "Special Sevas",
      image: require("../../../assets/dashboard_images/tirupati.jpg"),
      screen: "services",
    },
    {
      title: "Accommodation",
      image: require("../../../assets/dashboard_images/tirupati1.jpg"),
      screen: "services",
    },
  ];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    setShowLangDropdown(false);
    // Here you can add language change logic (i18n, context, etc)
  };

  const handleCardPress = (screenName: string) => {
    // navigation.navigate(screenName); // uncomment if using react-navigation
    console.log(`Navigating to: ${screenName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header with language & search */}
      <View style={styles.searchHeader}>
        {/* Language selector with dropdown */}
        <Pressable
          style={styles.langButton}
          onPress={() => setShowLangDropdown(!showLangDropdown)}
          hitSlop={10}
        >
          <View style={styles.langIconBox}>
            <Text style={styles.langIconText}>
              {selectedLanguage === "English" ? "A" : "ह"}
            </Text>
          </View>

          <Text style={styles.langText}>{selectedLanguage}</Text>
          <Ionicons
            name={showLangDropdown ? "chevron-up" : "chevron-down"}
            size={18}
            color="#8a8a8a"
          />
        </Pressable>

        {/* Dropdown Modal */}
        <Modal
          transparent
          visible={showLangDropdown}
          animationType="fade"
          onRequestClose={() => setShowLangDropdown(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowLangDropdown(false)}
          >
            <View style={styles.dropdownContainer}>
              {languages.map((lang) => (
                <Pressable
                  key={lang}
                  style={[
                    styles.dropdownItem,
                    lang === selectedLanguage && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleLanguageSelect(lang)}
                >
                  <Text
                    style={[
                      styles.dropdownText,
                      lang === selectedLanguage && { fontWeight: "bold" },
                    ]}
                  >
                    {lang}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>

        {/* Search pill */}
        <View style={styles.searchPill}>
          <Ionicons name="search-outline" size={20} color="#9b9b9b" />

          <TextInput
            placeholder="Search for Sevas, Darshan and More"
            placeholderTextColor="#9b9b9b"
            style={styles.searchInput}
            underlineColorAndroid="transparent"
          />

          <Pressable style={styles.micButton} hitSlop={10}>
            <Ionicons name="mic-outline" size={20} color="#d9534f" />
          </Pressable>
        </View>
      </View>

      {/* Cards with overlay text */}
      <View style={styles.cardRow}>
        {cardData.map((card, index) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(card.screen)}
          >
            <Image
              style={styles.cardImage}
              source={card.image}
              contentFit="cover"
            />

            {/* Overlay Text */}
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  searchHeader: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    zIndex: 10,
  },

  langButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  langIconBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: "#e9e9e9",
    borderWidth: 1,
    borderColor: "#d1d1d1",
    alignItems: "center",
    justifyContent: "center",
  },
  langIconText: {
    fontSize: 16,
    color: "#6b6b6b",
    fontWeight: "700",
  },
  langText: {
    fontSize: 17,
    color: "#333",
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    paddingTop: 100, // adjust according to header position
  },
  dropdownContainer: {
    backgroundColor: "white",
    marginHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemSelected: {
    backgroundColor: "#f0f8ff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },

  searchPill: {
    flex: 1,
    height: 46,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#555",
    paddingVertical: 0,
    marginLeft: 10,
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  cardRow: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: "row",
    gap: 16,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ccc",
    height: 240,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  cardTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
