import './app.css';
import AppInfo from '../app-info/app-info';
import { SearchPanel } from '../search-panel/search-panel';
import { AppFilter } from '../app-filter/app-filter';
import { EmployersList } from '../employers-list/employers-list';
import { EmployersAdd } from '../employers-add/employers-add';
import React from 'react';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: "John W." , salary: 800, increase: false, rise: true,  id: 1,},
                {name: "Alex M." , salary: 1200, increase: true, rise: false,  id: 2,},
                {name: "Carl A." , salary: 1600, increase: false, rise: false, id: 3,},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }


    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name,salary) => {
    if(name !== "") {
        let newitem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newDate = [...data, newitem]
            return {
               data: newDate
            }   
        })
    } else {
        return
    }
}

    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item
            })
        }))
    }
    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise}
                }
                return item
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000': 
                return items.filter(item => item.salary >= 1000)
            default:
                return items    
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term,filter} = this.state;
        const employers = this.state.data.length;
        const increase = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data,term), filter)
        return (
            <div className="app">
                <AppInfo number={employers} prem={increase}/>
    
                <div className='search-panel'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                />
                <EmployersAdd onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;