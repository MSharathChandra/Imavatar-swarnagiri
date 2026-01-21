// DharshansGrid.tsx
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Service } from "../types";
import ServiceCard from "./ServiceCard";

type Props = {
  data: Service[];
  onSelect: (s: Service) => void;
};

export default function DharshansGrid({ data, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(it) => it.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <ServiceCard item={item} onPress={onSelect} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24 },
  row: { gap: 12 }, // if your RN doesn’t support gap, replace with margins below
  cell: { flex: 1, marginBottom: 12 },
});
