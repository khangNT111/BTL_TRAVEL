import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListingDetail = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Listing Detail</Text>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://pos.nvncdn.com/86c7ad-50310/art/artCT/20230420_0moA6KAt.png',
          }}
          style={styles.image}
        />
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Balian Treehouse</Text>
        <Text style={styles.locationText}>Bali, Indonesia</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>⭐ 4.5/5</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reviews')}
            style={styles.reviewsButton}>
            <Text style={styles.reviewsText}>262 reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Facilities and Services */}
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

          {/* Show All Button */}
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigation.navigate('Facilities')}>
            <Text style={styles.showAllButtonText}>Show all</Text>
          </TouchableOpacity>

          {/* Book Button */}
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate('Description')}>
            {' '}
            {/* Điều hướng */}
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reviewsButton: {
    marginLeft: 16,
  },
  reviewsText: {
    fontSize: 14,
    color: '#007BFF',
  },
  facilitiesContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
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
    marginBottom: 10,
  },
  showAllButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ListingDetail;
