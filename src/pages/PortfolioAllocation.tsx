/**
 * Portfolio Allocation Page - Round-up Spare Change System
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import HalalInvestments from './HalalInvestments';
import SadaqahProjects from './SadaqahProjects';
import Savings from './Savings';

const {width} = Dimensions.get('window');

interface PortfolioAllocationProps {
  onBack: () => void;
}

const categories = [
  {
    id: 1,
    name: 'Sadaqah Projects',
    description: 'Support humanitarian causes worldwide',
    icon: '🤲',
    color: '#00A86B',
    examples: ['Masjid in Somalia', 'Medical Aid Gaza', 'Orphan Education'],
  },
  {
    id: 2,
    name: 'Halal Investments',
    description: 'Sharia-compliant stocks and funds',
    icon: '📈',
    color: '#007AFF',
    examples: ['Islamic ETFs', 'Halal Stocks', 'Sukuk Bonds', 'Gold & Commodities'],
  },
  {
    id: 3,
    name: 'Bank Savings',
    description: 'Secure savings in your bank account',
    icon: '🏦',
    color: '#34C759',
    examples: ['Connected bank account', 'Instant access', 'FSCS protected'],
  },
];

function PortfolioAllocation({onBack}: PortfolioAllocationProps) {
  const [allocations, setAllocations] = useState<{[key: number]: number}>({
    1: 40, // Sadaqah Projects
    2: 35, // Halal Investments
    3: 25, // Emergency Fund
  });
  const [showSadaqah, setShowSadaqah] = useState(false);
  const [showInvestments, setShowInvestments] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [roundingSettings, setRoundingSettings] = useState({
    under100: 1,    // Round to nearest £1
    over100: 5,     // Round to nearest £5
    over500: 10,    // Round to nearest £10
    over1000: 20,   // Round to nearest £20
  });
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  if (showSadaqah) {
    return <SadaqahProjects onBack={() => setShowSadaqah(false)} />;
  }

  if (showInvestments) {
    return <HalalInvestments onBack={() => setShowInvestments(false)} />;
  }

  if (showSavings) {
    return <Savings onBack={() => setShowSavings(false)} />;
  }

  const adjustAllocation = (categoryId: number, change: number) => {
    const newAllocations = {...allocations};
    const currentValue = newAllocations[categoryId];
    const newValue = Math.max(0, Math.min(100, currentValue + change));
    
    // Calculate the difference to redistribute
    const difference = newValue - currentValue;
    
    // If we're increasing this category, decrease others proportionally
    if (difference > 0) {
      const otherCategories = Object.keys(newAllocations)
        .map(Number)
        .filter(id => id !== categoryId);
      
      let totalOther = otherCategories.reduce((sum, id) => sum + newAllocations[id], 0);
      
      if (totalOther >= difference) {
        let remainingToReduce = difference;
        
        otherCategories.forEach(id => {
          if (remainingToReduce > 0) {
            const reduction = Math.min(
              newAllocations[id],
              Math.floor((newAllocations[id] / totalOther) * difference)
            );
            newAllocations[id] -= reduction;
            remainingToReduce -= reduction;
          }
        });
        
        // Handle any remaining due to rounding
        while (remainingToReduce > 0 && otherCategories.some(id => newAllocations[id] > 0)) {
          for (const id of otherCategories) {
            if (remainingToReduce > 0 && newAllocations[id] > 0) {
              newAllocations[id] -= 1;
              remainingToReduce -= 1;
            }
          }
        }
        
        newAllocations[categoryId] = newValue;
      }
    } else {
      // If we're decreasing this category, distribute to others proportionally
      const otherCategories = Object.keys(newAllocations)
        .map(Number)
        .filter(id => id !== categoryId);
      
      const redistributeAmount = Math.abs(difference);
      let remaining = redistributeAmount;
      
      otherCategories.forEach((id, index) => {
        if (index === otherCategories.length - 1) {
          // Give remaining to last category to ensure 100% total
          newAllocations[id] += remaining;
        } else {
          const addition = Math.floor(redistributeAmount / otherCategories.length);
          newAllocations[id] += addition;
          remaining -= addition;
        }
      });
      
      newAllocations[categoryId] = newValue;
    }
    
    setAllocations(newAllocations);
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const saveAllocations = () => {
    const total = getTotalAllocation();
    if (Math.abs(total - 100) > 1) {
      Alert.alert('Invalid Allocation', 'Total allocation must equal 100%');
      return;
    }
    
    Alert.alert(
      'Portfolio Updated',
      'Your round-up allocation has been saved successfully!',
      [{text: 'Done', onPress: onBack}]
    );
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Portfolio Allocation
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.roundUpCard}>
            <View style={styles.roundUpHeader}>
              <View style={styles.roundUpIcon}>
                <Text style={styles.roundUpIconText}>🔄</Text>
              </View>
              <View style={styles.roundUpInfo}>
                <Text style={styles.roundUpTitle}>Round-Up System</Text>
                <Text style={styles.roundUpSubtitle}>
                  Active
                </Text>
              </View>
            </View>
            
            <Text style={styles.roundUpDescription}>
              Every purchase is rounded up to the nearest dollar, and the spare change is automatically allocated according to your portfolio below.
            </Text>
            
            <View style={styles.exampleSection}>
              <Text style={styles.exampleTitle}>Example:</Text>
              <Text style={styles.exampleText}>
                Coffee: £4.65 → Round up £0.35 → Allocated to your portfolio
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            This Month's Impact
          </Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.statValue, {color: '#00A86B'}]}>£47.82</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Total Round-ups
              </Text>
            </View>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.statValue, {color: '#007AFF'}]}>156</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Transactions
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.allocationSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Customize Your Portfolio
          </Text>
          <Text style={[styles.sectionSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
            Adjust how your round-up spare change is allocated
          </Text>

          {categories.map((category) => (
            <View
              key={category.id}
              style={[
                styles.categoryCard,
                {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
              ]}>
              <TouchableOpacity 
                style={styles.categoryHeader}
                onPress={() => {
                  if (category.id === 1) setShowSadaqah(true);
                  else if (category.id === 2) setShowInvestments(true);
                  else if (category.id === 3) setShowSavings(true);
                }}>
                <View style={[styles.categoryIcon, {backgroundColor: category.color}]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, {color: isDarkMode ? '#fff' : '#333'}]}>
                    {category.name} →
                  </Text>
                  <Text style={[styles.categoryDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                    {category.description}
                  </Text>
                </View>
                <View style={styles.allocationControls}>
                  <Text style={[styles.allocationValue, {color: category.color}]}>
                    {allocations[category.id]}%
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${allocations[category.id]}%`,
                      backgroundColor: category.color,
                    },
                  ]}
                />
              </View>

              <View style={styles.controlsRow}>
                <TouchableOpacity
                  style={[styles.controlButton, {borderColor: category.color}]}
                  onPress={() => adjustAllocation(category.id, -5)}>
                  <Text style={[styles.controlButtonText, {color: category.color}]}>-5%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlButton, {borderColor: category.color}]}
                  onPress={() => adjustAllocation(category.id, -1)}>
                  <Text style={[styles.controlButtonText, {color: category.color}]}>-1%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlButton, {borderColor: category.color}]}
                  onPress={() => adjustAllocation(category.id, 1)}>
                  <Text style={[styles.controlButtonText, {color: category.color}]}>+1%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.controlButton, {borderColor: category.color}]}
                  onPress={() => adjustAllocation(category.id, 5)}>
                  <Text style={[styles.controlButtonText, {color: category.color}]}>+5%</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.examplesSection}>
                <Text style={[styles.examplesTitle, {color: isDarkMode ? '#888' : '#666'}]}>
                  Examples:
                </Text>
                <Text style={[styles.examplesText, {color: isDarkMode ? '#888' : '#666'}]}>
                  {category.examples.join(' • ')}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.roundingSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Round-Up Settings
          </Text>
          <Text style={[styles.sectionSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
            Adjust how much your purchases are rounded up (in GBP)
          </Text>

          <View style={[styles.roundingCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
            <View style={styles.roundingItem}>
              <View style={styles.roundingHeader}>
                <Text style={[styles.roundingLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Under £100
                </Text>
                <Text style={[styles.roundingValue, {color: '#007AFF'}]}>
                  £{roundingSettings.under100}
                </Text>
              </View>
              <Text style={[styles.roundingDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                Coffee: £4.65 → Round up £{(roundingSettings.under100 - 0.65).toFixed(2)}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      {width: `${(roundingSettings.under100 / 5) * 100}%`, backgroundColor: '#007AFF'}
                    ]}
                  />
                </View>
                <View style={styles.sliderButtons}>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#007AFF'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, under100: Math.max(1, prev.under100 - 1)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#007AFF'}]}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#007AFF'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, under100: Math.min(5, prev.under100 + 1)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#007AFF'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.roundingItem}>
              <View style={styles.roundingHeader}>
                <Text style={[styles.roundingLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
                  £100 - £500
                </Text>
                <Text style={[styles.roundingValue, {color: '#34C759'}]}>
                  £{roundingSettings.over100}
                </Text>
              </View>
              <Text style={[styles.roundingDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                Shopping: £150.30 → Round up £{(roundingSettings.over100 - 0.30).toFixed(2)}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      {width: `${(roundingSettings.over100 / 10) * 100}%`, backgroundColor: '#34C759'}
                    ]}
                  />
                </View>
                <View style={styles.sliderButtons}>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#34C759'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over100: Math.max(5, prev.over100 - 5)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#34C759'}]}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#34C759'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over100: Math.min(20, prev.over100 + 5)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#34C759'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.roundingItem}>
              <View style={styles.roundingHeader}>
                <Text style={[styles.roundingLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
                  £500 - £1000
                </Text>
                <Text style={[styles.roundingValue, {color: '#FF9500'}]}>
                  £{roundingSettings.over500}
                </Text>
              </View>
              <Text style={[styles.roundingDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                Electronics: £750.85 → Round up £{(roundingSettings.over500 - 0.85).toFixed(2)}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      {width: `${(roundingSettings.over500 / 20) * 100}%`, backgroundColor: '#FF9500'}
                    ]}
                  />
                </View>
                <View style={styles.sliderButtons}>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#FF9500'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over500: Math.max(10, prev.over500 - 10)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#FF9500'}]}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#FF9500'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over500: Math.min(50, prev.over500 + 10)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#FF9500'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.roundingItem}>
              <View style={styles.roundingHeader}>
                <Text style={[styles.roundingLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Over £1000
                </Text>
                <Text style={[styles.roundingValue, {color: '#AF52DE'}]}>
                  £{roundingSettings.over1000}
                </Text>
              </View>
              <Text style={[styles.roundingDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                Holiday: £1,250.45 → Round up £{(roundingSettings.over1000 - 0.45).toFixed(2)}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View 
                    style={[
                      styles.sliderFill, 
                      {width: `${(roundingSettings.over1000 / 50) * 100}%`, backgroundColor: '#AF52DE'}
                    ]}
                  />
                </View>
                <View style={styles.sliderButtons}>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#AF52DE'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over1000: Math.max(20, prev.over1000 - 20)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#AF52DE'}]}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.sliderButton, {borderColor: '#AF52DE'}]}
                    onPress={() => setRoundingSettings(prev => ({...prev, over1000: Math.min(100, prev.over1000 + 20)}))}>
                    <Text style={[styles.sliderButtonText, {color: '#AF52DE'}]}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.saveSection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
          <View style={styles.totalAllocation}>
            <Text style={[styles.totalLabel, {color: isDarkMode ? '#888' : '#666'}]}>
              Total Allocation:
            </Text>
            <Text style={[
              styles.totalValue,
              {color: getTotalAllocation() === 100 ? '#34C759' : '#FF3B30'}
            ]}>
              {getTotalAllocation()}%
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor: getTotalAllocation() === 100 ? '#007AFF' : '#8E8E93',
              },
            ]}
            onPress={saveAllocations}
            disabled={getTotalAllocation() !== 100}>
            <Text style={styles.saveButtonText}>Save Portfolio Allocation</Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimerText, {color: isDarkMode ? '#888' : '#666'}]}>
            Changes take effect immediately. Your round-ups will be allocated according to these percentages.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  heroSection: {
    paddingVertical: 24,
  },
  roundUpCard: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  roundUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  roundUpIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roundUpIconText: {
    fontSize: 20,
  },
  roundUpInfo: {
    flex: 1,
  },
  roundUpTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roundUpSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  roundUpDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  exampleSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  exampleTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  exampleText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  allocationSection: {
    marginBottom: 32,
  },
  roundingSection: {
    marginBottom: 32,
  },
  roundingCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roundingItem: {
    marginBottom: 24,
  },
  roundingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  roundingLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  roundingValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundingDescription: {
    fontSize: 14,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sliderContainer: {
    gap: 12,
  },
  sliderTrack: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  allocationControls: {
    alignItems: 'center',
  },
  allocationValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  examplesSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  examplesTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  examplesText: {
    fontSize: 12,
    lineHeight: 16,
  },
  saveSection: {
    marginBottom: 40,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: -16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  totalAllocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  saveButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PortfolioAllocation;