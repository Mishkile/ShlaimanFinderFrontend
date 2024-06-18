

function appReducer(state = { userData: { isLogged: false, username: '', email: '' }, profiles: [], locations: [], showsData: [] }, action) {

  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: {
          isLogged: true,
          user_id: action.payload.user_id,
          username: '',
          email: '',


        },
        locations: action.payload.locations,
        showsData: action.payload.showsData
      }
    case 'LOGOUT':
      return {
        ...state,
        userData: {
          isLogged: false,
          username: '',
          email: ''
        }
      }

    case 'UPDATE_LOCATIONS':
      return {
        ...state,
        locations: action.payload
      }


  }


  return state;
}

export default appReducer;