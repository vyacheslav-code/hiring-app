import React from 'react'
import ApplicantsList from './ApplicantsList'
import AddApplicantForm from './AddAplicantForm'
import ApplicantFilterInput from './ApplicantFilterInput'
import Header from './Header'
import 'antd/dist/antd.css';
import axios from 'axios'
import {Row, Col} from 'antd'

export default class HiringApp extends React.Component {
    state = {
        filters: {
            name: '',
            city: ''
        },
        applicants: []
    };
    componentDidMount(){
        try {
            const json = localStorage.getItem('state');
            const state = JSON.parse(json);

            if (state) {
                this.setState(() => (state));
            } else {
                axios.get(`https://randomuser.me/api/?nat=gb&results=5`)
                    .then(res => {
                        const randomapplicants = res.data.results;
                        let applicants = randomapplicants.map((person) =>({
                            name: (person.name.first+' '+person.name.last).toUpperCase(),
                            city: person.location.city.toUpperCase(),
                            avatar: person.picture.thumbnail,
                            status: randomapplicants.indexOf(person) <= 2 ? 'applied' : 'interviewing'
                        }));
                        this.setState({ applicants });
                    })
            }
        } catch (e) {
            console.log('Error',e);
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            const json = JSON.stringify(this.state);
            localStorage.setItem('state', json);
        }
    }
    handleAdd = (name, city) => {
        if(!name){
            return 'Please enter name'
        } else if(!city){
            return 'Please enter city'
        }
        this.setState((prevState) => ({
            applicants: prevState.applicants.concat({name, status: 'applied', city,avatar: 'https://www.shareicon.net/data/48x48/2016/05/24/769980_man_512x512.png'})
        }))
    };
    handleRemove = (name) => {
        this.setState((prevState) => ({
            applicants: prevState.applicants.filter((person) => name !== person.name)
        }))
    };
    handleMoveLeft = (applicant) => {
      if(applicant.status === 'hired'){
         applicant.status = 'interviewing';
      } else if(applicant.status === 'interviewing'){
          applicant.status = 'applied'
      }
        this.setState((prevState) => ({
            applicants: prevState.applicants.filter((person) => name !== person.name)
        }))
    };
    handleMoveRight = (applicant) => {
        if(applicant.status === 'applied'){
            applicant.status = 'interviewing';
        } else if(applicant.status === 'interviewing'){
            applicant.status = 'hired'
        }
        this.setState((prevState) => ({
            applicants: prevState.applicants.filter((person) => name !== person.name)
        }))
    };
    handleFilterByName = (name) => {
        this.setState(() => ({
            filters: {
                name
            }
        }))
    };
    handleFilterByCity = (city) => {
        this.setState(() => ({
            filters: {
                city
            }
        }))
    };


    render(){
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                <AddApplicantForm handleAdd={this.handleAdd}/>
                    </Col>
                    <Col span={12}>
                <ApplicantFilterInput
                    filterByName={this.handleFilterByName}
                    filterByCity={this.handleFilterByCity}
                />
                    </Col>
                </Row>
                <Row className="main-wrapper">
                    <Col span={8}>
                <h2>Applied</h2>
                <ApplicantsList
                    applicants={this.state.applicants}
                    status={'applied'}
                    filters={this.state.filters}
                    handleRemove={this.handleRemove}
                    handleMoveLeft={this.handleMoveLeft}
                    handleMoveRight={this.handleMoveRight}
                />
                    </Col>
                    <Col span={8}>
                <h2>Interviewing</h2>
                <ApplicantsList
                    applicants={this.state.applicants}
                    status={'interviewing'}
                    filters={this.state.filters}
                    handleRemove={this.handleRemove}
                    handleMoveLeft={this.handleMoveLeft}
                    handleMoveRight={this.handleMoveRight}
                />
                    </Col>
                    <Col span={8}>
                <h2>Hired</h2>
                <ApplicantsList
                    applicants={this.state.applicants}
                    status={'hired'}
                    filters={this.state.filters}
                    handleRemove={this.handleRemove}
                    handleMoveLeft={this.handleMoveLeft}
                    handleMoveRight={this.handleMoveRight}
                />
                    </Col>
                </Row>
            </div>
        );
    }

}