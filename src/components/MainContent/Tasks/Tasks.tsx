import React from 'react';
import { useParams } from 'react-router-dom';

const Tasks = () => {
	let { projectID } = useParams();
	return <div>hello {projectID} </div>;
};

export default Tasks;
