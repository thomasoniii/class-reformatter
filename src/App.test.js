import React from 'react';
import ReactDOM from 'react-dom';

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import App from './App';

const app = mount(<App/>);

it('renders without crashing', () => {
  expect(app).toBeDefined();
});

it('has instructions', () => {
  expect(app.contains("Instructions:")).toEqual(true);
})

it('accepts input', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.";
  const textarea = app.find('textarea');
  textarea.simulate('change', { target : { value : originalList}});

  expect(app.state().list).toEqual(originalList);
})

it('convert w/o options is identical', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.";
  app.setState(
    {
      list            : originalList,
      lowercase_names : false,
      uppercase_first : false,
      remove_mi       : false,
      reverse_name    : false
    }
  );
  app.instance().convert();
  expect(app.state().list).toEqual(originalList);
})

it('can lowercase names', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.";
  const newList = 'baker, able a.\ndogwood, carter c.';
  app.setState(
    {
      list            : originalList,
      lowercase_names : true,
      uppercase_first : false,
      remove_mi       : false,
      reverse_name    : false
    }
  );
  app.instance().convert();
  expect(app.state().list).toEqual(newList);
})

it('can lowercase + ucfirst names', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.\nO'NEILL, ROGER F.";
  const newList = "Baker, Able A.\nDogwood, Carter C.\nO'Neill, Roger F.";
  app.setState(
    {
      list            : originalList,
      lowercase_names : true,
      uppercase_first : true,
      remove_mi       : false,
      reverse_name    : false
    }
  );
  app.instance().convert();
  expect(app.state().list).toEqual(newList);
})

it('can lowercase + ucfirst + remove mi names', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.\nO'NEILL, ROGER F.\nWILLIAMS, BILLY DEE";
  const newList = "Baker, Able\nDogwood, Carter\nO'Neill, Roger\nWilliams, Billy Dee";
  app.setState(
    {
      list            : originalList,
      lowercase_names : true,
      uppercase_first : true,
      remove_mi       : true,
      reverse_name    : false
    }
  );
  app.instance().convert();
  expect(app.state().list).toEqual(newList);
})

it('can lowercase + ucfirst + remove mi + reverse names', () => {
  const originalList = "BAKER, ABLE A.\nDOGWOOD, CARTER C.\nO'NEILL, ROGER F.\nWILLIAMS, BILLY DEE";
  const newList = "Able Baker\nCarter Dogwood\nRoger O'Neill\nBilly Dee Williams";
  app.setState(
    {
      list            : originalList,
      lowercase_names : true,
      uppercase_first : true,
      remove_mi       : true,
      reverse_name    : true
    }
  );
  app.instance().convert();
  expect(app.state().list).toEqual(newList);
})
