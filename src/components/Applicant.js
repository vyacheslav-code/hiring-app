import React from 'react'
import {Icon} from 'antd'

export default (props) => (
    <div className="applicant-wrapper">
        <img alt="avatar" src={props.applicant.avatar}/>
        <h3>{props.applicant.name}</h3>
        <h4>{props.applicant.city}</h4>
        <Icon type="close" onClick={() => {
            props.handleDelete(props.applicant.name);
        }}>Remove</Icon>
        {(props.applicant.status === 'hired' || props.applicant.status === 'interviewing') && <Icon type="arrow-left" onClick={
            () => {
                props.handleMoveLeft(props.applicant)
            }
        }>Move Left</Icon>}
        {(props.applicant.status === 'applied' || props.applicant.status === 'interviewing') && <Icon type="arrow-right" onClick={
            () => {
                props.handleMoveRight(props.applicant)
            }
        }>Move Right</Icon>}
    </div>
)