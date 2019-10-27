import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button'
import moment from 'moment';
import 'moment/locale/pt-br';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyle';
import Task from '../components/Task';
import AddTasks from './AddTasks'

export default class Notebook extends Component {
	state = {
		tasks: [
			{
				id: Math.random(),
				desc: 'Aprender React-Native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Aprender Amazon Lambda',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Aprender React-Native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Aprender Amazon Lambda',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Aprender React-Native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Aprender Amazon Lambda',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Aprender React-Native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Aprender Amazon Lambda',
				estimateAt: new Date(),
				doneAt: null
			},
			{
				id: Math.random(),
				desc: 'Aprender React-Native',
				estimateAt: new Date(),
				doneAt: new Date()
			},
			{
				id: Math.random(),
				desc: 'Aprender Amazon Lambda',
				estimateAt: new Date(),
				doneAt: null
			}
		],
		visibleTasks: [],
		showDoneTasks: true, 
		showAddTask:false
	}

	AddTasks = task=>{
		let tasks = [...this.state.tasks]
		
		tasks.push({
			id:Math.random(), 
			desc:task.desc,
			estimateAt:task.estimateAt,
			doneAt:null
		})

		this.setState({tasks,showAddTask:false},this.filterTasks)
	}

	delete = id =>{
		const tasks = this.state.tasks.filter(task => task.id != id)
		this.setState({tasks},this.filterTasks)
	}

	filterTasks = (_) => {
		let visibleTasks = [];

		if (this.state.showDoneTasks) {
			visibleTasks = [ ...this.state.tasks ];
		} else {
			visibleTasks = this.state.tasks.filter((task) => {
				if (task.doneAt == null) {
					return task;
				}
			});
		}

		this.setState({ visibleTasks });
	};

	toggleTasks = _ => {
		this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks);
	};

	componentDidMount = _ => {
		this.filterTasks();
	};

	toggleItem = (id) => {
		let tasks = this.state.tasks.map((task) => {
			if (task.id == id) {
				task = { ...task };
				task.doneAt = task.doneAt ? null : new Date();
			}
			return task;
		});

		this.setState({ tasks }, this.filterTasks);
	};

	render() {
		return (
			<View style={styles.container}>
				
				<AddTasks isVisible={this.state.showAddTask} 
						onSave={this.AddTasks}
						onCancel={()=>this.setState({showAddTask:false})}/>

				<ImageBackground source={todayImage} style={styles.background}>
					<View style={styles.iconBar}>
						<TouchableOpacity onPress={this.toggleTasks}>
							<Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
						</TouchableOpacity>
					</View>
					<View style={styles.titleBar}>
						<Text style={styles.title}>Hoje</Text>
						<Text style={styles.subtitle}>{moment().locale('pt-br').format('ddd, D [de] MMMM')}</Text>
					</View>
				</ImageBackground>
				
				<View style={styles.taskContainer}>
					<FlatList
						data={this.state.visibleTasks}
						keyExtractor={(item) => `${item.id}`}
						renderItem={({ item }) => <Task {...item} toggleItem={this.toggleItem} OnDelete={this.delete} />}
					/>
				</View>

				<ActionButton buttonColor={commonStyles.colors.today}
					onPress={()=>this.setState({showAddTask:true})} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	background: {
		flex: 3
	},
	titleBar: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	title: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 50,
		marginLeft: 20,
		marginBottom: 10
	},
	subtitle: {
		fontFamily: commonStyles.fontFamily,
		color: commonStyles.colors.secondary,
		fontSize: 20,
		marginLeft: 20,
		marginBottom: 30
	},
	taskContainer: {
		flex: 7
	}, 
	iconBar:{
		marginTop:Platform.OS=='ios'?30:10,
		marginHorizontal:20, 
		flexDirection:'row', 
		justifyContent:'flex-end'
	}
});
