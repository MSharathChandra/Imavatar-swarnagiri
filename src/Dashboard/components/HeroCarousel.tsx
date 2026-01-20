// src/Dashboard/components/HeroCarousel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Image } from "expo-image";

const { width: SCREEN_W } = Dimensions.get("window");

type Slide = {
  id: string;
  source: number; // require(...) returns a number
};

type Props = {
  height?: number;
  intervalMs?: number;
};

export default function HeroCarousel({
  height = 600,
  intervalMs = 5000,
}: Props) {
  const listRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: "1",
        source: require("../../../assets/dashboard_images/tirupati.jpg"),
      },
      {
        id: "2",
        source: require("../../../assets/dashboard_images/tirupati1.jpg"),
      },
    ],
    []
  );

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, slides.length]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setActiveIndex(nextIndex);
  };

  return (
    <View style={[styles.container, { height }]}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_W,
          offset: SCREEN_W * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_W, height }]}>
            <Image
              style={styles.image}
              source={item.source}
              contentFit="cover" // ✅ show full image (no crop) [web:37]
              contentPosition="center" // ✅ centered inside the frame [web:37]
            />
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    backgroundColor: "#000", // bars (if aspect ratios differ)
  },
  slide: {
    backgroundColor: "#000", // bars (if aspect ratios differ)
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  dots: {
    position: "absolute",
    bottom: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotActive: {
    backgroundColor: "#fff",
  },
});
