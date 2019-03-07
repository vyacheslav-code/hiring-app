import React from 'react'
import Applicant from "./Applicant";

export default (props) => (
    <div>
        {props.applicants.filter((e) => e.status === `${props.status}`).length === 0 ? <p>Nobody is {`${props.status}`}</p> :
        props.applicants.filter((e) => e.status === `${props.status}`).map((applicant, index)=>{
            if((props.filters.name !== '' &&
                applicant.name.indexOf(props.filters.name) === -1) &&
                (props.filters.city !== '' &&
                    applicant.city.indexOf(props.filters.city) === -1)
            ){
                return null
            }
            return (<Applicant
                key={index}
                applicant={applicant}
                handleDelete={props.handleRemove}
                handleMoveLeft={props.handleMoveLeft}
                handleMoveRight={props.handleMoveRight}
            />)
        })}
    </div>
)