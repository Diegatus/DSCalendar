 /**
 * @author      Diego Valero <dtstcontact@gmail.com / diegovaleroarevalo@gmail.com>
 * @version     1.4.5
 */

 /**
  * Calls the main program for the calendar of moon phases and astronomical events. It's used to return texts in spanish or english.
  * @param {*} language 
  */
function calendarMoonsProgram(language){

    /******************************************************** VARIABLES AREA ********************************************************/

    //MOON 1
    let calendarMoon1Date = document.getElementById("calendarMoon1Date");
    let calendarMoon1Desc = document.getElementById("calendarMoon1Desc");
    let calendarMoon1Img1 = document.getElementById("calendarMoon1Img1");
    let calendarMoon1Img2 = document.getElementById("calendarMoon1Img2");

    //MOON 2
    let calendarMoon2Date = document.getElementById("calendarMoon2Date");
    let calendarMoon2Desc = document.getElementById("calendarMoon2Desc");
    let calendarMoon2Img1 = document.getElementById("calendarMoon2Img1");
    let calendarMoon2Img2 = document.getElementById("calendarMoon2Img2");

    //MOON 3
    let calendarMoon3Date = document.getElementById("calendarMoon3Date");
    let calendarMoon3Desc = document.getElementById("calendarMoon3Desc");
    let calendarMoon3Img1 = document.getElementById("calendarMoon3Img1");
    let calendarMoon3Img2 = document.getElementById("calendarMoon3Img2");

    //MOON 4
    let calendarMoon4Date = document.getElementById("calendarMoon4Date");
    let calendarMoon4Desc = document.getElementById("calendarMoon4Desc");
    let calendarMoon4Img1 = document.getElementById("calendarMoon4Img1");
    let calendarMoon4Img2 = document.getElementById("calendarMoon4Img2");

    
    //MONTHS AND DAYS DATABASE
    let moonYearArray = new Array(12); //Main months array
    

    //SAVE MOON PHASES AND ASTRONOMICAL EVENTS DAYS ARRAYS ON EACH POSITION OF moonYearArray - The number noted at the end of each array is the total number of moon phases each month. 
    //ADVICE: When changing the dates for the ones of the next year, you should set them BEFORE December starts, but keep DECEMBER dates until it ends. This will show the new January dates when they start appearing on the calendar but will keep the current december dates so there's no wrong data. Once January starts, you can change the December ones.

    /*january     */ moonYearArray[0] = [7,15,21,28]; //4
    /*february    */ moonYearArray[1] = [5,13,20,27]; //4
    /*march       */ moonYearArray[2] = [7,15,21,29]; //4
    /*april       */ moonYearArray[3] = [6,13,20,27]; //4 + 1 eclipse (day 20)
    /*may         */ moonYearArray[4] = [5,12,19,27]; //4 + 1 eclipse (day 5)
    /*june        */ moonYearArray[5] = [4,10,18,26]; //4
    /*july        */ moonYearArray[6] = [3,10,17,26]; //4
    /*august      */ moonYearArray[7] = [1,8,16,24,31]; //5
    /*september   */ moonYearArray[8] = [7,15,22,29]; //4
    /*october     */ moonYearArray[9] = [6,14,22,28]; //4 + 2 eclipses (days 14 and 28)
    /*november    */ moonYearArray[10] = [5,13,20,27]; //4
    /*december    */ moonYearArray[11] = [5,12,19,27]; //4

    let moonFullES = "Luna llena";
    let moonNewES = "Luna nueva";
    let moonCresES = "Luna creciente";
    let moonDecrES = "Luna decreciente";

    let moonFullEN = "Full moon";
    let moonNewEN = "New moon";
    let moonCresEN = "Crescent moon";
    let moonDecrEN = "Waning moon";

    let srcLang = startSrc(language);


    let moonDayA = checkMostNearEvent(moonYearArray, currentMonth, currentDay);
    let moonDayB = checkNextMostNearEvent(moonYearArray, currentMonth, moonDayA);
    let moonDayC = checkNextMostNearEvent(moonYearArray, currentMonth, moonDayB);
    let moonDayD = checkNextMostNearEvent(moonYearArray, currentMonth, moonDayC);
    
    
    let realMonthA = checkMonthForMostNearEvent(moonYearArray, currentMonth, currentDay, moonDayA);
    let realMonthB = checkMonthForMostNearEvent(moonYearArray, currentMonth, currentDay, moonDayB);
    let realMonthC = checkMonthForMostNearEvent(moonYearArray, currentMonth, currentDay, moonDayC);
    let realMonthD = checkMonthForMostNearEvent(moonYearArray, currentMonth, currentDay, moonDayD);
    


    /******************************************************** CALCULATIONS AND DOM ASSIGNMENTS AREA  ********************************************************/
    
    /*TESTING ON CONSOLE*/
    // console.log("A: " + moonDayA + "-" + realMonthA);
    // console.log("B: " + moonDayB + "-" + realMonthB);
    // console.log("C: " + moonDayC + "-" + realMonthC);
    // console.log("D: " + moonDayD + "-" + realMonthD);

    calendarMoon1Date.innerText = moonDayA+getMonthName(realMonthA, language);
    calendarMoon1Desc.innerText = getMoonPhase(realMonthA, moonDayA, moonYearArray, language) + getMoonPhase2(realMonthA, moonDayA, language);
    calendarMoon1Img1.src = getMoonImg1(getMoonPhase(realMonthA, moonDayA, moonYearArray, language), srcLang);
    calendarMoon1Img2.src = getMoonImg2(realMonthA, moonDayA, srcLang);

    calendarMoon2Date.innerText = moonDayB+getMonthName(realMonthB, language);
    calendarMoon2Desc.innerText = getMoonPhase(realMonthB, moonDayB, moonYearArray, language) + getMoonPhase2(realMonthB, moonDayB, language);
    calendarMoon2Img1.src = getMoonImg1(getMoonPhase(realMonthB, moonDayB, moonYearArray, language), srcLang);
    calendarMoon2Img2.src = getMoonImg2(realMonthB, moonDayB, srcLang);

    calendarMoon3Date.innerText = moonDayC+getMonthName(realMonthC, language);
    calendarMoon3Desc.innerText = getMoonPhase(realMonthC, moonDayC, moonYearArray, language) + getMoonPhase2(realMonthC, moonDayC, language);
    calendarMoon3Img1.src = getMoonImg1(getMoonPhase(realMonthC, moonDayC, moonYearArray, language), srcLang);
    calendarMoon3Img2.src = getMoonImg2(realMonthC, moonDayC, srcLang);

    calendarMoon4Date.innerText = moonDayD+getMonthName(realMonthD, language);
    calendarMoon4Desc.innerText = getMoonPhase(realMonthD, moonDayD, moonYearArray, language) + getMoonPhase2(realMonthD, moonDayD, language);
    calendarMoon4Img1.src = getMoonImg1(getMoonPhase(realMonthD, moonDayD, moonYearArray, language), srcLang);
    calendarMoon4Img2.src = getMoonImg2(realMonthD, moonDayD, srcLang);



    /******************************************************** "SPAGHETTI DATABASE" AND FUNCTIONS AREA ********************************************************/

    /**
     * Main function to obtain the moon state corresponding to the day of the month.
     * @param {number} month - Day corresponding to the day obtained that corresponds to a moon phase.
     * @param {number} day - Day corresponding to a moon phase.
     * @param {Array} moonYearArray - The multidimensional array used as database for the moon phases. The days will be checked as the positions on the array, not the numbers.
     * @param {string} language - The language in which the string will be returned. Must be "es" for spanish or "en" for english. Any other value will return null.
     * @returns a string that indicates the phase of the moon.
     */
    function getMoonPhase(month, day, moonYearArray, language) {
        
        //Check month first and then the days:
        switch(month){
            //ENERO
            case 0:
                switch(day){
                    case moonYearArray[0][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[0][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[0][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[0][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;

            //FEBRERO
            case 1:
                switch(day){
                    case moonYearArray[1][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[1][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[1][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[1][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;
            
            //MARZO
            case 2:
                switch(day){
                    case moonYearArray[2][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[2][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[2][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[2][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;

            //ABRIL
            case 3:
                switch(day){
                    case moonYearArray[3][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[3][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[3][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[3][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;

            //MAYO
            case 4:
                switch(day){
                    case moonYearArray[4][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[4][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[4][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[4][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;

            //JUNIO
            case 5:
                switch(day){
                    case moonYearArray[5][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[5][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[5][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[5][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;

            //JULIO
            case 6:
                switch(day){
                    case moonYearArray[6][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[6][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[6][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[6][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    default:
                        return "";
                }
                break;
            
            //AGOSTO
            case 7:
                switch(day){
                    case moonYearArray[7][0]:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case moonYearArray[7][1]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[7][2]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[7][3]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    case moonYearArray[7][4]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case moonYearArray[8][0]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[8][1]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[8][2]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    case moonYearArray[8][3]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;

            //OCTUBRE
            case 9:
                switch(day){
                    case moonYearArray[9][0]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[9][1]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[9][2]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    case moonYearArray[9][3]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;

            //NOVIEMBRE
            case 10:
                switch(day){
                    case moonYearArray[10][0]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);
                    case moonYearArray[10][1]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[10][2]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    case moonYearArray[10][3]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;

            //DICIEMBRE
            case 11:
                switch(day){
                    case moonYearArray[11][0]:
                        return checkLanguage(language, moonDecrES, moonDecrEN);;
                    case moonYearArray[11][1]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[11][2]:
                        return checkLanguage(language, moonCresES, moonCresEN);
                    case moonYearArray[11][3]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;
        }
    }


    /**
     * If a day of moon phase has an additional astronomical event, this function allows to add additional text to the one obtained through getMoonPhase() to accompany the main text and obtain a string composition indicating both events.
     * (/!\) The days and corresponding months must be stored manually to set which specific days have an additional event.
     * @param {number} month - Day corresponding to the day obtained that corresponds to a moon phase.
     * @param {number} day - Day corresponding to a moon phase.
     * @param {string} language - The language in which the string will be returned. Must be "es" for spanish or "en" for english. Any other value will return null.
     * @returns An additional string that indicates the astronomical event that takes place on the same day as a moon phase.
     */
    function getMoonPhase2(month, day, language) {
        
        //Check month first and then the days:
        switch(month){

            //ABRIL
            case 3:
                switch(day){
                    case 20:
                        return checkLanguage(language, " y eclipse mixto solar", " and mixed solar eclipse");
                    default:
                        return "";
                }

            //MAYO
            case 4:
                switch(day){
                    case 5:
                        return checkLanguage(language, " y eclipse penumbral lunar", " and penumbral lunar eclipse");
                    default:
                        return "";
                }

            //OCTUBRE
            case 9:
                switch(day){
                    case 14:
                        return checkLanguage(language, " y eclipse anular solar", " and annular solar eclipse");
                    case 28:
                        return checkLanguage(language, " y eclipse parcial lunar", " and partial lunar eclipse");
                    default:
                        return "";
                }
            
            default:
                return "";
                
        }
    }

    /**
     * Stores the icons for the different moon phases.
     * @param {string} moonState - Must be obtained by using getMoonState(). It returns the text what will tell the moon phase, and it uses it to recognize which icon to return.
     * @param {string} srcLang - Start of the file path of the image. It can be obtained using startSrc(language) and storing it on a variable.
     * @returns The file path of the icon for the moon phase.
     */
    function getMoonImg1(moonState, srcLang) {

        const iconMoonFull = srcLang+"icons/calendar/M_Full.png";
        const iconMoonDecr = srcLang+"icons/calendar/M_Dec.png";
        const iconMoonCres = srcLang+"icons/calendar/M_Cre.png";
        const iconMoonNew = srcLang+"icons/calendar/M_New.png";
        const iconNotFound = srcLang+"icons/calendar/0000.png";

        if(moonState === moonFullES || moonState === moonFullEN){
            return iconMoonFull;
        }
        else if(moonState === moonDecrES || moonState === moonDecrEN){
            return iconMoonDecr;
        }
        else if(moonState === moonCresES || moonState === moonCresEN){
            return iconMoonCres;
        }
        else if(moonState === moonNewES || moonState === moonNewEN){
            return iconMoonNew;
        }
        else{
            return iconNotFound;
        }
    }


    /**
     * If a day has more events than just the moon phase (an eclipse, star shower,...), this function allows you to set another image beside the main one.
     * (/!\) The days and corresponding months must be stored manually to set which specific days have an additional event.
     * @param {*} month - The month that corresponds for the day.
     * @param {*} day - The day of the phase.
     * @param {*} srcLang - Start of the file path of the image. It can be obtained using startSrc(language) and storing it on a variable.
     * @returns The file path of the icon for the astronomical event.
     */
    function getMoonImg2(month, day, srcLang) {

        //Check month first and then the days:
        switch(month){
            //ABRIL
            case 3:
                switch(day){
                    case 20:
                        return srcLang+"icons/calendar/M_E_Mixto.png";
                    default:
                        break;
                }
                break;

            //MAYO
            case 4:
                switch(day){
                    case 5:
                        return srcLang+"icons/calendar/M_E_PenumLunar.png";
                    default:
                        break;
                }
                break;

            //OCTUBRE
            case 9:
                switch(day){
                    case 14:
                        return srcLang+"icons/calendar/M_E_AnularSolar.png";
                    case 28:
                        return srcLang+"icons/calendar/M_E_ParcialLunar.png";
                    default:
                        break;
                }
                break;
        }
    }
}