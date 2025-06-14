/**
 * Halal Investments Portfolio Page
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
} from 'react-native';

interface HalalInvestmentsProps {
  onBack: () => void;
}

const investmentCategories = [
  {
    id: 1,
    name: 'Islamic ETFs',
    description: 'Diversified Sharia-compliant exchange-traded funds',
    icon: '📊',
    color: '#007AFF',
    options: [
      {
        name: 'HLAL - Wahed FTSE USA Shariah ETF',
        symbol: 'HLAL',
        description: 'US large-cap Sharia-compliant stocks',
        expenseRatio: '0.50%',
        expectedReturn: '1.2%',
        allocation: 12,
      },
      {
        name: 'SPUS - SP Funds S&P 500 Sharia Industry Exclusions ETF',
        symbol: 'SPUS',
        description: 'S&P 500 with Islamic screening',
        expenseRatio: '0.49%',
        expectedReturn: '1.8%',
        allocation: 10,
      },
      {
        name: 'UMMA - Wahed Dow Jones Islamic World ETF',
        symbol: 'UMMA',
        description: 'Global Islamic equity exposure',
        expenseRatio: '0.65%',
        expectedReturn: '2.1%',
        allocation: 8,
      },
    ],
  },
  {
    id: 2,
    name: 'Halal Individual Stocks',
    description: 'Carefully screened Sharia-compliant companies',
    icon: '🏢',
    color: '#34C759',
    options: [
      {
        name: 'Saudi Aramco',
        symbol: '2222.SR',
        description: 'World\'s largest oil and gas company',
        sector: 'Energy',
        expectedReturn: '12.5%',
        allocation: 15,
      },
      {
        name: 'Al Rajhi Bank',
        symbol: '1120.SR',
        description: 'Leading Islamic bank in Saudi Arabia',
        sector: 'Islamic Banking',
        expectedReturn: '11.8%',
        allocation: 10,
      },
      {
        name: 'Dubai Islamic Bank',
        symbol: 'DIB.DU',
        description: 'Largest Islamic bank in UAE',
        sector: 'Islamic Banking',
        expectedReturn: '9.5%',
        allocation: 8,
      },
      {
        name: 'Petronas Gas Berhad',
        symbol: 'KLSE:PETGAS',
        description: 'Provides halal utility services',
        sector: 'Energy Infrastructure',
        expectedReturn: '8.2%',
        allocation: 7,
      },
    ],
  },
  {
    id: 3,
    name: 'Sukuk Bonds',
    description: 'Islamic bonds compliant with Sharia law',
    icon: '📜',
    color: '#FF9500',
    options: [
      {
        name: 'SPSK - SPDR Bloomberg Barclays Sukuk Bond ETF',
        symbol: 'SPSK',
        description: 'Diversified sukuk bond exposure',
        expenseRatio: '0.50%',
        expectedReturn: '3.2%',
        allocation: 8,
      },
      {
        name: 'UAE Government Sukuk',
        symbol: 'UAE-SUK',
        description: 'UAE sovereign sukuk bonds',
        expenseRatio: '0.25%',
        expectedReturn: '4.1%',
        allocation: 6,
      },
      {
        name: 'Malaysia Government Sukuk',
        symbol: 'MYS-SUK',
        description: 'Malaysian sovereign sukuk bonds',
        expenseRatio: '0.30%',
        expectedReturn: '3.8%',
        allocation: 4,
      },
    ],
  },
  {
    id: 4,
    name: 'Commodities',
    description: 'Precious metals and commodity investments',
    icon: '🥇',
    color: '#AF52DE',
    options: [
      {
        name: 'Gold ETF',
        symbol: 'GOLD',
        description: 'Physical gold-backed exchange traded fund',
        sector: 'Precious Metals',
        expectedReturn: '2.5%',
        allocation: 8,
      },
      {
        name: 'Silver ETF',
        symbol: 'SLVR',
        description: 'Physical silver-backed investment fund',
        sector: 'Precious Metals',
        expectedReturn: '2.8%',
        allocation: 4,
      },
      {
        name: 'Platinum ETF',
        symbol: 'PLAT',
        description: 'Platinum commodity investment fund',
        sector: 'Industrial Metals',
        expectedReturn: '3.1%',
        allocation: 0,
      },
    ],
  },
];

function HalalInvestments({onBack}: HalalInvestmentsProps) {
  const [selectedCategory, setSelectedCategory] = useState(investmentCategories[0]);
  const [allocations, setAllocations] = useState(() => {
    const initial: {[key: string]: number} = {};
    investmentCategories.forEach(category => {
      category.options.forEach(option => {
        initial[`${category.id}-${option.symbol}`] = option.allocation;
      });
    });
    return initial;
  });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const adjustAllocation = (categoryId: number, symbol: string, change: number) => {
    const key = `${categoryId}-${symbol}`;
    const newAllocations = {...allocations};
    const currentValue = newAllocations[key] || 0;
    const newValue = Math.max(0, currentValue + change);
    
    // Check if the new total would exceed 100%
    const currentTotal = getTotalAllocation();
    const difference = newValue - currentValue;
    
    if (currentTotal + difference <= 100) {
      newAllocations[key] = newValue;
      setAllocations(newAllocations);
    }
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const getCategoryTotal = (categoryId: number) => {
    return Object.entries(allocations)
      .filter(([key]) => key.startsWith(`${categoryId}-`))
      .reduce((sum, [, value]) => sum + value, 0);
  };

  const saveAllocations = () => {
    Alert.alert(
      'Investments Updated',
      'Your halal investment allocations have been saved!',
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
          Halal Investments
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Investment Allocation Summary</Text>
            <Text style={styles.summarySubtitle}>
              35% of your round-ups go to halal investments
            </Text>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Allocated:</Text>
              <Text style={[
                styles.totalValue,
                {color: getTotalAllocation() <= 100 ? '#34C759' : '#FF3B30'}
              ]}>
                {getTotalAllocation()}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Investment Categories
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}>
            {investmentCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  {
                    backgroundColor: selectedCategory.id === category.id 
                      ? category.color 
                      : isDarkMode ? '#1c1c1e' : '#fff',
                    borderColor: category.color,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryTabName,
                  {
                    color: selectedCategory.id === category.id 
                      ? '#fff' 
                      : isDarkMode ? '#fff' : '#333'
                  }
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.categoryTabTotal,
                  {
                    color: selectedCategory.id === category.id 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : isDarkMode ? '#888' : '#666'
                  }
                ]}>
                  {getCategoryTotal(category.id)}%
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.optionsSection}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIconLarge, {backgroundColor: selectedCategory.color}]}>
              <Text style={styles.categoryIconLargeText}>{selectedCategory.icon}</Text>
            </View>
            <View style={styles.categoryHeaderInfo}>
              <Text style={[styles.categoryHeaderName, {color: isDarkMode ? '#fff' : '#333'}]}>
                {selectedCategory.name}
              </Text>
              <Text style={[styles.categoryHeaderDesc, {color: isDarkMode ? '#888' : '#666'}]}>
                {selectedCategory.description}
              </Text>
            </View>
          </View>

          {selectedCategory.options.map((option) => {
            const allocationKey = `${selectedCategory.id}-${option.symbol}`;
            const currentAllocation = allocations[allocationKey] || 0;
            
            return (
              <View
                key={option.symbol}
                style={[
                  styles.optionCard,
                  {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
                ]}>
                <View style={styles.optionHeader}>
                  <View style={styles.optionInfo}>
                    <Text style={[styles.optionName, {color: isDarkMode ? '#fff' : '#333'}]}>
                      {option.name}
                    </Text>
                    <Text style={[styles.optionSymbol, {color: selectedCategory.color}]}>
                      {option.symbol}
                    </Text>
                    <Text style={[styles.optionDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                      {option.description}
                    </Text>
                  </View>
                  <View style={styles.optionStats}>
                    <Text style={[styles.allocationValue, {color: selectedCategory.color}]}>
                      {currentAllocation}%
                    </Text>
                  </View>
                </View>

                <View style={styles.optionDetails}>
                  {'expenseRatio' in option && (
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Expense Ratio:
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.expenseRatio}
                      </Text>
                    </View>
                  )}
                  {'sector' in option && (
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Sector:
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.sector}
                      </Text>
                    </View>
                  )}
                  <View style={styles.detailItem}>
                    <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                      Expected Return:
                    </Text>
                    <Text style={[styles.detailValue, {color: '#34C759'}]}>
                      {option.expectedReturn}
                    </Text>
                  </View>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(currentAllocation, 100)}%`,
                        backgroundColor: selectedCategory.color,
                      },
                    ]}
                  />
                </View>

                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, option.symbol, -5)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>-5%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, option.symbol, -1)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>-1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, option.symbol, 1)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>+1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, option.symbol, 5)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>+5%</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.saveSection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: '#007AFF'}]}
            onPress={saveAllocations}>
            <Text style={styles.saveButtonText}>Save Investment Allocations</Text>
          </TouchableOpacity>
          
          <Text style={[styles.disclaimerText, {color: isDarkMode ? '#888' : '#666'}]}>
            All investments are Sharia-compliant and regularly screened for Islamic principles.
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
  summaryCard: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summarySubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  totalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  totalLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoriesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryTab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTabName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryTabTotal: {
    fontSize: 12,
    fontWeight: '500',
  },
  optionsSection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIconLargeText: {
    fontSize: 24,
  },
  categoryHeaderInfo: {
    flex: 1,
  },
  categoryHeaderName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryHeaderDesc: {
    fontSize: 16,
    lineHeight: 22,
  },
  optionCard: {
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
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  optionStats: {
    alignItems: 'center',
  },
  allocationValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default HalalInvestments;