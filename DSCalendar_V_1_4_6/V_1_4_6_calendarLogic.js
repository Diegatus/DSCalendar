
/**
 * @author      Diego Valero <dtstcontact@gmail.com / diegovaleroarevalo@gmail.com>
 * @version     1.4.6
 */


/******************************************************** VARIABLES AREA ********************************************************/

const version = "1.4.6"

const today = new Date();
const currentYear = today.getFullYear();
const currentDay = today.getDate();
const currentMonth = today.getMonth();


//DAY AND MONTH TESTING AREA: BY CHOICE OR RANDOM (/!\ COMMENT THOSE THAT YOU'RE NOT USING!!)  RANDOM FORM -> Math.floor(Math.random() * (max - min + 1) + min)
    //BY CHOICE:
        //  const currentDay = 11;
        //  const currentMonth = 1;

    //RANDOM
        //  const currentDay = Math.floor(Math.random() * (31 - 1 + 1) + 1);
        //  const currentMonth = Math.floor(Math.random() * (11 - 0 + 1) + 0);

 

/******************************************************** "SPAGHETTI DATABASE" AND FUNCTIONS AREA ********************************************************/

/**
 * Returns the program version stored on V_X_calendarLogic.js
 * @returns - versión del programa
 */
function getVersion() {
    return version;
}

/**
 * Function dedicated to grammar: it allows you to know if the nearest day to the current day is TODAY, TOMORROW or LATER.
 * @param {Array} monthArray - Array of the month (use yearArray[month], where month is the one that corresponds to dayA).
 * @param {number} currentDay - Current day.
 * @param {number} dayA - The day to compare with current day (should be dayA).
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @returns Returns a string that tells the user if the nearest event is someday in the future ("LATER"), the next day to the current one (TOMORROW) or if it's on the current day (TODAY!).
 */
function isTodayA(monthArray, currentDay, dayA, language){

    let text;

    const todayES = "¡HOY!";
    const todayEN = "TODAY!";
    const tomorrowES = "MAÑANA";
    const tomorrowEN = "TOMORROW";
    const laterES = "PRÓXIMAMENTE";
    const laterEN = "LATER";

    const february = 1;
    const thirtyDaysMonths = [3,5,8,10];
    const thirtyOneDaysMonths = [0,2,4,6,7,9,11];
    

    for(let i=0; i<monthArray.length; i++){
        if(monthArray[i] == currentDay){
            text = checkLanguage(language, todayES, todayEN);
            break;
        }
        else if(monthArray[i] == currentDay+1 || i == monthArray.length-1 && dayA == 1 && ((currentDay == 28 || currentDay == 29 && currentMonth == february) || (currentDay == 30 && thirtyDaysMonths.indexOf(currentMonth) > -1) || (currentDay == 31 && thirtyOneDaysMonths.indexOf(currentMonth) > -1))){
            text = checkLanguage(language, tomorrowES, tomorrowEN);
            break;
        }
        else{
            text = checkLanguage(language, laterES, laterEN);
        }
    }
    return text;
}



/**
 * Function dedicated to grammar: it allows you to know if the next day to the nearest one (dayA) is THE NEXT DAY, TOMORROW or days AFTER dayA.
 * @param {number} currentDay  - Día actual.
 * @param {number} dayA - Día de evento más cercano al día actual.
 * @param {number} dayB - Día de evento siguiente al más cercano al día actual.
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @returns Returns a string that tells the user if the next day to the nearest event is someday in the future ("AND AFTER THAT..."), the next day to the current one (AND TOMORROW...) or if it's on the current day (AND THE NEXT DAY...).
 */
function isTomorrowB(currentDay, dayA, dayB, language){
    let text;
    const textDefaultES = "Y DESPUÉS...";
    const textDefaultEN = "AND AFTER THAT...";
    const textTomorrowES = "Y MAÑANA...";
    const textTomorrowEN = "AND TOMORROW...";
    const textNextDayES = "Y AL DÍA SIGUIENTE...";
    const textNextDayEN = "AND THE NEXT DAY...";

    const february = 1;
    const thirtyDaysMonths = [3,5,8,10];
    const thirtyOneDaysMonths = [0,2,4,6,7,9,11];
    
    if(((dayA == 28 || dayA == 29) && currentMonth == february) || (dayA == 30 && thirtyDaysMonths.indexOf(currentMonth) > -1) || (dayA == 31 && thirtyOneDaysMonths.indexOf(currentMonth) > -1) && dayB == 1) {
        text = isTomorrowOrNextDay();
    }
    else if(dayB == dayA+1){
        text = isTomorrowOrNextDay();
    }
    else{
        text = checkLanguage(language, textDefaultES, textDefaultEN);
    }

    return text;

    function isTomorrowOrNextDay(){
        if(dayA == currentDay){
            text = checkLanguage(language, textTomorrowES, textTomorrowEN);
        }
        else{
            text = checkLanguage(language, textNextDayES, textNextDayEN);
        }

        return text;
    }
}



/**
 * Main function. Calculates the nearest event to the current day.
 * @param {Array} yearArray - Array of year.
 * @param {number} currentMonth - Current month.
 * @param {number} currentDay - Current day.
 * @returns The day stored on the array nearest to the current day.
 */
function checkMostNearEvent(yearArray, currentMonth, currentDay){
    
    let day = 0;
    
    for(let i=0; i<yearArray[currentMonth].length; i++){
        
        if(yearArray[currentMonth][i]>=currentDay){ 
           
            day = yearArray[currentMonth][i];
            break;
        }
        else if(currentMonth != yearArray.length-1) {
            day = yearArray[currentMonth+1][0];
        }
        else{
            day = yearArray[0][0];
        }
    }

    return day;
}



/**
 * Calculates the next event to the nearest event to the current day.
 * @param {Array} yearArray - Array of year.
 * @param {number} currentMonth - Current month.
 * @param {*} dayA - The nearest event day to the current day (If it's for dayB, dayA can be obtained using checkMostNearEvent(). If dayA is already stablished, you can use this function for every following day, as used on V_X_calendarMoons.js for moonDayC and moonDayD).
 * @returns The following event day to the nearest event day.
 */
function checkNextMostNearEvent(yearArray, currentMonth, mostNearEventDay){

    let nextEventDay = 0;
    
    const lastDayOfYear = yearArray[yearArray.length-1][yearArray[yearArray.length-1].length-1];
    const firstDayOfYear = yearArray[0][0];
    const lastDayOfCurrentMonth = yearArray[currentMonth][yearArray[currentMonth].length-1];

    
    /*CONSOLE FEEDBACK>>>*/ console.table(yearArray);

    /*Para establecer nextEventDay, debemos comprobar de mayor a menor escala:
      · Si mostNearEventDay es el último evento del mes y del año, para que nextEventDay sea el primero del primer mes del año.
      · Si mostNearEventDay es el último evento del mes, para que nextEventDay sea el primero del mes siguiente.
      · Si mostNearEventDay es el primer evento del mes siguiente al actual cuando ya no quedan eventos en el mes actual, para que nextEventDay trabaje en el mes siguiente también.
      · Si no se cumple lo anterior para mostNearEventDay significa que hay más eventos en el mismo mes, así que asignamos a nextEventDay la siguiente posición a mostNearEventDay.
      · */

    if(currentMonth == yearArray.length-1 && mostNearEventDay == lastDayOfYear){
        nextEventDay = firstDayOfYear;
    }
    else{
        if(yearArray[currentMonth].includes(mostNearEventDay) && mostNearEventDay >= currentDay) {
            if(mostNearEventDay != lastDayOfCurrentMonth){
                nextEventDay = yearArray[currentMonth][yearArray[currentMonth].indexOf(mostNearEventDay)+1];
            }
            else{
                nextEventDay = yearArray[currentMonth+1][0]; 
            }
        }
        else if(currentMonth != yearArray.length-1 && yearArray[currentMonth+1].includes(mostNearEventDay)){
            nextEventDay = yearArray[currentMonth+1][yearArray[currentMonth+1].indexOf(mostNearEventDay)+1];
        }
        else{
            nextEventDay = yearArray[0][yearArray[0].indexOf(mostNearEventDay)+1];
        }
  
    }

    return nextEventDay;
}



// /**
//  *  
//  * @param {*} yearArray - La matriz del calendario
//  * @param {*} currentMonth - Mes actual
//  * @param {*} currentDay - Dia actual
//  * @param {*} dayA - Dia A (evento más próximo)
//  * @returns el numero del mes actual respecto al dia del calendario. 
//  */
// function checkMonthForMostNearEvent(yearArray, currentMonth, currentDay, day){

//     if(currentMonth != yearArray.length-1 && day == yearArray[currentMonth+1][0] && day != currentDay){
//         return currentMonth+1;
//     }
//     else if(currentMonth == yearArray[0] && day == yearArray[0][0]){
//         return 0;
//     }
//     else{
//         return currentMonth;
//     }
// }



/**
 * This function allows to know to which month corresponds to a given day respect the current day.
 * @param {Array} yearArray - Array of year.
 * @param {number} currentMonth - Current month.
 * @param {number} currentDay - Current day.
 * @param {number} day - The day we want to know its month.
 * @returns Depending on the current day, the month of the day given can be 0 (January, meaning that the day given is the last one of the year), the current month or the following month.
 */
function checkMonthForMostNearEvent(yearArray, currentMonth, currentDay, day){

    if(currentMonth == yearArray.length-1){
        if(yearArray[currentMonth].includes(day) && day >= currentDay) {
            return currentMonth;
        }
        else if(yearArray[0].includes(day)){
            return 0;
        }
    }
    else{

        if(yearArray[currentMonth].includes(day) && day >= currentDay) {
            return currentMonth;
        }
        else if(currentMonth != yearArray.length-1 && yearArray[currentMonth+1].includes(day)){
            return currentMonth+1;
        }
  
    }
}



/**
 * This function checks if a long term event is currently going on and applies to display C.
 * @param {number} currentMonth - Current month.
 * @param {number} currentDay - Current day.
 * @returns A CSS value that allows the display C to stay hidden or be revealed. It will only be revealed if the current day and month correspond to those stored here manually.
 */
function revealDisplayC(currentMonth, currentDay){

    const february = 1;
    const october = 9;
    const arrayCarnaval = [18,19,20,21,22];
    const arrayInktober = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    if((currentMonth == february && arrayCarnaval.includes(currentDay)) || (currentMonth == october && arrayInktober.includes(currentDay))){
        return true;
    }
    else{
        return false;
    }
}


/**
 * This function checks if a long term event is currently going on and changes the day title on display C. Right now the only stored value is 9 (october).
 * @param {number} currentMonth - Current month.
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @returns The only two long term events are Carnival and Inktober. This function will always return "THIS WEEK!" except in october, where the value will be "THIS MONTH!".
 */
function isLongEvent(currentMonth, language){
    
    const october = 9;

    const thisMonthES = "¡ESTE MES!";
    const thisMonthEN = "THIS MONTH!";
    const thisWeekES = "¡ESTA SEMANA!";
    const thisWeekEN = "THIS WEEK!";

    if(currentMonth == october){
        return checkLanguage(language, thisMonthES, thisMonthEN);
    }
    else{
        return checkLanguage(language, thisWeekES, thisWeekEN);
    }
}


/**
 * Get the string value that corresponds to the number value of the month.
 * @param {number} currentMonth - Current month.
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @returns string corresponding to the number value of the month. If the selected language is "es", it adds " de " to the start of the string, to comply with Spanish grammar.
 */
function getMonthName(currentMonth, language){
    
    let text = " ";
    
    if(language == "es"){
        text += " de ";
    }

    switch(currentMonth){
        case 0:
            text += checkLanguage(language, "enero", "january");
            break;
        case 1:
            text += checkLanguage(language, "febrero", "february");
            break;
        case 2:
            text += checkLanguage(language, "marzo", "march");
            break;
        case 3:
            text += checkLanguage(language, "abril", "april");
            break;
        case 4:
            text += checkLanguage(language, "mayo", "may");
            break;
        case 5:
            text += checkLanguage(language, "junio", "june");
            break;
        case 6:
            text += checkLanguage(language, "julio", "july");
            break;
        case 7:
            text += checkLanguage(language, "agosto", "august");
            break;
        case 8:
            text += checkLanguage(language, "septiembre", "september");
            break;
        case 9:
            text += checkLanguage(language, "octubre", "october");
            break;
        case 10:
            text += checkLanguage(language, "noviembre", "november");
            break;
        case 11:
            text += checkLanguage(language, "diciembre", "december");
            break;
        default:
            break;
    }

    return text;
}


/**
 * Used for icons file paths, stablishes the way a file path should start depending on the language selected for the calenadar operations.
 * @param {string} language - The directory in which the start of the file path will be set. Must be "es" for the current directory (usually Spanish) or "en" for the upper one (if the file executes in the inner folder "en" (English)). Any other value will return null.
 * @returns "./" for files on the main folder (Spanish) and "../" for files on "en" (English) folder.
 * -TECHNICAL ADVICE: It can also be used to acces the current folder or scalate to the upper one in case of executing it on different directories. Use "es" to access the current directory or "en" to access the upper one.
 */
function startSrc(language){
    return checkLanguage(language, "./", "../");
}


/**
 * Main function to translate texts depending on the language selected.
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @param {string} optionES - This parameter should have text in Spanish, that will be returned in case the parameter "language" is set as "es" (Spanish).
 * @param {string} optionEN - This parameter should have text in English, that will be returned in case the parameter "language" is set as "es" (English).
 * @returns one option of text or another depending on the language selected.
 */
function checkLanguage(language, optionES, optionEN) {
    if(language === "es"){
        return optionES;
    }
    else if(language === "en"){
        return optionEN;
    }
    else{
        return null;
    }
}

/**
 * Main function to get an option of calendar data from the "spaghetti database", that allows to have multiple information on just one code line (a long one, I must add). This must be used only inside a month-day switch-case logic and updated manually whith each piece of data.
 * @param {*} toGet - Must be one of the following string values:
 * - "date" for dates information (from when the event starts until when it ends). Used only for display C for multiple days events when date is not a number but a string.
 * - "desc" for event name.
 * - "img1", "img2" or "img3" for each of the icons of the event (main image is "img1". "img2" and "img3" is for events that share day with the day of "img1" event. Long term events should only use "img1").
 * - Any other value will return null.
 * @param {*} optionDate - This parameter should have a long term event dates as string (Example: "From 2 to 6 january").
 * @param {*} optionDesc - This parameter should have the name of the event as a string.
 * @param {*} optionImg1 - This paramenter should have the value srcLang (refer to startSrc() to know more) + the string that corresponds to the file path or directory of the icon that represents the main event.
 * @param {*} optionImg2 - This paramenter should have the value srcLang (refer to startSrc() to know more) + the string that corresponds to the file path or directory of the icon of the event that shares day with "img1" (main event). In case that there's only one event, this value must be null.
 * @param {*} optionImg3 - This paramenter should have the value srcLang (refer to startSrc() to know more) + the string that corresponds to the file path or directory of the icon of the event that shares day with "img1" (main event) and "img2". In case that there's only one event, this value must be null.
 * @returns 
 */
function checkContent(toGet, optionDate, optionDesc, optionImg1, optionImg2, optionImg3){
    switch(toGet){
        case "date":
            return optionDate;
        case "desc":
            return optionDesc;
        case "img1":
            return optionImg1;
        case "img2":
            return optionImg2;
        case "img3":
            return optionImg3;
        default:
            return null;
    }
}

