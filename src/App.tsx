import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lookupVersion } from "./providers/utils";
import styles from "./styles";
import appIcon from "../assets/icon.png";

type PlatformType = "android" | "ios";

const APPS_MOCK: {
  bundleId: string;
  language: string;
  platform: PlatformType;
}[] = [
    {
      bundleId: "com.br.mydeviceinfo",
      language: "PT-BR",
      platform: "android",
    },
    {
      bundleId: "host.exp.exponent",
      language: "ES-ES",
      platform: "android",
    },
    {
      bundleId: "com.spotify.music",
      language: "EN-US",
      platform: "android",
    },
    {
      bundleId: "com.spotify.client",
      language: "BR",
      platform: "ios",
    },
  ];

type AppInfo = {
  version: string | null;
  releasedAt: string;
  updatedAt: string;
  notes: string;
  url: string;
  country: string;
  bundleId: string;
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
          try {
            const response = await lookupVersion(
              app.platform,
              app.bundleId,
              app.language
            );

            return response;
          } catch (error) {
            console.log("APP ERROR", app.bundleId, error);
            return {
              version: "N/A",
              releasedAt: "",
              updatedAt: "",
              notes: "",
              url: "",
              lastChecked: new Date().toISOString(),
              appIcon: "",
              appName: app.bundleId,
              country: app.language,
              bundleId: app.bundleId,
              description: "Failed to fetch app",
            };
          }
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
    const uri = item?.appIcon ? { uri: item.appIcon } : appIcon;
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={uri}
            style={styles.icon}
            resizeMode="cover"
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.appName}>
              {item.appName || "Unknown App"}
            </Text>

            <Text style={styles.version}>
              Version {item.version || "N/A"}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {item.description || "No description"}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Release
            </Text>

            <Text style={styles.infoValue}>
              {item.releasedAt || "N/A"}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Update
            </Text>

            <Text style={styles.infoValue}>
              {item.updatedAt || "N/A"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.lastChecked}>
            Last checked:
          </Text>

          <Text style={styles.lastCheckedDate}>
            {new Date(
              item.lastChecked
            ).toLocaleString()}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.lastChecked}>
            Release notes:
          </Text>

          <Text style={styles.lastCheckedDate}>
            {item.notes ||
              "No notes available"}
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
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Text style={styles.title}>
          App Version Tracker
        </Text>

        <Text style={styles.subtitle}>
          Google Play + App Store
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#fff"
            />

            <Text style={styles.loadingText}>
              Fetching apps...
            </Text>
          </View>
        ) : (
          <FlatList
            data={apps}
            keyExtractor={(item) => item.bundleId}
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