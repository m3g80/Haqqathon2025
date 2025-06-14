/**
 * Modern Donation Page
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
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface DonatePageProps {
  onBack: () => void;
}

const projects = [
  {
    id: 1,
    title: 'Masjid in Somalia',
    description: 'Building a mosque with water well & education center',
    icon: '🕌',
    color: '#00A86B',
    raised: 12450,
    goal: 25000,
    urgency: 'High',
  },
  {
    id: 2,
    title: 'Medical Aid Gaza',
    description: 'Emergency medical supplies for families in need',
    icon: '🏥',
    color: '#FF9500',
    raised: 8750,
    goal: 15000,
    urgency: 'Critical',
  },
  {
    id: 3,
    title: 'Orphan Education Fund',
    description: 'Providing education for 25 orphaned children',
    icon: '📚',
    color: '#AF52DE',
    raised: 20920,
    goal: 30000,
    urgency: 'Medium',
  },
  {
    id: 4,
    title: 'Clean Water Initiative',
    description: 'Installing water pumps in rural communities',
    icon: '💧',
    color: '#007AFF',
    raised: 5680,
    goal: 20000,
    urgency: 'High',
  },
];

const quickAmounts = [10, 25, 50, 100, 250, 500];

function DonatePage({onBack}: DonatePageProps) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const handleDonate = () => {
    const amount = isCustom ? parseFloat(customAmount) : selectedAmount;
    if (amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }
    Alert.alert(
      'Donation Confirmed',
      `Thank you for donating $${amount} to ${selectedProject.title}. Your contribution makes a difference!`,
      [{text: 'Continue', onPress: onBack}]
    );
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return '#FF3B30';
      case 'High':
        return '#FF9500';
      case 'Medium':
        return '#34C759';
      default:
        return '#007AFF';
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Make a Donation
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.impactCard}>
            <Text style={styles.impactTitle}>Your Impact</Text>
            <Text style={styles.impactSubtitle}>
              Every donation helps transform lives
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>$47,800</Text>
                <Text style={styles.statLabel}>Raised This Month</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>1,247</Text>
                <Text style={styles.statLabel}>Lives Impacted</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.projectsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Choose a Project
          </Text>
          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={[
                styles.projectCard,
                {
                  backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
                  borderColor: selectedProject.id === project.id ? project.color : 'transparent',
                  borderWidth: selectedProject.id === project.id ? 2 : 0,
                },
              ]}
              onPress={() => setSelectedProject(project)}>
              <View style={styles.projectHeader}>
                <View style={[styles.projectIcon, {backgroundColor: project.color}]}>
                  <Text style={styles.projectIconText}>{project.icon}</Text>
                </View>
                <View style={styles.projectInfo}>
                  <Text style={[styles.projectTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
                    {project.title}
                  </Text>
                  <Text style={[styles.projectDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                    {project.description}
                  </Text>
                </View>
                <View style={[styles.urgencyBadge, {backgroundColor: getUrgencyColor(project.urgency)}]}>
                  <Text style={styles.urgencyText}>{project.urgency}</Text>
                </View>
              </View>
              
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${getProgressPercentage(project.raised, project.goal)}%`,
                        backgroundColor: project.color,
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressInfo}>
                  <Text style={[styles.raisedAmount, {color: isDarkMode ? '#fff' : '#333'}]}>
                    ${project.raised.toLocaleString()} raised
                  </Text>
                  <Text style={[styles.goalAmount, {color: isDarkMode ? '#888' : '#666'}]}>
                    of ${project.goal.toLocaleString()} goal
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.amountSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Donation Amount
          </Text>
          
          <View style={styles.quickAmounts}>
            {quickAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  {
                    backgroundColor: !isCustom && selectedAmount === amount
                      ? selectedProject.color
                      : isDarkMode ? '#1c1c1e' : '#fff',
                    borderColor: isDarkMode ? '#333' : '#e0e0e0',
                  },
                ]}
                onPress={() => {
                  setSelectedAmount(amount);
                  setIsCustom(false);
                  setCustomAmount('');
                }}>
                <Text
                  style={[
                    styles.amountButtonText,
                    {
                      color: !isCustom && selectedAmount === amount
                        ? '#fff'
                        : isDarkMode ? '#fff' : '#333',
                    },
                  ]}>
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.customAmountSection}>
            <Text style={[styles.customAmountLabel, {color: isDarkMode ? '#fff' : '#333'}]}>
              Or enter custom amount
            </Text>
            <View style={styles.customAmountContainer}>
              <Text style={[styles.dollarSign, {color: isDarkMode ? '#888' : '#666'}]}>$</Text>
              <TextInput
                style={[
                  styles.customAmountInput,
                  {
                    color: isDarkMode ? '#fff' : '#333',
                    borderColor: isCustom ? selectedProject.color : (isDarkMode ? '#333' : '#e0e0e0'),
                    backgroundColor: isDarkMode ? '#1c1c1e' : '#fff',
                  },
                ]}
                placeholder="0.00"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={customAmount}
                onChangeText={(text) => {
                  setCustomAmount(text);
                  setIsCustom(true);
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        <View style={[styles.donateSection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
          <View style={styles.donationSummary}>
            <Text style={[styles.summaryTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
              Donation Summary
            </Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Project:
              </Text>
              <Text style={[styles.summaryValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                {selectedProject.title}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                Amount:
              </Text>
              <Text style={[styles.summaryAmount, {color: selectedProject.color}]}>
                ${isCustom ? customAmount || '0' : selectedAmount}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
          </View>

          <TouchableOpacity
            style={[styles.donateButton, {backgroundColor: selectedProject.color}]}
            onPress={handleDonate}>
            <View style={styles.donateButtonContent}>
              <Text style={styles.donateButtonText}>
                Complete Donation
              </Text>
              <Text style={styles.donateButtonSubtext}>
                ${isCustom ? customAmount || '0' : selectedAmount}
              </Text>
            </View>
            <View style={styles.donateButtonIcon}>
              <Text style={styles.donateButtonIconText}>→</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.securitySection}>
            <View style={styles.securityBadges}>
              <View style={styles.securityBadge}>
                <Text style={styles.securityBadgeText}>🔒 SSL Encrypted</Text>
              </View>
              <View style={styles.securityBadge}>
                <Text style={styles.securityBadgeText}>✓ 100% Secure</Text>
              </View>
            </View>
            <Text style={[styles.securityText, {color: isDarkMode ? '#888' : '#666'}]}>
              Your donation goes directly to the cause. No hidden fees.
            </Text>
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
  impactCard: {
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
  impactTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  impactSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  projectsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  projectCard: {
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
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  projectIconText: {
    fontSize: 20,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  raisedAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  goalAmount: {
    fontSize: 14,
  },
  amountSection: {
    marginBottom: 32,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  amountButton: {
    width: (width - 48) / 3 - 8,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 12,
  },
  amountButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  customAmountSection: {
    marginTop: 8,
  },
  customAmountLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSign: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  customAmountInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  donateSection: {
    marginBottom: 40,
    alignItems: 'center',
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
  donationSummary: {
    width: '100%',
    marginBottom: 24,
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
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
  },
  donateButton: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  donateButtonContent: {
    flex: 1,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  donateButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  donateButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donateButtonIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securitySection: {
    width: '100%',
    alignItems: 'center',
  },
  securityBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 12,
  },
  securityBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(52, 199, 89, 0.2)',
  },
  securityBadgeText: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '600',
  },
  securityText: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});

export default DonatePage;