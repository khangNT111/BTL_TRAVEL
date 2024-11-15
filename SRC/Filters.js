import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  CheckBox,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [apartments, setApartments] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isAdvancedFilterVisible, setAdvancedFilterVisible] = useState(false);
  const [entirePlace, setEntirePlace] = useState(true);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [dormitory, setDormitory] = useState(false);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(250);
  const [kitchen, setKitchen] = useState(false);
  const [pool, setPool] = useState(false);
  const [gym, setGym] = useState(false);
  const [outdoorSpace, setOutdoorSpace] = useState(false);
  const [InternetAccess, setInternetAccess] = useState(false);

  const clearAllFilters = () => {
    setKitchen(false);
    setPool(false);
    setGym(false);
    setOutdoorSpace(false);
    setInternetAccess(false);
  };
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch(
          'https://67177012b910c6a6e0282941.mockapi.io/api/content'
        );
        const data = await response.json();
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const openAdvancedFilterModal = () => {
    setAdvancedFilterVisible(true);
  };

  const closeAdvancedFilterModal = () => {
    setAdvancedFilterVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={openFilterModal} style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <TouchableOpacity style={styles.heartIcon}>
        <FontAwesome name="heart-o" size={20} color="gray" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.bedrooms}>Rating: {item.rate}</Text>
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Anywhere, 23 - 31 May, 2 guests"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Present total price</Text>
        <Text style={styles.filterSubText}>All-inclusive, pre-tax</Text>
        <FontAwesome name="check-square-o" size={20} color="#00bfa5" />
      </View>

      <FlatList
        data={apartments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.bottomNav}>
        <FontAwesome name="search" size={24} color="#00bfa5" />
        <FontAwesome name="list-ul" size={24} color="gray" />
        <FontAwesome name="bookmark-o" size={24} color="gray" />
        <FontAwesome name="inbox" size={24} color="gray" />
        <FontAwesome name="user" size={24} color="gray" />
      </View>

      {/* Main Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.filterHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={openAdvancedFilterModal}>
                <MaterialIcons name="filter-alt" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={closeFilterModal}
              style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="gray" />
            </TouchableOpacity>
            {/* Basic filter options */}
            <Text style={styles.modalSubtitle}>Price range</Text>
            <View style={styles.priceRangeContainer}>
              <TextInput
                style={styles.priceInput}
                value={`US$${minPrice}`}
                onChangeText={(text) =>
                  setMinPrice(Number(text.replace('US$', '')))
                }
              />
              <Text style={styles.priceSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                value={`US$${maxPrice}`}
                onChangeText={(text) =>
                  setMaxPrice(Number(text.replace('US$', '')))
                }
              />
            </View>
            <Text style={styles.modalSubtitle}>Type of place</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox value={entirePlace} onValueChange={setEntirePlace} />
              <Text style={styles.checkboxLabel}>Entire place</Text>
              <Text style={styles.checkboxDescription}>
                Entire apartments, condos, houses
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox value={privateRoom} onValueChange={setPrivateRoom} />
              <Text style={styles.checkboxLabel}>Private room</Text>
              <Text style={styles.checkboxDescription}>
                Typically comes with a private bathroom unless otherwise stated
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox value={dormitory} onValueChange={setDormitory} />
              <Text style={styles.checkboxLabel}>Dormitory</Text>
              <Text style={styles.checkboxDescription}>
                Large rooms with multiple beds that are shared with others
              </Text>
            </View>

            <View style={styles.footerButtons}>
              <TouchableOpacity
                onPress={() => {
                  setEntirePlace(false);
                  setPrivateRoom(false);
                  setDormitory(false);
                  setMinPrice(10);
                  setMaxPrice(250);
                }}>
                <Text style={styles.clearButton}>Clear all</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeFilterModal}
                style={styles.viewResultsButton}>
                <Text style={styles.viewResultsText}>View Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Advanced Filter Modal */}
      {/* Advanced Filter Modal */}
      <Modal
        visible={isAdvancedFilterVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={closeAdvancedFilterModal}
              style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="gray" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Advanced Filters</Text>

            {/* Advanced Filter Options */}
            <Text style={styles.modalSubtitle}>Rooms and beds</Text>
            <Text style={styles.checkboxLabel}>Bedrooms</Text>
            <Text style={styles.checkboxLabel}>Beds</Text>
            <Text style={styles.checkboxLabel}>Bathrooms</Text>

            <Text style={styles.modalSubtitle}>Facilities</Text>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setKitchen(!kitchen)}>
              <Text style={styles.checkboxLabel}>Kitchen</Text>
              <CheckBox
                value={kitchen}
                onValueChange={setKitchen}
                style={styles.checkboxRight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setPool(!pool)}>
              <Text style={styles.checkboxLabel}>Pool</Text>
              <CheckBox
                value={pool}
                onValueChange={setPool}
                style={styles.checkboxRight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setGym(!gym)}>
              <Text style={styles.checkboxLabel}>Gym</Text>
              <CheckBox
                value={gym}
                onValueChange={setGym}
                style={styles.checkboxRight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setOutdoorSpace(!outdoorSpace)}>
              <Text style={styles.checkboxLabel}>Outdoor Space</Text>
              <CheckBox
                value={outdoorSpace}
                onValueChange={setOutdoorSpace}
                style={styles.checkboxRight}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setInternetAccess(!InternetAccess)}>
              <Text style={styles.checkboxLabel}>Internet Access</Text>
              <CheckBox
                value={InternetAccess}
                onValueChange={setInternetAccess}
                style={styles.checkboxRight}
              />
            </TouchableOpacity>

            {/* Buttons Container */}
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeAdvancedFilterModal}
                style={styles.applyFiltersButton}>
                <Text style={styles.applyFiltersText}>View Results</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  applyFiltersButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00bfa5',
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    margin: 16,
  },
  searchInput: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e6f7f5',
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 6,
    borderRadius: 15,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bedrooms: {
    fontSize: 14,
    color: 'gray',
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
    overflow: 'scroll',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    lineHeight: 24,
  },
  modalSubtitle: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
    width: '40%',
    textAlign: 'center',
  },
  priceSeparator: {
    marginHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxRight: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    lineHeight: 24,
  },
  checkboxDescription: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
  clearButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'flex-start',
    flex: 1,
  },
  viewResultsButton: {
    backgroundColor: '#00bfa5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    alignItems: 'flex-end',
  },
  viewResultsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterSubText: {
    fontSize: 12,
    color: 'gray',
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default App;
