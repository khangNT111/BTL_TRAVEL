import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView, 
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Confirm and Pay Screen
function ConfirmAndPayScreen({ navigation }) {
  const [dates, setDates] = useState("May 1 - 6");
  const [guests, setGuests] = useState("1 guest");
  const [paymentOption, setPaymentOption] = useState("Pay in full");
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://67177012b910c6a6e0282941.mockapi.io/api/content")
      .then((response) => {
        console.log("API Response:", response.data); 
        setData(response.data[0]); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00a680" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Confirm and pay</Text>

        {/* Booking Details */}
        <View style={styles.card}>
          {data?.img ? (
            <Image
              source={{ uri: data.img }} 
              style={styles.image} 
            />
          ) : (
            <Text style={styles.subText}>No image available</Text>
          )}
          <Text style={styles.price}>{data?.price}</Text>
          <Text style={styles.subText}>{data?.name}</Text>
          <Text style={styles.rating}>⭐ {data?.rate}</Text>
        </View>

        {/* Trip Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your trip</Text>

          <View style={styles.row}>
            <Text style={styles.sectionItem}>Dates:</Text>
            <TextInput
              style={styles.input}
              value={dates}
              onChangeText={setDates}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.sectionItem}>Guests:</Text>
            <TextInput
              style={styles.input}
              value={guests}
              onChangeText={setGuests}
            />
          </View>
        </View>

        {/* Payment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment options</Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => setPaymentOption("Pay in full")}
          >
            <Text style={styles.sectionItem}>Pay in full: ${data.totalPrice}</Text>
            <Text style={styles.radioButton}>
              {paymentOption === "Pay in full" ? "✔" : ""}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => setPaymentOption("Pay a part now")}
          >
            <Text style={styles.sectionItem}>Pay a part now</Text>
            <Text style={styles.radioButton}>
              {paymentOption === "Pay a part now" ? "✔" : ""}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price details</Text>
          <Text style={styles.sectionItem}>
            ${data.price} x {data.nights || 1} night(s)
          </Text>
          <Text style={styles.sectionItem}>
            Kayak fee: ${data?.fees?.kayak || 0}
          </Text>
          <Text style={styles.sectionItem}>
            Street parking fee: ${data?.fees?.parking || 0}
          </Text>
          <Text style={styles.total}>Total (USD): ${data.totalPrice || 0}</Text>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PaymentSuccess")}
        >
          <Text style={styles.buttonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Payment Success Screen
function PaymentSuccessScreen() {
  return (
    <View style={styles.container}>
      {/* Nền */}
      <View style={styles.background}>
        <Image
          source={{
            uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/328c25e6a309530200571c921bd1db50", 
          }}
          style={styles.backgroundImage}
        />
      </View>

      <View style={styles.card}>
        <Image
          source={{
            uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/da188ccb78f1017e9645542bb5e52d6b", 
          }}
          style={styles.logo} 
        />

        <Text style={styles.successHeader}>Payment success!</Text>
        <Text style={styles.details}>Ref number: 0000072697027</Text>
        <Text style={styles.details}>Date: 09-05-2023</Text>
        <Text style={styles.details}>Time: 05:40 AM</Text>
        <Text style={styles.details}>Payment method: Credit card</Text>
        <Text style={styles.details}>Amount: $30</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get PDF receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ConfirmAndPay"
          component={ConfirmAndPayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccessScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    color: "#666",
  },
  rating: {
    fontSize: 16,
    color: "#888",
  },
 sectionTitle: {
    fontSize: 16, 
    fontWeight: "bold",
    marginBottom: 8, 
    color: "#333", 
  },
  sectionItem: {
    fontSize: 18,
    color: "#444",
    marginBottom: 5,sectionItem: {
    fontSize: 14, 
    color: "#444",
    marginBottom: 5, 
  },
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#00a680",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  successHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00a680",
    marginBottom: 20,
    textAlign: "center",
  },
  details: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
image: {
    width: "100%", 
    height: 200, 
    borderRadius: 8, 
    marginBottom: 15, 
  },

  radioButton: {
    fontSize: 20,
    color: "#00a680",
  },
});
