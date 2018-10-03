import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from 'react-redux'
import { configure, shallow, mount, render } from 'enzyme'
import Adapter            from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store';
import thunk              from 'redux-thunk';

import App            from './components/App';
import FeedbackAdd    from './components/FeedbackAdd'
import FeedbackFilter from './components/FeedbackFilter'
import reducer        from './reducers'
import Constants      from './constants'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  feedbacks: Constants.DEFAULT_FEEDBACKS
}

const store = mockStore(initialState);

configure({ adapter: new Adapter() });

describe('Testing if the application can mount', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Control if the default state is valid', () => {
  it('Returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  })
})

describe('Testing "_validateFields" methods once the Add feedback is called', () => {
  const _props = {
    addFeedback: jest.fn()
  }
  let __state, _state = {
    feedback: {
      names:'hello1',
      email:'test@test.com',
      rating: 1,
      comment: 'bla bla bla bla bla bla bla bla'
    }
  }

  it('"email" should be INVALID', () => {
    _state.feedback.email = 'WRONG_EMAIL'
    const wrapper = mount(<FeedbackAdd { ..._props } />)
    wrapper.setState(_state, () => {
      wrapper.find('form').simulate('submit')
      __state = wrapper.state('formErrors')
      expect(__state.email).toBe(' is invalid')
    })
  })

  it('"email" should be VALID', () => {
    _state.feedback.email = 'test@test.com'
    const wrapper = mount(<FeedbackAdd { ..._props } />)
    wrapper.setState(_state, () => {
      wrapper.find('form').simulate('submit')
      __state = wrapper.state('formErrors')
      expect(__state.email).toBe('')
    })
  })

  it('"name" should be TOO SHORT', () => {
    _state.feedback.names = 'a'
    const wrapper = mount(<FeedbackAdd { ..._props } />)
    wrapper.setState(_state, () => {
      wrapper.find('form').simulate('submit')
      __state = wrapper.state('formErrors')
      expect(__state.names).toBe(' is too short')
    })
  })

  it('"name" should be VALID', () => {
    _state.feedback.names = 'John Doe'
    const wrapper = mount(<FeedbackAdd { ..._props } />)
    wrapper.setState(_state, () => {
      wrapper.find('form').simulate('submit')
      __state = wrapper.state('formErrors')
      expect(__state.names).toBe('')
    })
  })

  it('"comment" should be VALID', () => {
    _state.feedback.comment = 'bla bla bla bla bla bla bla bla'
    const wrapper = mount(<FeedbackAdd { ..._props } />)
    wrapper.setState(_state, () => {
      wrapper.find('form').simulate('submit')
      __state = wrapper.state('formErrors')
      expect(__state.names).toBe('')
    })
  })

  //...

})
