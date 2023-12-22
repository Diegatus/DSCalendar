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

    /*january     */ moonYearArray[0] = [3,4,11,18,25]; //4
    /*february    */ moonYearArray[1] = [3,9,16,24]; //4
    /*march       */ moonYearArray[2] = [3,10,17,25]; //4
    /*april       */ moonYearArray[3] = [2,8,15,21,22,24]; //4 + 1 eclipse (day 20)
    /*may         */ moonYearArray[4] = [1,6,8,15,23,30]; //4 + 1 eclipse (day 5)
    /*june        */ moonYearArray[5] = [6,14,22,28]; //4
    /*july        */ moonYearArray[6] = [6,14,21,28]; //4
    /*august      */ moonYearArray[7] = [4,8,13,19,26]; //5
    /*september   */ moonYearArray[8] = [3,11,18,24]; //4
    /*october     */ moonYearArray[9] = [2,8,10,13,17,21,24]; //4 + 2 eclipses (days 14 and 28)
    /*november    */ moonYearArray[10] = [1,9,15,17,23]; //4
    /*december    */ moonYearArray[11] = [5,12,19,27]; //4
    // /*december    */ moonYearArray[11] = [1,8,14,15,22,30]; //4

    let moonFullES = "Luna llena";
    let moonNewES = "Luna nueva";
    let moonCresES = "Luna creciente";
    let moonDecrES = "Luna decreciente";

    let moonFullEN = "Full moon";
    let moonNewEN = "New moon";
    let moonCreEN = "Crescent moon";
    let moonWanEN = "Waning moon";

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
                    case 4:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 11:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 18:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 25:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //FEBRERO
            case 1:
                switch(day){
                    case 3:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 9:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 16:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 24:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;
            
            //MARZO
            case 2:
                switch(day){
                    case 3:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 10:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 17:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 25:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //ABRIL
            case 3:
                switch(day){
                    case 2:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 8:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 15:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case 21:
                        return checkLanguage(language, "Diablo", "Devil"); 
                    case 22:
                        return checkLanguage(language, "Líridas", "Lyrids"); 
                    case 24:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //MAYO
            case 4:
                switch(day){
                    case 1:
                    case 30:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 6:
                        return checkLanguage(language, "Eta Acuáridas", "Eta Aquarids");
                    case 8:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 15:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 23:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //JUNIO
            case 5:
                switch(day){
                    case 28:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 6:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 14:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 22:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //JULIO
            case 6:
                switch(day){
                    case 28:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 6:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 14:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 21:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;
            
            //AGOSTO
            case 7:
                switch(day){
                    case 26:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 4:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 8:
                        return checkLanguage(language, "Delta Acuáridas", "Delta Aquarids");
                    case 13:
                        return checkLanguage(language, "Perseidas", "Perseids");
                    case 12:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 19:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 24:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 3:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 11:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 18:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    default:
                        return "";
                }
                break;

            //OCTUBRE
            case 9:
                switch(day){
                    case 24:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 2:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 8:
                        return checkLanguage(language, "Dracónidas", "Draconids");
                    case 10:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 13:
                        return "Tsuchinshan-ATLAS";
                    case 17:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case 21:
                        return checkLanguage(language, "Oriónidas", "Orionids");
                    default:
                        return "";
                }
                break;

            //NOVIEMBRE
            case 10:
                switch(day){
                    case 23:
                        return checkLanguage(language, moonDecrES, moonWanEN);
                    case 1:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case 9:
                        return checkLanguage(language, moonCresES, moonCreEN); 
                    case 15:
                        return checkLanguage(language, moonFullES, moonFullEN); 
                    case 17:
                        return checkLanguage(language, "Leónidas", "Leonids");
                    default:
                        return "";
                }
                break;

            //DICIEMBRE
            case 11:
                switch(day){
                    case moonYearArray[11][0]:
                        return checkLanguage(language, moonDecrES, moonWanEN);;
                    case moonYearArray[11][1]:
                        return checkLanguage(language, moonNewES, moonNewEN);
                    case moonYearArray[11][2]:
                        return checkLanguage(language, moonCresES, moonCreEN);
                    case moonYearArray[11][3]:
                        return checkLanguage(language, moonFullES, moonFullEN);
                    default:
                        return "";
                }
                break;

            //DICIEMBRE
            // case 11:
            //     switch(day){
            //         case 22:
            //             return checkLanguage(language, moonDecrES, moonWanEN);
            //         case 1:
            //         case 30:
            //             return checkLanguage(language, moonNewES, moonNewEN);
            //         case 8:
            //             return checkLanguage(language, moonCresES, moonCreEN); 
            //         case 14:
            //             return checkLanguage(language, "Gemínidas", "Geminids"); 
            //         case 15:
            //             return checkLanguage(language, moonFullES, moonFullEN); 
            //         default:
            //             return "";
            //     }
            //     break;
            
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

            //MARZO
            case 2:
                switch(day){
                    case 25:
                        return checkLanguage(language, " y eclipse lunar penumbral", " and penumbral lunar eclipse");
                    default:
                        return "";
                }

            //ABRIL
            case 3:
                switch(day){
                    case 8:
                        return checkLanguage(language, " y eclipse total solar", " and total solar eclipse");
                    default:
                        return "";
                }

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 18:
                        return checkLanguage(language, " y eclipse parcial lunar", " and partial lunar eclipse");
                    default:
                        return "";
                }

            //OCTUBRE
            case 9:
                switch(day){
                    case 2:
                        return checkLanguage(language, " y eclipse anular solar", " and annular solar eclipse");
                    default:
                        return "";
                }

            //DICIEMBRE
            // case 11:
            //     switch(day){
            //         case 15:
            //             return checkLanguage(language, " y Gemínidas", " and Geminids");
            //         case 22:
            //             return checkLanguage(language, " y Úrsidas", " and Ursids");
            //         default:
            //             return "";
            //     }
            
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

        var shower = srcLang+"icons/calendar/M_shower.png";
        var comet = srcLang+"icons/calendar/M_comet.png";

        //Check month first and then the days:
        switch(month){

            //ENERO
            case 0:
                switch(day){
                    case 3:
                        return shower;
                    default:
                        break;
                }
                break;

            //MARZO
            case 2:
                switch(day){
                    case 25:
                        return srcLang+"icons/calendar/M_E_PenumLunar.png";
                    default:
                        break;
                }
                break;


            //ABRIL
            case 3:
                switch(day){
                    case 8:
                        return srcLang+"icons/calendar/sun_totalEclipse.png";
                    case 21:
                        return comet;
                    case 22:
                        return shower;
                    default:
                        break;
                }
                break;

            //MAYO
            case 4:
                for(let i = 5; i <= 6; i++){
                    if(i == day){
                        return shower;
                    }
                };
                break;

            //AGOSTO
            case 7:
                switch(day){
                    case 8:
                        return shower;
                    default:
                        for(let i = 11; i <= 13; i++){
                            if(i == day){
                                return shower;
                            }
                        };
                    break;
                }

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 14:
                        return srcLang+"icons/calendar/M_E_ParcialLunar.png";
                    default:
                        break;
                }
                break;

            //OCTUBRE
            case 9:
                switch(day){
                    case 2:
                        return srcLang+"icons/calendar/sun_annularEclipse.png";
                    case 8:
                        return shower;
                    case 13:
                        return comet;
                    case 21:
                        return shower;
                    default:
                        break;
                }
                break;

            //NOVIEMBRE
            case 10:
                switch(day){
                    case 17:
                        return shower;
                    default:
                        break;
                }
                break;

            //DICIEMBRE
            // case 11:
            //     switch(day){
            //         case 22:
            //             return shower;
            //         default:
            //             for(let i = 14; i <= 15; i++){
            //                 if(i == day){
            //                     return shower;
            //                 }
            //             };
            //         break;
            //     }
            //     break;
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
        case 4:
            switch(day){
                case 6: //Last day of eta aquarids
                    return "5 - 6";
            }

        case 7:
            switch(day){
                case 13: //Last day of perseids
                    return "11 - 13";
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