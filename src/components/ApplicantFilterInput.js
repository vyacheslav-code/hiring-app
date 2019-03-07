import React from 'react'

export default class extends React.Component {
    state = {
        selected: 'name'
    };
    handleChange = (e) => {
        this.setState({selected: e.target.value});
    };
    render() {
        return (
            <div className="filters">
                <h2>Filter Applicants</h2>
                <select value={this.state.selected} onChange={this.handleChange}>
                    <option value="name">Name</option>
                    <option value="city">City</option>
                </select>
                {   this.state.selected === 'name' ?
                    <input  placeholder="NAME" onChange={(e) => this.props.filterByName(e.target.value.toUpperCase())}/> :
                    <input  placeholder="CITY" onChange={(e) => this.props.filterByCity(e.target.value.toUpperCase())}/>
                }
            </div>
        );
    }
}
