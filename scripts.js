document.querySelectorAll('.codeInputBlock').forEach((input, idx, arr) => {
  input.addEventListener('input', (e) => {
    // Разрешаем только латиницу и цифры
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    e.target.value = value.toUpperCase();

    // Переход к следующему полю
    if (value && idx < arr.length - 1) {
      arr[idx + 1].focus();
    }
    // Если это последнее поле и введён символ — убираем фокус (закрываем клавиатуру)
    if (value && idx === arr.length - 1) {
      input.blur();
    }
    updateContinueButtonState();
  });

  input.addEventListener('keydown', (e) => {
    if (
      e.key === 'Backspace' &&
      !e.target.value &&
      idx > 0
    ) {
      arr[idx - 1].focus();
    }
  });

  input.addEventListener('paste', (e) => {
    e.preventDefault();
    let text = (e.clipboardData || window.clipboardData).getData('text');
    text = text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (text.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].value = text[i] ? text[i] : '';
      }
      arr[Math.min(text.length, arr.length) - 1].focus();
      // Если вставили полный код — убираем фокус с последнего поля
      if (text.length >= arr.length) {
        arr[arr.length - 1].blur();
      }
    }
    updateContinueButtonState();
  });
});

function updateContinueButtonState() {
  const inputs = document.querySelectorAll('.codeInputBlock');
  const btn = document.querySelector('.buttonContinue');
  const allFilled = Array.from(inputs).every(inp => inp.value.length === 1);
  if (allFilled) {
    btn.classList.remove('inactive');
  } else {
    btn.classList.add('inactive');
  }
}

// Инициализация состояния кнопки при загрузке
updateContinueButtonState();

// Убираем выделение при клике мышкой
document.querySelector('.buttonContinue').addEventListener('mousedown', function(e) {
  e.preventDefault();
});

// Показываем огурец на 5 секунд при нажатии на активную кнопку
document.querySelector('.buttonContinue').addEventListener('click', function() {
  if (this.classList.contains('inactive')) return;
  const overlay = document.querySelector('.cucumber-overlay');
  overlay.style.display = 'flex';
  // Воспроизведение звука
  const audio = new Audio('music/fail.mp3');
  audio.play();
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 5000);
});

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  // Показываем основной контент
  mainContent.style.display = 'block';
  // Плавно показываем
  setTimeout(() => {
    mainContent.style.opacity = '1';
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 400);
  }, 2000); // было 200, теперь 2000 мс
});