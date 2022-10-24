import React, { useState } from 'react';

function OneChanceButton() {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    return setClicked(true);
  }

    return (
      <div>
        <button
          onClick={clicked ? undefined : handleClick}
          disabled={clicked}
        >
          You Have One Chance to Click
        </button>
      </div>
    );
}

export default OneChanceButton;