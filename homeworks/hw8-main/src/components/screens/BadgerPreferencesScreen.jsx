import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import PreferenceContext from '../../Contexts/PreferenceContext';

export default function BadgerPreferencesScreen() {
  const { preferences, setPreferences } = useContext(PreferenceContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://cs571.org/rest/s25/hw8/articles", {
      headers: {
        "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
      }
    })
      .then(res => res.json())
      .then(data => {
        const tagSet = new Set();
        data.forEach(article => article.tags.forEach(tag => tagSet.add(tag)));
        const sortedTags = [...tagSet].sort();
        setTags(sortedTags);

        // Initialize preferences only if empty
        if (Object.keys(preferences).length === 0) {
          const defaultPrefs = {};
          sortedTags.forEach(tag => defaultPrefs[tag] = true);
          setPreferences(defaultPrefs);
        }
      });
  }, []);

  const toggleTag = (tag) => {
    setPreferences(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Preferences</Text>

      {tags.map(tag => {
        const isEnabled = preferences[tag];
        return (
          <Card key={tag} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.prefText}>
                Currently {isEnabled ? "showing" : "NOT showing"} <Text style={styles.tag}>{tag}</Text> articles.
              </Text>
              <Switch
                value={isEnabled}
                onValueChange={() => toggleTag(tag)}
                color="#B00020"
              />
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  prefText: {
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10
  },
  tag: {
    fontWeight: 'bold'
  }
});