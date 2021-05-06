import React, { createContext } from "react";

export const UtilityContext = createContext();

export const UtilityContextProvider = (props) => {
  const getNextBirthday = (birthday) => {
    const birthdate = new Date(birthday);
    const dateNow = new Date();
    //Get today's month and day and year
    const birthdayMonth = birthdate.getMonth() + 1;
    const birthdayDay = birthdate.getDate();
    const thisMonth = dateNow.getMonth() + 1;
    const thisDay = dateNow.getDate();

    let year = dateNow.getFullYear();
    //if birthday is in the past this year, then next birthday is next year
    if (birthdayMonth < thisMonth) {
      year = year + 1;
    } else if (birthdayMonth === thisMonth) {
      if (birthdayDay < thisDay) {
        year = year + 1;
      }
    }
    const dateToReturn = `${birthdayMonth}-${birthdayDay}-${year}`;

    return dateToReturn;
  };
  const daysUntilEvent = (date) => {
    const nowMs = Date.now();
    const dateMs = new Date(date).getTime();
    const diff = dateMs - nowMs;

    return Math.ceil(diff / 86400000);
  };
  const displayPronoun = (gender) => {
    if (gender === "male") {
      return "His";
    } else if (gender === "female") {
      return "Her";
    } else if (gender === "nonbinary") {
      return "Their";
    }
  };

  const displayFriendlyDate = (date) => {
    const newDate = new Date(date);
    return `${
      newDate.getMonth() + 1
    }-${newDate.getDate()}-${newDate.getFullYear()}`;
  };

  const calcAge = (birthday) => {
    const birthdate = new Date(birthday);
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calcDatePriority = (date) => {
    const dateNow = new Date();
    const birthdate = new Date(date);

    const nextBirthday = new Date(
      dateNow.getFullYear(),
      birthdate.getMonth(),
      birthdate.getDate()
    );

    const nowInMs = dateNow.getTime();
    const nextBirthdayInMs = nextBirthday.getTime();

    const days = 30;
    //There are 86,400,000 milliseconds in 1 day
    const filterDateRange = 86400000 * days;

    const dateDiff = nextBirthdayInMs - nowInMs;

    console.log({
      date,
      dateNow,
      birthdate,
      nextBirthday,
      nowInMs,
      nextBirthdayInMs,
      filterDateRange,
      dateDiff,
    });

    if (dateDiff < filterDateRange && dateDiff > 0) {
      return true;
    }
    return false;
  };

  const calcEnding = (firstName) => {
    if (firstName.endsWith("s")) {
      return "'";
    }
    return "'s";
  };

  return (
    <UtilityContext.Provider
      value={{
        calcAge,
        calcDatePriority,
        displayFriendlyDate,
        calcEnding,
        displayPronoun,
        daysUntilEvent,
        getNextBirthday,
      }}
    >
      {props.children}
    </UtilityContext.Provider>
  );
};
