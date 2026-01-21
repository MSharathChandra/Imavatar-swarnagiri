import React, { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Service } from "../types";
import { theme } from "../theme";

type Props = { item: Service; onPress: (s: Service) => void };

export default function ServiceCard({ item, onPress }: Props) {
  const [expanded, setExpanded] = useState(false);

  const badge = useMemo(
    () => (item.kind === "dharshans" ? "DHARSHAN" : "SEVA"),
    [item.kind]
  );

  const isWeb = Platform.OS === "web";

  return (
    <Pressable
      onPress={() => onPress(item)}
      android_ripple={{ color: "rgba(242,107,91,0.12)" }}
      style={({ pressed }) => [
        styles.card,
        isWeb && styles.cardWebShadow,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.badge,
            item.kind === "dharshans" ? styles.badgeD : styles.badgeS,
          ]}
        >
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>

      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>

      <View style={styles.timeRow}>
        <Text style={styles.timeIcon}>⏱</Text>
        <Text numberOfLines={2} style={styles.time}>
          {item.time}
        </Text>
      </View>

      {!!item.notes && (
        <View style={{ marginTop: 10 }}>
          <Text numberOfLines={expanded ? undefined : 3} style={styles.notes}>
            {item.notes}
          </Text>

          <Pressable
            onPress={(e: any) => {
              e.stopPropagation?.();
              setExpanded((v) => !v);
            }}
            style={styles.moreBtn}
          >
            <Text style={styles.moreLess}>
              {expanded ? "Show less" : "Read more"}
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.ctaBar}>
        <Text style={styles.ctaText}>Rs. {item.price}.00 BOOK NOW</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 230,

    // iOS shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  // Modern, clean web shadow (stronger & more visible than before)
  cardWebShadow: {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.09)",
  },

  // Pressed state – subtle scale + shadow shrink (web + iOS)
  cardPressed: Platform.select({
    web: {
      transform: [{ scale: 0.98 }],
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.10)",
    },
    ios: {
      transform: [{ scale: 0.99 }],
    },
    android: {}, // ripple is enough on Android
    default: {},
  }),

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeD: {
    backgroundColor: "rgba(242,107,91,0.10)",
    borderColor: "rgba(242,107,91,0.25)",
  },
  badgeS: {
    backgroundColor: "rgba(242,107,91,0.06)",
    borderColor: "rgba(242,107,91,0.20)",
  },
  badgeText: {
    color: theme.colors.orange,
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 0.6,
  },

  arrow: {
    color: theme.colors.muted,
    fontSize: 24,
    fontWeight: "900",
  },

  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "900",
    color: theme.colors.text,
    lineHeight: 20,
  },

  timeRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeIcon: {
    marginRight: 6,
    color: theme.colors.orange,
    fontSize: 12,
    marginTop: 2,
  },
  time: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.muted,
    lineHeight: 16,
  },

  notes: {
    fontSize: 12,
    color: "#555",
    lineHeight: 16,
  },
  moreBtn: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  moreLess: {
    fontSize: 12,
    fontWeight: "900",
    color: theme.colors.orange,
  },

  ctaBar: {
    marginTop: "auto",
    backgroundColor: theme.colors.orange,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 0.6,
  },
});
