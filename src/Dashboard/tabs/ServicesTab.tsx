import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ServicesTabs from "./services/components/ServicesTabs";
import DharshansGrid from "./services/components/DharshansGrid";
import SevasGrid from "./services/components/SevasGrid";
import BookingWizardModal from "./services/components/BookingWizardModal";
import { TabKey, Service } from "./services/types";
import { DHARSHANS, SEVAS } from "./services/mockData";

export default function ServicesScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("dharshans");
  const [selected, setSelected] = useState<Service | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const open = (s: Service) => {
    setSelected(s);
    setModalOpen(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swarnagiri Temple</Text>
      <ServicesTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "dharshans" ? (
        <DharshansGrid data={DHARSHANS} onSelect={open} />
      ) : (
        <SevasGrid data={SEVAS} onSelect={open} />
      )}

      <BookingWizardModal
        visible={modalOpen}
        service={selected}
        onClose={() => setModalOpen(false)}
        onProceedToPayment={(payload) => {
          // integrate payment flow here
          setModalOpen(false);
          // console.log(payload)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 18, fontWeight: "900", marginBottom: 12 },
});
