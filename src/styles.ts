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
});

export default styles;