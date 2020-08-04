import { useMutation, queryCache } from 'react-query';
import { defaultCoreCipherList } from 'constants';

const switchOnMutate = (newData: any, key: any, id: any) => {
  queryCache.cancelQueries(key);
  const snapshot = queryCache.getQueryData(key);

  switch (id) {
    case 'AgendaDetails':
      queryCache.setQueryData(key, (prev: any) => {
        return {
          content: newData.content,
          tags: prev.tags,
          title: prev.title,
        };
      });
      return () => queryCache.setQueryData(key, snapshot);

    case 'TaskDeleteTask':
      if (key) {
        queryCache.setQueryData(key, (prev: any) => {
          if (prev) {
            prev['data'] = prev.data.filter((task: ITask) => {
              return id !== task.id;
            });
          }
        });
      } else {
        queryCache.setQueryData(id, null);
      }
      break;

    case 'TaskDeleteTag':
      if (key[0] && key[1]) {
        queryCache.cancelQueries(key[1]);
        queryCache.setQueryData(key[1], (prev: any) => {
          let task_to_change = prev.data.find(
            (task: ITask) => task.id === newData.task_id
          );
          task_to_change.tags = task_to_change.tags.filter((tag: any) => {
            return tag.id !== newData.tag_id;
          });
          return prev;
        });
        key[0] = key[0].filter((tag: any) => tag.id !== newData.tag_id);
        return key[0];
      } else {
        queryCache.cancelQueries(`details-for-task-${newData.task_id}`);
        queryCache.setQueryData(
          `details-for-task-${newData.task_id}`,
          (prev: any) => {
            if (prev.data) {
              prev.data.tags = prev.tags.filter(
                (tag: any) => tag.id !== newData.tag_id
              );
            }
            return prev;
          }
        );
      }
      break;

    case 'TaskDetailsAddComment':
      queryCache.setQueryData(key, (prev: any) => {
        prev[0].data = prev[0].data.concat({
          ...newData,
          date: '0',
          author: 'You',
        });
        return prev;
      });
      break;

    case 'TaskDetailsAddTag':
      queryCache.setQueryData(key, (prev: any) => {
        prev['tags'] = [...prev['tags'], { title: newData }];
        return prev;
      });
      break;

    case 'TaskListDelete':
      queryCache.cancelQueries(newData.id);
      queryCache.setQueryData(key, (prev: any) => {
        prev = prev.map((taskLists: any) => {
          taskLists.data = taskLists.data.filter((taskList: any) => {
            return taskList.id !== newData.id;
          });
          return taskLists;
        });
        return prev;
      });
      break;

    case 'TaskListMutate':
      if (newData.title.length > 1) {
        queryCache.setQueryData(id, (prev: any) => {
          console.log(prev, 'is prev', [
            ...prev.data,
            { ...newData, id: new Date().toISOString() },
          ]);
          prev['data'] = [
            ...prev.data,
            { ...newData, id: new Date().toISOString },
          ];
          return prev;
        });
      }
      break;

    case 'AddTimeModal':
      return () => queryCache.setQueryData(key, snapshot);

    case 'Projects':
      queryCache.setQueryData(key, (prev: any) => {
        return {
          data: prev.data.filter(({ project }: any) => project.id !== newData),
        };
      });
      return () => queryCache.setQueryData(key[0], snapshot);

    case 'Star':
      queryCache.setQueryData(key, (prev: any) => {
        prev.data.push({ project: newData });
        return prev;
      });
      return () => queryCache.setQueryData('getLikes', snapshot);

    case 'AddLinkModal':
      return () => queryCache.setQueryData(key[0], snapshot);

    case 'TagDropdown':
      return;

    case 'AddProjectModal':
      return;

    default:
      return;
  }
};

const useMutate = (
  func: any,
  key: any,
  id: string,
  rb: boolean,
  onSet: string
) => {
  const [mutate] = useMutation(func, {
    onMutate: (newData: any) => {
      switchOnMutate(newData, key, id);
    },
    onError: (error: any, newData: any, rollback: any) => rb && rollback(),
    onSettled: () => {
      switch (onSet) {
        case 'prefetch':
          queryCache.prefetchQuery(key);
          break;

        case 'invalidate':
          queryCache.invalidateQueries(key);
          break;

        case 'invalidate80':
          setTimeout(() => {
            queryCache.invalidateQueries(key);
          }, 80);
          break;

        case 'none':
          return;
        default:
          return;
      }
    },
  });

  return [mutate];
};

export { useMutate };
