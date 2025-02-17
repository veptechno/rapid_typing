const latinCapital = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const latin = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const cyrillicCapital = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"]
const cyrillic = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ы", "ь", "э", "ю", "я"]
const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
const signs = [".", ",", "<", ">", "[", "]", "(", ")", "{", "}", "'", "\"", "`", "~", ";", ":", "-", "_", "=", "+", "/", "?", "\\", "|"]
const shortSigns = [".", ",", "[", "]", "(", ")", "{", "}", "'", "\"", "`", "~", "=", "+", "/", "?"]
const additionalSigns = ["!", "@", "#", "$", "%", "*"]

// const initialLetters = latin
// const initialLetters = [..digits,]
// const initialLetters = [...signs, ...additionalSigns, ...digits]
const initialLetters = [...latin, ...signs, ...additionalSigns, ...digits, ...cyrillic]
// const initialLetters = cyrillic