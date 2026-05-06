import { Component, type ReactNode } from 'react';
import './error-button.css';

type ErrorButtonProps = {
  onShowError: () => void;
};

export default class ErrorButton extends Component<ErrorButtonProps> {
  render(): ReactNode {
    return (
      <button
        onClick={this.props.onShowError}
        className="error-button"
        type="button"
      >
        Simulate Error!
      </button>
    );
  }
}
