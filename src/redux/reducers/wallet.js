// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const CURRENCIES = {
  exchangeRates: {},
  currencies: [],
  expenses: [],
  totalExpense: '0.00',
  edit: false,
  idToEdit: 0,
};

const wallet = (state = CURRENCIES, action) => {
  switch (action.type) {
  case 'CURRENCY':
    return {
      ...state,
      exchangeRates: action.value,
      currencies: Object.keys(action.value).filter((cur) => cur !== 'USDT'),
    };
  case 'SAVE_DESPESA':
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case 'UPDATE_EXPENSE':
    return {
      ...state,
      totalExpense: action.value,
    };
  case 'EXCLUIR_DESPESA':
    return {
      ...state,
      expenses: [...action.value],
    };
  case 'EDITAR_DESPESA':
    return {
      ...state,
      edit: action.value.edit,
      idToEdit: action.value.id,
    };
  case 'EDITAR_SALVAR': {
    const newExpense = [...state.expenses];
    newExpense[state.idToEdit] = action.value;
    return {
      ...state,
      expenses: newExpense,
    };
  }
  default:
    return { ...state };
  }
};

export default wallet;
