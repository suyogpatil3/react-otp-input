import React, { Component } from 'react';
import { render } from 'react-dom';

import OtpInput from '../../lib';
import './styles.css';

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      otp: '',
      numInputs: 4,
      separator: '-',
      isDisabled: false,
      hasErrored: false,
      isInputNum: false,
      isInputSecure: false,
      minLength: 0,
      maxLength: 40,
      placeholder: '',
    };
  }

  handleOtpChange = (otp) => {
    this.setState({ otp });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNumInputsChange = (e) => {
    let numInputs = e.target.value;
    const { minLength, maxLength } = this.state;

    if (numInputs < minLength || numInputs > maxLength) {
      numInputs = 4;

      console.error(`Please enter a value between ${minLength} and ${maxLength}`);
    }

    this.setState({ [e.target.name]: parseInt(numInputs, 10) });
  };

  clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleCheck = (e) => {
    const { name } = e.target;
    this.setState((prevState) => ({ [name]: !prevState[name] }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.otp);
  };

  render() {
    const {
      otp,
      numInputs,
      separator,
      isDisabled,
      hasErrored,
      isInputNum,
      isInputSecure,
      minLength,
      maxLength,
      placeholder,
    } = this.state;

    return (
      <div className="container">
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <p>Enter verification code</p>
              <div className="margin-top--small">
                <OtpInput
                  inputStyle="inputStyle"
                  numInputs={numInputs}
                  isDisabled={isDisabled}
                  hasErrored={hasErrored}
                  errorStyle="error"
                  onChange={this.handleOtpChange}
                  separator={<span>{separator}</span>}
                  isInputNum={isInputNum}
                  isInputSecure={isInputSecure}
                  shouldAutoFocus
                  value={otp}
                  placeholder={placeholder}
                />
              </div>
              <div className="btn-row">
                <button
                  className="btn margin-top--large"
                  type="button"
                  disabled={isDisabled || otp.trim() === ''}
                  onClick={this.clearOtp}
                >
                  Clear
                </button>
                <button className="btn margin-top--large" disabled={otp.length < numInputs}>
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('app'));
