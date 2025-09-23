import { useEffect, useState, useRef } from 'react';
import { Pressable } from 'react-native';
import { View, Text, ScrollView, Animated, StyleSheet, Image, Linking } from 'react-native';

export default function BadgerArticleScreen({ route }) {
    const { articleId } = route.params;
    const [article, setArticle] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;// 初始化动画值（透明）

    useEffect(() => {
        fetch(`https://cs571.org/rest/s25/hw8/article?id=${articleId}`, {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        })
            .then(res => res.json())
            .then(data => {
                setArticle(data);
                // 数据加载完成后触发动画
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            });
    }, [articleId]);

    if (!article) {
        return <Text style={{ padding: 16 }}>The content is loading...</Text>;
    }

    return (
        // 支持动画的组件
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{ uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}` }}
                    style={{ width: '100%', height: 200, marginBottom: 10 }}
                />
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.meta}>By {article.author} on {article.posted}</Text>
                <Pressable onPress={() => Linking.openURL(article.url)}>
                    <Text style={styles.linkText}>Read full article here.</Text>
                </Pressable>
                {
                    article.body.map((para, idx) => (
                        <Text key={idx} style={styles.paragraph}>{para}</Text>
                    ))
                }
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8
    },
    meta: {
        fontStyle: 'italic',
        marginBottom: 12
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'uderline',
        marginBottom: 12
    }
});
