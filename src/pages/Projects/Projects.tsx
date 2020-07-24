import React, { useRef } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';
import Star from './Star'
import './Projects.css';


const addLikeToProject = async (id: number) => {
    const response = await axios.post(`http://46.101.172.171:8008/project/liked_projects_add/`,
        {
            project: id
        },
        axiosConfig
    );
    console.log(response);
}

const deleteProject = async (id: number) => {
    const response = await axios.delete(`http://46.101.172.171:8008/project/project_delete/${id}`,
        axiosConfig
    );
    return response.data;
}

const createProject = (name: string, description: string, company: string) => {
    axios.post('http://46.101.172.171:8008/project/project_create/', {
        name,
        description,
        company
    },
        axiosConfig
    )
        .then(function (response) {
            console.log('Create project', response);
        })
        .catch(function (error) {
            console.log(error);
        })
}

const getProjects = async () => {
    const response = await axios.get('http://46.101.172.171:8008/project/project_view_by_user/5/1/',
        axiosConfig
    );
    return response.data;
}


const Projects: React.FC = () => {
    const { status, data, error } = useQuery('getProjects', getProjects);
    const nameInput = useRef<HTMLInputElement>(null)
    const descriptionInput = useRef<HTMLInputElement>(null)
    const companyInput = useRef<HTMLInputElement>(null)
    console.log('projects', data)

    if (status === 'loading') return <div>loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div>
            <p> Name: <input ref={nameInput} type="text" placeholder="Name" /></p>
            <p>Description: <input ref={descriptionInput} type="text" placeholder="Description" /></p>
            <p>Company: <input ref={companyInput} type="text" placeholder="Company" /></p>
            <button
                onClick={() => {
                    createProject(
                        nameInput.current!.value,
                        descriptionInput.current!.value,
                        companyInput.current!.value
                    )
                }}>
                Add Project
            </button>
            <div className="projectsContainer">
                {data && data.map(({ project }: any, key: number) => {
                    return <div className="project">
                        <Link to={`/projects/${project.id}/`}> <p>{project.name}</p></Link>
                        <p>{project.description}</p>
                        <p>{project.company}</p>
                        <button onClick={() => deleteProject(project.id)}>Delete</button>
                        <button onClick={() => addLikeToProject(project.id)} >Like</button>
                        <Star userId={5} projectId={project.id} />
                    </div>
                })}
            </div>
        </div>
    );
};
export default Projects;
