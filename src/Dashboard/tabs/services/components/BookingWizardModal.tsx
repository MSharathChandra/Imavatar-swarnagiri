import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { Booking, Devotee, Service } from "../types";
import { theme } from "../theme";

type Props = {
  visible: boolean;
  service: Service | null;
  onClose: () => void;
  onProceedToPayment: (payload: {
    service: Service;
    booking: Booking;
    devotees: Devotee[];
    totalAmount: number;
  }) => void;
};

const emptyDevotee = (): Devotee => ({
  fullName: "",
  age: "",
  gender: "",
  gothram: "",
  mobile: "",
  aadhaar: "",
  address: "",
});

type Step = 1 | 2 | 3;

export default function BookingWizardModal({
  visible,
  service,
  onClose,
  onProceedToPayment,
}: Props) {
  const [step, setStep] = useState<Step>(1);
  const [agreed, setAgreed] = useState(false);

  const [booking, setBooking] = useState<Booking>({
    date: "20 Jun 2026",
    slot: service?.time ?? "",
    devoteesCount: 2,
    hundi: 0,
  });

  const [devotees, setDevotees] = useState<Devotee[]>([]);

  const totalAmount = useMemo(() => {
    const base = service ? service.price * (booking.devoteesCount || 0) : 0;
    return base + (booking.hundi || 0);
  }, [service, booking.devoteesCount, booking.hundi]);

  const resetForService = () => {
    setStep(1);
    setAgreed(false);
    setBooking({
      date: "20 Jun 2026",
      slot: service?.time ?? "",
      devoteesCount: 2,
      hundi: 0,
    });
    setDevotees([]);
  };

  React.useEffect(() => {
    if (visible) resetForService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, service?.id]);

  const syncDevotees = (count: number) => {
    const n = Math.max(1, count);
    setDevotees((prev) => {
      const next = prev.slice();
      while (next.length < n) next.push(emptyDevotee());
      return next.slice(0, n);
    });
  };

  const updateDevotee = (index: number, patch: Partial<Devotee>) => {
    setDevotees((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const title =
    step === 1
      ? "BOOKING DETAILS"
      : step === 2
      ? "ENTER YOUR DETAILS"
      : "CONFIRM DETAILS";

  if (!service) return null;

  const onProceed = () => {
    if (!agreed) return;
    onProceedToPayment({ service, booking, devotees, totalAmount });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Pressable
              onPress={() =>
                step === 1 ? onClose() : setStep((step - 1) as Step)
              }
            >
              <Text style={styles.headerAction}>←</Text>
            </Pressable>

            <Text style={styles.modalTitle}>{title}</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.headerClose}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16, paddingBottom: 18 }}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <View style={styles.stepRow}>
                <View style={styles.leftPane}>
                  <Text style={styles.hLabel}>
                    Select {service.kind === "dharshans" ? "Dharshan" : "Seva"}
                  </Text>
                  <View style={styles.selectBox}>
                    <Text style={styles.selectText} numberOfLines={1}>
                      {service.name}
                    </Text>
                    <Text style={styles.selectArrow}>▾</Text>
                  </View>

                  <Text style={styles.hLabel}>No. of Tickets</Text>
                  <TextInput
                    value={String(booking.devoteesCount)}
                    onChangeText={(t) =>
                      setBooking((b) => ({
                        ...b,
                        devoteesCount:
                          Number(String(t).replace(/[^0-9]/g, "")) || 1,
                      }))
                    }
                    keyboardType="number-pad"
                    style={styles.input}
                  />

                  {/* Hundi field (requested) */}
                  <Text style={styles.hLabel}>Hundi (optional)</Text>
                  <TextInput
                    value={String(booking.hundi)}
                    onChangeText={(t) =>
                      setBooking((b) => ({
                        ...b,
                        hundi: Number(String(t).replace(/[^0-9]/g, "")) || 0,
                      }))
                    }
                    keyboardType="number-pad"
                    style={styles.input}
                    placeholder="Enter hundi amount"
                    placeholderTextColor={theme.colors.muted}
                  />

                  <Text style={styles.hLabel}>Total Cost</Text>
                  <TextInput
                    value={`Rs. ${totalAmount}.00`}
                    editable={false}
                    style={styles.inputDisabled}
                  />

                  <Pressable
                    style={styles.primaryBtnWide}
                    onPress={() => {
                      syncDevotees(booking.devoteesCount);
                      setStep(2);
                    }}
                  >
                    <Text style={styles.primaryBtnText}>NEXT »»</Text>
                  </Pressable>
                </View>

                {/* RIGHT SIDE: fields only (no calendar) */}
                <View style={styles.rightPane}>
                  <Text style={styles.calendarTitle}>SELECT DETAILS</Text>

                  <Text style={styles.hLabel}>Date</Text>
                  <TextInput
                    value={booking.date}
                    onChangeText={(t) => setBooking((b) => ({ ...b, date: t }))}
                    style={styles.input}
                    placeholder="e.g. 20 Jun 2026"
                    placeholderTextColor={theme.colors.muted}
                  />

                  <Text style={styles.hLabel}>Time</Text>
                  <TextInput
                    value={booking.slot}
                    onChangeText={(t) => setBooking((b) => ({ ...b, slot: t }))}
                    style={styles.input}
                    placeholder="e.g. 04:30 AM - 05:00 AM"
                    placeholderTextColor={theme.colors.muted}
                  />
                </View>
              </View>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <View>
                {devotees.map((d, idx) => (
                  <View key={String(idx)} style={styles.devoteeBlock}>
                    <Text style={styles.sectionTitle}>DEVOTEE #{idx + 1}</Text>

                    <View style={styles.formRow}>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Devotee Full Name*"
                          value={d.fullName}
                          onChangeText={(t) =>
                            updateDevotee(idx, { fullName: t })
                          }
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Age*"
                          value={d.age}
                          onChangeText={(t) =>
                            updateDevotee(idx, {
                              age: t.replace(/[^0-9]/g, ""),
                            })
                          }
                          keyboardType="number-pad"
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <View style={styles.formRow}>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Gender*"
                          value={d.gender}
                          onChangeText={(t) =>
                            updateDevotee(idx, { gender: t })
                          }
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Aadhaar Number"
                          value={d.aadhaar}
                          onChangeText={(t) =>
                            updateDevotee(idx, {
                              aadhaar: t.replace(/[^0-9]/g, ""),
                            })
                          }
                          keyboardType="number-pad"
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <View style={styles.formRow}>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Gothram*"
                          value={d.gothram}
                          onChangeText={(t) =>
                            updateDevotee(idx, { gothram: t })
                          }
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Address*"
                          value={d.address}
                          onChangeText={(t) =>
                            updateDevotee(idx, { address: t })
                          }
                          style={styles.input}
                        />
                      </View>
                    </View>

                    <View style={styles.formRow}>
                      <View style={styles.formCol}>
                        <TextInput
                          placeholder="Mobile No.*"
                          value={d.mobile}
                          onChangeText={(t) =>
                            updateDevotee(idx, {
                              mobile: t.replace(/[^0-9]/g, ""),
                            })
                          }
                          keyboardType="phone-pad"
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.formCol} />
                    </View>
                  </View>
                ))}

                <View style={styles.footerRowRight}>
                  <Pressable
                    style={styles.primaryBtnWide}
                    onPress={() => setStep(3)}
                  >
                    <Text style={styles.primaryBtnText}>NEXT »»</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <View>
                <View style={styles.confirmTopGrid}>
                  <View style={styles.confirmField}>
                    <Text style={styles.confirmLabel}>Seva Name</Text>
                    <View style={styles.confirmValueBox}>
                      <Text style={styles.confirmValueText}>
                        {service.name}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.confirmField}>
                    <Text style={styles.confirmLabel}>Date</Text>
                    <View style={styles.confirmValueBox}>
                      <Text style={styles.confirmValueText}>
                        {booking.date}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.confirmField}>
                    <Text style={styles.confirmLabel}>Time</Text>
                    <View style={styles.confirmValueBox}>
                      <Text style={styles.confirmValueText}>
                        {booking.slot}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.confirmField}>
                    <Text style={styles.confirmLabel}>Hundi</Text>
                    <View style={styles.confirmValueBox}>
                      <Text style={styles.confirmValueText}>
                        {booking.hundi}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Visitors table */}
                <View style={styles.table}>
                  <View style={[styles.tr, styles.th]}>
                    <Text style={[styles.cell, styles.c1]}>Sr. No.</Text>
                    <Text style={[styles.cell, styles.c2]}>Visitor Name</Text>
                    <Text style={[styles.cell, styles.c3]}>Age</Text>
                  </View>

                  {devotees.map((d, i) => (
                    <View key={String(i)} style={styles.tr}>
                      <Text style={[styles.cell, styles.c1]}>{i + 1}</Text>
                      <Text style={[styles.cell, styles.c2]}>
                        {d.fullName || "-"}
                      </Text>
                      <Text style={[styles.cell, styles.c3]}>
                        {d.age || "-"}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Billing table */}
                <View style={styles.table}>
                  <View style={[styles.tr, styles.th]}>
                    <Text style={[styles.cell, styles.c1]}>Sr. No.</Text>
                    <Text style={[styles.cell, styles.c2]}>Particulars</Text>
                    <Text style={[styles.cell, styles.c3]}>Cost</Text>
                  </View>

                  <View style={styles.tr}>
                    <Text style={[styles.cell, styles.c1]}>1</Text>
                    <Text style={[styles.cell, styles.c2]}>{service.name}</Text>
                    <Text style={[styles.cell, styles.c3]}>
                      {service.price}
                    </Text>
                  </View>

                  {booking.hundi > 0 ? (
                    <View style={styles.tr}>
                      <Text style={[styles.cell, styles.c1]}>2</Text>
                      <Text style={[styles.cell, styles.c2]}>
                        Hundi Offering
                      </Text>
                      <Text style={[styles.cell, styles.c3]}>
                        {booking.hundi}
                      </Text>
                    </View>
                  ) : null}

                  <View style={[styles.tr, { backgroundColor: "#FAFAFA" }]}>
                    <Text style={[styles.cell, styles.c1]} />
                    <Text
                      style={[styles.cell, styles.c2, { fontWeight: "900" }]}
                    >
                      Total Amount Payable
                    </Text>
                    <Text
                      style={[styles.cell, styles.c3, { fontWeight: "900" }]}
                    >
                      {totalAmount}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={styles.checkRow}
                  onPress={() => setAgreed((v) => !v)}
                >
                  <View
                    style={[styles.checkbox, agreed && styles.checkboxChecked]}
                  >
                    {agreed ? <Text style={styles.checkMark}>✓</Text> : null}
                  </View>
                  <Text style={styles.checkText}>
                    I agree Terms and Conditions.
                  </Text>
                </Pressable>

                <View style={styles.confirmFooter}>
                  <Pressable style={styles.mutedBtn} onPress={() => setStep(1)}>
                    <Text style={styles.mutedBtnText}>
                      {"<<  Modify Details"}
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.primaryBtnWide, !agreed && { opacity: 0.6 }]}
                    onPress={onProceed}
                    disabled={!agreed}
                  >
                    <Text style={styles.primaryBtnText}>
                      PROCEED TO PAYMENT »»
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  modalCard: {
    width: "100%",
    maxWidth: 920,
    height: Platform.OS === "web" ? "85%" : "90%",
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
  modalHeader: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { fontSize: 14, fontWeight: "900", color: theme.colors.orange },
  headerAction: {
    fontSize: 20,
    fontWeight: "900",
    color: theme.colors.orange,
    width: 30,
  },
  headerClose: {
    fontSize: 18,
    fontWeight: "900",
    color: theme.colors.orange,
    width: 30,
    textAlign: "right",
  },
  divider: { height: 1, backgroundColor: theme.colors.border },

  stepRow: { flexDirection: Platform.OS === "web" ? "row" : "column" },
  leftPane: { flex: 1, paddingRight: Platform.OS === "web" ? 12 : 0 },
  rightPane: {
    flex: 1,
    paddingLeft: Platform.OS === "web" ? 12 : 0,
    marginTop: Platform.OS === "web" ? 0 : 12,
  },

  hLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: theme.colors.text,
    marginTop: 10,
    marginBottom: 6,
  },

  selectBox: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  selectText: { flex: 1, color: theme.colors.text, fontWeight: "700" },
  selectArrow: { color: theme.colors.muted, fontWeight: "900", marginLeft: 8 },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: theme.colors.text,
    backgroundColor: theme.colors.white,
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: theme.colors.muted,
    backgroundColor: "#fff",
  },

  calendarTitle: {
    textAlign: "center",
    fontWeight: "900",
    color: theme.colors.muted,
    marginBottom: 8,
  },

  primaryBtnWide: {
    marginTop: 12,
    backgroundColor: theme.colors.orange,
    borderRadius: theme.radius.sm,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    minWidth: 220,
  },
  primaryBtnText: {
    color: theme.colors.white,
    fontWeight: "900",
    fontSize: 13,
  },

  footerRowRight: { marginTop: 12, alignItems: "flex-end" },

  devoteeBlock: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: theme.colors.orange,
    marginBottom: 10,
  },
  formRow: { flexDirection: "row", marginBottom: 10 },
  formCol: { flex: 1, paddingRight: 10 },

  confirmTopGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 } as any,
  confirmField: { width: Platform.OS === "web" ? "48%" : "100%" },
  confirmLabel: {
    fontSize: 12,
    color: theme.colors.muted,
    fontWeight: "800",
    marginBottom: 6,
  },
  confirmValueBox: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F7F7F7",
  },
  confirmValueText: { color: theme.colors.text, fontWeight: "800" },

  table: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    marginTop: 12,
    overflow: "hidden",
  },
  tr: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: "#fff",
  },
  th: { backgroundColor: "#F2F2F2", borderTopWidth: 0 },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: "700",
  },
  c1: { width: 70 },
  c2: { flex: 1 },
  c3: { width: 120, textAlign: "right" },

  checkRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: theme.colors.orange,
    borderColor: theme.colors.orange,
  },
  checkMark: { color: "#fff", fontWeight: "900", fontSize: 12 },
  checkText: { color: theme.colors.muted, fontWeight: "700" },

  confirmFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  } as any,
  mutedBtn: { paddingVertical: 10, paddingHorizontal: 10 },
  mutedBtnText: { color: theme.colors.muted, fontWeight: "800" },
});
