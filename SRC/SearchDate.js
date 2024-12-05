import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const CalendarScreen = ({ onNext }) => {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDays, setSelectedDays] = useState([]);
  const [location, setLocation] = useState('Anywhere');
  const [selectedOption, setSelectedOption] = useState('Choose dates');
  const [daysCount, setDaysCount] = useState(1);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (direction) => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prevYear) => prevYear + 1);
      } else {
        setCurrentMonth((prevMonth) => prevMonth + 1);
      }
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prevYear) => prevYear - 1);
      } else {
        setCurrentMonth((prevMonth) => prevMonth - 1);
      }
    }
  };

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const increaseDays = () => {
    setDaysCount((prev) => prev + 1);
  };

  const decreaseDays = () => {
    if (daysCount > 1) {
      setDaysCount((prev) => prev - 1);
    }
  };

  const days = Array.from(
    { length: getDaysInMonth(currentMonth, currentYear) },
    (_, i) => i + 1
  );

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>When staying</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Choose dates' && styles.activeOption,
              ]}
              onPress={() => setSelectedOption('Choose dates')}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Choose dates' && styles.activeText,
                ]}>
                Choose dates
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedOption === 'Anytime' && styles.activeOption,
              ]}
              onPress={() => setSelectedOption('Anytime')}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === 'Anytime' && styles.activeText,
                ]}>
                Anytime
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {}
      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={() => changeMonth('prev')}>
          <Text style={styles.navText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={() => changeMonth('next')}>
          <Text style={styles.navText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      {}
      <View style={styles.daysCounter}>
        <TouchableOpacity style={styles.counterButton} onPress={decreaseDays}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.daysText}>
          {daysCount} {daysCount === 1 ? 'day' : 'days'}
        </Text>
        <TouchableOpacity style={styles.counterButton} onPress={increaseDays}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      {}
      <FlatList
        data={days}
        keyExtractor={(item) => item.toString()}
        numColumns={7}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes(item) && styles.selectedDay,
            ]}
            onPress={() => toggleDaySelection(item)}>
            <Text
              style={[
                styles.dayText,
                selectedDays.includes(item) && styles.selectedDayText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: { fontSize: 16, fontWeight: 'bold' },
  value: { fontSize: 16, color: '#555' },
  options: { flexDirection: 'row' },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  activeOption: { backgroundColor: '#007bff' },
  optionText: { fontSize: 14 },
  activeText: { color: '#fff' },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navText: { fontSize: 18, fontWeight: 'bold' },
  monthText: { fontSize: 18, fontWeight: 'bold' },
  daysCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  counterText: { fontSize: 18, fontWeight: 'bold' },
  daysText: { fontSize: 16, marginHorizontal: 10 },
  dayButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  selectedDay: { backgroundColor: '#007bff' },
  dayText: { fontSize: 14 },
  selectedDayText: { color: '#fff' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skipButton: {
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    alignSelf: 'flex-start', 
  },
  skipText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold', 
  },
  nextButton: {
    paddingVertical: 12, 
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8, 
    alignSelf: 'flex-end', 
  },
  nextText: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  searchButton: {
    marginTop: 30, 
    paddingVertical: 15, 
    paddingHorizontal: 30,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold', 
    textAlign: 'center',
  },
});

export default CalendarScreen;
