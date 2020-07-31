import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig';
import Star from './Star'
import './Projects.css';
import AddProjectModal from './AddProjectModal/AddProjectModal'
import { AppContext } from '../../context/AppContext'

const deleteProject = async (id: number) => {
    const response = await axios.delete(`http://46.101.172.171:8008/project/project_delete/${id}`,
        axiosConfig
    );
    return response.data;
}

const getProjects = async (key: string, userId: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/project/project_view_by_user/${userId}/1/`,
        axiosConfig
    );
    return response.data;
}

const Projects: React.FC = () => {
    const ctx = useContext(AppContext);
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
    const handleShowModal = () => setIsAddProjectModalOpen(false);
    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }
    const { status, data, error } = useQuery(['getProjects', ctx.userDetails && ctx.userDetails.id], getProjects);

    const [mutateDeleteProject] = useMutation(deleteProject, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries('getProjects');
            const snapshot = queryCache.getQueryData('getProjects');

            queryCache.setQueryData(['getProjects', ctx.userDetails && ctx.userDetails.id], (prev: any) => {
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
                    </div>
                })}
            </div>
        </div>
    );
};
export default Projects;
