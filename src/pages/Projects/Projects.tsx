import React, { useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from 'context/AppContext';
import { getProjects } from 'utils/getProjects';
import Star from './Star';
import './Projects.css';
import { ProjectInterface, ProjectsInterface } from './interfaces'
import { deleteProject } from './queries'

const Projects: React.FC = () => {
  const ctx = useContext(AppContext);
  const history = createBrowserHistory({ forceRefresh: true })
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const { setOpenModal, setIsLayoutActive } = ctx;

  const [mutateDeleteProject] = useMutation(deleteProject, {
    onMutate: (newProjectId: number) => {
      queryCache.cancelQueries(['getProjects', ctx.userDetails.id]);

      queryCache.setQueryData(
        ['getProjects', ctx.userDetails.id.toString()],
        (prev: ProjectsInterface[] | undefined) => {
          if (prev) {
            prev[0].data = prev[0].data.filter(
              (project: ProjectInterface) => project.id !== newProjectId
            );
          }
          return prev;
        }
      );
    },
    onError: (error) => console.log(error),
  });

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(
    ['getProjects', `${ctx.userDetails.id}`],
    getProjects,
    {
      getFetchMore: (lastGroup: ProjectsInterface) => {
        if (lastGroup.page_current + 1 > lastGroup.page_total) {
          return false;
        } else {
          return lastGroup.page_current + 1;
        }
      },
    }
  );

  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div className="test">
      <div className="projectsHeader">
        <h3>Active Projects</h3>
        <div>
          <button
            onClick={() => ctx.setOpenModal('addProjectModal')}
            className="addProjectButton"
          >
            + Add project
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              history.push('/')
            }}
            className="logoutButton"
          >
            Logout
      </button>
        </div>
      </div>
      <div className="projectsContainer">
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : status === 'error' ? (
          <span>
            {' '}
            {error && error.message.includes('500') ? (
              <div>Times are empty.</div>
            ) : (
                <span>{error && error.message}</span>
              )}{' '}
          </span>
        ) : (
              <>
                {data &&
                  data[0].data.map((project: ProjectInterface, key: number) => {
                    return (
                      <div className="project" key={key}>
                        <div className="projectHeasder">
                          <div className="projectNameWrap">
                            <Star userId={ctx.userDetails.id} projectId={project.id} />
                            <Link to={`/projects/${project.id}/`}>
                              <p
                                className="projectName"
                                onClick={() => {
                                  setIsLayoutActive(true);
                                }}
                              >
                                {project.name}
                              </p>
                            </Link>
                          </div>
                          <p className="projectCompany">{project.company}</p>
                        </div>
                        <p className="projectDescription">{project.description}</p>
                        <button onClick={() => mutateDeleteProject(project.id)}>
                          Delete
                        </button>
                      </div>
                    );
                  })}
              </>
            )}
      </div>
      <div>
        {!canFetchMore &&
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchMore()}
            disabled={!canFetchMore || isFetchingMore}
          >
            {isFetchingMore
              ? 'Loading more...'
              : canFetchMore
                ? 'Load More'
                : 'Nothing more to load'}
          </button>
        }
      </div>
      <div>
        {isFetching && !isFetchingMore ? 'Background Updating...' : null}
      </div>
    </div >
  );
};
export default Projects;
