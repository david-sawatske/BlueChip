import * as LeagueAPIUtil from '../util/league_api_util';

export const START_RAILS_LEAGUE_FETCH = 'START_RAILS_LEAGUE_FETCH';
export const RECEIVE_TARGET_LEAGUE = 'RECEIVE_TARGET_LEAGUE';
export const RECEIVE_ALL_LEAGUES = 'RECEIVE_ALL_LEAGUES';

// sync action creators
export const receiveTargetLeague = league => ({
  type: RECEIVE_TARGET_LEAGUE,
  targetLeague: league
});

export const receiveAllLeagues = allLeagues => ({
  type: RECEIVE_ALL_LEAGUES,
  allLeagues
});

export const startRailsLeagueFetch = () => ({
  type: START_RAILS_LEAGUE_FETCH
});

// thunk async action creators
export const requestTargetLeague = id => dispatch => {
  dispatch(startRailsLeagueFetch());
  return LeagueAPIUtil.fetchTargetLeague(id).then(league => {
    dispatch(receiveTargetLeague(league))
  });
};

export const requestAllLeagues = () => dispatch => {
  dispatch(startRailsLeagueFetch());
  return LeagueAPIUtil.fetchAllLeagues().then(leagues => {
    dispatch(receiveAllLeagues(leagues));
  });
};

export const createLeague = league => dispatch => (
  LeagueAPIUtil.createLeague(league).then(data => {
    dispatch(receiveTargetLeague(data));
    return(data);
  })
);
