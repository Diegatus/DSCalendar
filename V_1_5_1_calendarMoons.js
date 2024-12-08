 /**
 * @author      Diego Valero <dtstcontact@gmail.com / diegovaleroarevalo@gmail.com>
 * @version     1.5.0
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

    /*january     */ moonYearArray[0] = [3,7,13,21,29]; //4
    /*february    */ moonYearArray[1] = [5,12,20,28]; //4
    /*march       */ moonYearArray[2] = [6,14,22,29]; //4 + 2 eclipses (day 14, 29)
    /*april       */ moonYearArray[3] = [5,13,21,22,27]; //4
    /*may         */ moonYearArray[4] = [4,6,12,20,27]; //4
    /*june        */ moonYearArray[5] = [3,11,18,25]; //4
    /*july        */ moonYearArray[6] = [2,10,18,24,28]; //4
    /*august      */ moonYearArray[7] = [1,9,13,16,23,31]; //5
    /*september   */ moonYearArray[8] = [7,14,21,30]; //4 + 2 eclipses (day 7, 21)
    /*october     */ moonYearArray[9] = [7,13,21,29]; //4
    /*november    */ moonYearArray[10] = [4,5,12,17,20,28]; //4

    //Automation of December events so when the calendar is updated it won't need later manual adjustments and still can show the current year's events instead of next's ones.
    //WHEN UPDATING THE CALENDAR FOR THE NEXT YEAR: Change value of storedCurrentYear to current one and move else{} events to if{currentYear==XXXX}. Then, set the next year's events on else{}.
    if(currentYear == storedCurrentYear){ //THIS YEAR
        /*december*/ moonYearArray[11] = [1,8,14,15,22,30]; //4
    }
    else{ //NEXT YEAR
        /*december*/ moonYearArray[11] = [5,11,13,20,21,27]; //4
    }

    //OLD - Remove in 2025
    let moonFullES, oldMoonFullES = "Luna llena";
    let moonNewES, oldMoonNewES = "Luna nueva";
    let moonCresES, oldMoonCresES = "Luna creciente";
    let moonDecrES, oldMoonDecrES = "Luna decreciente";

    let moonFullEN, oldMoonFullEN = "Full moon";
    let moonNewEN, oldMoonNewEN = "New moon";
    let moonCreEN, oldMoonCreEN = "Crescent moon";
    let moonWanEN, oldMoonWanEN = "Waning moon";

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

    /*
        /!\ MENSAJE IMPORTANTE A PARTIR DEL CALENDARIO ASTRONÓMICO 2024 - SUPUESTOS: /!\
        Se ha optimizado este script para que aparte de las lunas y eclipses aloje también lluvias de estrellas y pasos de cometas. A TENER EN CUENTA:
        1- Los eclipses, lluvias de estrellas y pasos de cometas se almacenan con sus días en el array de cada mes junto a las fases lunares (como el calendario de eventos principal).
        2- Para los eventos que no sean fases lunares pero estén en solitario, puede almacenarse su valor de nombre en getMoonPhase(), pero ten en cuenta que el valor que se usa no está
        registrado para getMoonImage1(), así que este devuelve null, por lo que su icono debe almacenarse en getMoonImage2().
        3- Los días que coincidan dos eventos, el primero siempre será la fase lunar, almacenado en getMoonPhase(), y el segundo siempre será el eclipse, lluvia de estrellas o
        paso de cometa, almacenado en getMoonPhase2().
        4- Para los eventos que duren más de un día, se debe almacenar en el array sólo el último día del evento, y añadir el intervalo de duración en checkMultidayEvent(). Este
        método comprueba si el dia y el mes coincide con los dados que sabemos que duran varios días, para que devuelva el texto correspondiente. Si no coincide, simplemente
        devuelve el día único.
        5- Si una lluvia de estrellas que dura más de un día tiene un día que coincide con otro evento, se debe guardar cómo último día del evento el de antes al día de la
        coincidencia. Para resolver los valores:
            · Guardado el último día del evento en el array, se escribe:
                a) Si es sólo un día, se añade como evento en solitario en getMoonPhase() (supuesto 2).
                b) Si son varios días, se añaden a checkMultiEventDay() como evento de larga duración (desde el que empieza hasta el anterior del que coincide) (supuesto 4).
            · Para el día de la coincidencia, se trata como un evento que coincide, guardando el valor del otro evento en getMoonPhase() y el de la lluvia en
            getMoonPhase2() (supuesto 3).

            EJEMPLO: En 2024, la lluvia de Gemínidas es del 14 al 15 de diciembre, pero el 15 de diciembre hay luna llena. El calendario debe mostrar:
                · [icono de lluvia de estrellas] 14 de diciembre - Gemínidas
                · [icono de luna llena + icono de lluvia de estrellas] 15 de diciembre - Luna llena y Gemínidas
    */

    calendarMoon1Date.innerText = dateFormat(language, moonDayA, realMonthA);
    calendarMoon1Desc.innerText = getMoonPhase(realMonthA, moonDayA, moonYearArray, language) + getMoonPhase2(realMonthA, moonDayA, language);
    calendarMoon1Img1.src = getMoonImg1(getMoonPhase(realMonthA, moonDayA, moonYearArray, language), srcLang);
    calendarMoon1Img2.src = getMoonImg2(realMonthA, moonDayA, srcLang);

    calendarMoon2Date.innerText = dateFormat(language, moonDayB, realMonthB);
    calendarMoon2Desc.innerText = getMoonPhase(realMonthB, moonDayB, moonYearArray, language) + getMoonPhase2(realMonthB, moonDayB, language);
    calendarMoon2Img1.src = getMoonImg1(getMoonPhase(realMonthB, moonDayB, moonYearArray, language), srcLang);
    calendarMoon2Img2.src = getMoonImg2(realMonthB, moonDayB, srcLang);

    calendarMoon3Date.innerText = dateFormat(language, moonDayC, realMonthC);
    calendarMoon3Desc.innerText = getMoonPhase(realMonthC, moonDayC, moonYearArray, language) + getMoonPhase2(realMonthC, moonDayC, language);
    calendarMoon3Img1.src = getMoonImg1(getMoonPhase(realMonthC, moonDayC, moonYearArray, language), srcLang);
    calendarMoon3Img2.src = getMoonImg2(realMonthC, moonDayC, srcLang);

    calendarMoon4Date.innerText = dateFormat(language, moonDayD, realMonthD);
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
                    case 3:
                        return checkLanguage(language, "Cuadrántidas", "Quadrantids"); 
                    case 21:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 29:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 7:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 13:
                        return checkLanguage(language, moonFullES, moonFullES); 
                    default:
                        return "";
                }

            //FEBRERO
            case 1:
                switch(day){
                    case 20:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 28:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 5:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 12:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
            
            //MARZO
            case 2:
                switch(day){
                    case 22:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 29:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 6:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 14:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //ABRIL
            case 3:
                switch(day){
                    case 22:
                        return checkLanguage(language, "Líridas", "Lyrids");
                    case 21:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 27:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 5:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 13:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }

            //MAYO
            case 4:
                switch(day){
                    case 6:
                        return checkLanguage(language, "Eta Acuáridas", "Eta Aquarids");
                    case 20:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 27:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 4:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 12:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //JUNIO
            case 5:
                switch(day){
                    case 18:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 25:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 3:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 11:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //JULIO
            case 6:
                switch(day){
                    case 28:
                        return checkLanguage(language, "Delta Acuáridas", "Delta Aquarids");
                    case 18:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 24:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 2:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 10:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
            
            //AGOSTO
            case 7:
                switch(day){
                    case 13:
                        return checkLanguage(language, "Perseidas", "Perseids");
                    case 16:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 23:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 1:
                    case 31:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 9:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 14:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 21:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 30:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 7:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //OCTUBRE
            case 9:
                switch(day){
                    case 7:
                        return checkLanguage(language, "Dracónidas", "Draconids");
                    case 13:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 21:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 29:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 7:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //NOVIEMBRE
            case 10:
                switch(day){
                    case 4:
                        return checkLanguage(language, "Táuridas", "Taurids");
                    case 17:
                        return checkLanguage(language, "Leónidas", "Leonids");
                    case 12:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 20:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 28:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 5:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }

            //DICIEMBRE
            case 11:
                if(currentYear == storedCurrentYear){ //THIS YEAR - Remove "old" in 2025
                    switch(day){
                        case 22:
                            return checkLanguage(language, oldMoonDecrES, oldMoonWanEN);
                        case 1:
                        case 30:
                            return checkLanguage(language, oldMoonNewES, oldMoonNewEN);
                        case 8:
                            return checkLanguage(language, oldMoonCresES, oldMoonCreEN); 
                        case 14:
                            return checkLanguage(language, "Gemínidas", "Geminids"); 
                        case 15:
                            return checkLanguage(language, oldMoonFullES, oldMoonFullEN); 
                        default:
                            return "";
                    }
                }
                else{ //NEXT YEAR
                    switch(day){
                        case 13:
                            return checkLanguage(language, "Gemínidas", "Geminids"); 
                        case 21:
                            return checkLanguage(language, "Úrsidas", "Ursids"); 
                        case 11:
                            return checkLanguage(language, moonDecrES, moonWanEN);
                        case 20:
                            return checkLanguage(language, moonNewES, moonNewEN);
                        case 27:
                            return checkLanguage(language, moonCresES, moonCreEN); 
                        case 5:
                            return checkLanguage(language, moonFullES, moonFullEN); 
                        default:
                            return "";
                    }
                }
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

            //ENERO
            case 0:
                switch(day){
                    case 13:
                        return checkLanguage(language, " y C/2024 G3 (ATLAS)", " and C/2024 G3 (ATLAS)");
                    default:
                        return "";
                }

            //MARZO
            case 2:
                switch(day){
                    case 14:
                        return checkLanguage(language, " y eclipse lunar total", " and total lunar eclipse");
                    case 29:
                        return checkLanguage(language, " y eclipse solar parcial", " and partial solar eclipse");
                    default:
                        return "";
                }

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 7:
                        return checkLanguage(language, " y eclipse lunar total", " and total lunar eclipse");
                    case 21:
                        return checkLanguage(language, " y eclipse solar parcial", " and partial solar eclipse");
                    default:
                        return "";
                }

            //OCTUBRE
            case 9:
                switch(day){
                    case 21:
                        return checkLanguage(language, " y Oriónidas", " and Orionids");
                    default:
                        return "";
                }

            //DICIEMBRE
            case 11:
                if(currentYear == storedCurrentYear){
                    switch(day){
                        case 15:
                            return checkLanguage(language, " y Gemínidas", " and Geminids");
                        case 22:
                            return checkLanguage(language, " y Úrsidas", " and Ursids");
                        default:
                            return "";
                    }
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

        //OLD - Remove in 2025
        const oldIconMoonFull = srcLang+"icons/calendar/old_M_Full.png";
        const oldIconMoonDecr = srcLang+"icons/calendar/old_M_Dec.png";
        const oldIconMoonCres = srcLang+"icons/calendar/old_M_Cre.png";
        const oldIconMoonNew = srcLang+"icons/calendar/old_M_New.png";

        if(moonState === moonFullES || moonState === moonFullEN){
            return iconMoonFull;
        }
        else if(moonState === moonDecrES || moonState === moonWanEN){
            return iconMoonDecr;
        }
        else if(moonState === moonCresES || moonState === moonCreEN){
            return iconMoonCres;
        }
        else if(moonState === moonNewES || moonState === moonNewEN){
            return iconMoonNew;
        }//OLD - Remove in 2025
        if(moonState === oldMoonFullES || moonState === oldMoonFullEN){
            return oldIconMoonFull;
        }
        else if(moonState === oldMoonDecrES || moonState === oldMoonWanEN){
            return oldIconMoonDecr;
        }
        else if(moonState === oldMoonCresES || moonState === oldMoonCreEN){
            return oldIconMoonCres;
        }
        else if(moonState === oldMoonNewES || moonState === oldMoonNewEN){
            return oldIconMoonNew;
        }
        else{
            return null;
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

        var shower = srcLang+"icons/calendar/A_Stars.png";
        var comet = srcLang+"icons/calendar/A_Comet.png";
        //OLD - Remove in 2025
        var oldShower = srcLang+"icons/calendar/old_M_Shower.png";

        //Check month first and then the days:
        switch(month){

            //ENERO
            case 0:
                switch(day){
                    case 3:
                        return shower;
                    case 13:
                        return comet;
                    default:
                        break;
                }
                break;

            //MARZO
            case 2:
                switch(day){
                    case 14:
                        return srcLang+"icons/calendar/E_LunarTotal.png";
                    case 29:
                        return srcLang+"icons/calendar/E_SolarPartial.png";
                    default:
                        break;
                }
                break;


            //ABRIL
            case 3:
                switch(day){
                    case 22:
                        return shower;
                    default:
                        break;
                }
                break;

            //MAYO
            case 4:
                switch(day){
                    case 6:
                        return shower;
                    default:
                        break;
                }
                break;

            //JULIO
            case 6:
                switch(day){
                    case 28:
                        return shower;
                    default:
                        break;
                }
                break;

            //AGOSTO
            case 7:
                for(let i = 12; i <= 13; i++){
                    if(i == day){
                        return shower;
                    }
                };
                break;

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 7:
                        return srcLang+"icons/calendar/E_LunarTotal.png";
                    case 21:
                        return srcLang+"icons/calendar/E_SolarPartial.png";
                    default:
                        break;
                }
                break;

            //OCTUBRE
            case 9:
                switch(day){
                    case 7:
                    case 21:
                        return shower;
                    default:
                        break;
                }
                break;

            //NOVIEMBRE
            case 10:
                switch(day){
                    case 4:
                    case 17:
                        return shower;
                    default:
                        break;
                }
                break;

            //DICIEMBRE
            case 11:
                if(currentYear == storedCurrentYear){ //THIS YEAR - OLD - Remove in 2025
                    switch(day){
                        case 22:
                            return oldShower;
                        default:
                            for(let i = 14; i <= 15; i++){
                                if(i == day){
                                    return oldShower;
                                }
                            };
                        break;
                    }
                }
                else{ //NEXT YEAR
                    switch(day){
                        case 13:
                        case 21:
                            return shower;
                        break;
                    }
                }
            break;
        }
    }
}

/**
 * Checks if a day from a month corresponds to an event that lasts more than a day
 * @param {*} day - Day of the event
 * @param {*} month - Month of the day of the event
 * @returns - The complete range of days that the event lasts as string. Will only return data if the day corresponds with the last of the event.
 */
function checkMultidayEvent(day, month){

    switch(month){

        case 7:
            switch(day){
                case 13: //Last day of perseids
                    return "12 - 13";
            }

        default: //If it doesn't correspond to an event that lasts more than one day, just returns the day passed.
            return day;
    }
}

/**
 * Gives a different date presentation format depending on the language: For es: day+month, for en: month+day.
 * @param {string} language - The language in which the string will be returned. Must be "es" for Spanish or "en" for English. Any other value will return null.
 * @param {*} day - Day of the event
 * @param {*} realMonth - Month of the event
 * @returns - Date written to a specific format as string
 */
function dateFormat(language, day, realMonth){
    if(language == "es"){
        return checkMultidayEvent(day, realMonth)+" de "+getMonthName(realMonth, language);
    }
    else if(language == "en"){
        return getMonthName(realMonth, language)+" "+checkMultidayEvent(day, realMonth);
    }
    else{
        return null;
    }
}