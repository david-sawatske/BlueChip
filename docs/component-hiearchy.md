## Component Hierarchy

**SessionFormContainer**
  * SessionForm

**MastheadContainer**
  * Masthead
  * TopNav
  * SessionFormContainer (modal)

**HomePageContainer**
  * HomePage
    * StockChart
    * StockHeader
    * LeagueIndexItem

**UserShowContainer**
  * UserAvatar
  * UserLeagueIndex
    * UserLeaguePortfolio
      * UserLeaguePortfolioHeader
      * StockShow

**TransactionContainer**
* Transaction
  * DataByLeague (if StockSearchContainer ancestor)
  * PurchaseDateData

**StockSearchContainer**
* StockSearch
  * StockShow

**LeagueIndexContainer**
* LeagueIndex
  * LeagueIndexItem
    * LeagueLeaderboard
      * LeagueLeaderboardItem

**LeagueFormContainer**
* LeagueForm

**StockShow (presentational)**
  * StockHeader
  * StockSummary
  * StockChart
  * StockNewsIndex
    * StockNewsItem
  * UserOwnedData
    * DataByLeague
    * TransactionContainer (modal)

## Routes
|Path   | Component   |
|-------|-------------|
| "/" | ```HomeContainer``` |
| "/users/:userId" | ```UserShowContainer``` |
| "/leagues" | ```LeagueIndexContainer``` |
| "/leagues/new" | ```LeagueFormContainer``` |
| "/stock/search" | ```StockSearchContainer``` |

## Rendering Path Independent Containers
```MastheadContainer``` rendered on every page via the header of div.container element  <br>
```SessionFormContainer``` rendered as a modal within ```MastheadContainer``` <br>
```TransactionContainer``` rendered as a modal within ```StockShow``` <br>
