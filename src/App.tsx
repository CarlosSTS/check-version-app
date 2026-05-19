import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAndroidVersion } from "./providers/android";

const APPS_MOCK = [
  {
    package: "com.br.mydeviceinfo",
    language: "PT-BR",
  },
  {
    package: "host.exp.exponent",
    language: "ES-ES",
  },
  {
    package: 'com.spotify.music',
    language: 'EN-US'
  }
];

type AppInfo = {
  version: string;
  releasedAt: string;
  updateAt: string;
  notes: string;
  url: string;
  lastChecked: string;
  appIcon: string;
  appName: string;
  description: string;
};

export default function App() {
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const GetInfoApps = async () => {
    try {
      setLoading(true);

      const responses = await Promise.all(
        APPS_MOCK.map(async (app) => {
          const response = await getAndroidVersion(
            app.package,
            app.language
          );

          return response;
        })
      );
      setApps(responses);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetInfoApps();
  }, []);

  const renderItem = ({ item }: { item: AppInfo }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: item.appIcon }}
            style={styles.icon}
            resizeMode="cover"
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.appName}>{item.appName}</Text>

            <Text style={styles.version}>
              Versão {item.version}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {item.description}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Lançamento</Text>
            <Text style={styles.infoValue}>
              {item.releasedAt || "N/A"}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Atualização</Text>
            <Text style={styles.infoValue}>
              {item.updateAt || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.lastChecked}>
            Última verificação:
          </Text>

          <Text style={styles.lastCheckedDate}>
            {new Date().toLocaleString()}
          </Text>
        </View>

         <View style={styles.footer}>
          <Text style={styles.lastChecked}>
            Notas da versão:
          </Text>

          <Text style={styles.lastCheckedDate}>
            {item.notes || 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#111827"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>
          Google Play Tracker
        </Text>

        <Text style={styles.subtitle}>
          Informações dos aplicativos em tempo real
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>
              Buscando aplicativos...
            </Text>
          </View>
        ) : (
          <FlatList
            data={apps}
            keyExtractor={(item) => item.appIcon}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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