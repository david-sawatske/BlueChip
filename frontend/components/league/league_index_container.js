import { connect } from 'react-redux'

import { requestAllLeagues } from '../../actions/league_actions';

import LeagueIndex from './league_index';

const mapStateToProps = state => ({
  leagueIds: state.entities.leagues.allLeagueIds,
  leagueData: tempSelectedState
})

const mapDispatchToProps = dispatch => ({
  requestAllLeagues: () => dispatch(requestAllLeagues()),
  requestTargetUserData: id => dispatch(requestTargetUserData(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueIndex)


const tempSelectedState = {
  "1": {
    "id": 1,
    "name": "Farwynd of the Lonely Light",
    "startingBalance": 10000,
    "leagueUserData": [
      {
        "username": "genesis",
        "id": 2,
        "cashBalance": 96720,
        "cashInvested": 65773.92
      },
      {
        "username": "freida.cummerata",
        "id": 9,
        "cashBalance": 99689,
        "cashInvested": 60616.3
      },
      {
        "username": "coy",
        "id": 1,
        "cashBalance": 75600,
        "cashInvested": 47380.68
      },
      {
        "username": "ardith.oconnell",
        "id": 4,
        "cashBalance": 33773,
        "cashInvested": 55828.75
      },
      {
        "username": "joesph",
        "id": 6,
        "cashBalance": 53861,
        "cashInvested": 24999.69
      },
      {
        "username": "johanna",
        "id": 5,
        "cashBalance": 27637,
        "cashInvested": 46155.64000000001
      },
      {
        "username": "danika_roberts",
        "id": 8,
        "cashBalance": 19003,
        "cashInvested": 51947.78
      },
      {
        "username": "caie_volkman",
        "id": 3,
        "cashBalance": 27996,
        "cashInvested": 32479.550000000003
      },
      {
        "username": "sally_jones",
        "id": 10,
        "cashBalance": 9890,
        "cashInvested": 32956.979999999996
      },
      {
        "username": "t1",
        "id": 11,
        "cashBalance": 10000,
        "cashInvested": 0
      },
      {
        "username": "gabrielle",
        "id": 7,
        "cashBalance": 2829,
        "cashInvested": 6315.52
      }
    ]
  },
  "2": {
    "id": 2,
    "name": "Greenfield of Greenfield",
    "startingBalance": 10000,
    "leagueUserData": [
      {
        "username": "sally_jones",
        "id": 10,
        "cashBalance": 27161,
        "cashInvested": 98280.08
      },
      {
        "username": "freida.cummerata",
        "id": 9,
        "cashBalance": 63374,
        "cashInvested": 22707.58
      },
      {
        "username": "genesis",
        "id": 2,
        "cashBalance": 13744,
        "cashInvested": 67171.26000000001
      },
      {
        "username": "coy",
        "id": 1,
        "cashBalance": 50390,
        "cashInvested": 30216.850000000002
      },
      {
        "username": "caie_volkman",
        "id": 3,
        "cashBalance": 41772,
        "cashInvested": 33466.19
      },
      {
        "username": "ardith.oconnell",
        "id": 4,
        "cashBalance": 55433,
        "cashInvested": 17964.83
      },
      {
        "username": "danika_roberts",
        "id": 8,
        "cashBalance": 9244,
        "cashInvested": 54543.86
      },
      {
        "username": "johanna",
        "id": 5,
        "cashBalance": 45718,
        "cashInvested": 9876.24
      },
      {
        "username": "joesph",
        "id": 6,
        "cashBalance": 22183,
        "cashInvested": 20690.86
      },
      {
        "username": "gabrielle",
        "id": 7,
        "cashBalance": 22020,
        "cashInvested": 17806.67
      },
      {
        "username": "t1",
        "id": 11,
        "cashBalance": 888,
        "cashInvested": 0
      }
    ]
  },
  "3": {
    "id": 3,
    "name": "Swyft of Cornfield",
    "startingBalance": 10000,
    "leagueUserData": [
      {
        "username": "ardith.oconnell",
        "id": 4,
        "cashBalance": 89833,
        "cashInvested": 98329.20000000001
      },
      {
        "username": "coy",
        "id": 1,
        "cashBalance": 33020,
        "cashInvested": 97028.28
      },
      {
        "username": "joesph",
        "id": 6,
        "cashBalance": 86551,
        "cashInvested": 31070.07
      },
      {
        "username": "sally_jones",
        "id": 10,
        "cashBalance": 67001,
        "cashInvested": 41909
      },
      {
        "username": "caie_volkman",
        "id": 3,
        "cashBalance": 68000,
        "cashInvested": 40310.18
      },
      {
        "username": "genesis",
        "id": 2,
        "cashBalance": 24548,
        "cashInvested": 42936.36
      },
      {
        "username": "freida.cummerata",
        "id": 9,
        "cashBalance": 8220,
        "cashInvested": 35439.62
      },
      {
        "username": "gabrielle",
        "id": 7,
        "cashBalance": 16482,
        "cashInvested": 26059.739999999998
      },
      {
        "username": "danika_roberts",
        "id": 8,
        "cashBalance": 2993,
        "cashInvested": 26942.82
      }
    ]
  }
}
