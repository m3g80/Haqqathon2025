import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  StatusBar,
  Animated,
} from 'react-native';

interface Bank {
  id: string;
  name: string;
  logo: string;
  color: string;
}

const POPULAR_BANKS: Bank[] = [
  { id: '1', name: 'HSBC', logo: '🏦', color: '#DB0011' },
  { id: '2', name: 'Barclays', logo: '🏛️', color: '#00AEEF' },
  { id: '3', name: 'Lloyds Bank', logo: '🏪', color: '#006A4D' },
  { id: '4', name: 'NatWest', logo: '🏢', color: '#4C2C92' },
  { id: '5', name: 'Santander UK', logo: '💳', color: '#EC0000' },
  { id: '6', name: 'Royal Bank of Scotland', logo: '🏦', color: '#0038A7' },
];

type ConnectionStep = 'select' | 'verify' | 'connecting' | 'success';

interface BankConnectionProps {
  onBack?: () => void;
}

function BankConnection({ onBack }: BankConnectionProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentStep, setCurrentStep] = useState<ConnectionStep>('select');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    animateTransition(() => setCurrentStep('verify'));
  };

  const handleVerifyConnection = () => {
    animateTransition(() => setCurrentStep('connecting'));

    setTimeout(() => {
      animateTransition(() => setCurrentStep('success'));
    }, 3000);
  };

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(callback, 200);
  };

  const renderStepIndicator = () => {
    const steps = ['select', 'verify', 'connecting', 'success'];
    const currentIndex = steps.indexOf(currentStep);

    return (
      <View style={styles.stepIndicator}>
        {steps.map((step, index) => (
          <View key={step} style={styles.stepContainer}>
            <View
              style={[
                styles.stepCircle,
                {
                  backgroundColor:
                    index <= currentIndex
                      ? '#007AFF'
                      : isDarkMode
                      ? '#333'
                      : '#E0E0E0',
                },
              ]}
            >
              <Text
                style={[
                  styles.stepNumber,
                  { color: index <= currentIndex ? '#FFF' : '#999' },
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.stepLine,
                  {
                    backgroundColor:
                      index < currentIndex
                        ? '#007AFF'
                        : isDarkMode
                        ? '#333'
                        : '#E0E0E0',
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderBankSelection = () => (
    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
        Connect Your Bank
      </Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#CCC' : '#666' }]}>
        Select your bank to securely connect your account
      </Text>

      <ScrollView style={styles.bankList} showsVerticalScrollIndicator={false}>
        {POPULAR_BANKS.map(bank => (
          <TouchableOpacity
            key={bank.id}
            style={[
              styles.bankItem,
              {
                backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
                borderColor: isDarkMode ? '#333' : '#E0E0E0',
              },
            ]}
            onPress={() => handleBankSelect(bank)}
          >
            <View style={styles.bankInfo}>
              <View style={[styles.bankLogo, { backgroundColor: bank.color }]}>
                <Text style={styles.bankLogoText}>{bank.logo}</Text>
              </View>
              <Text
                style={[
                  styles.bankName,
                  { color: isDarkMode ? '#FFF' : '#000' },
                ]}
              >
                {bank.name}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.bankItem,
            styles.otherBankItem,
            {
              backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
              borderColor: isDarkMode ? '#333' : '#E0E0E0',
            },
          ]}
        >
          <View style={styles.bankInfo}>
            <View style={[styles.bankLogo, { backgroundColor: '#007AFF' }]}>
              <Text style={styles.bankLogoText}>🔍</Text>
            </View>
            <Text
              style={[styles.bankName, { color: isDarkMode ? '#FFF' : '#000' }]}
            >
              Search Other Banks
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );

  const renderVerification = () => (
    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
      <View style={styles.verificationHeader}>
        <View
          style={[styles.bankLogo, { backgroundColor: selectedBank?.color }]}
        >
          <Text style={styles.bankLogoText}>{selectedBank?.logo}</Text>
        </View>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
          Connect to {selectedBank?.name}
        </Text>
        <Text
          style={[styles.subtitle, { color: isDarkMode ? '#CCC' : '#666' }]}
        >
          We'll securely connect to your account using bank-grade encryption
        </Text>
      </View>

      <View style={styles.securityFeatures}>
        <View style={styles.securityItem}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityEmoji}>🔒</Text>
          </View>
          <Text
            style={[
              styles.securityText,
              { color: isDarkMode ? '#FFF' : '#000' },
            ]}
          >
            256-bit encryption
          </Text>
        </View>

        <View style={styles.securityItem}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityEmoji}>🛡️</Text>
          </View>
          <Text
            style={[
              styles.securityText,
              { color: isDarkMode ? '#FFF' : '#000' },
            ]}
          >
            Read-only access
          </Text>
        </View>

        <View style={styles.securityItem}>
          <View style={styles.securityIcon}>
            <Text style={styles.securityEmoji}>🔐</Text>
          </View>
          <Text
            style={[
              styles.securityText,
              { color: isDarkMode ? '#FFF' : '#000' },
            ]}
          >
            Biometric verification
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.connectButton}
        onPress={handleVerifyConnection}
      >
        <Text style={styles.connectButtonText}>Connect Securely</Text>
      </TouchableOpacity>

      <Text
        style={[styles.disclaimer, { color: isDarkMode ? '#888' : '#666' }]}
      >
        Your credentials are never stored on our servers. Connection is handled
        by our secure banking partner.
      </Text>
    </Animated.View>
  );

  const renderConnecting = () => (
    <Animated.View
      style={[styles.content, styles.centerContent, { opacity: fadeAnim }]}
    >
      <View style={styles.loadingContainer}>
        <View style={styles.loadingSpinner}>
          <Text style={styles.loadingEmoji}>🔄</Text>
        </View>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
          Connecting to {selectedBank?.name}
        </Text>
        <Text
          style={[styles.subtitle, { color: isDarkMode ? '#CCC' : '#666' }]}
        >
          Establishing secure connection...
        </Text>
      </View>
    </Animated.View>
  );

  const renderSuccess = () => (
    <Animated.View
      style={[styles.content, styles.centerContent, { opacity: fadeAnim }]}
    >
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>✅</Text>
        </View>
        <Text style={[styles.title, { color: isDarkMode ? '#FFF' : '#000' }]}>
          Successfully Connected!
        </Text>
        <Text
          style={[styles.subtitle, { color: isDarkMode ? '#CCC' : '#666' }]}
        >
          Your {selectedBank?.name} account is now linked
        </Text>

        <View style={styles.successDetails}>
          <View style={styles.successDetailItem}>
            <Text
              style={[
                styles.successDetailLabel,
                { color: isDarkMode ? '#888' : '#666' },
              ]}
            >
              Account Type
            </Text>
            <Text
              style={[
                styles.successDetailValue,
                { color: isDarkMode ? '#FFF' : '#000' },
              ]}
            >
              Checking Account
            </Text>
          </View>

          <View style={styles.successDetailItem}>
            <Text
              style={[
                styles.successDetailLabel,
                { color: isDarkMode ? '#888' : '#666' },
              ]}
            >
              Last 4 Digits
            </Text>
            <Text
              style={[
                styles.successDetailValue,
                { color: isDarkMode ? '#FFF' : '#000' },
              ]}
            >
              ****1234
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={onBack}>
          <Text style={styles.continueButtonText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'select':
        return renderBankSelection();
      case 'verify':
        return renderVerification();
      case 'connecting':
        return renderConnecting();
      case 'success':
        return renderSuccess();
      default:
        return renderBankSelection();
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        {onBack && currentStep !== 'success' && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text
              style={[
                styles.backButtonText,
                { color: isDarkMode ? '#FFF' : '#007AFF' },
              ]}
            >
              ← Back
            </Text>
          </TouchableOpacity>
        )}
        {renderStepIndicator()}
      </View>

      {renderCurrentStep()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  bankList: {
    flex: 1,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  otherBankItem: {
    marginTop: 8,
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bankLogoText: {
    fontSize: 20,
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 20,
    color: '#999',
  },
  verificationHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  securityFeatures: {
    marginBottom: 40,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  securityIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityEmoji: {
    fontSize: 24,
  },
  securityText: {
    fontSize: 16,
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
  },
  connectButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingSpinner: {
    marginBottom: 24,
  },
  loadingEmoji: {
    fontSize: 48,
  },
  successContainer: {
    alignItems: 'center',
    width: '100%',
  },
  successIcon: {
    marginBottom: 24,
  },
  successEmoji: {
    fontSize: 48,
  },
  successDetails: {
    width: '100%',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginTop: 32,
    marginBottom: 32,
  },
  successDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  successDetailLabel: {
    fontSize: 16,
  },
  successDetailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BankConnection;