import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import WalletForm from '../../components/walletForm/WalletForm';
import { fetchCurrency } from '../../redux/actions';
import Table from '../../components/table/Table';
import './wallet.css';

function Wallet(props) {
  useEffect(() => {
    const { fetchMoedas } = props;
    fetchMoedas();
  });
  return (
    <section className="wallet__main">
      <Header />
      <div className="wallet__info">
        <WalletForm />
        <Table />
      </div>
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
