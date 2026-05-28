import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
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
  platform: PlatformType;
};

export default function App() {
  const [apps, setApps] = useState<AppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);

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

            return {
              ...response,
              platform: app.platform,
            };
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
              platform: app.platform,
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

  const handleOpenModal = (app: AppInfo) => {
    setSelectedApp(app);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedApp(null);
  };

  const handleOpenStore = async (url?: string) => {
    if (!url) {
      return;
    }

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    return;
    }
    Alert.alert("Error", "Unable to open the store link.");
  };

  const renderItem = ({ item }: { item: AppInfo }) => {
    const uri = item?.appIcon ? { uri: item.appIcon } : appIcon;
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => handleOpenModal(item)}
            activeOpacity={9}
          >
            <Image
              source={uri}
              style={styles.icon}
              resizeMode="cover"
            />
          </TouchableOpacity>

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
              {item.platform === 'ios' ? new Date(item.releasedAt).toLocaleDateString("pt-BR") : item.releasedAt}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>
              Update
            </Text>

            <Text style={styles.infoValue}>
              {item.platform === 'ios' ? new Date(item.updatedAt).toLocaleDateString("pt-BR") : item.updatedAt}
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

        <View style={styles.storeRow}>
          <TouchableOpacity
            onPress={() => handleOpenStore(item.url)}
            activeOpacity={0.85}
            disabled={!item.url}
          >
            <Text
              style={[
                styles.storeLink,
                !item.url && styles.disabledText,
              ]}
            >
              {item.url ? "Abrir na loja" : "Link indisponivel"}
            </Text>
          </TouchableOpacity>
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

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedApp?.appName || "App"}
                </Text>

                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButton}
                  activeOpacity={0.85}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={
                  selectedApp?.appIcon
                    ? { uri: selectedApp.appIcon }
                    : appIcon
                }
                style={styles.modalImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}