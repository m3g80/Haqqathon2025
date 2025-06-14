/**
 * Savings Account Page - Simple Bank Savings
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

interface SavingsProps {
  onBack: () => void;
}

function Savings({onBack}: SavingsProps) {
  const [currentBalance] = useState(13420.75);
  const [monthlyDeposit] = useState(47.82);
  const [savingsRate] = useState(0.0);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const projectedAnnualGrowth = 0;

  const savingGoals = [
    {
      name: '3-Month Emergency Fund',
      target: 15000,
      current: currentBalance,
      progress: Math.min((currentBalance / 15000) * 100, 100),
    },
    {
      name: '6-Month Emergency Fund',
      target: 30000,
      current: currentBalance,
      progress: Math.min((currentBalance / 30000) * 100, 100),
    },
    {
      name: 'House Deposit Goal',
      target: 50000,
      current: currentBalance,
      progress: Math.min((currentBalance / 50000) * 100, 100),
    },
  ];

  const handleViewStatement = () => {
    Alert.alert(
      'Bank Statement',
      'Your bank statement will be available in your connected bank app.',
      [{text: 'OK'}]
    );
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Bank Savings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Current Savings Balance</Text>
            <Text style={styles.balanceAmount}>
              £{currentBalance.toLocaleString('en-GB', {minimumFractionDigits: 2})}
            </Text>
            <View style={styles.balanceDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Monthly Round-ups:</Text>
                <Text style={styles.detailValue}>
                  £{monthlyDeposit.toFixed(2)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Savings Type:</Text>
                <Text style={styles.detailValue}>Sharia-compliant</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Annual Deposits:</Text>
                <Text style={[styles.detailValue, styles.growthValue]}>
                  £{(monthlyDeposit * 12).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            This Month's Activity
          </Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.statValue, {color: '#34C759'}]}>£{monthlyDeposit.toFixed(2)}</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Round-ups Added
              </Text>
            </View>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.statValue, {color: '#007AFF'}]}>156</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Transactions
              </Text>
            </View>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.statValue, {color: '#FF9500'}]}>£0.00</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Bonus Earned
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.goalsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Savings Goals
          </Text>
          {savingGoals.map((goal, index) => (
            <View
              key={index}
              style={[
                styles.goalCard,
                {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
              ]}>
              <View style={styles.goalHeader}>
                <Text style={[styles.goalName, {color: isDarkMode ? '#fff' : '#333'}]}>
                  {goal.name}
                </Text>
                <Text style={[styles.goalProgress, {color: '#34C759'}]}>
                  {goal.progress.toFixed(0)}%
                </Text>
              </View>
              <View style={styles.goalAmounts}>
                <Text style={[styles.goalCurrent, {color: isDarkMode ? '#888' : '#666'}]}>
                  £{goal.current.toLocaleString('en-GB')} of £{goal.target.toLocaleString('en-GB')}
                </Text>
                <Text style={[styles.goalRemaining, {color: isDarkMode ? '#888' : '#666'}]}>
                  £{(goal.target - goal.current).toLocaleString('en-GB')} remaining
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(goal.progress, 100)}%`,
                      backgroundColor: '#34C759',
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Account Actions
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}
            onPress={handleViewStatement}>
            <View style={[styles.actionIcon, {backgroundColor: '#007AFF'}]}>
              <Text style={styles.actionIconText}>📊</Text>
            </View>
            <View style={styles.actionInfo}>
              <Text style={[styles.actionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                View Bank Statement
              </Text>
              <Text style={[styles.actionSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
                Access your full transaction history
              </Text>
            </View>
            <Text style={[styles.actionArrow, {color: isDarkMode ? '#888' : '#666'}]}>→</Text>
          </TouchableOpacity>

          <View style={[styles.infoCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
            <View style={[styles.infoIcon, {backgroundColor: '#34C759'}]}>
              <Text style={styles.infoIconText}>ℹ️</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                How Savings Work
              </Text>
              <Text style={[styles.infoText, {color: isDarkMode ? '#888' : '#666'}]}>
                Your round-up spare change is automatically deposited into your connected bank savings account. 
                This is a Sharia-compliant savings account with no interest, and funds remain instantly accessible.
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
  balanceCard: {
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
  balanceTitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceDetails: {
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  growthValue: {
    color: '#FFD700',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
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
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  goalsSection: {
    marginBottom: 32,
  },
  goalCard: {
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
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalProgress: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalAmounts: {
    marginBottom: 12,
  },
  goalCurrent: {
    fontSize: 14,
    marginBottom: 4,
  },
  goalRemaining: {
    fontSize: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionsSection: {
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
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
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionIconText: {
    fontSize: 20,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
  },
  actionArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIconText: {
    fontSize: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Savings;