import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userAction } from '../redux/actions';

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
    <section>
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ handleEmailInput }
          />
        </label>
        <label htmlFor="senha">
          Senha:
          <input
            type="text"
            id="senha"
            data-testid="password-input"
            value={ senha }
            onChange={ handleSenhaInput }
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          onClick={ clickButton }
          disabled={ invalid }
        >
          Entrar
        </button>
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
