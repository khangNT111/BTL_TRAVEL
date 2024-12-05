import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import FilterModal from "./FilterModal"; 

const HomeScreen = ({ guests, navigation }) => {
  const [apartments, setApartments] = useState([]);
  const [showTotalPrice, setShowTotalPrice] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          "https://67177012b910c6a6e0282941.mockapi.io/api/content"
        );
        const data = await response.json();
        setApartments(data);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };
    fetchApartments();
  }, []);

  const togglePriceSwitch = () => setShowTotalPrice((prevState) => !prevState);
  const handleFilterModalOpen = () => setIsModalVisible(true);
  const handleFilterModalClose = () => setIsModalVisible(false);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={handleFilterModalOpen}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon}>
        <FontAwesome name="heart-o" size={20} color="gray" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.bedrooms}>{item.bedrooms} bedroom(s)</Text>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>{item.price}/night</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apartments</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View style={styles.guestInfo}>
          <Text>Guests: {guests.adults} adults, {guests.children} children</Text>
        </View>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="gray" />
          <TextInput placeholder="Search destinations" style={styles.searchInput} />
        </View>

        <View style={styles.priceToggleContainer}>
          <Text style={styles.priceToggleText}>Present total price</Text>
          <Switch
            value={showTotalPrice}
            onValueChange={togglePriceSwitch}
            thumbColor={showTotalPrice ? "#007BFF" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <FlatList
          data={apartments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          scrollEnabled={false} 
        />
      </ScrollView>

      <FilterModal
        isVisible={isModalVisible}
        onClose={handleFilterModalClose}
        onOpenAdvancedFilter={handleFilterModalOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  guestInfo: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  priceToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
  },
  priceToggleText: {
    fontSize: 16,
    color: "#333",
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bedrooms: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
});

export default HomeScreen;
