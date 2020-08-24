
import React from 'react';
import {
  render,
  waitFor,
  screen,
} from '@testing-library/react';

import {  Route, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FilesContent from './FilesContent';
import '@testing-library/jest-dom/extend-expect';
import { getFiles } from './queries';

jest.mock('axios');
jest.mock('./queries');

function renderWithRouter(
  ui,
  {
    route = '/projects/137/links',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <MemoryRouter initialEntries={['projects/137/files']}>
        <Route component={FilesContent} path="/projects/:projectId/files"/>
        {ui}
      </MemoryRouter>
    ),
    history,
  };
}

const data =[{
  id: 27,
  title: 'asdasd',
  upload: '/media/uploads/Screen_Shot_2020-08-05_at_16.53.08_Usb8dEg.png',
  dat: '2020-08-10T13:12:37Z',
  project: 137
}];

test('If Files Content loaded with data works', async () => {
  getFiles.mockResolvedValueOnce(data);
  renderWithRouter(<FilesContent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(getFiles).toHaveBeenCalledTimes(1);
   
  await screen.findByText(data[0].title);
  await screen.findByAltText('file icon');
});




