import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { TabKey } from "../types";
import { theme } from "../theme";

type Props = {
  activeTab: TabKey;
  onChange: (t: TabKey) => void;
};

export default function ServicesTabs({ activeTab, onChange }: Props) {
  return (
    <View style={styles.tabsRow}>
      <Pressable
        onPress={() => onChange("dharshans")}
        style={[styles.tab, activeTab === "dharshans" && styles.tabActive]}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "dharshans" && styles.tabTextActive,
          ]}
        >
          Dharshans
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("sevas")}
        style={[styles.tab, activeTab === "sevas" && styles.tabActive]}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "sevas" && styles.tabTextActive,
          ]}
        >
          Sevas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    overflow: "hidden",
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: theme.colors.white,
    alignItems: "center",
  },
  tabActive: { backgroundColor: theme.colors.orange },
  tabText: { fontSize: 14, fontWeight: "800", color: "#333" },
  tabTextActive: { color: theme.colors.white },
});
