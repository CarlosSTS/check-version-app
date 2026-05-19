# Check Version App

Expo/React Native application to track app versions from Google Play and the App Store. The app displays a list of applications with icon, name, version, release/update dates, and release notes.

## Features

- Fetch app versions using `bundleId` from Google Play and App Store.
- Display app icon, name, description, version, and relevant dates.
- Support multiple apps with loading state handling.
- Multi-language support (`PT-BR`, `EN-US`, `ES-ES`, etc).

## Stack

- Expo SDK 55
- React Native 0.83
- React 19
- TypeScript

## Getting Started

```bash
npm install
npm run start
```

Shortcuts:

```bash
npm run android
npm run ios
npm run web
```

## Configure Monitored Apps

Edit the `APPS_MOCK` list in `src/App.tsx` and provide:

- `bundleId`: application identifier.
- `language`: locale/language (example: `PT-BR`, `EN-US`).
- `platform`: `android` or `ios`.

Example:

```ts
const APPS_MOCK = [
  {
    bundleId: "com.spotify.music",
    language: "EN-US",
    platform: "android",
  },
  {
    bundleId: "com.spotify.client",
    language: "EN-US",
    platform: "ios",
  },
];
```

## How Version Lookup Works

### Android

Performs scraping from the Google Play Store page and extracts data directly from the HTML response.

### iOS

Uses the iTunes Search API with `bundleId` and normalized `country` code.

## Notes

Google Play Store HTML changes may break the extraction logic in the future.

## Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dbw8igay3/image/upload/home-android_krdsko.png" width="240" />
  <img src="https://res.cloudinary.com/dbw8igay3/image/upload/loading-android_bmgkwc.png" width="240" />
</p>

<p align="center">
  <b>Android - App List</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Android - Loading</b>
</p>

<br />

<p align="center">
  <img src="https://res.cloudinary.com/dbw8igay3/image/upload/app-android-android_etg2ub.png" width="240" />
  <img src="https://res.cloudinary.com/dbw8igay3/image/upload/app-android-ios_gk1wje.png" width="240" />
</p>

<p align="center">
  <b>Android - App Details</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>iOS - App Details</b>
</p>


## Credits

- Idea and part of the implementation based on:
  - https://github.com/tschoffelen/react-native-check-version

## License

See [LICENSE](LICENSE).
