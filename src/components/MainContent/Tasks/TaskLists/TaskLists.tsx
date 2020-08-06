import React, { useRef, useState } from 'react';
import axios from 'axios';

import { useQuery, useMutation, queryCache } from 'react-query';
import { useInfiniteQuery } from 'react-query';

import TaskList from '../TaskList/TaskList';

import './TaskLists.css';

const TaskLists = () => {
  let axiosConfig = {
    headers: {
      Authorization: `Basic YWRtaW46cXdlMTIz`,
    },
  };

  interface IList {
    id: number;
    name: string;
    project: number;
    task_count: number;
    description?: string;
  }

  interface ILists {
    data: IList[];
    page_current: number;
    page_total: number;
  }

  const fetchTaskLists = async (key: any, page_id = 1) => {
    const res = await axios.get(
      `http://46.101.172.171:8008/project/task_list_view_by_project/115/${page_id}/`,
      axiosConfig
    );
    return res.data;
  };

  const {
    data: lists,
    isFetching,
    isFetchingMore,
    fetchMore,
  } = useInfiniteQuery<ILists, string, number>('task-lists', fetchTaskLists, {
    getFetchMore: prev => {
      return prev.page_current + 1;
    },
  });

  const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  console.log('task lists', lists);

  let canFetch =
    lists &&
    lists[lists.length - 1].page_current < lists[lists.length - 1].page_total;

  if (!lists) return <h5>loading</h5>;

  return (
    <div>
      {lists &&
        lists.map((lists_page: ILists) => {
          console.log(lists_page, 'page');
          return (
            lists_page &&
            lists_page.data.map((taskList: IList) => (
              <TaskList
                name={taskList.name}
                id={taskList.id}
                task_count={taskList.task_count}
                description={taskList.description}
                key={taskList.id}
              />
            ))
          );
        })}
      <div className="btn-container">
        <button
          ref={loadMoreButtonRef}
          onClick={() => {
            fetchMore();
          }}
          disabled={!canFetch || isFetching}
          className={
            'btn load-more-lists ' +
            (!canFetch || isFetching ? 'disabledBtn' : '')
          }
        >
          {isFetchingMore
            ? 'Loading more...'
            : lists && canFetch
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </div>
    </div>
  );
};

export default TaskLists;
