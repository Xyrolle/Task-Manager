import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';
import Star from './Star'
import './Projects.css';
import AddProjectModal from './AddProjectModal/AddProjectModal'


const addLikeToProject = async (project: number) => {
    await axios.post(`http://46.101.172.171:8008/project/liked_projects_add/`,
        {
            project,
        },
        axiosConfig
    );
}

const deleteProject = async (id: number) => {
    const response = await axios.delete(`http://46.101.172.171:8008/project/project_delete/${id}`,
        axiosConfig
    );
    return response.data;
}

const getProjects = async () => {
    const response = await axios.get('http://46.101.172.171:8008/project/project_view_by_user/1/1/',
        axiosConfig
    );
    console.log(response.data)
    return response.data;
}

const Projects: React.FC = () => {
    const { status, data, error } = useQuery('getProjects', getProjects);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
    const handleShowModal = () => setIsAddProjectModalOpen(false);

    const [mutate] = useMutation(addLikeToProject, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries('getLikes');
            const snapshot = queryCache.getQueryData('getLikes');
            queryCache.setQueryData('getLikes', (prev: any) => {
                return [...prev, { project: newData }]
            });
            return () => queryCache.setQueryData('getLikes', snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery(createProject)
    })

    const [mutateDeleteProject] = useMutation(deleteProject, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries('getProjects');
            const snapshot = queryCache.getQueryData('getProjects');

            queryCache.setQueryData('getProjects', (prev: any) => {

                return prev.filter(({ project }: any) => project.id !== newData)
            });
            return () => queryCache.setQueryData('getProjects', snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery(createProject)
    })

    if (status === 'loading') return <div>loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div className="test">
            <button
                onClick={() =>
                    setIsAddProjectModalOpen(!isAddProjectModalOpen)}
                className="addProjectButton"
            >
                + Add project
            </button>
            {isAddProjectModalOpen && <AddProjectModal handleShowModal={handleShowModal} />}
            <div className="projectsContainer">
                {data && data.map(({ project }: any, key: number) => {
                    return <div className="project" key={key}>
                        <div className="projectHeader">
                            <div className="projectNameWrap">
                                <Star userId={5} projectId={project.id} />
                                <Link to={`/projects/${project.id}/`}>
                                    <p className="projectName">{project.name}</p>
                                </Link>
                            </div>
                            <p className="projectCompany">{project.company}</p>
                        </div>
                        <p>{project.description}</p>
                        <button onClick={() => mutateDeleteProject(project.id)}>Delete</button>
                        <button onClick={() => mutate(project.id)} >Like</button>
                    </div>
                })}
            </div>
        </div>
    );
};
export default Projects;
