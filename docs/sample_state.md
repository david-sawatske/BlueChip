{
  "session": {
    "currentUser": {
      "id": "11",
      "username": "Player 1"
    }
  },
  "errors": {
    "session": []
  },
  "ui" {
    "home_data": {
      "sampleRemoteData": { }
      "sampleLeagueData": { }
    },
  },
  "entities": {
    "users": {
      "usersById": {
        "1": {
          "id": "1",
          "username": "coy"
        },
        "11": { ... },
      "allUserIds": [ "1", "11" ]
    },
    "leagues": {
      "leaguesById": {
        "1": {
          "id": "1",
          "name": "Farwynd of the Lonely Light",
          "starting_balance": 10000
        },
        "2": { ... },
        "3": { ... },
      "allLeagueIds": [ "1", "2", "3" ],
    },
    "cash_balances": {
      "balancesById": {
        "2": {
          "balance": 75600,
          "id": "2"
        },
        "20": { ... },
        "25": { ... },
        "30": { ... },
        "31": { ... },
        ...
      },
      "allBalanceIds": [ "2", "20", "25", "30", "31" ]
    },
    "transactions": {
      "transactionsById": {
        "7": {
          "ticker": "GTLS",
          "purchase_day": "2017-04-23T01:02:02.326Z",
          "share_quant": 32,
          "share_price": 131.74,
          "id": "7"
        },
        "22": { ... },
        "35": { ... },
        "38": { ... },
        ...
      },
      "allTransactionsIds": [ "7", "22", "35", "38", ... ]
    },
    "user_league_owned": {
      "allUserLeagueOwnedIds": [ "7", "22", "35", "38", ... ],
      "userLeagueOwnedById": {
        "7": {
          "userId": "1",
          "leagueId": "1",
          "stockId": "7",
          "id": "7"
        },
        "22": { ... },
        "35": { ... },
        "38": { ... },
        ...
      }
    },
    "user_league_balances": {
      "allUserLeagueBalanceIds": [ "2", "20", ... ],
      "userLeagueBalanceById": {
        "2": {
          "userId": "1",
          "leagueId": "1",
          "balanceId": "2"
        },
        "20": { ... },
        ....
      }
    }
  },
  "remote_stocks": {
    "remoteStockData": {
      "GTLS": {
        "quote": {
          "symbol": "GTLS",
          "companyName": "Chart Industries Inc.",
          "latestPrice": 44.25,
          "latestSource": "Close",
          "latestTime": "December 14, 2017",
          "latestVolume": 229491,
          "change": -0.97,
          "changePercent": -0.02145,
          "avgTotalVolume": 322864,
          "marketCap": 1361620025,
          "peRatio": 85.1,
          "week52High": 48.78,
          "week52Low": 32.04,
          "ytdChange": 0.22447874356891415
        },
        "news": [
          {
            "datetime": "2017-10-30T16:41:16-04:00",
            "headline": "Carbo Ceramics: Sales On A Roll & Now Finally Cash Flow Improves",
            "source": "SeekingAlpha",
            "url": "https://api.iextrading.com/1.0/stock/gtls/article/8192333012056327",
            "summary": "   Carbo Ceramics ( CRR ) common stock may finally get that badly needed push upward from quarterly results.  Sales have begun recovering at  the start of the year. Now, finally, cash flow improvement is beginning to appear. Management began the commodity price downturn with a boatload of new pro…",
            "related": "CRR,GTLS,IND310,IND31061,METALFAB,NASDAQ01"
          },
          { ... },
          { ... },
          { ... },
          { ... }
        ],
        "series": [
          [ 1513265400000, 44.73 ],
          [ ... ],
          [ ... ],
          ...
        ]
      },
      "KBWP": { ... },
      "AGYS": { ... },
      "KBAL": { ... },
      ...
    }
  }
}
