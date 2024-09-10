import { useState, useEffect } from "react";
import * as Location from "expo-location";

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
          setLocationAddress("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
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
          setLocationAddress("No address found for the current location.");
        }
      } catch (error) {
        console.error("useFetchLocation file error: ", error);
        setLocationAddress("Failed to fetch location data.");
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
