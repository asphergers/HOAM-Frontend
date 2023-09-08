let buttons: React.ReactElement[] = [];

function MyButton() {
  return (
    <button>
      this is a temp button
    </button>
  );
}

function addButtons() {
  for (let i: number = 0; i < 10; i++) {
    buttons.push(MyButton());
  }
};

function removeButtons() {
  for (let i: number = 0; i < buttons.length + 1; i++) {
    buttons.pop();
  }
}

export default function Buttons() {
  removeButtons();
  addButtons();

  const listItems = buttons.map((button, index) => (
    <li key = {index}>
      {button}
    </li>
  ));

  return (
    <ul>{listItems}</ul>  
  );
}

