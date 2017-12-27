import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestSampleLeague('random')
  }

  render()  {
    const { currentUser } = this.props;

    return (
      <div className="">
        <h1>Home</h1>
      </div>
    )
  }
}

export default HomePage;
