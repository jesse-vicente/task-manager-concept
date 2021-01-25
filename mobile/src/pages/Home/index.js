import React, { useState, useEffect } from 'react';

import { View, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default function Home({ navigation }) {

	const [categories, setCategories] = useState([]);
	const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    api.get('/home').then((response) => {
			setCategories(response.data.categories);
			setTotalTasks(response.data.totalTasks);
		});
	}, []);

	function showTotalTasks(item) {
		if (item.description == 'Todas')
			return `${totalTasks} Tarefas`;

		if (item.tasks > 0)
			return `${item.tasks} Tarefas`;

		return 'Nenhuma Tarefa'
	}

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#fcfcfc" barStyle="dark-content"></StatusBar>

			<Text style={styles.title}>Minhas Tarefas</Text>

			<FlatList
				numColumns={2}
				data={categories}
				contentContainerStyle={styles.categoriesContainer}
				keyExtractor={(item ) => item._id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => navigation.navigate('TaskInfo', {
							category_id: item._id,
							category: item.description,
							icon: item.icon,
						})}
					>
						<Icon name={item.icon} color={item.icon_color} size={36} />
						<View style={{ marginTop: 40 }}>
							<Text style={styles.itemTitle}>{item.description}</Text>
							<Text style={styles.itemTotal}>{showTotalTasks(item)}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>

			<TouchableOpacity
				style={styles.newTaskBtn}
				onPress={() => navigation.navigate('NewTask')}
			>
				<Icon name="plus" color="#fff" size={35} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fcfcfc',
	},

	title: {
		fontSize: 32,
		color: '#131313',
		fontWeight: 'bold',
		textAlign: 'center',
		paddingTop: 14,
	},

	categoriesContainer: {
		margin: 14,
	},

	item: {
		flex: 1,
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 2,
		margin: 4,
		padding: 13,
	},

	itemTitle: {
		fontSize: 20,
		color: '#404040',
		textAlign: 'left',
	},

	itemTotal: {
		fontSize: 14,
		color: '#909090',
		textAlign: 'left',
	},

	newBtn: {
		width: 65,
		height: 65,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		right: 25,
		bottom: 25,
		elevation: 5,
		borderRadius: 50,
		backgroundColor: '#5684fd',
	},
})