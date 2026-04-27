// Модуль генерации пароля отделен от UI, чтобы логику было проще
// тестировать, переиспользовать и поддерживать.
(function () {
  const CHARSETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*"
  };

  function buildCharacterPool(options) {
    let pool = "";

    if (options.lowercase) {
      pool += CHARSETS.lowercase;
    }

    if (options.uppercase) {
      pool += CHARSETS.uppercase;
    }

    if (options.numbers) {
      pool += CHARSETS.numbers;
    }

    if (options.symbols) {
      pool += CHARSETS.symbols;
    }

    return pool;
  }

  function validatePasswordOptions(length, options) {
    if (length < 6) {
      return "Длина пароля не может быть меньше 6 символов.";
    }

    if (length > 32) {
      return "Длина пароля не может быть больше 32 символов.";
    }

    if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
      return "Выберите хотя бы один тип символов.";
    }

    return "";
  }

  function generatePassword(length, options) {
    const validationError = validatePasswordOptions(length, options);

    if (validationError) {
      return {
        password: "",
        error: validationError
      };
    }

    const pool = buildCharacterPool(options);
    let password = "";

    for (let index = 0; index < length; index += 1) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      password += pool.charAt(randomIndex);
    }

    return {
      password: password,
      error: ""
    };
  }

  function getPasswordStrength(password, options) {
    if (!password) {
      return {
        score: 0,
        label: "Не определена",
        width: "0%",
        color: "#ef4444"
      };
    }

    let score = 0;
    const typesCount = [
      options.lowercase,
      options.uppercase,
      options.numbers,
      options.symbols
    ].filter(Boolean).length;

    if (password.length >= 8) {
      score += 1;
    }

    if (password.length >= 12) {
      score += 1;
    }

    if (typesCount >= 2) {
      score += 1;
    }

    if (typesCount >= 3) {
      score += 1;
    }

    if (typesCount === 4 || password.length >= 16) {
      score += 1;
    }

    if (score <= 2) {
      return {
        score: score,
        label: "Слабый",
        width: "33%",
        color: "#ef4444"
      };
    }

    if (score <= 4) {
      return {
        score: score,
        label: "Средний",
        width: "66%",
        color: "#f59e0b"
      };
    }

    return {
      score: score,
      label: "Сильный",
      width: "100%",
      color: "#10b981"
    };
  }

  window.PasswordGenerator = {
    generatePassword: generatePassword,
    validatePasswordOptions: validatePasswordOptions,
    getPasswordStrength: getPasswordStrength
  };
})();
