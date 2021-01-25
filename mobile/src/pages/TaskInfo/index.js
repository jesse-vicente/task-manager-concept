import React, { useState, useEffect } from 'react';

import { View, Text, FlatList, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default function NewTask({ route, navigation }) {

	const { category_id, category, icon } = route.params;

	// const [tasks, setTasks] = useState([]);
	const [isSelected, setSelection] = useState(false);

    // useEffect(() => {
    //     api.get(`/tasks/${category_id}`).then((response) => {
	// 		const taskItems = response.data;

	// 		taskItems.map(task => {
	// 			let data = new Date(task.start_date);
	// 			console.log(data.getHours())
	// 		});

	// 		setTasks(response.data);
	// 	});
	// }, []);

	const tasks = [
		{_id: '5f84efae77b0c8236418b33b', description: 'Estudar Flutter', start_date: '24 Out. às 21:00hs'},
		{_id: '5f84f4df79dab353ac87d5b4', description: 'Estudar React Native', start_date: '10 Dez. às 10:30hs'},
	];

	return (
		<>
			<StatusBar backgroundColor="#5684fd" barStyle="light-content" ></StatusBar>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.iconContainer}>
						<Icon name={icon} color="#5684fd" size={28} />
					</View>

					<Text style={styles.title}>{category}</Text>
					<Text style={{ color: '#fff' }}>{tasks.length} Tarefas</Text>
				</View>

				<FlatList
					data={tasks}
					style={styles.containerList}
					keyExtractor={(item ) => item._id}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.item}>
							<View style={styles.itemInfo}>
								<Text style={styles.description}>{item.description}</Text>
								<Text style={styles.date}>{item.start_date}</Text>
							</View>
							<CheckBox
								value={isSelected}
								onValueChange={setSelection}
								tintColors={{ true: '#5684fd' }}
							/>
						</TouchableOpacity>
					)}
				/>

				<TouchableOpacity style={styles.newBtn} onPress={() => navigation.navigate('NewTask')}>
					<Icon name="plus" color="white" size={30} />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: '#5684fd',
		paddingTop: 50,
	},

	header: {
		paddingHorizontal: 30,
		paddingBottom: 30,
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

	title: {
		color: '#fff',
		fontSize: 32,
		fontWeight: 'bold',
		marginTop: 15,
	},

	iconContainer: {
		width: 40,
		height: 40,
		backgroundColor: '#fff',
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},

	containerList: {
		flex: 1,
		width: '100%',
		backgroundColor: '#fff',
		borderTopLeftRadius: 13,
		borderTopRightRadius: 13,
		padding: 30,
	},

	item: {
		margin: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	itemInfo: {
		paddingVertical: 10,
	},

	// itemCheckBox: {
	// 	: 'flex-end'
	// },

	description: {
		fontSize: 16,
		fontWeight: 'bold',
	},

	date: {
		color: '#9d9d9d',
	},
})