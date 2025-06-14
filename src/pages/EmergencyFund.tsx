/**
 * Emergency Fund Portfolio Page
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

interface EmergencyFundProps {
  onBack: () => void;
}

const savingsOptions = [
  {
    id: 1,
    name: 'Sharia-Compliant Savings Account',
    provider: 'Islamic Bank of America',
    description: 'FDIC insured savings with Sharia-compliant structure',
    profitSharing: '0.00%',
    minBalance: '£0',
    type: 'Savings Account',
    riskLevel: 'Very Low',
    liquidity: 'Immediate',
    allocation: 40,
    color: '#34C759',
  },
  {
    id: 2,
    name: 'Money Market Account',
    provider: 'Sharia Financial Services',
    description: 'Sharia-compliant savings with easy access to funds',
    profitSharing: '0.00%',
    minBalance: '£1,000',
    type: 'Money Market',
    riskLevel: 'Low',
    liquidity: 'Same Day',
    allocation: 30,
    color: '#007AFF',
  },
  {
    id: 3,
    name: 'Islamic Investment Certificates',
    provider: 'Islamic Investment Bank',
    description: '6-month halal certificates with Sharia-compliant structure',
    profitSharing: '0.00%',
    minBalance: '£500',
    type: 'Certificate',
    riskLevel: 'Very Low',
    liquidity: '6 Months',
    allocation: 20,
    color: '#FF9500',
  },
  {
    id: 4,
    name: 'Government Savings Bonds',
    provider: 'US Treasury',
    description: 'Short-term government savings bonds (3-month)',
    profitSharing: '0.00%',
    minBalance: '£100',
    type: 'Government Security',
    riskLevel: 'Minimal',
    liquidity: '3 Months',
    allocation: 10,
    color: '#AF52DE',
  },
];

const emergencyGoals = [
  {
    timeframe: '3 months',
    description: 'Basic emergency coverage',
    amount: 15000,
    progress: 68,
  },
  {
    timeframe: '6 months',
    description: 'Recommended emergency fund',
    amount: 30000,
    progress: 45,
  },
  {
    timeframe: '12 months',
    description: 'Extended security fund',
    amount: 60000,
    progress: 23,
  },
];

function EmergencyFund({onBack}: EmergencyFundProps) {
  const [allocations, setAllocations] = useState(() => {
    const initial: {[key: number]: number} = {};
    savingsOptions.forEach(option => {
      initial[option.id] = option.allocation;
    });
    return initial;
  });

  const [selectedGoal, setSelectedGoal] = useState(emergencyGoals[1]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const adjustAllocation = (optionId: number, change: number) => {
    const newAllocations = {...allocations};
    const currentValue = newAllocations[optionId] || 0;
    const newValue = Math.max(0, Math.min(100, currentValue + change));
    newAllocations[optionId] = newValue;
    setAllocations(newAllocations);
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, value) => sum + value, 0);
  };

  const getCurrentFundAmount = () => {
    return Math.round(selectedGoal.amount * (selectedGoal.progress / 100));
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Minimal':
        return '#34C759';
      case 'Very Low':
        return '#34C759';
      case 'Low':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  };

  const saveAllocations = () => {
    Alert.alert(
      'Emergency Fund Updated',
      'Your emergency fund allocations have been saved!',
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
          Emergency Fund
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Financial Safety Net</Text>
            <Text style={styles.summarySubtitle}>
              25% of your round-ups build emergency savings
            </Text>
            <View style={styles.currentFundSection}>
              <Text style={styles.currentFundLabel}>Current Emergency Fund</Text>
              <Text style={styles.currentFundAmount}>
                £{getCurrentFundAmount().toLocaleString()}
              </Text>
              <Text style={styles.currentFundProgress}>
                {selectedGoal.progress}% of {selectedGoal.timeframe} goal
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Emergency Fund Goals
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.goalsScroll}>
            {emergencyGoals.map((goal, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.goalCard,
                  {
                    backgroundColor: selectedGoal.timeframe === goal.timeframe 
                      ? '#34C759' 
                      : isDarkMode ? '#1c1c1e' : '#fff',
                    borderColor: '#34C759',
                  },
                ]}
                onPress={() => setSelectedGoal(goal)}>
                <Text style={[
                  styles.goalTimeframe,
                  {
                    color: selectedGoal.timeframe === goal.timeframe 
                      ? '#fff' 
                      : isDarkMode ? '#fff' : '#333'
                  }
                ]}>
                  {goal.timeframe}
                </Text>
                <Text style={[
                  styles.goalAmount,
                  {
                    color: selectedGoal.timeframe === goal.timeframe 
                      ? '#fff' 
                      : '#34C759'
                  }
                ]}>
                  £{goal.amount.toLocaleString()}
                </Text>
                <Text style={[
                  styles.goalDescription,
                  {
                    color: selectedGoal.timeframe === goal.timeframe 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : isDarkMode ? '#888' : '#666'
                  }
                ]}>
                  {goal.description}
                </Text>
                <View style={styles.goalProgressBar}>
                  <View
                    style={[
                      styles.goalProgressFill,
                      {
                        width: `${goal.progress}%`,
                        backgroundColor: selectedGoal.timeframe === goal.timeframe 
                          ? 'rgba(255, 255, 255, 0.8)' 
                          : '#34C759',
                      },
                    ]}
                  />
                </View>
                <Text style={[
                  styles.goalProgressText,
                  {
                    color: selectedGoal.timeframe === goal.timeframe 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : isDarkMode ? '#888' : '#666'
                  }
                ]}>
                  {goal.progress}% complete
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Savings Allocation
          </Text>
          <Text style={[styles.sectionSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
            Choose how to distribute your emergency fund across different savings options
          </Text>

          {savingsOptions.map((option) => {
            const currentAllocation = allocations[option.id] || 0;
            
            return (
              <View
                key={option.id}
                style={[
                  styles.optionCard,
                  {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
                ]}>
                <View style={styles.optionHeader}>
                  <View style={styles.optionInfo}>
                    <View style={styles.optionTitleRow}>
                      <Text style={[styles.optionName, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.name}
                      </Text>
                      <View style={[styles.riskBadge, {backgroundColor: getRiskColor(option.riskLevel)}]}>
                        <Text style={styles.riskText}>{option.riskLevel}</Text>
                      </View>
                    </View>
                    <Text style={[styles.optionProvider, {color: option.color}]}>
                      {option.provider}
                    </Text>
                    <Text style={[styles.optionDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                      {option.description}
                    </Text>
                  </View>
                  <View style={styles.optionStats}>
                    <Text style={[styles.allocationValue, {color: option.color}]}>
                      {currentAllocation}%
                    </Text>
                  </View>
                </View>

                <View style={styles.optionDetails}>
                  <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Profit Sharing
                      </Text>
                      <Text style={[styles.detailValue, {color: '#34C759'}]}>
                        {option.profitSharing}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Min Balance
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.minBalance}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Liquidity
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.liquidity}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Type
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {option.type}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(currentAllocation, 100)}%`,
                        backgroundColor: option.color,
                      },
                    ]}
                  />
                </View>

                <View style={styles.controlsRow}>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: option.color}]}
                    onPress={() => adjustAllocation(option.id, -5)}>
                    <Text style={[styles.controlButtonText, {color: option.color}]}>-5%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: option.color}]}
                    onPress={() => adjustAllocation(option.id, -1)}>
                    <Text style={[styles.controlButtonText, {color: option.color}]}>-1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: option.color}]}
                    onPress={() => adjustAllocation(option.id, 1)}>
                    <Text style={[styles.controlButtonText, {color: option.color}]}>+1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: option.color}]}
                    onPress={() => adjustAllocation(option.id, 5)}>
                    <Text style={[styles.controlButtonText, {color: option.color}]}>+5%</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.saveSection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
          <View style={styles.totalAllocation}>
            <Text style={[styles.totalLabel, {color: isDarkMode ? '#888' : '#666'}]}>
              Total Emergency Fund Allocation:
            </Text>
            <Text style={[
              styles.totalValue,
              {color: getTotalAllocation() <= 100 ? '#34C759' : '#FF3B30'}
            ]}>
              {getTotalAllocation()}%
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: '#34C759'}]}
            onPress={saveAllocations}>
            <Text style={styles.saveButtonText}>Save Emergency Fund Settings</Text>
          </TouchableOpacity>
          
          <Text style={[styles.disclaimerText, {color: isDarkMode ? '#888' : '#666'}]}>
            All savings options are Sharia-compliant and FDIC insured where applicable.
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
    backgroundColor: '#34C759',
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
  currentFundSection: {
    alignItems: 'center',
  },
  currentFundLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  currentFundAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currentFundProgress: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  goalsSection: {
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
  goalsScroll: {
    flexDirection: 'row',
  },
  goalCard: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 2,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalTimeframe: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  goalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  goalDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  goalProgressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    marginBottom: 8,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  goalProgressText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  optionsSection: {
    marginBottom: 32,
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
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  optionProvider: {
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
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
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
  totalAllocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 20,
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

export default EmergencyFund;