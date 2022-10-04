import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrency } from '../redux/actions';
import Table from '../components/Table';

function Wallet(props) {
  useEffect(() => {
    const { fetchMoedas } = props;
    fetchMoedas();
  });
  return (
    <section>
      <Header />
      <WalletForm />
      <Table />
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchMoedas: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  fetchMoedas: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
