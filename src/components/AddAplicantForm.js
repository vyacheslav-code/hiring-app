import React from 'react'
import {Icon} from 'antd'

export default class AddApplicantForm extends React.Component {
    state = {
        error: undefined
    };
    handleAdd = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value.trim().toUpperCase();
        const city = e.target.elements.city.value.trim().toUpperCase();
        const error = this.props.handleAdd(name, city);

        this.setState(() => ({error}));
        if(!error) {
            e.target.elements.name.value = '';
            e.target.elements.city.value = '';
        }
    };

    render() {
        return (
            <div className="add-applicant">
                <h2>Add Applicant</h2>
                {this.state.error && <p className="error">{this.state.error}</p>}
                <form onSubmit={this.handleAdd}>
                    <input  className="add-applicant-input" placeholder="NAME" type="text" name="name"/>
                    <input  className="add-applicant-input" placeholder="CITY" type="text" name="city"/>
                    <button><Icon type="plus"/></button>
                </form>
            </div>
        );
    }
}