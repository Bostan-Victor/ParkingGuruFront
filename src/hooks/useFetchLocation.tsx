import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Platform } from "react-native";

interface ReverseGeocodeResult {
  street: string | null;
  city: string | null;
}

interface UseFetchLocationReturn {
  locationAddress: string;
  price: string;
}

export const useFetchLocation = (): UseFetchLocationReturn => {
  const [locationAddress, setLocationAddress] = useState<string>(
    "Waiting for location..."
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission was denied");
          setLocationAddress("Permission was denied");
          return;
        }

        // Use Location.getCurrentPositionAsync only on mobile
        let location;
        if (Platform.OS !== 'web') {
          location = await Location.getCurrentPositionAsync({});
        } else {
          // Fallback for web
          location = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        }

        const { latitude, longitude } = location.coords;

        const reverseGeocode: ReverseGeocodeResult[] =
          await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

        if (reverseGeocode.length > 0) {
          const { street, city } = reverseGeocode[0];
          setLocationAddress(`${street || ""}, ${city || ""}`);
        } else {
          console.log("No address found for the current location.");
          setLocationAddress("Permission was denied");
        }
      } catch (error) {
        console.error("useFetchLocation file error: ", error);
        console.log("Failed to fetch location data.");
        setLocationAddress("Permission was denied");
      }
    };

    fetchLocation();
    const intervalId = setInterval(fetchLocation, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return {
    locationAddress,
    price: "30", // need change
  };
};
