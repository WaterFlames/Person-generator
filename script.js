// Переменные с дефолтными значениями
let minValue = 0;
let maxValue = 1;

// Обработчик кнопки подтверждения диапазона
document.getElementById('btnSetRange').addEventListener('click', function() {
  const minInput = parseInt(document.getElementById('minInput').value);
  const maxInput = parseInt(document.getElementById('maxInput').value);

  // Валидация введённых значений
  minValue = validateNumber(minInput, 0);
  maxValue = validateNumber(maxInput, 1);
})

// проверка вводимых чисел
function validateNumber(input, defaultValue = 10) {
  if (
    typeof input === 'number' &&
    !isNaN(input) &&
    isFinite(input) &&
    input % 1 === 0
  ) {
    // ограничение значений до +-1000
    return input > 1000 ? 999 : input < -1000 ? -999 : input;
  } else {
    return defaultValue;
  }
}

// расклад числа на разряды и вызов Ф2
function splitNumberToDigits(num) {
  const sign = num < 0 ? 'минус ' : '';
  num = Math.abs(num);

  const hundreds = Math.floor(num / 100);
  const tens = Math.floor((num % 100) / 10);
  const units = num % 10;

  return numberToText(sign, hundreds, tens, units, num);
}

// перевод разрядоа в текст, склеивание, измерение
function numberToText(sign, hundreds, tens, units, num) {
  // обработка нуля
  if (num === 0) return 'ноль';

  const hundredsArr = [
    '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
  ];
  const tensArr = [
    '', 'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
  ];
  const unitsArr = [
    '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'
  ];
  const teensArr = [
    'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
  ];

  let text = sign;
  if (hundreds) text += hundredsArr[hundreds] + ' ';
  if (tens === 1) {
    text += teensArr[units];
  } else {
    if (tens) text += tensArr[tens] + ' ';
    if (units) text += unitsArr[units];
  }

  // проверка длины строки
  return text.length <= 20 ? text : num.toString();
}

let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 0;
let gameRun = true;

// счётчик ходов
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// получение ответа
orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${splitNumberToDigits(answerNumber)}?`;

// обработка событий кнопки заново
document.getElementById('btnRetry').addEventListener('click', function() {
    document.getElementById('minInput').value = '0';
    document.getElementById('maxInput').value = '1';
    
    minValue = 0;
    maxValue = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 0;
    gameRun = true;
    
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${splitNumberToDigits(answerNumber)}?`;
});

// обработка событий кнопки больше
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            const questionVariants = [
                `Вы загадали число ${splitNumberToDigits(answerNumber)}?`,
                `Может быть, это число ${splitNumberToDigits(answerNumber)}?`,
                `Я думаю, это ${splitNumberToDigits(answerNumber)}. Верно?`,
                `На этот раз попробую ${splitNumberToDigits(answerNumber)}. Угадал?`,
                `Это точно ${splitNumberToDigits(answerNumber)}`
            ];

            const randomIndex = Math.floor(Math.random() * questionVariants.length);
            const randomQuestion = questionVariants[randomIndex];
            answerField.innerText = randomQuestion;
            
        }
    }
})

// обработка событий кнопки меньше
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
            // ограничение на выход в отрицательный диапазон
        } else {
            const newMax = answerNumber - 1;
            if (newMax < minValue) {
                answerField.innerText = `Число не может быть меньше ${splitNumberToDigits(minValue)}!\n\u{1F928}`;
                gameRun = false;
            } else {
                maxValue = newMax;
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;

                const questionVariants = [
                    `Вы загадали число ${splitNumberToDigits(answerNumber)}?`,
                    `Может быть, это число ${splitNumberToDigits(answerNumber)}?`,
                    `Я думаю, это ${splitNumberToDigits(answerNumber)}. Верно?`,
                    `На этот раз попробую ${splitNumberToDigits(answerNumber)}. Угадал?`,
                    `Это точно ${splitNumberToDigits(answerNumber)}`
                ];

                const randomIndex = Math.floor(Math.random() * questionVariants.length);
                const randomQuestion = questionVariants[randomIndex];
                answerField.innerText = randomQuestion;
            }
        }
    }
})

// обработка событий кнопки верно
document.getElementById('btnEqual').addEventListener('click', function() {
    if (gameRun) {
        const victoryMessages = [
            `Я угадал! Это число ${splitNumberToDigits(answerNumber)} \u{1F60E}`,
            `Элементарно! Ваше число — ${splitNumberToDigits(answerNumber)} \u{1F9D0}`,
            `Вот оно — загаданное число ${splitNumberToDigits(answerNumber)}! \u{1F60F}`
        ];

        // берём случайный элемент массива
        const randomMessage = victoryMessages[Math.floor(Math.random() * victoryMessages.length)];
        
        answerField.innerText = randomMessage;
        gameRun = false;
    }
});
