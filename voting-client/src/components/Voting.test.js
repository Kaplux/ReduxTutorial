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
});
