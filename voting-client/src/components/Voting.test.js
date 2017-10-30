import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
  } from 'react-dom/test-utils';
import Voting from './Voting';

describe('Voting', () => {
    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
          <Voting pair={["Trainspotting", "28 Days Later"]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        
        expect(buttons.length).toEqual(2);
        expect(buttons[0].textContent).toEqual('Trainspotting');
        expect(buttons[1].textContent).toEqual('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;
    
        const component = renderIntoDocument(
          <Voting pair={["Trainspotting", "28 Days Later"]}
                  vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);
    
        expect(votedWith).toEqual('Trainspotting');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
          <Voting pair={["Trainspotting", "28 Days Later"]}
                  hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      
        expect(buttons.length).toEqual(2);
        expect(buttons[0].hasAttribute('disabled')).toEqual(true);
        expect(buttons[1].hasAttribute('disabled')).toEqual(true);
      });

      it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
          <Voting pair={["Trainspotting", "28 Days Later"]}
                  hasVoted="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      
        expect(buttons[0].textContent).toContain('Voted');
      });

      it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
          <Voting winner="Trainspotting" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).toEqual(0);
      
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).toBeTruthy();
        expect(winner.textContent).toContain('Trainspotting');
      });
});
