const initialState = {
  token: "Wow ovo radi",
};

const reducer = (state = initialState, action) => {
  if (action.type === "STORE_TOKEN") {
    return {
      ...state,
      token: action.value,
    };
  }
  return state;
};

export default reducer;
