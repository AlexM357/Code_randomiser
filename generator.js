// Модуль генерации пароля отделен от UI, чтобы логику было проще
// тестировать, переиспользовать и поддерживать.
(function () {
  var CHARSETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*"
  };

  function buildCharacterPool(options) {
    var pool = "";

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
    var validationError = validatePasswordOptions(length, options);

    if (validationError) {
      return {
        password: "",
        error: validationError
      };
    }

    var pool = buildCharacterPool(options);
    var password = "";

    for (var index = 0; index < length; index += 1) {
      var randomIndex = Math.floor(Math.random() * pool.length);
      password += pool.charAt(randomIndex);
    }

    return {
      password: password,
      error: ""
    };
  }

  window.PasswordGenerator = {
    generatePassword: generatePassword,
    validatePasswordOptions: validatePasswordOptions
  };
})();
