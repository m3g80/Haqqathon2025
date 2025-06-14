/**
 * Sadaqah Projects Portfolio Page
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

interface SadaqahProjectsProps {
  onBack: () => void;
}

const charityCategories = [
  {
    id: 1,
    name: 'Emergency Relief',
    description: 'Urgent humanitarian assistance worldwide',
    icon: '🚨',
    color: '#FF3B30',
    projects: [
      {
        name: 'Gaza Medical Emergency Fund',
        organization: 'Islamic Relief',
        description: 'Critical medical supplies and emergency healthcare',
        urgency: 'Critical',
        impact: '500 families/month',
        allocation: 15,
        raised: 890000,
        goal: 1200000,
      },
      {
        name: 'Syria Refugee Crisis Support',
        organization: 'Human Appeal',
        description: 'Food, shelter, and basic necessities for refugees',
        urgency: 'High',
        impact: '1,200 refugees',
        allocation: 10,
        raised: 1400000,
        goal: 2000000,
      },
      {
        name: 'Turkey Earthquake Relief',
        organization: 'Helping Hand',
        description: 'Rebuilding homes and providing emergency aid',
        urgency: 'High',
        impact: '800 families',
        allocation: 5,
        raised: 2100000,
        goal: 3000000,
      },
    ],
  },
  {
    id: 2,
    name: 'Education & Knowledge',
    description: 'Building futures through Islamic education',
    icon: '📚',
    color: '#007AFF',
    projects: [
      {
        name: 'Orphan Education Fund',
        organization: 'Orphans in Need',
        description: 'Complete education for orphaned children',
        urgency: 'Medium',
        impact: '350 children',
        allocation: 12,
        raised: 450000,
        goal: 600000,
      },
      {
        name: 'Islamic School Construction - Nigeria',
        organization: 'Al-Mustafa Foundation',
        description: 'Building modern Islamic schools in rural areas',
        urgency: 'Medium',
        impact: '2,000 students',
        allocation: 10,
        raised: 320000,
        goal: 800000,
      },
      {
        name: 'Quran Memorization Program',
        organization: 'Dar Al-Hifz',
        description: 'Supporting hafiz students with scholarships',
        urgency: 'Low',
        impact: '150 students',
        allocation: 4,
        raised: 180000,
        goal: 250000,
      },
    ],
  },
  {
    id: 3,
    name: 'Places of Worship',
    description: 'Building and maintaining mosques worldwide',
    icon: '🕌',
    color: '#00A86B',
    projects: [
      {
        name: 'Masjid Construction - Somalia',
        organization: 'Islamic Society of Somalia',
        description: 'New mosque with water well and community center',
        urgency: 'High',
        impact: '5,000 worshippers',
        allocation: 12,
        raised: 125000,
        goal: 250000,
      },
      {
        name: 'Masjid Renovation - Bangladesh',
        organization: 'Bangladesh Islamic Foundation',
        description: 'Renovating historic mosque damaged by floods',
        urgency: 'Medium',
        impact: '2,000 worshippers',
        allocation: 8,
        raised: 78000,
        goal: 150000,
      },
      {
        name: 'Community Masjid - UK',
        organization: 'British Muslim Community',
        description: 'New mosque for growing Muslim community',
        urgency: 'Low',
        impact: '1,500 worshippers',
        allocation: 5,
        raised: 890000,
        goal: 1200000,
      },
    ],
  },
  {
    id: 4,
    name: 'Water & Sanitation',
    description: 'Providing clean water and sanitation facilities',
    icon: '💧',
    color: '#34C759',
    projects: [
      {
        name: 'Water Wells - Africa',
        organization: 'Water for Life',
        description: 'Deep water wells in drought-affected regions',
        urgency: 'High',
        impact: '10,000 people',
        allocation: 8,
        raised: 340000,
        goal: 500000,
      },
      {
        name: 'Clean Water Project - Yemen',
        organization: 'Yemen Relief',
        description: 'Water purification systems for villages',
        urgency: 'Critical',
        impact: '3,000 people',
        allocation: 6,
        raised: 89000,
        goal: 200000,
      },
      {
        name: 'Sanitation Facilities - India',
        organization: 'Helping Hand India',
        description: 'Building clean sanitation facilities in slums',
        urgency: 'Medium',
        impact: '5,000 people',
        allocation: 5,
        raised: 145000,
        goal: 300000,
      },
    ],
  },
];

function SadaqahProjects({onBack}: SadaqahProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState(charityCategories[0]);
  const [allocations, setAllocations] = useState(() => {
    const initial: {[key: string]: number} = {};
    charityCategories.forEach(category => {
      category.projects.forEach(project => {
        initial[`${category.id}-${project.name}`] = project.allocation;
      });
    });
    return initial;
  });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#f5f5f5',
  };

  const adjustAllocation = (categoryId: number, projectName: string, change: number) => {
    const key = `${categoryId}-${projectName}`;
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return '#FF3B30';
      case 'High':
        return '#FF9500';
      case 'Medium':
        return '#34C759';
      case 'Low':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const saveAllocations = () => {
    Alert.alert(
      'Sadaqah Updated',
      'Your charity allocations have been saved! May Allah reward your generosity.',
      [{text: 'Ameen', onPress: onBack}]
    );
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
          Sadaqah Projects
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Charitable Impact</Text>
            <Text style={styles.summarySubtitle}>
              40% of your round-ups support humanitarian causes
            </Text>
            <View style={styles.impactStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>£1,847</Text>
                <Text style={styles.statLabel}>This Year</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12,450</Text>
                <Text style={styles.statLabel}>Lives Impacted</Text>
              </View>
            </View>
            <Text style={styles.rewardText}>
              "The believer's shade on the Day of Resurrection will be his charity." - Prophet Muhammad ﷺ
            </Text>
          </View>
        </View>

        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#fff' : '#333'}]}>
            Charity Categories
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}>
            {charityCategories.map((category) => (
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

        <View style={styles.projectsSection}>
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

          {selectedCategory.projects.map((project) => {
            const allocationKey = `${selectedCategory.id}-${project.name}`;
            const currentAllocation = allocations[allocationKey] || 0;
            
            return (
              <View
                key={project.name}
                style={[
                  styles.projectCard,
                  {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'},
                ]}>
                <View style={styles.projectHeader}>
                  <View style={styles.projectInfo}>
                    <View style={styles.projectTitleRow}>
                      <Text style={[styles.projectName, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {project.name}
                      </Text>
                      <View style={[styles.urgencyBadge, {backgroundColor: getUrgencyColor(project.urgency)}]}>
                        <Text style={styles.urgencyText}>{project.urgency}</Text>
                      </View>
                    </View>
                    <Text style={[styles.organizationName, {color: selectedCategory.color}]}>
                      {project.organization}
                    </Text>
                    <Text style={[styles.projectDescription, {color: isDarkMode ? '#888' : '#666'}]}>
                      {project.description}
                    </Text>
                  </View>
                  <View style={styles.projectStats}>
                    <Text style={[styles.allocationValue, {color: selectedCategory.color}]}>
                      {currentAllocation}%
                    </Text>
                  </View>
                </View>

                <View style={styles.projectDetails}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Impact:
                      </Text>
                      <Text style={[styles.detailValue, {color: isDarkMode ? '#fff' : '#333'}]}>
                        {project.impact}
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={[styles.detailLabel, {color: isDarkMode ? '#888' : '#666'}]}>
                        Progress:
                      </Text>
                      <Text style={[styles.detailValue, {color: '#34C759'}]}>
                        {getProgressPercentage(project.raised, project.goal).toFixed(0)}%
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.fundingRow}>
                    <Text style={[styles.raisedAmount, {color: isDarkMode ? '#fff' : '#333'}]}>
                      £{project.raised.toLocaleString()} raised
                    </Text>
                    <Text style={[styles.goalAmount, {color: isDarkMode ? '#888' : '#666'}]}>
                      of £{project.goal.toLocaleString()} goal
                    </Text>
                  </View>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${getProgressPercentage(project.raised, project.goal)}%`,
                        backgroundColor: selectedCategory.color,
                      },
                    ]}
                  />
                </View>

                <View style={styles.allocationProgressBar}>
                  <View
                    style={[
                      styles.allocationProgressFill,
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
                    onPress={() => adjustAllocation(selectedCategory.id, project.name, -5)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>-5%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, project.name, -1)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>-1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, project.name, 1)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>+1%</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.controlButton, {borderColor: selectedCategory.color}]}
                    onPress={() => adjustAllocation(selectedCategory.id, project.name, 5)}>
                    <Text style={[styles.controlButtonText, {color: selectedCategory.color}]}>+5%</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <View style={[styles.saveSection, {backgroundColor: isDarkMode ? '#1c1c1e' : '#fff'}]}>
          <View style={styles.totalAllocation}>
            <Text style={[styles.totalLabel, {color: isDarkMode ? '#888' : '#666'}]}>
              Total Sadaqah Allocation:
            </Text>
            <Text style={[
              styles.totalValue,
              {color: getTotalAllocation() <= 100 ? '#34C759' : '#FF3B30'}
            ]}>
              {getTotalAllocation()}%
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: '#00A86B'}]}
            onPress={saveAllocations}>
            <Text style={styles.saveButtonText}>Save Charity Allocations</Text>
          </TouchableOpacity>
          
          <Text style={[styles.disclaimerText, {color: isDarkMode ? '#888' : '#666'}]}>
            All organizations are verified and 100% of your allocation goes directly to the causes.
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
    backgroundColor: '#00A86B',
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
  impactStats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
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
  statValue: {
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
  rewardText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
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
    minWidth: 140,
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
  projectsSection: {
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
    marginRight: 16,
  },
  projectTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  organizationName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  projectStats: {
    alignItems: 'center',
  },
  allocationValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  projectDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
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
  fundingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raisedAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  goalAmount: {
    fontSize: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  allocationProgressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    marginBottom: 16,
  },
  allocationProgressFill: {
    height: '100%',
    borderRadius: 2,
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

export default SadaqahProjects;