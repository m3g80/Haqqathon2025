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
  Switch,
} from 'react-native';

interface AppSettingsProps {
  onBack: () => void;
}

function AppSettings({onBack}: AppSettingsProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [roundUpEnabled, setRoundUpEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(isDarkMode);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const accountSettings = [
    {
      icon: '👤',
      title: 'Personal Information',
      subtitle: 'Name, email, and contact details',
      action: () => Alert.alert('Personal Info', 'Edit personal information'),
    },
    {
      icon: '🏦',
      title: 'Connected Accounts',
      subtitle: 'Manage your linked bank accounts',
      action: () => Alert.alert('Bank Accounts', 'Manage connected accounts'),
    },
    {
      icon: '🔒',
      title: 'Security & Privacy',
      subtitle: 'Password, 2FA, and security settings',
      action: () => Alert.alert('Security', 'Manage security settings'),
    },
    {
      icon: '📱',
      title: 'App Preferences',
      subtitle: 'Theme, language, and display options',
      action: () => Alert.alert('Preferences', 'Manage app preferences'),
    },
  ];

  const supportOptions = [
    {
      icon: '❓',
      title: 'Help & Support',
      subtitle: 'FAQs and customer support',
      action: () => Alert.alert('Help', 'Access help and support'),
    },
    {
      icon: '📋',
      title: 'Terms & Conditions',
      subtitle: 'Legal terms and privacy policy',
      action: () => Alert.alert('Legal', 'View terms and conditions'),
    },
    {
      icon: '📊',
      title: 'Data & Analytics',
      subtitle: 'View and export your data',
      action: () => Alert.alert('Data', 'Manage your data'),
    },
    {
      icon: '🔄',
      title: 'App Version',
      subtitle: 'v2.1.0 - Check for updates',
      action: () => Alert.alert('Updates', 'Check for app updates'),
    },
  ];

  const dangerZone = [
    {
      icon: '⏸️',
      title: 'Pause Round-ups',
      subtitle: 'Temporarily stop automatic round-ups',
      action: () => Alert.alert('Pause', 'Pause round-up functionality'),
      isDestructive: false,
    },
    {
      icon: '🔐',
      title: 'Lock Account',
      subtitle: 'Temporarily lock your account',
      action: () => Alert.alert('Lock Account', 'This will lock your account'),
      isDestructive: true,
    },
    {
      icon: '🗑️',
      title: 'Delete Account',
      subtitle: 'Permanently delete your account and data',
      action: () => Alert.alert('Delete Account', 'This action cannot be undone'),
      isDestructive: true,
    },
  ];

  const renderSettingItem = (item: any, isDestructive = false) => (
    <TouchableOpacity
      key={item.title}
      style={[
        styles.settingItem,
        {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
      ]}
      onPress={item.action}>
      <View style={[styles.settingIcon, {backgroundColor: isDestructive ? '#FF3B30' : '#007AFF'}]}>
        <Text style={styles.settingIconText}>{item.icon}</Text>
      </View>
      <View style={styles.settingInfo}>
        <Text style={[
          styles.settingTitle, 
          {color: isDestructive ? '#FF3B30' : (isDarkMode ? '#fff' : '#333')}
        ]}>
          {item.title}
        </Text>
        <Text style={[styles.settingSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
          {item.subtitle}
        </Text>
      </View>
      <Text style={[styles.settingArrow, {color: isDarkMode ? '#888' : '#666'}]}>→</Text>
    </TouchableOpacity>
  );

  const renderToggleSetting = (title: string, subtitle: string, value: boolean, onToggle: (value: boolean) => void, icon: string) => (
    <View
      key={title}
      style={[
        styles.settingItem,
        {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
      ]}>
      <View style={[styles.settingIcon, {backgroundColor: value ? '#34C759' : '#8E8E93'}]}>
        <Text style={styles.settingIconText}>{icon}</Text>
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          {title}
        </Text>
        <Text style={[styles.settingSubtitle, {color: isDarkMode ? '#888' : '#666'}]}>
          {subtitle}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{false: '#767577', true: '#34C759'}}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          App Settings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>JD</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <Text style={styles.profileMember}>Premium Member since Jan 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Quick Settings
          </Text>
          {renderToggleSetting(
            'Dark Mode',
            'Use dark theme throughout the app',
            darkModeEnabled,
            setDarkModeEnabled,
            '🌙'
          )}
          {renderToggleSetting(
            'Push Notifications',
            'Get notified about round-ups and updates',
            notificationsEnabled,
            setNotificationsEnabled,
            '🔔'
          )}
          {renderToggleSetting(
            'Round-up System',
            'Automatically round up purchases',
            roundUpEnabled,
            setRoundUpEnabled,
            '🔄'
          )}
          {renderToggleSetting(
            'Biometric Security',
            'Use Face ID or Touch ID to unlock',
            biometricsEnabled,
            setBiometricsEnabled,
            '🔐'
          )}
          {renderToggleSetting(
            'Auto-invest',
            'Automatically invest spare change',
            autoInvestEnabled,
            setAutoInvestEnabled,
            '📈'
          )}
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Account Management
          </Text>
          {accountSettings.map(item => renderSettingItem(item))}
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Support & Information
          </Text>
          {supportOptions.map(item => renderSettingItem(item))}
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, {color: '#FF3B30'}]}>
            Danger Zone
          </Text>
          {dangerZone.map(item => renderSettingItem(item, item.isDestructive))}
        </View>

        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <Text style={[styles.footerText, {color: isDarkMode ? '#888' : '#666'}]}>
            Made with ❤️ for the Muslim community
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
  profileSection: {
    paddingVertical: 24,
  },
  profileCard: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
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
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  profileMember: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontStyle: 'italic',
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconText: {
    fontSize: 18,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingArrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AppSettings;