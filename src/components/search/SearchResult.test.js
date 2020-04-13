/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import SearchResult from './SearchResult';

describe('SearchResult Component', () => {
  let store;
  let result;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    store = createStore(() => ({
      movies: {
        searchResult: [{ title: 'The Avengers' }, { title: 'Avengers: Endgame' }],
        SearchQuery: 'avengers'
      }
    }));
    const props = {
      searchResult: store.getState().movies.searchResult,
      searchQuery: store.getState().movies.SearchQuery
    };
    result = renderWithRedux(<SearchResult {...props} />, store);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays search component', () => {
    const { getByTestId } = result;
    const elem = getByTestId('searchKeyword');
    expect(elem).toBeInTheDocument();
  });
});

function renderWithRedux(ui, store) {
  const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
  return {
    ...render(
      <Provider store={store}>
        <Router history={historyMock}>{ui}</Router>
      </Provider>
    ),
    store
  };
}
