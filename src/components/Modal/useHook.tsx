import React from 'react'
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../utils/axiosConfig';

interface foo {

  name: string;
  description: string;
  company: string;
  userId: string;

}

const createProject = ({
  name,
  description,
  company,
  userId,
}: any): Promise<void> => {
  return axios
    .post(
      'http://46.101.172.171:8008/project/project_create/',
      {
        name,
        description,
        company,
      },
      axiosConfig
    )
    .then(function (response) {

    })
    .catch(function (error) {
      console.log(error);
    });
};
// key: any, dataObject: any, returnStatment: any

const useHook = () => {
  const mutateCustom = (key: any, data: any, returnStatment: any): any => {
    mutate({ key: [key], data, returnStatment })
  }
  const [mutate] = useMutation(createProject, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(newData.key[0]);
      queryCache.setQueryData(newData.key[0], (prev: any) => {

        return newData.returnStatment;
      });
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.invalidateQueries(['getProjects', '5'])
  });
  return { mutateCustom };
}

export default useHook
