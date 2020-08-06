import React from 'react';
import axios from 'axios';
import {
  render,
  waitFor,
  getByTestId,
  screen,
  getByRole,
  fireEvent,
} from '@testing-library/react';
import { Router, Link, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { toBeInTheDocument, toHaveClass } from '@testing-library/jest-dom';
import AgendaContent from './AgendaContent';
import Agenda from './AgendaComponent/Agenda';
import AgendaCreate from './AgendaCreate/AgendaCreate';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
const data = {
  id: 22,
  title: 'string',
  content: 'string',
  created_date: '2020-07-14T13:41:52Z',
  last_update: '2020-07-14T13:41:52Z',
  version: 1,
  project: 1,
  user: 1,
  l_username: 'admin',
  l_first_name: '',
  l_last_name: '',
  tags: [],
};
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Switch>
          <Route path="/agenda/create" component={AgendaCreate} />
        </Switch>
        {ui}
      </Router>
    ),
    history,
  };
}

test('If Agenda Content Loading works', async () => {
  renderWithRouter(<AgendaContent />);

  axios.get.mockResolvedValue(() => Promise.resolve(data));

  expect(screen.getByTestId('loading')).toHaveTextContent('loading');
});

test('If Agenda Content mounted', async () => {
  renderWithRouter(<AgendaContent />);

  axios.get.mockResolvedValue(() => Promise.resolve(data));

  await waitFor(() => {
    expect(screen.getByRole('heading')).toHaveTextContent('Notebooks');
  });
});

// test('If Agenda Content Displayed all agendas', async()=>{
//   renderWithRouter(<AgendaContent/>);

//   axios.get.mockResolvedValue(() => Promise.resolve(data))
//   await waitFor(() => {
//   expect(screen.getByTestId('agenda-testid')).toBeInTheDocument()
//   })
// })

test('If agenda create works', async () => {
  const { container } = renderWithRouter(<AgendaContent />);
  axios.get.mockResolvedValue(() => Promise.resolve(data));

  await waitFor(() => {
    fireEvent.click(screen.getByText(/Add a notebook/i));
    expect(container.innerHTML).toMatch('Create New Notebook');
  });
});
