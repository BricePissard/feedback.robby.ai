import React  from 'react'
import Add    from '../containers/Add'
import Graph  from '../containers/Graph'
import List   from '../containers/List'
import Filter from '../containers/Filter'

const App = () => (
  <div id="main">
    <h2>Please leave a feedback</h2>
    <h5>Express your feeling with our product and services.</h5>
    <div className="feedbackTop">
      <Add />
      <Graph />
    </div>
    <Filter />
    <List />
  </div>
)

export default App
