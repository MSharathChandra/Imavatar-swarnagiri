// components/AnnouncementBar.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const LEFT_WIDTH = 500;

const HINDI_TEXT =
  "बहुत शीघ्र आप अपने पसंदीदा तीर्थ क्षेत्रों, धार्मिक स्थलों और आध्यात्मिक व धार्मिक विशेषज्ञों (पंडित, वास्तु ज्ञानी, ज्योतिषी आदि) से सीधे जुड़ सकेंगे।   ";

const AnnouncementBar: React.FC = () => {
  const rightWidth = screenWidth - LEFT_WIDTH;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(0);

      Animated.timing(translateX, {
        toValue: rightWidth,
        duration: 20000, // smooth speed
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startAnimation()); // recursive call = infinite loop
    };

    startAnimation();
  }, []); // no rightWidth dependency to prevent restart

  return (
    <View style={styles.container}>
      {/* LEFT FIXED STRIP */}
      <View style={styles.leftStrip}>
        <Text style={styles.leftText}>
          ●●● IMAVATAR COMMERCIAL LAUNCH IN JULY 2022! ●●●
        </Text>
      </View>

      {/* RIGHT INFINITE MARQUEE */}
      <View style={styles.rightStrip}>
        <Animated.View
          style={[
            styles.marqueeRow,
            {
              width: rightWidth * 2,
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, rightWidth],
                    outputRange: [0, -rightWidth],
                  }),
                },
              ],
            },
          ]}
        >
          {/* First copy */}
          <View style={[styles.announcementContainer, { width: rightWidth }]}>
            <Text numberOfLines={1} style={styles.hindiText}>
              {HINDI_TEXT}
            </Text>
          </View>

          {/* Second copy (needed for seamless loop) */}
          <View style={[styles.announcementContainer, { width: rightWidth }]}>
            <Text numberOfLines={1} style={styles.hindiText}>
              {HINDI_TEXT}
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default AnnouncementBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 32,
    width: "100%",
  },

  leftStrip: {
    width: LEFT_WIDTH,
    backgroundColor: "#ff4b4b",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  leftText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  rightStrip: {
    flex: 1,
    backgroundColor: "#ffe5d9",
    overflow: "hidden",
    justifyContent: "center",
  },

  marqueeRow: {
    flexDirection: "row",
  },

  announcementContainer: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  hindiText: {
    color: "#e5402b",
    fontSize: 16,
    fontWeight: "600",
  },
});
