import { Card, Title } from 'react-native-paper';
import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BadgerNewsItemCard({ article }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Article', { articleId: article.fullArticleId })}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}` }} />
        <Card.Content>
          <Title>{article.title}</Title>
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    elevation: 4,
    borderRadius: 10,
  },
});
