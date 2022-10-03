const USER_STATE = {
  email: '',
};

const user = (state = USER_STATE, action) => {
  switch (action.type) {
  case 'USER_INFO':
    return {
      ...state,
      ...action.value,
    };
  default:
    return {
      ...state,
    };
  }
};

export default user;
