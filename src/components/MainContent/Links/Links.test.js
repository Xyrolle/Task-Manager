
import React from 'react';
import {
  render,
  waitFor,
  screen,
  fireEvent
} from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import { AppContext} from 'context/AppContext';
import { getLinks } from './queries';
import  LinkContent  from './LinkContent';
import LinkDetails from './LinkDetails/LinkDetails';



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
      <MemoryRouter initialEntries={['projects/137/links/']}>
        <AppContext.Provider value={{ ctx:{ userDetails:{ id:5 } } }}>
          <Route exact component={LinkContent} path="/projects/:projectId/links/"/>
          <Route exact component={LinkDetails} path="/projects/:projectId/links/:linkId"/>
        </AppContext.Provider>
        {ui}
      </MemoryRouter>
    ),
    history,
  };
}

const data =
  {
    data: [{
      comments: [625, 626],
      content: 'asdaasd',
      date: '2020-08-06T13:19:34Z',
      id: 19,
      project: 137,
      tags:  [],
      title: 'fvac',
      user: 5,
    }],
    objects_per_page: 50,
    objects_total:1,
    page_current: 1,
    page_total:1
  };

test('If Links Content loaded with data works', async () => {
  getLinks.mockResolvedValueOnce(data);
  renderWithRouter(<LinkContent />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  expect(getLinks).toHaveBeenCalledTimes(1);

  const title = await screen.findByText(data.data[0].title);
  (expect(title).toBeInTheDocument());
  fireEvent.click(screen.getByText(/Details/i));
  await waitFor(() =>expect(screen.getByText('Comments')));
});



test('If Links Content Loading', async () => {
  // getLinks.mockResolvedValueOnce(data);
  // renderWithRouter(<LinkContent />);
  // await waitFor(() => screen.debug());
  // expect(screen.getByText('Loading...')).toBeInTheDocument();
  // expect(screen.getByText('Loading...')).toBeInTheDocument()
  // expect(getFiles).toHaveBeenCalledTimes(1);
  
  // await waitFor(() => screen.getByText(data[0].title))
  // await waitFor(() => screen.getByAltText('file icon'))
});




