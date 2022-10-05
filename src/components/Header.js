import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDespesa } from '../redux/actions';

function Header(props) {
  const { email, expenses, totalExpense, newDespesa } = props;
  useEffect(() => {
    if (expenses.length > 0) {
      const radixNumber = 10;
      const value = expenses.reduce((acc, { value: valor, currency, exchangeRates }) => {
        const [[, { ask }]] = Object.entries(exchangeRates)
          .filter(([currencyid]) => currencyid === currency);
        const tmp = (
          acc + (parseFloat(valor, radixNumber) * parseFloat(ask, radixNumber))
        );
        return tmp;
      }, 0);
      const refactor = parseInt((value * 100), radixNumber) / 100;
      newDespesa(refactor);
    } else {
      const zero = (0).toFixed(2);
      newDespesa(zero);
    }
  }, [expenses, newDespesa, totalExpense]);

  return (
    <section>
      <section>
        <h2 data-testid="email-field">
          {`Email:  ${email}`}
        </h2>
        <div>
          <h2>
            Despesa total: R$
          </h2>
          <h2 data-testid="total-field">
            {totalExpense}
          </h2>
          <h2 data-testid="header-currency-field">
            BRL
          </h2>
        </div>
      </section>
    </section>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalExpense: state.wallet.totalExpense,
});

const mapDispatchToProps = (dispatch) => ({
  newDespesa: (value) => dispatch(updateDespesa(value)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  newDespesa: PropTypes.func.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
