// Этот файл отвечает только за взаимодействие с DOM и пользовательские действия.
(function () {
  const form = document.getElementById("password-form");
  const lengthInput = document.getElementById("length");
  const lowercaseInput = document.getElementById("lowercase");
  const uppercaseInput = document.getElementById("uppercase");
  const numbersInput = document.getElementById("numbers");
  const symbolsInput = document.getElementById("symbols");
  const resultInput = document.getElementById("result");
  const copyButton = document.getElementById("copy-button");
  const message = document.getElementById("message");
  const themeToggle = document.getElementById("theme-toggle");
  const strengthLabel = document.getElementById("strength-label");
  const strengthFill = document.getElementById("strength-fill");
  const themeStorageKey = "password-generator-theme";

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

  function updateStrength(password, options) {
    const strength = window.PasswordGenerator.getPasswordStrength(password, options);
    strengthLabel.textContent = strength.label;
    strengthFill.style.width = strength.width;
    strengthFill.style.backgroundColor = strength.color;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.textContent = theme === "dark" ? "Светлая тема" : "Темная тема";
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem(themeStorageKey);
    applyTheme(savedTheme === "dark" ? "dark" : "light");
  }

  function handleGenerate(event) {
    event.preventDefault();

    const length = Number(lengthInput.value);
    const options = getOptions();
    const result = window.PasswordGenerator.generatePassword(length, options);

    if (result.error) {
      resultInput.value = "";
      updateStrength("", options);
      setMessage(result.error, false);
      return;
    }

    resultInput.value = result.password;
    updateStrength(result.password, options);
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

  function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  }

  form.addEventListener("submit", handleGenerate);
  copyButton.addEventListener("click", handleCopy);
  themeToggle.addEventListener("click", handleThemeToggle);

  loadTheme();
  updateStrength("", getOptions());
})();
