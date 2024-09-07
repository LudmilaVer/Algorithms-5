const fs = require('fs');

// Функция для слияния двух отсортированных массивов
function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Добавляем оставшиеся элементы
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Функция для слияния файлов с отсортированными числами
function mergeSortedFiles(fileList, outputFile) {
    let sortedNumbers = [];

    fileList.forEach(file => {
        const data = fs.readFileSync(file, 'utf8');
        const numbers = data.split('\n').map(Number).filter(Boolean);
        sortedNumbers = merge(sortedNumbers, numbers);
    });

    // Записываем результат в новый файл
    fs.writeFileSync(outputFile, sortedNumbers.join('\n'), 'utf8');
    console.log(`Результат сохранен в файл: ${outputFile}`);
}

// Пример использования
const files = ['file1.txt', 'file2.txt', 'file3.txt'];  // файлы с отсортированными числами
mergeSortedFiles(files, 'merged_sorted_file.txt');
