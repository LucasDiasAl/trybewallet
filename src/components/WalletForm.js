import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, saveDespesa, saveEdit, editDespesa } from '../redux/actions';

function WalletForm(props) {
  const { currencies, exchangeFetch, expenses, edit } = props;
  const metodosPagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('USD');
  const [pagamento, setPag] = useState('Dinheiro');
  const [tag, setTag] = useState(tags[0]);
  const [descri, setDescri] = useState('');

  useEffect(() => {
    const { idToEdit } = props;
    if (edit) {
      const [{ value, currency, method, tag: taggin, description }] = expenses
        .filter(({ id: curr }) => curr === Number(idToEdit));
      setValor(value);
      setMoeda(currency);
      setPag(method);
      setTag(taggin);
      setDescri(description);
    }
  }, [props, expenses, edit]);

  const reset = () => {
    setValor('');
    setMoeda('USD');
    setPag('Dinheiro');
    setTag(tags[0]);
    setDescri('');
  };

  const editFalseSave = (idOnEdit, editVerifc) => {
    const { exchangeRates } = props;
    const id = editVerifc ? idOnEdit : expenses.length;
    const correctValue = valor === '' ? 0 : valor;
    const dados = Object.fromEntries([
      ['id', id],
      ['value', correctValue],
      ['currency', moeda],
      ['method', pagamento],
      ['tag', tag],
      ['description', descri],
      ['exchangeRates', exchangeRates],
    ]);
    return dados;
  };

  const handlButtonClick = () => {
    exchangeFetch();
    const { saveExpense, editExpense, editDesp, idToEdit } = props;
    const dados = editFalseSave(idToEdit, edit);
    if (!edit) {
      saveExpense(dados);
    } else {
      editExpense(dados);
      editDesp({ edit: false, id: 0 });
    }
    reset();
  };

  return (
    <section>
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            value={ valor }
            onChange={ ({ target: { value } }) => setValor(value) }
            placeholder="0"
            id="valor"
          />
        </label>

        <label htmlFor="moedas">
          Moeda:
          <select
            id="moedas"
            data-testid="currency-input"
            onChange={ ({ target: { value } }) => setMoeda(value) }
            value={ moeda }
          >
            {
              currencies.map((curr) => (
                <option value={ curr } key={ curr }>{ curr }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="metodo">
          Métodos de pagamento:
          <select
            id="metodo"
            data-testid="method-input"
            onChange={ ({ target: { value } }) => setPag(value) }
            value={ pagamento }
          >
            {
              metodosPagamento.map((curr) => (
                <option value={ curr } key={ curr }>{ curr }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="tags">
          Tags:
          <select
            id="tags"
            data-testid="tag-input"
            onChange={ ({ target: { value } }) => setTag(value) }
            value={ tag }
          >
            {
              tags.map((curr) => (
                <option value={ curr } key={ curr }>{ curr }</option>
              ))
            }
          </select>
        </label>

        <label
          htmlFor="descriçao"
        >
          Descrição:
          <input
            data-testid="description-input"
            type="areatext"
            id="descriçao"
            value={ descri }
            onChange={ ({ target: { value } }) => setDescri(value) }
          />
        </label>

        <button
          type="button"
          onClick={ handlButtonClick }
        >
          {edit ? 'Editar despesa' : 'Adicionar despesa'}
        </button>

      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
  exchangeRates: state.wallet.exchangeRates,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.edit,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (value) => dispatch(saveDespesa(value)),
  editExpense: (value) => dispatch(saveEdit(value)),
  exchangeFetch: () => dispatch(fetchCurrency()),
  editDesp: (value) => dispatch(editDespesa(value)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.shape).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  saveExpense: PropTypes.func.isRequired,
  exchangeFetch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
  editDesp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
