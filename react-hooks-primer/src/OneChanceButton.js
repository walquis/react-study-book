import React from 'react';

class OneChanceButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    return this.setState({ clicked: true });
  }

  render() {
    return (
      <div>
        <button
          onClick={this.handleClick}
          disabled={this.state.clicked}
        >
          You Have One Chance to Click
        </button>
      </div>
    );
  }
}

export default OneChanceButton;