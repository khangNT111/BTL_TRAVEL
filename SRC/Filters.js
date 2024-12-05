import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const FilterModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const togglePlaceSelection = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedPlaces([]);
  };

  const goToAdvancedFilter = () => {
    
    onClose(); 
    navigation.navigate('AdvancedFilter'); 
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.filterHeader}>
            <TouchableOpacity
              style={styles.filterTitleWithIcon}
              onPress={goToAdvancedFilter}>
              <FontAwesome
                name="sliders"
                size={20}
                color="gray"
                style={styles.filterIcon}
              />
              <Text style={styles.modalTitle}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesome name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.modalSubtitle}>Price range</Text>
            <View style={styles.priceRangeContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min Price"
                keyboardType="numeric"
                value={priceRange.min}
                onChangeText={(value) =>
                  setPriceRange((prev) => ({ ...prev, min: value }))
                }
              />
              <Text style={styles.priceSeparator}>-</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max Price"
                keyboardType="numeric"
                value={priceRange.max}
                onChangeText={(value) =>
                  setPriceRange((prev) => ({ ...prev, max: value }))
                }
              />
            </View>

            <Text style={styles.modalSubtitle}>Type of place</Text>
            <TouchableOpacity
              style={styles.placeOption}
              onPress={() => togglePlaceSelection('Entire place')}>
              <View>
                <Text style={styles.placeText}>Entire place</Text>
                <Text style={styles.placeDescription}>
                  Entire apartments, condos, houses
                </Text>
              </View>
              <FontAwesome
                name={
                  selectedPlaces.includes('Entire place')
                    ? 'check-square'
                    : 'square-o'
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.placeOption}
              onPress={() => togglePlaceSelection('Private room')}>
              <View>
                <Text style={styles.placeText}>Private room</Text>
                <Text style={styles.placeDescription}>
                  Typically come with a private bathroom unless otherwise stated
                </Text>
              </View>
              <FontAwesome
                name={
                  selectedPlaces.includes('Private room')
                    ? 'check-square'
                    : 'square-o'
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.placeOption}
              onPress={() => togglePlaceSelection('Dormitories')}>
              <View>
                <Text style={styles.placeText}>Dormitories</Text>
                <Text style={styles.placeDescription}>
                  Large rooms with multiple beds that are shared with others
                </Text>
              </View>
              <FontAwesome
                name={
                  selectedPlaces.includes('Dormitories')
                    ? 'check-square'
                    : 'square-o'
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.footerButtons}>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearButton}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewResultsButton}
              onPress={onClose}>
              <Text style={styles.viewResultsText}>View Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  priceInput: {
    width: '40%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 14,
  },
  priceSeparator: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 5,
  },
  placeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeText: {
    fontSize: 16,
    color: '#333',
  },
  placeDescription: {
    fontSize: 10,
    color: '#666',
    marginTop: 3,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  clearButton: {
    fontSize: 14,
    color: '#888',
  },
  viewResultsButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  viewResultsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
});

export default FilterModal;
