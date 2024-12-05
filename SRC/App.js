import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";

// Import các component
import SignupScreen from "./components/SignupScreen";
import ListingsScreen from "./components/ListingsScreen";
import SearchScreen from "./components/SearchScreen";
import CalendarScreen from "./components/SearchDate";
import GuestSelectionScreen from "./components/Chooseday";
import HomeScreen from "./components/HomeScreen";
import FilterModal from "./components/FilterModal";
import AdvancedFilterScreen from "./components/AdvancedFilter";
import ListingDetail from "./components/ListingDetail";
import FacilitiesScreen from "./components/FacilitiesScreen";
import ReviewsScreen from "./components/ReviewScreen";
import AllReviewsScreen from "./components/ALLReviewScreennn";
import Description from "./components/Description";
import DescriptionScreen from "./components/DescriptionScreen";
import ConfirmAndPayScreen from "./components/ConfirmAndPayScreen";
import PaymentSuccessScreen from "./components/PaymentSuccessScreen"; 
import PlacesLikedScreen from "./components/PlacesLikedScreen"; 

const Stack = createStackNavigator();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("signup");
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });

  const handleNavigate = (screen) => setCurrentScreen(screen);
  const handleContinue = (guestData) => {
    setGuests(guestData);
    setCurrentScreen("home");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Màn hình chính */}
        {currentScreen === "signup" && (
          <Stack.Screen
            name="Signup"
            children={() => (
              <SignupScreen onContinueClick={() => handleNavigate("listings")} />
            )}
          />
        )}
        {currentScreen === "listings" && (
          <Stack.Screen
            name="Listings"
            children={() => (
              <ListingsScreen
                onBackClick={() => handleNavigate("signup")}
                onSearchClick={() => handleNavigate("search")}
                onFilterClick={() => handleNavigate("AdvancedFilter")}
              />
            )}
          />
        )}
        {currentScreen === "search" && (
          <Stack.Screen
            name="Search"
            children={() => (
              <SearchScreen
                onClose={() => handleNavigate("listings")}
                onSearchClick={() => handleNavigate("searchDate")}
              />
            )}
          />
        )}
        {currentScreen === "searchDate" && (
          <Stack.Screen
            name="SearchDate"
            children={() => (
              <CalendarScreen onNext={() => handleNavigate("guestSelection")} />
            )}
          />
        )}
        {currentScreen === "guestSelection" && (
          <Stack.Screen
            name="GuestSelection"
            children={() => (
              <GuestSelectionScreen onContinue={handleContinue} />
            )}
          />
        )}
        {currentScreen === "home" && (
          <Stack.Screen
            name="Home"
            children={() => <HomeScreen guests={guests} />}
          />
        )}

        {/* Các màn hình chi tiết và khác */}
        <Stack.Screen name="ListingDetail" component={ListingDetail} />
        <Stack.Screen name="Facilities" component={FacilitiesScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="AllReviews" component={AllReviewsScreen} />
        <Stack.Screen name="FilterModal" component={FilterModal} />
        <Stack.Screen name="AdvancedFilter" component={AdvancedFilterScreen} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
        <Stack.Screen name="ConfirmAndPayScreen" component={ConfirmAndPayScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="PlacesLikedScreen" component={PlacesLikedScreen} />

         {/* Đăng ký PaymentSuccessScreen */}
      </Stack.Navigator>

      {/* Footer navigation */}
      {currentScreen !== "signup" && (
        <BottomNavigation
          value={currentScreen}
          onChange={(event, newValue) => handleNavigate(newValue)}
        >
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            onClick={() => handleNavigate("search")}
          />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Bookings" icon={<EventAvailableIcon />} />
          <BottomNavigationAction label="Inbox" icon={<InboxIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      )}
    </NavigationContainer>
  );
}
