export const userAction = (value) => ({ type: 'USER_INFO', value });

const getCurrencies = (value) => ({ type: 'CURRENCY', value });

export const fetchCurrency = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(getCurrencies(data)));
};

export const saveDespesa = (value) => ({ type: 'SAVE_DESPESA', value });

export const updateDespesa = (value) => ({ type: 'UPDATE_EXPENSE', value });

export const exDespesa = (value) => ({ type: 'EXCLUIR_DESPESA', value });
