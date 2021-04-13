import { Tab } from '@material-ui/icons'
import React from 'react'
import Table from './Table'

const costumeStyle = {
    width: '900px',
    margin: 'auto',
    padding: '30px'
}

function Info(props){
    const userInfo = props.userInfo;
    const projectsInfo = props.projects;
    console.log(projectsInfo);
    return (
    <div style={costumeStyle}>
        <Table title="User Information" info={userInfo} tableHeaders={['Email', 'Password']}/>
        <Table title="Projects List" info={userInfo} tableHeaders={['Email', 'Password']}/>
    </div>
    );
}

export default Info;