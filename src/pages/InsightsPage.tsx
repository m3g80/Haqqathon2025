/**
 * Insights Page - P&L Graphs and Analytics
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
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface InsightsPageProps {
  onBack: () => void;
}

const monthlyData = [
  { month: 'Jan', roundUps: 145.80, investments: 1234.50, sadaqah: 875.20, savings: 656.10 },
  { month: 'Feb', roundUps: 156.40, investments: 1456.80, sadaqah: 945.30, savings: 712.30 },
  { month: 'Mar', roundUps: 142.90, investments: 1678.20, sadaqah: 823.40, savings: 698.50 },
  { month: 'Apr', roundUps: 163.70, investments: 1823.90, sadaqah: 967.80, savings: 743.20 },
  { month: 'May', roundUps: 151.20, investments: 1945.60, sadaqah: 889.70, savings: 721.90 },
  { month: 'Jun', roundUps: 147.60, investments: 2087.30, sadaqah: 912.40, savings: 687.80 },
];

const investmentPerformance = [
  { month: 'Jan', value: 5240.30, profit: -45.20 },
  { month: 'Feb', value: 5687.80, profit: 102.50 },
  { month: 'Mar', value: 6123.40, profit: 235.60 },
  { month: 'Apr', value: 5945.20, profit: 56.80 },
  { month: 'May', value: 6456.90, profit: 311.70 },
  { month: 'Jun', value: 6789.20, profit: 332.30 },
];

const recentTransactions = [
  { type: 'Coffee', amount: 4.65, roundUp: 0.35, date: '2024-06-14' },
  { type: 'Groceries', amount: 67.82, roundUp: 2.18, date: '2024-06-13' },
  { type: 'Petrol', amount: 89.45, roundUp: 0.55, date: '2024-06-13' },
  { type: 'Restaurant', amount: 134.20, roundUp: 0.80, date: '2024-06-12' },
  { type: 'Shopping', amount: 456.78, roundUp: 3.22, date: '2024-06-11' },
  { type: 'Transport', amount: 12.30, roundUp: 2.70, date: '2024-06-11' },
  { type: 'Utilities', amount: 178.90, roundUp: 1.10, date: '2024-06-10' },
  { type: 'Subscription', amount: 9.99, roundUp: 0.01, date: '2024-06-10' },
];

function InsightsPage({onBack}: InsightsPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalRoundUps = monthlyData.reduce((sum, month) => sum + month.roundUps, 0);
  const totalInvested = monthlyData.reduce((sum, month) => sum + month.investments, 0);
  const totalProfit = investmentPerformance.reduce((sum, month) => sum + month.profit, 0);
  const currentValue = investmentPerformance[investmentPerformance.length - 1].value;

  const periods = ['1M', '3M', '6M', '1Y'];

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]));
  };

  const renderBarChart = (data: any[], valueKey: string, color: string, label: string) => {
    const maxValue = getMaxValue(data, valueKey);
    
    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          {label}
        </Text>
        <View style={styles.chartArea}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${(item[valueKey] / maxValue) * 100}%`,
                      backgroundColor: color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                {item.month}
              </Text>
              <Text style={[styles.barValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                £{item[valueKey].toFixed(0)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderLineChart = (data: any[], valueKey: string, color: string, label: string) => {
    const maxValue = getMaxValue(data, valueKey);
    const minValue = Math.min(...data.map(item => item[valueKey]));
    const range = maxValue - minValue;
    
    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          {label}
        </Text>
        <View style={styles.lineChartArea}>
          <View style={styles.lineChart}>
            {data.map((item, index) => {
              const heightPercent = range > 0 ? ((item[valueKey] - minValue) / range) * 100 : 50;
              
              return (
                <View key={index} style={styles.linePoint}>
                  <View
                    style={[
                      styles.point,
                      {
                        backgroundColor: color,
                        bottom: `${heightPercent}%`,
                      },
                    ]}
                  />
                  {index < data.length - 1 && (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor: color,
                          bottom: `${heightPercent}%`,
                        },
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.lineLabels}>
            {data.map((item, index) => (
              <View key={index} style={styles.lineLabelContainer}>
                <Text style={[styles.lineLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                  {item.month}
                </Text>
                <Text style={[styles.lineValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                  £{item[valueKey].toFixed(0)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Insights & Analytics
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Portfolio Overview</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>£{totalRoundUps.toFixed(2)}</Text>
                <Text style={styles.summaryLabel}>Total Round-ups</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, {color: totalProfit >= 0 ? '#34C759' : '#FF3B30'}]}>
                  £{totalProfit.toFixed(2)}
                </Text>
                <Text style={styles.summaryLabel}>Investment P&L</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>£{currentValue.toFixed(2)}</Text>
                <Text style={styles.summaryLabel}>Current Value</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.periodSelector}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Time Period
          </Text>
          <View style={styles.periodButtons}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  {
                    backgroundColor: selectedPeriod === period 
                      ? '#007AFF' 
                      : isDarkMode ? '#1c1c1e' : '#fff',
                    borderColor: '#007AFF',
                  },
                ]}
                onPress={() => setSelectedPeriod(period)}>
                <Text style={[
                  styles.periodButtonText,
                  {
                    color: selectedPeriod === period 
                      ? '#fff' 
                      : isDarkMode ? '#fff' : '#333'
                  }
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.chartsSection}>
          {renderBarChart(monthlyData, 'roundUps', '#007AFF', 'Monthly Round-up Income')}
          {renderLineChart(investmentPerformance, 'value', '#34C759', 'Investment Portfolio Value')}
          {renderBarChart(monthlyData, 'investments', '#AF52DE', 'Investment Contributions')}
          {renderBarChart(monthlyData, 'sadaqah', '#00A86B', 'Charity Contributions')}
        </View>

        <View style={styles.transactionsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Recent Round-ups
          </Text>
          {recentTransactions.map((transaction, index) => (
            <View
              key={index}
              style={[
                styles.transactionItem,
                {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
              ]}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionType, {color: isDarkMode ? '#fff' : '#333'}]}>
                    {transaction.type}
                  </Text>
                  <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                    {new Date(transaction.date).toLocaleDateString('en-GB')}
                  </Text>
                </View>
                <View style={styles.transactionAmounts}>
                  <Text style={[styles.transactionAmount, {color: isDarkMode ? '#888' : '#666'}]}>
                    £{transaction.amount.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.roundUpAmount, {color: '#34C759'}]}>
                  +£{transaction.roundUp.toFixed(2)}
                </Text>
                <Text style={[styles.roundUpLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                  round-up
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.metricsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Key Metrics
          </Text>
          <View style={styles.metricsGrid}>
            <View style={[styles.metricCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.metricValue, {color: '#007AFF'}]}>
                £{currentMonth.roundUps.toFixed(2)}
              </Text>
              <Text style={[styles.metricLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                This Month's Round-ups
              </Text>
            </View>
            <View style={[styles.metricCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.metricValue, {color: '#34C759'}]}>
                {recentTransactions.length}
              </Text>
              <Text style={[styles.metricLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Transactions This Week
              </Text>
            </View>
            <View style={[styles.metricCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.metricValue, {color: '#FF9500'}]}>
                £{(totalRoundUps / monthlyData.length).toFixed(2)}
              </Text>
              <Text style={[styles.metricLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Average Monthly Round-ups
              </Text>
            </View>
            <View style={[styles.metricCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.metricValue, {color: '#AF52DE'}]}>
                {((totalProfit / totalInvested) * 100).toFixed(1)}%
              </Text>
              <Text style={[styles.metricLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Investment Return
              </Text>
            </View>
          </View>
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
    marginBottom: 20,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  periodSelector: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartsSection: {
    marginBottom: 32,
  },
  chartContainer: {
    marginBottom: 32,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 200,
    paddingHorizontal: 8,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  lineChartArea: {
    height: 200,
  },
  lineChart: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
    position: 'relative',
  },
  linePoint: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
  line: {
    height: 2,
    position: 'absolute',
    width: '100%',
    right: '-50%',
  },
  lineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  lineLabelContainer: {
    alignItems: 'center',
    flex: 1,
  },
  lineLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  lineValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  transactionsSection: {
    marginBottom: 32,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmounts: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  roundUpAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  roundUpLabel: {
    fontSize: 11,
  },
  metricsSection: {
    marginBottom: 40,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 44) / 2,
    padding: 16,
    borderRadius: 12,
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
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default InsightsPage;