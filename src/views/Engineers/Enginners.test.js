import React from 'react';
import Colors from './Colors';
import { mount } from 'enzyme'
import Engineers from './Enginners';

it('renders without crashing', () => {
  mount(<Engineers />);
});
