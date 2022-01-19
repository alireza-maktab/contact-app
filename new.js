function handleSubmit(e) {
  e.preventDefault();
  const formElement = e.target;

  const values = {};
  for (input of formElement) {
    if (input.name) {
      values[input.name] = input.value;
    }
  }

  fetch("http://localhost:3000/contacts", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    alert("successfully added");
  });
}
