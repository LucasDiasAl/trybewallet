import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { exDespesa } from '../redux/actions';

function Table(props) {
  const { allExpenses, attDespesa } = props;

  const convert = (num1, num2 = 1) => {
    const radix = 10;
    const multi = (parseFloat(num1, radix) * parseFloat(num2, radix));
    const result = multi.toFixed(2);
    return result;
  };

  const excludeButton = ({ target: { name } }) => {
    const newExpenses = allExpenses.filter(({ id }) => id !== Number(name));
    console.log(newExpenses, name);
    attDespesa(newExpenses);
  };

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {
          allExpenses.map(({ description, tag, method,
            value, currency, exchangeRates, id }) => {
            const [[, { name, ask }]] = Object.entries(exchangeRates)
              .filter(([key]) => key === currency);
            const convertValue = convert(ask, value);
            const valueDecimals = convert(value);
            const askDecimals = convert(ask);
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ valueDecimals }</td>
                <td>{ name }</td>
                <td>{ askDecimals }</td>
                <td>{ convertValue }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ excludeButton }
                    name={ id }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  attDespesa: (value) => dispatch(exDespesa(value)),
});

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  attDespesa: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
