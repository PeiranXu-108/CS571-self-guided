import { View, ScrollView, Text } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import BadgerNewsItemCard from '../BadgerNewsItemCard';
import PreferenceContext from '../../Contexts/PreferenceContext';

export default function BadgerNewsScreen() {
    const [articles, setArticles] = useState([]);
    const { preferences } = useContext(PreferenceContext);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_f33917fdb8555977e6256d91feaf5c069fe9f6e5c945336aec5acc5db565134c"
            }
        })
            .then(res => res.json())
            .then(data => setArticles(data));
    }, []);

    const filtered = articles.filter(article =>
        article.tags.some(tag => preferences[tag])
    );

    return (
        <ScrollView contentContainerStyle={{ padding: 5 }}>
            {
                articles.length === 0
                    ? <Text>Loading articles...</Text>
                    : filtered.length === 0
                        ? <Text>No articles match your preferences.</Text>
                        : filtered.map(article => (
                            <BadgerNewsItemCard key={article.id} article={article} />
                        ))
            }
        </ScrollView>
    );
}