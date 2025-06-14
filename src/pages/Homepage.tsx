/**
 * Finance App - Main Homepage
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import BankConnection from './BankConnection';
import InvestmentsPage from './InvestmentsPage';
import PortfolioAllocation from './PortfolioAllocation';
import InsightsPage from './InsightsPage';
import AppSettings from './AppSettings';
import WithdrawPage from './WithdrawPage';
import SadaqahProjects from './SadaqahProjects.tsx';

function Homepage() {
  const [showBankConnection, setShowBankConnection] = useState(false);
  const [showInvestments, setShowInvestments] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [showSadaqah, setShowSadaqah] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  if (showBankConnection) {
    return <BankConnection onBack={() => setShowBankConnection(false)} />;
  }

  if (showSadaqah) {
    return <SadaqahProjects onBack={() => setShowSadaqah(false)} />;
  }

  if (showInvestments) {
    return <InvestmentsPage onBack={() => setShowInvestments(false)} />;
  }

  if (showPortfolio) {
    return <PortfolioAllocation onBack={() => setShowPortfolio(false)} />;
  }

  if (showInsights) {
    return <InsightsPage onBack={() => setShowInsights(false)} />;
  }

  if (showAppSettings) {
    return <AppSettings onBack={() => setShowAppSettings(false)} />;
  }

  if (showWithdraw) {
    return <WithdrawPage onBack={() => setShowWithdraw(false)} />;
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.greeting, {color: isDarkMode ? '#fff' : '#333'}]}>
            Good Morning
          </Text>
          <Text style={[styles.username, {color: isDarkMode ? '#ccc' : '#666'}]}>
            Welcome back, Zeyad
          </Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>£12,543.67</Text>
          
          <View style={styles.portfolioSplit}>
            <View style={styles.splitContainer}>
              <View style={styles.charitySection}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Text style={styles.iconText}>🤲</Text>
                  </View>
                  <View style={styles.sectionInfo}>
                    <Text style={styles.portfolioSectionTitle}>Sadaqah</Text>
                    <Text style={styles.sectionSubtitle}>40% allocation</Text>
                  </View>
                </View>
                <Text style={styles.sectionAmount}>£4,217.50</Text>
                <Text style={styles.sectionPercentage}>From round-ups</Text>
              </View>

              <View style={styles.splitDivider} />

              <View style={styles.investmentSection}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon}>
                    <Text style={styles.iconText}>📈</Text>
                  </View>
                  <View style={styles.sectionInfo}>
                    <Text style={styles.portfolioSectionTitle}>Halal Investing</Text>
                    <Text style={styles.sectionSubtitle}>35% allocation</Text>
                  </View>
                </View>
                <Text style={styles.sectionAmount}>£8,326.17</Text>
                <Text style={styles.sectionPercentage}>+£234.12 this week</Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View style={styles.charityProgress} />
              <View style={styles.investmentProgress} />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.connectBankButton}
            onPress={() => setShowBankConnection(true)}>
            <Text style={styles.connectBankButtonText}>+ Connect Bank Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.portfolioSection}>
          <TouchableOpacity 
            style={[styles.portfolioButton, {shadowColor: '#007AFF'}]}
            onPress={() => setShowPortfolio(true)}>
            <View style={styles.portfolioButtonContent}>
              <View style={styles.portfolioButtonIcon}>
                <Text style={styles.portfolioButtonIconText}>📊</Text>
              </View>
              <View style={styles.portfolioButtonInfo}>
                <Text style={styles.portfolioButtonTitle}>Manage Your Portfolio</Text>
                <Text style={styles.portfolioButtonSubtitle}>
                  Customize your round-up allocations
                </Text>
              </View>
              <View style={styles.portfolioButtonArrow}>
                <Text style={styles.portfolioButtonArrowText}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Quick Actions
          </Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setShowWithdraw(true)}>
              <View style={[styles.actionIcon, { backgroundColor: '#FF9500' }]}>
                <Text style={styles.actionIconText}>💳</Text>
              </View>
              <Text style={[styles.actionLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
                Withdraw
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => setShowInsights(true)}>
              <View style={[styles.actionIcon, { backgroundColor: '#AF52DE' }]}>
                <Text style={styles.actionIconText}>📊</Text>
              </View>
              <Text style={[styles.actionLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
                Insights
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => setShowAppSettings(true)}>
              <View style={[styles.actionIcon, { backgroundColor: '#34C759' }]}>
                <Text style={styles.actionIconText}>⚙️</Text>
              </View>
              <Text style={[styles.actionLabel, { color: isDarkMode ? '#fff' : '#333' }]}>
                App Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recentTransactions}>
          <View style={styles.investmentsHeader}>
            <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
              Your Investments
            </Text>
            <TouchableOpacity 
              style={styles.manageButton}
              onPress={() => setShowInvestments(true)}
            >
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
            onPress={() => setShowInvestments(true)}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#007AFF'}]}>
                <Text style={styles.transactionIconText}>📊</Text>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Wahed FTSE USA Shariah ETF
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  15.2 shares • +0.71%
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#34C759'}]}>
              £2,850.75
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
            onPress={() => setShowInvestments(true)}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#00A86B'}]}>
                <Text style={styles.transactionIconText}>📈</Text>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  SP Funds S&P 500 Sharia ETF
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  5.8 shares • -2.42%
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#FF3B30'}]}>
              £1,924.30
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
            onPress={() => setShowInvestments(true)}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#E31E24'}]}>
                <Text style={styles.transactionIconText}>🌍</Text>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Wahed Dow Jones Islamic World ETF
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  8.3 shares • +8.35%
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#34C759'}]}>
              £1,687.92
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentTransactions}>
          <View style={styles.investmentsHeader}>
            <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
              Your Sadaqah:
            </Text>
            <TouchableOpacity style={styles.manageButton} onPress={() => setShowSadaqah(true)}>
              <Text style={styles.manageButtonText}>Manage
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#00A86B'}]}>
                <Text style={styles.transactionIconText}>🕌</Text>
              </View>
              <View>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Masjid in Somalia
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  40% of your round-ups
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#34C759'}]}>
              £1,250.00
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#FF9500'}]}>
                <Text style={styles.transactionIconText}>🏥</Text>
              </View>
              <View>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Medical Aid Gaza
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  35% of your round-ups
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#34C759'}]}>
              £875.50
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.transactionItem, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
          >
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, {backgroundColor: '#AF52DE'}]}>
                <Text style={styles.transactionIconText}>📚</Text>
              </View>
              <View>
                <Text style={[styles.transactionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                  Orphan Education Fund
                </Text>
                <Text style={[styles.transactionDate, {color: isDarkMode ? '#888' : '#666'}]}>
                  25% of your round-ups
                </Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, {color: '#34C759'}]}>
              £2,092.00
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
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    marginTop: 4,
  },
  balanceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balanceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  connectBankButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  connectBankButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  portfolioSplit: {
    marginTop: 20,
    marginBottom: 16,
  },
  splitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  charitySection: {
    flex: 1,
    marginRight: 8,
  },
  investmentSection: {
    flex: 1,
    marginLeft: 8,
  },
  splitDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconText: {
    fontSize: 14,
  },
  sectionInfo: {
    flex: 1,
  },
  portfolioSectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  sectionAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionPercentage: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  charityProgress: {
    flex: 0.336,
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  investmentProgress: {
    flex: 0.664,
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  portfolioSection: {
    marginBottom: 32,
  },
  portfolioButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 24,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  portfolioButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioButtonIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  portfolioButtonIconText: {
    fontSize: 24,
  },
  portfolioButtonInfo: {
    flex: 1,
  },
  portfolioButtonTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  portfolioButtonSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    lineHeight: 22,
  },
  portfolioButtonArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portfolioButtonArrowText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActions: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  recentTransactions: {
    marginBottom: 32,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 16,
  },
  transactionInfo: {
    flex: 1,
    marginRight: 8,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    flexShrink: 1,
  },
  transactionDate: {
    fontSize: 12,
    flexShrink: 1,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    minWidth: 80,
  },
  spendingInsights: {
    marginBottom: 32,
  },
  insightCard: {
    padding: 20,
    borderRadius: 12,
  },
  spendingBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
  },
  spendingProgress: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  spendingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spentAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  remainingAmount: {
    fontSize: 14,
  },
  investmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  manageButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  manageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Homepage;