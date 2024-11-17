import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ListingDetail = () => {
  // Hàm xử lý các click
  const handleViewMap = () => {
    alert('Redirect to map view!');
  };

  const handleShowAllFacilities = () => {
    alert('Show all facilities and services!');
  };
  fetch('https://example.com/resource', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://pos.nvncdn.com/86c7ad-50310/art/artCT/20230420_0moA6KAt.png',
          }}
          style={styles.image}
        />
        <View style={styles.imageBadge}>
          <Text style={styles.imageBadgeText}>24</Text>
        </View>
      </View>

      {/* Thông tin tiêu đề */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Balian treehouse</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Bali, Indonesia</Text>
          <TouchableOpacity onPress={handleViewMap}>
            <Text style={styles.viewMap}>View map</Text>
          </TouchableOpacity>
        </View>

        {/* Xếp hạng và đánh giá */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ 4.5/5</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReviewsScreen')}>
            <Text style={styles.reviewsText}>262 reviews</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tiện ích và dịch vụ */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.facilitiesTitle}>Facilities & services</Text>
        <View style={styles.facilitiesList}>
          <Text style={styles.facility}>🛏️ 2 Guests</Text>
          <Text style={styles.facility}>🛌 1 bedroom</Text>
          <Text style={styles.facility}>🛏️ 1 bed</Text>
          <Text style={styles.facility}>🚿 1 bath</Text>
          <Text style={styles.facility}>📶 Wifi</Text>
          <Text style={styles.facility}>🍴 Kitchen</Text>
          <Text style={styles.facility}>🏊 Pool</Text>
          <Text style={styles.facility}>🌳 Garden</Text>
        </View>

        {/* Nút Show All */}
        <TouchableOpacity
          style={styles.showAllButton}
          onPress={handleShowAllFacilities}>
          <Text style={styles.showAllButtonText}>Show all</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  imageBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  viewMap: {
    color: '#007BFF',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
  },
  facilitiesContainer: {
    padding: 16,
  },
  facilitiesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  facilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  facility: {
    fontSize: 14,
    color: '#555',
    marginRight: 16,
    marginBottom: 8,
  },
  showAllButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  showAllButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListingDetail;
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FacilitiesScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Facilities & services</Text>
      </View>

      {/* Danh mục Facilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <Text style={styles.facility}>2 Guests</Text>
        <Text style={styles.facility}>1 bedroom</Text>
        <Text style={styles.facility}>1 bed</Text>
        <Text style={styles.facility}>1 bath</Text>
        <Text style={styles.facility}>📶 Wifi</Text>
        <Text style={styles.facility}>🍴 Kitchen</Text>
        <Text style={styles.facility}>🏋️ Exercise equipment</Text>
        <Text style={styles.facility}>🏊 Pool</Text>
        <Text style={styles.facility}>🌳 Garden</Text>
      </View>

      {/* Danh mục Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>

        <Text style={styles.subTitle}>Cleaning & laundry</Text>
        <Text style={styles.facility}>🧺 Washer</Text>
        <Text style={styles.facility}>🧺 Free dryer - In unit</Text>
        <Text style={styles.facility}>🧼 Iron</Text>

        <Text style={styles.subTitle}>Bathroom</Text>
        <Text style={styles.facility}>🛁 Bathtub</Text>
        <Text style={styles.facility}>💨 Hair dryer</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 8,
  },
  facility: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});

export default FacilitiesScreen;
