import { fonts } from "@/assets";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppStack />
    </ThemeProvider>
  );
}

function AppStack() {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.header },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
          animation: "fade_from_bottom",
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontFamily: "Inter-SemiBold",
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Weather App",
            headerTitleStyle: { fontFamily: "Inter-SemiBold" },

            headerRight: () => <ThemeToggle />,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Error",
            headerTitleStyle: { fontFamily: "Inter-SemiBold" },
          }}
        />
      </Stack>
    </>
  );
}
