import type { AxiosError } from 'axios';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

import type { Game, GAME_RESULTS_PROPS, ToastNotification } from '@/types';
/**
 * @param string A user's (full, first or last) name.
 * @returns The intials of the user.
 */
export const getInitials = (string: string) => {
  const names = string.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
};

/**
 * @param string A string in lower or upper case to be converted to title case.
 * @returns The input string formatted to title case.
 * KPONGETTE becomes Kpongette
 * https://stackoverflow.com/a/196991/15063835
 */
export const convertToTitleCase = (string: string) => {
  return string.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * @param string A string (in kebab or snake case) to be converted to title case.
 * @returns The input string formatted to title case.
 * transactions__today-tomorrow becomes Transactions Today Tomorrow
 * https://stackoverflow.com/a/64489760/15063835
 */
export const convertKebabAndSnakeToTitleCase = (string: string | undefined) => {
  if (!string) {
    return '';
  }

  // Remove hyphens and underscores
  const formattedString = string
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());

  return convertToTitleCase(formattedString);
};

/**
 * @param form An HTML form element containing a field with a value to be extracted.
 * @param valueName The name of the value to be extracted from the form.
 * @returns The value extracted from the form (input) field.
 */
export const getInputValueFromForm = (form: HTMLFormElement, valueName: string) => {
  const { value } = form.elements.namedItem(valueName) as HTMLInputElement;
  return value;
};

/**
 * @param string Any camelCase or PascalCase string.
 * @returns A string with separated words PascalCase becomes Pascal Case, HODBank becomes HOD Bank etc.
 */
export const insertSpacesBeforeCapitalLetters = (string: string) => {
  string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
  string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return string;
};

/**
 * @param string A string, usually completely in lowercase.
 * @returns The argument string with its first letter capitalized.
 */
export const capitalizeFirstLetter = (string: string) => {
  const stringWithSpaces = insertSpacesBeforeCapitalLetters(string.toLowerCase());

  return (
    (stringWithSpaces && stringWithSpaces.charAt(0).toUpperCase() + stringWithSpaces.slice(1)) || ''
  );
};

/**
 * @param error An axios error instance. Usually returned by React Query.
 * @returns The error message formatted for the UI. Contents of an array are merged into a single string.
 */
export const formatAxiosErrorMessage = (
  // Typed as any because errors from server do not have a consistent shape.
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  error: AxiosError<any, any>,
) => {
  const firstDigitInResponseStatus = String(error.response?.status).charAt(0);

  if (firstDigitInResponseStatus === '5') {
    return 'Server Error';
  }

  // Return default error message string if user is not connected to the internet.
  if (error.code === 'ERR_NETWORK') {
    return `${error.message}. Please check your internet connection.`;
  }

  const errorMessage = Object.values(error.response?.data).flat();

  if (Array.isArray(errorMessage)) {
    const allMessages = errorMessage
      .filter((m) => isNaN(m) && typeof m === 'string')
      .map(m => capitalizeFirstLetter(m))
      .join('. ');

    return `${allMessages}`;
  }
};

/**
 * @param number Number to be formatted in commas.
 * @param caseType If caseType = DISPLAY and number = 0 then 0 is returned but if caseType = INPUT and number = 0 then '' is returned. This function is used for two different instances.
 * @returns The value is returned in commas.
 */
export const addCommasToNumber = (number: number, caseType = 'DISPLAY') => {
  if (number == 0 && caseType == 'DISPLAY') {
    return number;
  } else if (number == 0 && caseType == 'INPUT') {
    return '';
  }

  return (
    Boolean(number) &&
    parseFloat(number.toString()).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    })
  );
};

export const removeValueFromArray = <T>(arr: Array<T>, value: T): Array<T> => {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

const getNotificationColor = (notificationType: ToastNotification) => {
  switch (notificationType) {
    case 'success': {
      return '#065f46';
    }

    case 'error': {
      return '#b91c1c';
    }

    case 'neutral': {
      return '#2B0E44';
    }

    default: {
      throw new Error(`Unsupported notification type: ${notificationType}`);
    }
  }
};

export const launchNotification = (type: ToastNotification, text: string) => {
  toast(text, {
    style: {
      padding: '8px 20px',
      backgroundColor: getNotificationColor(type),
      color: '#ffffff',
      textAlign: 'center',
      overflowWrap: 'break-word',
      overflow: 'auto',
      bottom: '32px',
      fontSize: '14px',
    },
  });
};

export const clampNumber = (number: number, min: number, max: number) => {
  return Math.max(min, Math.min(number, max));
};

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 */
export const shuffleArray = (array: unknown[]) => {
  const arrayCopy = array.slice();
  let currentIndex = arrayCopy.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
};

export function randomArray(length: number, max: number) {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(length)).map(function () {
    return Math.round(Math.random() * max);
  });
}

/**
 * Insert items into array at specific index, immutably
 * https://stackoverflow.com/a/38181008/15063835
 */
export const insertAtArrayIndex = (arr: unknown[], index: number, ...newItems: unknown[]) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

/**
 * Replace item in array at specific index, immutably
 */
export const replaceAtArrayIndex = (arr: unknown[], index: number, value: unknown) => {
  const ret = arr.slice(0);
  ret[index] = value;
  return ret;
};

/**
 * @param date The date to be formatted.
 * @param withTime A boolean determining whether or not the date is returned with a time value.
 * @returns The time (or time and date) formatted akin to 0/09/2021, 6 AM.
 */
export const formatShortDate = (date: string | Date, withTime: boolean): string => {
  if (withTime) {
    return format(new Date(date), 'dd/MM/yyyy, h aa');
  }

  return format(new Date(date), 'dd/MM/yyyy');
};

/**
 * @param emailString The email string to be formatted.
 * @returns The  email string formatted to a sample like Chuks******.com
 */
export const hideEmail = (emailString: string) => {
  const email = emailString.split('@');
  const nextEmail = email[0]?.replace(email[0]?.slice(-3), '***');
  return [nextEmail, email[1]?.replace(email[1]?.slice(0, 5), '****')].join('');
};

/**
 * Hides middle values in a string Mukola becomes Mu*ola, for example
 * Last three values are always displayed
 * @param string A string of any length to be formatted
 * @param startHidingIndex The index of the first value to be hidden (should be positive)
 * @returns A formatted string with its middle values hidden based on provided parameters
 */
export const hideMiddleValues = (string: string, startHidingIndex: number) => {
  return (
    string.slice(0, startHidingIndex) + string.slice(startHidingIndex).replace(/.(?=...)/g, '*')
  );
};

export const generateNewRandomS4LPicks = (multiplier: number) =>
  Array(multiplier)
    .fill(undefined)
    .map(() => {
      return {
        digitArray: Array(5)
          .fill(undefined)
          .map(() => {
            return { pickDigit: Math.floor(Math.random() * 49 + 1), id: nanoid() };
          }),
        id: nanoid(),
      };
    });

export const generateNewRandomICPicks = (multiplier: number) =>
  Array(multiplier)
    .fill(undefined)
    .map(() => {
      return {
        digitArray: Array(4)
          .fill(undefined)
          .map(() => {
            return { pickDigit: Math.floor(Math.random() * 40 + 1), id: nanoid() };
          }),
        id: nanoid(),
      };
    });

/**
 * @param game_type The game type contains objects to be transformed.
 * * @param arrayType The arrayType specifies if the array of objects should be splitted into arrays of arrays of objects (UNSPLIT,SPLIT).
 * @returns arrays or nested arrays of objects based on the arrayType passed
 */
export const gameTransformedResults = (game_type: Game, arrayType: string) => {
  const results = Object.entries(game_type)
    .map(result => [result[1]])
    .flat(2)
    .sort((a, b) => {
      return Number(new Date(a.date)) - Number(new Date(b.date));
    });

  if (arrayType == 'UNSPLIT') {
    return results;
  } else if (arrayType == 'SPLIT') {
    const half = Math.round(results.length / 3);

    const newResults = results.reduce(
      (currentVal: GAME_RESULTS_PROPS[][], _previousVal, _index, array) => {
        const newArr = array.splice(0, half);
        currentVal.push(newArr);
        return currentVal;
      },
      [],
    );
    return newResults;
  }
};

type ScoresDto = {
  scoreText: string;
  amount: string;
}[];

type ScoresDtoUpdated = {
  scoreText: string;
  amount: string;
  scoresType: 'scores' | 'customScores';
}[];

/**
 * @param scores, Array of objects of matches to be transformed.
 * @param customScores, Array of objects of matches to be transformed.
 * @returns The array of arrays of object merged together. Contents of an array are merged into a single string.
 */
export const modifyScoresResults = (scores: ScoresDto, customScores: ScoresDto) => {
  const modifiedScores: ScoresDtoUpdated = scores.map(value => {
    return {
      ...value,
      scoresType: 'scores',
    };
  });

  const modifiedCustomScores: ScoresDtoUpdated = customScores.map(value => {
    return {
      ...value,
      scoresType: 'customScores',
    };
  });
  return [...modifiedScores, ...modifiedCustomScores];
};

/**
 * Generates a random number between two bounds
 * @param min The minimum acceptable number
 * @param max The maximum acceptable number
 * @param inclusive Determines whether number bounds should be included in output
 * @returns A random number between min and max
 */
export const generateRandomNumber = (min: number, max: number, inclusive = true) => {
  if (inclusive) return Math.floor(Math.random() * (max - min + 1)) + min;

  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Converts a string of digits into a javascript number or a string of pure digit strings
 * @param amount A number provided as a string eg. '#50,000'
 * @param returnAsNumber Determines whether output be a number or a string
 * @returns The amount or string of digits as a JS number (or string) eg. 50000
 */
export const convertStringAmountsToNumbers = (amount: string, returnAsNumber = true) => {
  // Regex: https://stackoverflow.com/a/9409894
  const result = amount.replace(/[^\d.-]/g, '');

  if (returnAsNumber) {
    return Number(result);
  }

  return result;
};

/**
 * A function that generates a random number but takes a list of exluded values into account.
 * @param min minimum acceptable random number
 * @param max maximum acceptable random number
 * @param excludedValues a list of values that should not be returned by the function. Cannot be 1
 * @param depth the maximumm number of recursive iterations to generate a number
 * @returns a random number that is not included in the list of exluded values
 */
export const generateRandomNumberExcludingValues = (
  min: number,
  max: number,
  excludedValues: number[],
  depth = 0,
): number => {
  // Short circuit added to prevent excessively deep recursion
  if (depth > 15) {
    return 1;
  }

  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  return excludedValues.includes(num)
    ? generateRandomNumberExcludingValues(min, max, excludedValues, depth + 1)
    : num;
};

/**
 * Get today's date with the time value specified at a static value.
 * @param time The specific time today that should be returned (defaults to 8PM, the WC and S4L draw time)
 * @returns Today's date at a specific time
 * https://stackoverflow.com/a/63870793
 */
export const getTodaysDateWithSpecificTime = (time = '20:00') => {
  const today = new Date();
  today.setHours(...(time.split(':').map(Number) as [number, number]));

  return today;
};

/**
 * Convert 24hr time to 12hr with AM and PM suffixed.
 *  * @param time The specific time (24hr) in string
 * @returns formatted to 12hr with am or pm.
 */
export const timeConvert12To24Hr = (timeValue: string) => {
  const [hourString, minute] = timeValue.split(':');
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ':' + minute + (hour < 12 ? 'am' : 'pm');
};

/**
 * Generate a random array of 4 numbers
 * @returns an array of 4 random numbers
 */

export const generateArrayOfRandomNumbers = (): number[] => {
  const arr = [];
  while (arr.length < 4) {
    const r = Math.floor(Math.random() * 100) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  // console.log(arr);
  return arr;
};

/**
 * // Confirm Image URL Starts http or https and
 *  ends in one of the acceptable image formats
 * @returns an image url based on the boolean match.
 */

export const isImage = (url: string) => {
  const matchImage = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

  return matchImage
    ? url
    : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081';
};
