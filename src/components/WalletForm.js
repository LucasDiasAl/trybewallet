import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, saveDespesa } from '../redux/actions';

function WalletForm(props) {
  const { currencies, exchangeFetch } = props;
  const metodosPagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('USD');
  const [pagamento, setPag] = useState('Dinheiro');
  const [tag, setTag] = useState(tags[0]);
  const [descri, setDescri] = useState('');

  const reset = () => {
    setValor('');
    setMoeda('USD');
    setPag('Dinheiro');
    setTag(tags[0]);
    setDescri('');
  };

  const handlButtonClick = () => {
    exchangeFetch();
    const { saveExpense, expenses, exchangeRates } = props;
    const id = expenses.length;
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
    reset();
    saveExpense(dados);
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
          Adicionar despesa
        </button>

      </form>
    </section>
  );
}

const mapStateToProps = (state) => ({
  exchangeRates: state.wallet.exchangeRates,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (value) => dispatch(saveDespesa(value)),
  exchangeFetch: () => dispatch(fetchCurrency()),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.shape).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  saveExpense: PropTypes.func.isRequired,
  exchangeFetch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
