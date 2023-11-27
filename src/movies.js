// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((currentMovie) => currentMovie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (
    moviesArray.length === 0 ||
    moviesArray.filter(
      (currentMovie) => currentMovie.director === "Steven Spielberg"
    ).length === 0
  ) {
    return 0;
  }

  const stevenMovies = moviesArray.filter(
    (currentMovie) => currentMovie.director === "Steven Spielberg"
  );

  const stevenDramaMovies = stevenMovies.filter((currentMovie) => {
    const genreArray = currentMovie.genre;

    if (genreArray.includes("Drama")) {
      return currentMovie;
    }
  });

  return stevenDramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }
  const totalScore = moviesArray.reduce((acc, movie) => {
    if (typeof movie.score === "number") {
      return acc + movie.score;
    } else {
      return acc + 0;
    }
  }, 0);

  const avarageScore = totalScore / moviesArray.length;

  return Number(avarageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((currentMovie) =>
    currentMovie.genre.includes("Drama")
  );

  if (moviesArray.length === 0 || dramaMovies.length === 0) {
    return 0;
  }

  const totalScore = dramaMovies.reduce((acc, movie) => {
    if (typeof movie.score === "number") {
      return acc + movie.score;
    } else {
      return acc + 0;
    }
  }, 0);

  const avarageScore = totalScore / dramaMovies.length;

  return Number(avarageScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortedMovies = JSON.parse(JSON.stringify(moviesArray));

  return sortedMovies.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    } else {
      return a.year - b.year;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortedMovies = JSON.parse(JSON.stringify(moviesArray));

  sortedMovies.sort((a, b) => a.title.localeCompare(b.title));

  return sortedMovies.slice(0, 20).map((movie) => movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const newMoviesArr = JSON.parse(JSON.stringify(moviesArray));
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return newMoviesArr.map((movie) => {
    const arr = movie.duration.split("");
    const numArr = [];

    arr.forEach((element) => {
      if (numbers.includes(element)) {
        numArr.push(element);
      }
    });

    const hour = numArr[0];
    numArr.splice(0, 1);
    const minutes = numArr.join("");

    const convertionHourToMin = hour * 60;

    let finalConversion = convertionHourToMin + Number(minutes);

    return structuredClone({ ...movie, duration: finalConversion });
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) {
    return null;
  }

  const scoreByYear = {};

  moviesArray.forEach((movie) => {
    const year = movie.year;
    const score = movie.score;

    if (!scoreByYear[year]) {
      scoreByYear[year] = { totalScore: 0, movieCount: 0 };
    }
    scoreByYear[year].totalScore += score;
    scoreByYear[year].movieCount += 1;
  });

  const avarageScore = {};

  for (const year in scoreByYear) {
    avarageScore[year] =
      scoreByYear[year].totalScore / scoreByYear[year].movieCount;
  }

  let bestYear = 0;
  let highestScore = 0;

  for (const year in avarageScore) {
    if (avarageScore[year] > highestScore) {
      bestYear = year;
      highestScore = avarageScore[year];
    }
  }

  return `The best year was ${bestYear} with an average score of ${highestScore}`;
}
