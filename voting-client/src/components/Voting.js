import React from 'react';
import Winner from './Winner';
import Vote from './Vote';
import {connect} from 'react-redux';


class Voting extends React.PureComponent{
  
  render() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
}


function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}


export {Voting};
export const VotingContainer = connect(mapStateToProps)(Voting);
