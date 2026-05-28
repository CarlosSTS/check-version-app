import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 8: 40,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 25,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#fff",
    marginTop: 14,
    fontSize: 16,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  icon: {
    width: 70,
    height: 70,
    borderRadius: 18,
    marginRight: 14,
    backgroundColor: "#fff",
  },

  appName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  version: {
    color: "#38bdf8",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    color: "#cbd5e1",
    lineHeight: 22,
    marginBottom: 18,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  infoBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 4,
  },

  infoLabel: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 6,
  },

  infoValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 12,
  },

  lastChecked: {
    color: "#94a3b8",
    fontSize: 12,
  },

  lastCheckedDate: {
    color: "#fff",
    marginTop: 4,
    fontSize: 13,
  },

  storeRow: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    paddingTop: 12,
    marginTop: 12,
  },

  storeLink: {
    color: "#38bdf8",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  disabledText: {
    color: "#64748b",
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  modalCard: {
    width: "100%",
    backgroundColor: "rgba(15,23,42,0.95)",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.25)",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginLeft: 12,
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  modalImage: {
    width: "100%",
    height: 260,
    borderRadius: 18,
    marginTop: 16,
    backgroundColor: "#fff",
  },
});

export default styles;