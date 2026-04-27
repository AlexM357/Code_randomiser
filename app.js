// Этот файл отвечает только за взаимодействие с DOM и пользовательские действия.
(function () {
  var form = document.getElementById("password-form");
  var lengthInput = document.getElementById("length");
  var lowercaseInput = document.getElementById("lowercase");
  var uppercaseInput = document.getElementById("uppercase");
  var numbersInput = document.getElementById("numbers");
  var symbolsInput = document.getElementById("symbols");
  var resultInput = document.getElementById("result");
  var copyButton = document.getElementById("copy-button");
  var message = document.getElementById("message");

  function getOptions() {
    return {
      lowercase: lowercaseInput.checked,
      uppercase: uppercaseInput.checked,
      numbers: numbersInput.checked,
      symbols: symbolsInput.checked
    };
  }

  function setMessage(text, isSuccess) {
    message.textContent = text;
    message.classList.toggle("success", Boolean(isSuccess));
  }

  function handleGenerate(event) {
    event.preventDefault();

    var length = Number(lengthInput.value);
    var result = window.PasswordGenerator.generatePassword(length, getOptions());

    if (result.error) {
      resultInput.value = "";
      setMessage(result.error, false);
      return;
    }

    resultInput.value = result.password;
    setMessage("Пароль успешно сгенерирован.", true);
  }

  function handleCopy() {
    if (!resultInput.value) {
      setMessage("Сначала сгенерируйте пароль.", false);
      return;
    }

    navigator.clipboard.writeText(resultInput.value)
      .then(function () {
        setMessage("Пароль скопирован в буфер обмена.", true);
      })
      .catch(function () {
        setMessage("Не удалось скопировать пароль.", false);
      });
  }

  form.addEventListener("submit", handleGenerate);
  copyButton.addEventListener("click", handleCopy);
})();
