/**
 * Investments Page - Portfolio Management
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface InvestmentItem {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  shares: number;
  currentPrice: number;
  change: number;
  changePercent: number;
  icon: string;
}

interface InvestmentsPageProps {
  onBack: () => void;
}

const portfolioData: InvestmentItem[] = [
  {
    id: '1',
    name: 'Wahed FTSE USA Shariah ETF',
    symbol: 'HLAL',
    amount: 2850.75,
    shares: 15.2,
    currentPrice: 187.44,
    change: 12.45,
    changePercent: 0.71,
    icon: '📊',
  },
  {
    id: '2',
    name: 'SP Funds S&P 500 Sharia ETF',
    symbol: 'SPUS',
    amount: 1924.30,
    shares: 5.8,
    currentPrice: 331.79,
    change: -8.21,
    changePercent: -2.42,
    icon: '📈',
  },
  {
    id: '3',
    name: 'Wahed Dow Jones Islamic World ETF',
    symbol: 'UMMA',
    amount: 1687.92,
    shares: 8.3,
    currentPrice: 203.25,
    change: 15.67,
    changePercent: 8.35,
    icon: '🌍',
  },
  {
    id: '4',
    name: 'iShares MSCI KLD 400 Social ETF',
    symbol: 'DSI',
    amount: 1432.88,
    shares: 3.2,
    currentPrice: 447.77,
    change: 23.12,
    changePercent: 5.44,
    icon: '🌱',
  },
  {
    id: '5',
    name: 'SPDR Bloomberg Sukuk Bond ETF',
    symbol: 'SPSK',
    amount: 430.32,
    shares: 2.8,
    currentPrice: 153.69,
    change: -4.33,
    changePercent: -2.74,
    icon: '📜',
  },
];

function InvestmentsPage({onBack}: InvestmentsPageProps) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const totalValue = portfolioData.reduce((sum, item) => sum + item.amount, 0);
  const totalChange = portfolioData.reduce((sum, item) => sum + item.change * item.shares, 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={[styles.backButtonText, {color: isDarkMode ? '#007AFF' : '#007AFF'}]}>
              ← Back
            </Text>
          </TouchableOpacity>
          <Text style={[styles.pageTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Your Investments
          </Text>
        </View>

        <View style={styles.portfolioSummary}>
          <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
          <Text style={styles.summaryAmount}>£{totalValue.toLocaleString('en-GB', {minimumFractionDigits: 2})}</Text>
          <View style={styles.summaryChange}>
            <Text style={[
              styles.changeAmount, 
              {color: totalChange >= 0 ? '#34C759' : '#FF3B30'}
            ]}>
              {totalChange >= 0 ? '+' : ''}£{Math.abs(totalChange).toFixed(2)}
            </Text>
            <Text style={[
              styles.changePercent, 
              {color: totalChange >= 0 ? '#34C759' : '#FF3B30'}
            ]}>
              ({totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%)
            </Text>
          </View>
        </View>

        <View style={styles.investmentsList}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Holdings
          </Text>

          {portfolioData.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              style={[styles.investmentItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
            >
              <View style={styles.investmentLeft}>
                <View style={styles.investmentIcon}>
                  <Text style={styles.investmentIconText}>{investment.icon}</Text>
                </View>
                <View style={styles.investmentInfo}>
                  <Text style={[styles.investmentName, {color: isDarkMode ? '#fff' : '#333'}]}>
                    {investment.name}
                  </Text>
                  <Text style={[styles.investmentSymbol, {color: isDarkMode ? '#888' : '#666'}]}>
                    {investment.symbol} • {investment.shares} shares
                  </Text>
                </View>
              </View>
              <View style={styles.investmentRight}>
                <Text style={[styles.investmentAmount, {color: isDarkMode ? '#fff' : '#333'}]}>
                  £{investment.amount.toLocaleString('en-GB', {minimumFractionDigits: 2})}
                </Text>
                <View style={styles.investmentChange}>
                  <Text style={[
                    styles.investmentChangeAmount,
                    {color: investment.change >= 0 ? '#34C759' : '#FF3B30'}
                  ]}>
                    {investment.change >= 0 ? '+' : ''}£{Math.abs(investment.change).toFixed(2)}
                  </Text>
                  <Text style={[
                    styles.investmentChangePercent,
                    {color: investment.change >= 0 ? '#34C759' : '#FF3B30'}
                  ]}>
                    ({investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
            <Text style={styles.primaryButtonText}>Buy More</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton, {borderColor: isDarkMode ? '#333' : '#ddd'}]}>
            <Text style={[styles.secondaryButtonText, {color: isDarkMode ? '#fff' : '#333'}]}>
              Sell Holdings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  portfolioSummary: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
  },
  summaryAmount: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  changePercent: {
    fontSize: 16,
    fontWeight: '500',
  },
  investmentsList: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  investmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  investmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  investmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  investmentIconText: {
    fontSize: 20,
  },
  investmentInfo: {
    flex: 1,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  investmentSymbol: {
    fontSize: 14,
  },
  investmentRight: {
    alignItems: 'flex-end',
  },
  investmentAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  investmentChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  investmentChangeAmount: {
    fontSize: 14,
    fontWeight: '500',
  },
  investmentChangePercent: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InvestmentsPage;