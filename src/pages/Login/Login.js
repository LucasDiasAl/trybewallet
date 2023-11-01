/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userAction } from '../../redux/actions';
import './login.css';

function Login(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [invalid, setInvalid] = useState(true);

  const validation = (senhaPar, emailPar) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordLength = 6;
    setInvalid(!(senhaPar.length >= passwordLength && regexEmail.test(emailPar)));
  };

  function handleSenhaInput({ target: { value } }) {
    setSenha(value);
    validation(value, email);
  }

  function handleEmailInput({ target: { value } }) {
    setEmail(value);
    validation(senha, value);
  }

  const clickButton = () => {
    const { history, dispatchLogin } = props;
    dispatchLogin({ email });
    history.push('/carteira');
  };

  return (
    <section className="login__main">
      <div className="left__login">
        <h1>
          Faça o login
          <br />
          em sua carteira.
        </h1>
      </div>
      <div className="right__login">

        <div className="login__card">
          <div className="text__field">
            <label htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ handleEmailInput }
            />
          </div>
          <div className="text__field">
            <label htmlFor="senha">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              data-testid="password-input"
              value={ senha }
              onChange={ handleSenhaInput }
            />
          </div>
          <button
            className="btn__login"
            type="submit"
            onClick={ clickButton }
            disabled={ invalid }
          >
            Entrar
          </button>
        </div>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (value) => dispatch(userAction(value)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatchLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
