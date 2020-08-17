import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AppContext } from 'context/AppContext';
import { axiosConfig } from 'utils/axiosConfig';
import { getProjects } from 'utils/getProjects';
import Star from './Star';
import './Projects.css';

const deleteProject = async (id: number) => {
  const response = await axios.delete(
    `http://46.101.172.171:8008/project/project_delete/${id}`,
    axiosConfig
  );
  return response.data;
};

// const getProjects = async (key: string, userId: string, page = 1) => {
//   const response = await axios.get(
//     `http://46.101.172.171:8008/project/project_view_by_user/${userId}/${page}/`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     }
//   );
//   return response.data;
// };

const Projects: React.FC = () => {
  const ctx = useContext(AppContext);
  const history = createBrowserHistory({ forceRefresh: true })
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const { setOpenModal, setIsLayoutActive } = ctx;

  const [mutateDeleteProject] = useMutation(deleteProject, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getProjects', ctx.userDetails.id]);
      const snapshot = queryCache.getQueryData([
        'getProjects',
        ctx.userDetails.id,
      ]);
      queryCache.setQueryData(
        ['getProjects', ctx.userDetails.id.toString()],
        (prev: any) => {
          prev[0].data = prev[0].data.filter(
            ({ project }: any) => project.id !== newData
          );
          return prev;
        }
      );
      return () => queryCache.setQueryData('getProjects', snapshot);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
  });

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  }: any = useInfiniteQuery(
    ['getProjects', `${ctx.userDetails.id}`],
    getProjects,
    {
      getFetchMore: (lastGroup: any, allPages: any) => {
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
            {error.message.includes('500') ? (
              <div>Times are empty.</div>
            ) : (
                <span>{error.message}</span>
              )}{' '}
          </span>
        ) : (
              <>
                {data &&
                  data[0].data.map(({ project }: any, key: number) => {
                    return (
                      <div className="project" key={key}>
                        <div className="projectHeader">
                          <div className="projectNameWrap">
                            <Star userId={5} projectId={project.id} />
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
      </div>
      <div>
        {isFetching && !isFetchingMore ? 'Background Updating...' : null}
      </div>
    </div >
  );
};
export default Projects;
