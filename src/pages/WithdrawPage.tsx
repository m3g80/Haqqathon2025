/**
 * Withdraw Page - Modern withdrawal interface
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
  TextInput,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface WithdrawPageProps {
  onBack: () => void;
}

const withdrawMethods = [
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct transfer to your connected bank account',
    icon: '🏦',
    color: '#007AFF',
    fee: '£0.00',
    timeframe: 'Same day',
    available: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Transfer to your PayPal account',
    icon: '💳',
    color: '#0070BA',
    fee: '£0.00',
    timeframe: '1-2 business days',
    available: true,
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'Convert to Bitcoin or Ethereum',
    icon: '₿',
    color: '#F7931A',
    fee: '0.5%',
    timeframe: '10-30 minutes',
    available: false,
  },
];

const quickAmounts = [50, 100, 250, 500, 1000];

function WithdrawPage({onBack}: WithdrawPageProps) {
  const [selectedMethod, setSelectedMethod] = useState(withdrawMethods[0]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);
  const [currentBalance] = useState(6789.20);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const setQuickAmount = (amount: number) => {
    setWithdrawAmount(amount.toString());
    setCustomAmount(false);
  };

  const handleCustomAmount = () => {
    setCustomAmount(true);
    setWithdrawAmount('');
  };

  const validateAndProceed = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!withdrawAmount || isNaN(amount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid withdrawal amount.');
      return;
    }

    if (amount <= 0) {
      Alert.alert('Invalid Amount', 'Withdrawal amount must be greater than £0.');
      return;
    }

    if (amount > currentBalance) {
      Alert.alert(
        'Insufficient Funds',
        `You can withdraw up to £${currentBalance.toFixed(2)}.`
      );
      return;
    }

    if (amount < 10) {
      Alert.alert('Minimum Withdrawal', 'Minimum withdrawal amount is £10.');
      return;
    }

    Alert.alert(
      'Confirm Withdrawal',
      `Withdraw £${amount.toFixed(2)} via ${selectedMethod.name}?\n\nFee: ${selectedMethod.fee}\nExpected arrival: ${selectedMethod.timeframe}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              'Withdrawal Submitted',
              `Your withdrawal of £${amount.toFixed(2)} has been submitted and will arrive in ${selectedMethod.timeframe.toLowerCase()}.`,
              [{text: 'Done', onPress: onBack}]
            );
          },
        },
      ]
    );
  };

  const availableBalance = currentBalance;
  const selectedAmount = parseFloat(withdrawAmount) || 0;
  const feeAmount = selectedMethod.id === 'crypto' ? selectedAmount * 0.005 : 0;
  const netAmount = selectedAmount - feeAmount;

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Withdraw Funds
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              £{availableBalance.toLocaleString('en-GB', {minimumFractionDigits: 2})}
            </Text>
            <View style={styles.balanceBreakdown}>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Investments:</Text>
                <Text style={styles.breakdownValue}>£{(availableBalance * 0.4).toFixed(2)}</Text>
              </View>
              <View style={styles.breakdownItem}>
                <Text style={styles.breakdownLabel}>Savings:</Text>
                <Text style={styles.breakdownValue}>£{(availableBalance * 0.6).toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.methodsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Withdrawal Method
          </Text>
          {withdrawMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                {
                  backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
                  borderColor: selectedMethod.id === method.id ? method.color : 'transparent',
                  borderWidth: selectedMethod.id === method.id ? 2 : 0,
                  opacity: method.available ? 1 : 0.5,
                },
              ]}
              onPress={() => method.available && setSelectedMethod(method)}
              disabled={!method.available}>
              <View style={[styles.methodIcon, {backgroundColor: method.color}]}>
                <Text style={styles.methodIconText}>{method.icon}</Text>
              </View>
              <View style={styles.methodInfo}>
                <View style={styles.methodHeader}>
                  <Text style={[styles.methodName, {color: isDarkMode ? '#fff' : '#333'}]}>
                    {method.name}
                  </Text>
                  {!method.available && (
                    <View style={styles.comingSoonBadge}>
                      <Text style={styles.comingSoonText}>Coming Soon</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.methodDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                  {method.description}
                </Text>
                <View style={styles.methodDetails}>
                  <Text style={[styles.methodDetail, {color: method.color}]}>
                    Fee: {method.fee}
                  </Text>
                  <Text style={[styles.methodDetail, {color: isDarkMode ? '#888' : '#666'}]}>
                    {method.timeframe}
                  </Text>
                </View>
              </View>
              {selectedMethod.id === method.id && (
                <View style={[styles.selectedIndicator, {backgroundColor: method.color}]}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.amountSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Withdrawal Amount
          </Text>
          
          <View style={styles.quickAmountsGrid}>
            {quickAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.quickAmountButton,
                  {
                    backgroundColor: withdrawAmount === amount.toString() && !customAmount
                      ? selectedMethod.color
                      : isDarkMode ? '#1c1c1e' : '#fff',
                    borderColor: selectedMethod.color,
                  },
                ]}
                onPress={() => setQuickAmount(amount)}>
                <Text style={[
                  styles.quickAmountText,
                  {
                    color: withdrawAmount === amount.toString() && !customAmount
                      ? '#fff'
                      : isDarkMode ? '#fff' : '#333'
                  }
                ]}>
                  £{amount}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.quickAmountButton,
                {
                  backgroundColor: customAmount
                    ? selectedMethod.color
                    : isDarkMode ? '#1c1c1e' : '#fff',
                  borderColor: selectedMethod.color,
                },
              ]}
              onPress={handleCustomAmount}>
              <Text style={[
                styles.quickAmountText,
                {
                  color: customAmount
                    ? '#fff'
                    : isDarkMode ? '#fff' : '#333'
                }
              ]}>
                Custom
              </Text>
            </TouchableOpacity>
          </View>

          {customAmount && (
            <View style={[styles.customAmountContainer, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
              <Text style={[styles.currencySymbol, {color: isDarkMode ? '#888' : '#666'}]}>
                £
              </Text>
              <TextInput
                style={[styles.customAmountInput, {color: isDarkMode ? '#fff' : '#333'}]}
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                placeholder="0.00"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
                keyboardType="numeric"
                autoFocus
              />
            </View>
          )}
        </View>

        {withdrawAmount && selectedAmount > 0 && (
          <View style={[styles.summarySection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
            <Text style={[styles.summaryTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
              Withdrawal Summary
            </Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Withdrawal Amount:
              </Text>
              <Text style={[styles.summaryValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                £{selectedAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Processing Fee:
              </Text>
              <Text style={[styles.summaryValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                {feeAmount > 0 ? `£${feeAmount.toFixed(2)}` : 'Free'}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={[styles.summaryLabel, styles.totalLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
                You'll Receive:
              </Text>
              <Text style={[styles.summaryValue, styles.totalValue, {color: selectedMethod.color}]}>
                £{netAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Expected Arrival:
              </Text>
              <Text style={[styles.summaryValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                {selectedMethod.timeframe}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[
              styles.withdrawButton,
              {
                backgroundColor: withdrawAmount && selectedAmount >= 10
                  ? selectedMethod.color
                  : '#8E8E93',
              },
            ]}
            onPress={validateAndProceed}
            disabled={!withdrawAmount || selectedAmount < 10}>
            <Text style={styles.withdrawButtonText}>
              {withdrawAmount && selectedAmount >= 10
                ? `Withdraw £${selectedAmount.toFixed(2)}`
                : 'Enter Amount to Withdraw'}
            </Text>
          </TouchableOpacity>

          <View style={[styles.infoCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
            <View style={[styles.infoIcon, {backgroundColor: '#34C759'}]}>
              <Text style={styles.infoIconText}>🔒</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                Secure & Protected
              </Text>
              <Text style={[styles.infoText, {color: isDarkMode ? '#888' : '#666'}]}>
                All withdrawals are protected by bank-level security. Your funds are insured up to £85,000 by FSCS.
              </Text>
            </View>
          </View>

          <View style={[styles.limitsCard, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
            <Text style={[styles.limitsTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
              Withdrawal Limits
            </Text>
            <View style={styles.limitRow}>
              <Text style={[styles.limitLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Minimum:
              </Text>
              <Text style={[styles.limitValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                £10.00
              </Text>
            </View>
            <View style={styles.limitRow}>
              <Text style={[styles.limitLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Daily Maximum:
              </Text>
              <Text style={[styles.limitValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                £10,000.00
              </Text>
            </View>
            <View style={styles.limitRow}>
              <Text style={[styles.limitLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Available Today:
              </Text>
              <Text style={[styles.limitValue, {color: '#34C759'}]}>
                £{Math.min(availableBalance, 10000).toFixed(2)}
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
    backgroundColor: '#667eea',
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
    marginBottom: 16,
    textAlign: 'center',
  },
  balanceBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  breakdownValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  methodsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodIconText: {
    fontSize: 20,
  },
  methodInfo: {
    flex: 1,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
  },
  comingSoonBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  comingSoonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  methodDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  methodDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  methodDetail: {
    fontSize: 12,
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountSection: {
    marginBottom: 32,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAmountButton: {
    width: (width - 44) / 3,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
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
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  customAmountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summarySection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryTotal: {
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  actionSection: {
    marginBottom: 40,
  },
  withdrawButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    flexDirection: 'row',
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
  limitsCard: {
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
  limitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitLabel: {
    fontSize: 14,
  },
  limitValue: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default WithdrawPage;