import React, { useState, useEffect } from 'react';

import { View, Text, StatusBar,  TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { Picker } from '@react-native-community/picker';

import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default function NewTask() {

	const [categories, setCategories] = useState([]);

	const [description, setDescription] = useState('');
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());

	const [showDatePicker, setShowDatePicker] = useState(false);
	const [showTimePicker, setShowTimePicker] = useState(false);

	const [formatedDate, setFormatedDate] = useState('24 Out.');
	const [formatedTime, setFormatedTime] = useState('21:30');

	const [categoryDescription, setCategoryDescription] = useState("Categoria");

	useEffect(() => {
		api.get('/categories').then((response) => {
			setCategories(response.data);
		});
	}, []);

	function handleToggleDatePicker() {
		setShowDatePicker((state) => !state);
	}

	function handleDateChanged(event, date) {
		setShowDatePicker(false);

		if (date) {
			setDate(date);

			const options = {
				month: 'long', day: 'numeric'
			};

			const data = date.toLocaleString('pt-BR', { options });

			console.log(data);

			const day = data.get;
			const month = date.getMonth();

			setFormatedDate(`${day} ${month}`);

			setShowTimePicker(true);
		}
	}

	function handleTimeChanged(event, time) {
		setShowTimePicker(false);

		if (time) {
			setTime(time);

			const hour = time.getHours();
			const min = time.getMinutes();

			setFormatedTime(`${hour}:${min}`);
		}
	}

	async function handleNewTask(e) {
		e.preventDefault();

		const task = {
			description,
			date,
			time,
			category,
		};

		// Salvar nova tarefa
	}

	return (
		<>
			<Text style={styles.title}>Nova Tarefa</Text>

			{showDatePicker && (
				<DateTimePicker
					value={date}
					onChange={handleDateChanged}
					mode="date"
				/>
			)}

			{showTimePicker && (
				<DateTimePicker
					value={time}
					onChange={handleTimeChanged}
					mode="time"
				/>
			)}

			<View style={styles.container}>
				<StatusBar backgroundColor="#fcfcfc" barStyle="dark-content"></StatusBar>

				<TextInput
					style={styles.taskText}
					multiline
					numberOfLines={4}
					placeholder="O que está planejando?"
					onChangeText={text => setDescription(text)}
					value={description}
					autoCorrect={false}
				/>

				<View style={styles.options}>
					<TouchableOpacity style={styles.option} onPress={handleToggleDatePicker}>
						<Icon name="bell-outline" color="#5684fd" size={20} />
						<Text style={styles.optionTextBold}>{`${formatedDate} às ${formatedTime}hs`}</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.option}>
						<Icon name="tag-outline" color="#9d9d9d" size={20} />

						<Picker
							selectedValue={categoryDescription}
							onValueChange={(description, index) => setCategoryDescription(description)}
							style={styles.picker}
						>
							{
								categories.map((category, index) => {
									return (
										<Picker.Item
											style={styles.option}
											label={category.description}
											value={category._id}
											key={category._id}
											color="#131313"
										/>
									);
								})
							}
						</Picker>
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity style={styles.createBtn} onPress={handleNewTask} >
				<Text style={styles.createBtnText}>Criar</Text>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fafafa',
	},

	title: {
		fontWeight: 'bold',
		fontSize: 32,
		textAlign: 'center',
		backgroundColor: '#fafafa',
		paddingTop: 10,
	},

	options: {
		marginTop: 30,
		alignSelf: 'flex-start',
	},

	option: {
		width: '100%',
		flexDirection: 'row',
		marginBottom: 20,
		backgroundColor: '#f7f7f7',
	},

	picker: {
		flex: 1,
		height: 20,
		marginLeft: 5,
		backgroundColor: '#fafafa',
		borderWidth: 0,
	},

	optionText: {
		color: '#9d9d9d',
		marginLeft: 14,
	},

	optionTextBold: {
		color: '#131313',
		marginLeft: 14,
		fontWeight: 'bold'
	},

	taskText: {
		width: '100%',
		color: '#9d9d9d',
		borderWidth: 0,
		borderBottomColor: '#EBEBEB',
		borderBottomWidth: 2,
		alignSelf: 'flex-start',
		fontSize: 16,
	},

	createBtn: {
		padding: 11,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#5684fd',
	},

	createBtnText: {
		color: '#fff',
		fontSize: 16,
	}
})