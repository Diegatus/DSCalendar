 /**
 * @author      Diego Valero <dtstcontact@gmail.com / diegovaleroarevalo@gmail.com>
 * @version     1.5.0
 */

 /**
  * Calls the main program for the calendar of events. It's used to return texts in spanish or english.
  * @param {*} language 
  */
 function calendarEventsProgram(language){

    /******************************************************** VARIABLES AREA ********************************************************/

    //VERSION
    const version = document.getElementById("version");

    //MAIN DATE
    const calendarGlobalDate = document.getElementById("calendarGlobalDate");

    //ABBREVIATED VERSION OF MAIN DATE
    const calendarIndexDate = document.getElementById("calendarIndexDate");


    //BOX A
    const calendarATitle = document.getElementById("calendarATitle");
    const calendarADate = document.getElementById("calendarADate");
    const calendarADesc = document.getElementById("calendarADesc");
    const calendarAImg1 = document.getElementById("calendarAImg1");
    const calendarAImg2 = document.getElementById("calendarAImg2");
    const calendarAImg3 = document.getElementById("calendarAImg3");
    const calendarCommunityADiv = document.getElementById("communityA");
    const calendarCommunityEventA = document.getElementById("authorEventA");
    const calendarCommunityAuthorA = document.getElementById("authorA");
    
    //BOX B
    const calendarBTitle = document.getElementById("calendarBTitle");
    const calendarBDate = document.getElementById("calendarBDate");
    const calendarBDesc = document.getElementById("calendarBDesc");
    const calendarBImg1 = document.getElementById("calendarBImg1");
    const calendarBImg2 = document.getElementById("calendarBImg2");
    const calendarBImg3 = document.getElementById("calendarBImg3");
    const calendarCommunityBDiv = document.getElementById("communityB");
    const calendarCommunityEventB = document.getElementById("authorEventB");
    const calendarCommunityAuthorB = document.getElementById("authorB");
    
    //BOX C
    const calendarC = document.getElementById("calendarC");
    const calendarCTitle = document.getElementById("calendarCTitle");
    const calendarCDate = document.getElementById("calendarCDate");
    const calendarCDesc = document.getElementById("calendarCDesc");
    const calendarCImg1 = document.getElementById("calendarCImg1");

    //PDF
    const eventsPDF = document.getElementById("eventsPDF");
    const calendarPDF = document.getElementById("calendarPDF");

    const srcLang = startSrc(language);

    let dayA = 0;
    let dayB = 0;

    let realMonthA = 0;
    let realMonthB = 0;
    
    
    const yearArray = new Array(12); //Main year array with 12 months

    //SAVE EVENT DAYS ARRAYS ON EACH POSITION OF yearArray. 
    //ADVICE: When changing the dates for the ones of the next year, you should set them BEFORE DECEMBER STARTS, but KEEP DECEMBER DATES until it ends. This will show the new January dates when they start appearing on the calendar but will keep the current december dates so there's no wrong data. Once January starts, you can change the December ones.
    
    /*enero       */ yearArray[0] = [1,6,7,13,16,20,27];
    /*febrero     */ yearArray[1] = [2,4,8,9,11,13,14,22,26,28];
                    if(currentYear%4==0 && currentYear%100!=0 || currentYear%400==0) { //Only if the current year is a leap year, adds the day 29 to february.
                        yearArray[1].push(29);
                    }
    /*marzo       */ yearArray[2] = [1,8,9,10,14,15,17,19,20,21,22,27,30,31];
    /*abril       */ yearArray[3] = [2,7,19,20,22,23,26,27];
    /*mayo        */ yearArray[4] = [1,2,3,4,9,10,17,18,21,25,30,31];
    /*junio       */ yearArray[5] = [5,8,9,12,20,21,23,28];
    /*julio       */ yearArray[6] = [2,8,13,17,21,25,26,28,30];
    /*agosto      */ yearArray[7] = [1,8,16,19,23,27,29];
    /*septiembre  */ yearArray[8] = [2,8,10,11,13,17,21,22,27,28];
    /*octubre     */ yearArray[9] = [1,4,5,9,12,19,25,26,28,31];
    /*noviembre   */ yearArray[10] = [1,16,19,20,21,27,28];
    
    //Automation of December events so when the calendar is updated it won't need later manual adjustments and still can show the current year's events instead of next's ones.
    //WHEN UPDATING THE CALENDAR FOR THE NEXT YEAR: Change value of currentYear condition to current one and move else{} events to if{currentYear==XXXX}. Then, set the next year's events on else{}.
    if(currentYear == storedCurrentYear){ //THIS YEAR
        /*december*/ yearArray[11] = [1,2,3,9,10,15,21,24,25,27,28,31];
    }
    else{ //NEXT YEAR
        /*december*/ yearArray[11] = [1,2,3,9,10,15,21,22,24,25,27,28,31];
    }


    /******************************************************** CALCULATIONS AND DOM ASSIGNMENTS AREA  ********************************************************/

    /**
     * Show version of the calendar
     */
    try{
        version.innerText = "V - "+getVersion();
    }
    catch(err){
        console.log(err);
    }

    /**
     * Assign global date and calculate dayA, dayB, month of dayA and month of dayB.
     */
    try {
        //TESTING OUTPUT BY CONSOLE: CURRENT DAY AND MONTH
        // console.log(currentDay+"/"+currentMonth);
            
        // console.log(currentDay+" de "+getMonthName(currentMonth, language)+", "+currentYear);

        if(language == "es"){
            calendarGlobalDate.innerText = "Hoy es "+currentDay+" de "+getMonthName(currentMonth, language)+" de "+currentYear;
        }
        else if(language == "en"){
            calendarGlobalDate.innerText = "Today is "+getMonthName(currentMonth, language)+" "+currentDay+", "+currentYear;
        }


        dayA = checkMostNearEvent(yearArray, currentMonth, currentDay); //Obtains the most nearby event to the current day, from this or the next month.

        dayB = checkNextMostNearEvent(yearArray, currentMonth, dayA); //Obtains the most nearby event right next to dayA.


        realMonthA = checkMonthForMostNearEvent(yearArray, currentMonth, currentDay, dayA);
        realMonthB = checkMonthForMostNearEvent(yearArray, currentMonth, currentDay, dayB);

        //calendarIndexDate is a shortened version of calendarGlobalDate used for other page. If you don't want to use it, you can comment the next line.
        if(language == "es"){
            calendarIndexDate.innerText = dayA+" "+getMonthName(realMonthA, language).substring(0,3)+".";
        }
        else if(language == "en"){
            calendarIndexDate.innerText = getMonthName(realMonthA, language).substring(0,3);
            if(realMonthA != 4){  //Because may only has 3 letters, we don't need to set the point to abbreviate it, just on the rest.
                calendarIndexDate.innerText += ".";
            }
            calendarIndexDate.innerText += " "+dayA;
        }
    }
    catch(err){
        console.log(err);
    }

    /**
     * Assign date A.
     */
    try{
        calendarATitle.innerText = isTodayA(yearArray[currentMonth], currentDay, dayA, language); 

        calendarAImg1.src = getData(realMonthA, dayA, language, srcLang, "img1");
        calendarAImg2.src = getData(realMonthA, dayA, language, srcLang, "img2");
        calendarAImg3.src = getData(realMonthA, dayA, language, srcLang, "img3");
        calendarADate.innerText = dateFormat(language, dayA, realMonthA);
        calendarADesc.innerText = getData(realMonthA, dayA, language, srcLang, "desc");
        calendarADesc.classList.add(changeColor(realMonthA, dayA));

        revealCommunityDiv(calendarCommunityADiv, calendarCommunityEventA, calendarCommunityAuthorA, dayA, realMonthA, language);
    }
    catch(err){
        console.log(err);
    }


    /**
     * Assign date B.
     */
    try{
        calendarBTitle.innerText = isTomorrowB(currentDay, dayA, dayB, language); 
        
        calendarBImg1.src = getData(realMonthB, dayB, language, srcLang, "img1");
        calendarBImg2.src = getData(realMonthB, dayB, language, srcLang, "img2");
        calendarBImg3.src = getData(realMonthB, dayB, language, srcLang, "img3");
        calendarBDate.innerText = dateFormat(language, dayB, realMonthB);
        calendarBDesc.innerText = getData(realMonthB, dayB, language, srcLang, "desc");
        calendarBDesc.classList.add(changeColor(realMonthB, dayB));

        revealCommunityDiv(calendarCommunityBDiv, calendarCommunityEventB, calendarCommunityAuthorB, dayB, realMonthB, language);
    }
    catch(err){
        console.log(err);
    }


    /**
     * Assign display C data and if it has to be revealed or not.
     */
    try{
        if(revealDisplayC(currentMonth, currentDay)){
            calendarC.classList.remove('hide');
        }

        calendarCTitle.innerText = isLongEvent(currentMonth, language);

        calendarCImg1.src = getC(currentMonth, dayA, language, srcLang, "img1");
        calendarCDate.innerText = getC(currentMonth, dayA, language, srcLang, "date");
        calendarCDesc.innerText = getC(currentMonth, dayA, language, srcLang, "desc");
    }
    catch(err){
        console.log(err);
    }


    /**
     * Button that gets the user to a file that has all the events listed. If you don't want to use it, you can comment the next try-catch.
     */
    try{
        eventsPDF.innerText = checkLanguage(language, "Mira todos los eventos de ", "Check all events for ")+currentYear+checkLanguage(language, " aquí", " here");
        calendarPDF.innerText = checkLanguage(language, "Descarga aquí el Calendario ", "Download here the ")+currentYear+checkLanguage(language, "", "  Calendar");
    }
    catch(err){
        console.log(err);
    }



    /******************************************************** CONSOLE OUTPUT TESTING AREA ********************************************************/

    console.log("Mes actual: "+currentMonth+" · Mes texto: "+getMonthName(currentMonth, language))
    console.log("Dia A: "+dayA);
    console.log("Dia B: "+dayB);
    console.log("Mes real a: "+realMonthA);
    console.log("Mes real b: "+realMonthB);
    console.log("Imagen A 1: "+getData(currentMonth, dayA, language, srcLang, "img1"));
    console.log("Imagen A 2: "+getData(currentMonth, dayA, language, srcLang, "img2"));
    console.log("Imagen A 3: "+getData(currentMonth, dayA, language, srcLang, "img3"));
    console.log("Imagen B 1: "+getData(currentMonth, dayB, language, srcLang, "img1"));
    console.log("Imagen B 2: "+getData(currentMonth, dayB, language, srcLang, "img2"));
    console.log("Imagen B 3: "+getData(currentMonth, dayB, language, srcLang, "img3"));




    /******************************************************** "SPAGHETTI DATABASE" AND FUNCTIONS AREA ********************************************************/

    /**
     * This function returns a css class name to set colors to te string of description of event depending on its clasification:
     * A-Autonomous Region, S-Season change, H-Hour changes (daylight saving time), D-Diegatus Studios Event.
     * - /!\ THIS DATABASE USES THE EVENTS LISTED FOR THE YEAR 2025.
     * @param {number} currentMonth - Month
     * @param {number} day - Day
     * @returns A css class name to set colors to te string of description of event depending on its classification.
     */
    function changeColor(currentMonth, day){

        letter = "R";

        switch(currentMonth){

            //ENERO
            case 0:
                switch(day){
                    case 7: //Cumple Diegatus
                        letter = "D";
                        break;
                }

            //FEBRERO
            case 1:
                switch(day){
                    case 26: //Aniv. Diegatus Studios
                        letter = "D";
                        break;
                    case 28: //Andalucía
                        letter = "A";
                        break;
                }
            break;

            //MARZO
            case 2:
                switch(day){
                    case 1: //I. Baleares
                        letter = "A";
                        break;
                    case 20: //Change to spring
                        letter = "S";
                        break;
                    case 30: //Change to summer time
                        letter = "H";
                        break;
                }
            break;

            //ABRIL sólo tiene días A y coindicen con un día G, así que se mantiene el color.
            
            //MAYO
            case 4:
                switch(day){
                    case 2: //C. Madrid
                    case 30: //I. Canarias
                    case 31: //Castilla-La Mancha
                        letter = "A";
                        break;
                }
            break;

            //JUNIO
            case 5:
                switch(day){
                    case 9: //Murcia and La Rioja
                        letter = "A";
                        break;
                    case 21: //Change to summer
                        letter = "S";
                        break;
                }
            break;

            //JULIO
            case 6:
                switch(day){
                    case 25: //Galicia
                    case 28: //Cantabria
                        letter = "A";
                        break;
                }
            break;

            //SEPTIEMBRE
            case 8:
                switch(day){
                    case 2: //Ceuta
                    case 8: //Asturias and Extremadura
                    case 11: //Cataluña
                    case 17: //Melilla
                        letter = "A";
                        break;

                    case 22:
                        letter = "S";
                        break;

                }
            break;

            //OCTUBRE
            case 9:
                switch(day){
                    case 9: //C. Valenciana
                        letter = "A";
                        break;

                    case 26: //Change to winter time
                        letter = "H";
                        break;
                }
            break;

            //NOVIEMBRE sólo tiene días G.

            //DICIEMBRE
            case 11:
                
                if(currentYear == storedCurrentYear){
                    switch(day){

                        //Día A de Navarra coindice con un día G, así que se mantiene el color.

                        case 21: //Change to winter
                            letter = "S";
                            break;
                    }
                }
                else{
                    switch(day){

                        //Día A de Navarra coindice con un día G, así que se mantiene el color.

                        case 21: //Change to winter
                            letter = "S";
                            break;
                    }
                }

            break;
        }

        console.log(letter);

        switch(letter) { //strings corresponds to CSS that applies color to text.
            case "A":
                return "colorDodgerBlue";
            case "S":
                return "colorOrangeWarning";
            case "H":
                return "colorHotPink";
            case "D":
                return "colorBrightSunShadow";
        }
        
    }


    /**
     * Main calendar function. To use, refer to the use of parameter toGet.
     * - /!\ THIS DATABASE USES THE EVENTS LISTED FOR THE YEAR 2023.
     * @param {number} currentMonth - Current month corresponding to day.
     * @param {number} day - Day from which we want its information.
     * @param {string} language - The language in which the string will be returned. Must be "es" for spanish or "en" for english. Any other value will return null.
     * @param {string} srcLang - Start of the file path of the image. It can be obtained using startSrc(language) and storing it on a variable.
     *  @param {string} toGet - Information that has to be returned. It must be one of the following string values:
     * - "desc" for event name.
     * - "img1", "img2" or "img3" for each of the icons of the event (main image is "img1". "img2" and "img3" is for events that share day with the day of "img1" event).
     * - Any other value will return null.
     * @returns the information requested for the day and month as string. If the value doesn't exist it will return null.
     */
    function getData(currentMonth, day, language, srcLang, toGet){

        switch(currentMonth){
            //JANUARY
            case 0:
                switch(day){
                    case 1:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Año nuevo y Día del Dominio Público", "New Year’s Day and Public Domain Day"),
                            srcLang+"icons/calendar/0101a.png",
                            srcLang+"icons/calendar/0101b.png",
                            null
                        );
                    case 6:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Reyes", "Three Kings Day"),
                            srcLang+"icons/calendar/0106.png",
                            null,
                            null
                        );
                    case 7:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Cumpleaños de Diegatus", "Diegatus’ Birthday"),
                            srcLang+"icons/calendar/0107.png",
                            null,
                            null
                        );
                    case 13:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Lucha contra la Depresión y Día de las Pegatinas", "World Day For The Fight Against Depression and Sticker Day"),
                            srcLang+"icons/calendar/0113a.png",
                            srcLang+"icons/calendar/0113b.png",
                            null
                        );
                    case 16:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Croqueta", "International Croquette Day"),
                            srcLang+"icons/calendar/0116.png",
                            null,
                            null
                        );
                    case 20: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            "Blue Monday",
                            srcLang+"icons/calendar/0100a.png",
                            null,
                            null
                        );
                    case 27: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Community Manager", "Community Manager’s Day"),
                            srcLang+"icons/calendar/0100b.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //FEBRUARY
            case 1:
                switch(day){
                    case 2:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Marmota", "Groundhog Day"),
                            srcLang+"icons/calendar/0202.png",
                            null,
                            null
                        );
                    case 4:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Lucha contra el Cáncer", "World Cancer Day"),
                            srcLang+"icons/calendar/0204.png",
                            null,
                            null
                        );
                    case 8: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Cine", "Global Movie Day"),
                            srcLang+"icons/calendar/0200b.png",
                            null,
                            null
                        );
                    case 9:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Pizza", "World Pizza Day"),
                            srcLang+"icons/calendar/0209.png",
                            null,
                            null
                        );
                    case 11: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Internet Seguro", "Safer Internet Day"),
                            srcLang+"icons/calendar/0200a.png",
                            null,
                            null
                        );
                    case 13:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Radio", "World Radio Day"),
                            srcLang+"icons/calendar/0213.png",
                            null,
                            null
                        );
                    case 14:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "San Valentín", "Valentine’s Day"),
                            srcLang+"icons/calendar/0214.png",
                            null,
                            null
                        );
                    case 22:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Pensamiento Scout / Día del Fundador", "World Scout Thinking Day / Founder’s Day"),
                            srcLang+"icons/calendar/0222.png",
                            null,
                            null
                        );
                    case 26:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "9º Aniversario de los Diegatus Studios", "9th Diegatus Studios’ Anniversary"),
                            srcLang+"icons/calendar/0226.png",
                            null,
                            null
                        );
                    case 28:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Andalucía", "Andalusia Day"),
                            srcLang+"icons/calendar/F_Andalucia.png",
                            null,
                            null
                        );
                    case 29:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Año Bisiesto", "Leap Year Day"),
                            srcLang+"icons/calendar/0229.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;
            
            //MARCH
            case 2:
                switch(day){
                    case 1:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Inicio del Carnaval (hasta el 5 de marzo) y Día de las Islas Baleares", "Start of Carnival (until 5 Mar.) and Balearic Islands Day"),
                            srcLang+"icons/calendar/0000b.png",
                            srcLang+"icons/calendar/F_IslasBaleares.png",
                            null
                        );
                    case 8:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Mujer", "International Women’s Day"),
                            srcLang+"icons/calendar/0308.png",
                            null,
                            null
                        );
                    case 9:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del DJ y Día Mundial de la Tortilla de Patatas", "World DJ Day and International Spanish Omelette Day"),
                            srcLang+"icons/calendar/0309a.png",
                            srcLang+"icons/calendar/0309b.png",
                            null
                        );
                    case 10:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Mario", "Mario Day"),
                            srcLang+"icons/calendar/0310.png",
                            null,
                            null
                        );
                    case 14:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Pi", "Pi Day"),
                            srcLang+"icons/calendar/0314.png",
                            null,
                            null
                        );
                    case 15:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Inicio de las Fallas de Valencia (hasta el 19 de marzo)", "Start of Fallas of Valencia (until Mar. 19)"),
                            srcLang+"icons/calendar/0315.png",
                            null,
                            null
                        );
                    case 17:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "San Patricio y Día del Cómic y del Tebeo", "St. Patrick’s Day and Comic Day"),
                            srcLang+"icons/calendar/0317a.png",
                            srcLang+"icons/calendar/0317b.png",
                            null
                        );
                    case 19:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Padre", "Father’s Day"),
                            srcLang+"icons/calendar/0319.png",
                            null,
                            null
                        );
                    case 20:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Inicio de la primavera", "Start of spring"),
                            srcLang+"icons/calendar/0300a.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Síndrome de Down", "World Down Syndrome Day"),
                            srcLang+"icons/calendar/0321.png",
                            null,
                            null
                        );
                    case 22:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Agua", "World Water Day"),
                            srcLang+"icons/calendar/0322.png",
                            null,
                            null
                        );
                    case 27:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Teatro", "World Theater Day"),
                            srcLang+"icons/calendar/0327.png",
                            null,
                            null
                        );
                    case 30: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Cambio al horario de verano (Europa)", "Change to summer time (Europe)"),
                            srcLang+"icons/calendar/0300b.png",
                            null,
                            null
                        );
                    case 31:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Visibilidad Trans", "International Transgender Day of Visibility"),
                            srcLang+"icons/calendar/0331.png",
                            null,
                            null
                        );
                            default:
                    break;
                }
                break;

            //APRIL
            case 3:
                switch(day){
                    case 2:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Concienciación del Autismo", "World Autism Awareness Day"),
                            srcLang+"icons/calendar/0402.png",
                            null,
                            null
                        );
                    case 7:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Salud", "World Health Day"),
                            srcLang+"icons/calendar/0407.png",
                            null,
                            null
                        );
                    case 19:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de Los Simpsons™", "The Simpsons™ World Day"),
                            srcLang+"icons/calendar/0419.png",
                            null,
                            null
                        );
                    case 20:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Pascua", "Easter"),
                            srcLang+"icons/calendar/0000c.png",
                            null,
                            null
                        );
                    case 22:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Tierra", "Earth Day"),
                            srcLang+"icons/calendar/0422.png",
                            null,
                            null
                        );
                    case 23:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Libro y de los Derechos de Autor / San Jorge, Día de Aragón y Día de Castilla y León", "World Book and Copyright Day / St. George, Aragon Day and Castile and Leon Day"),
                            srcLang+"icons/calendar/0423a.png",
                            srcLang+"icons/calendar/F_Aragon.png",
                            srcLang+"icons/calendar/F_CastillaLeon.png"
                        );
                    case 26:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Veterinaria", "World Veterinary Day"),
                            srcLang+"icons/calendar/0400a.png",
                            null,
                            null
                        );
                    case 27:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Diseño Gráfico y Día del Código Morse", "World Communication Design Day and Morse Code Day"),
                            srcLang+"icons/calendar/0427a.png",
                            srcLang+"icons/calendar/0427b.png",
                            null
                        );
                    default:
                        break;
                }
                break;

            //MAY
            case 4:
                switch(day){
                    case 1:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Trabajo", "International Worker’s Day"),
                            srcLang+"icons/calendar/0501.png",
                            null,
                            null
                        );
                    case 2:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Comunidad de Madrid", "Community of Madrid Day"),
                            srcLang+"icons/calendar/F_Madrid.png",
                            null,
                            null
                        );
                    case 3:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Astronomía (celebración de primavera)", "World Astronomy Day (spring celebration)"),
                            srcLang+"icons/calendar/0000a.png",
                            null,
                            null
                        );
                    case 4:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Madre y Día de Star Wars™", "Mother’s Day and Star Wars™ Day"),
                            srcLang+"icons/calendar/0500b.png",
                            srcLang+"icons/calendar/0504.png",
                            null
                        );
                    case 9:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Europa", "Europe Day"),
                            srcLang+"icons/calendar/0509.png",
                            null,
                            null
                        );
                    case 10: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Cómic Gratis", "Free Comic Book Day"),
                            srcLang+"icons/calendar/0500a.png",
                            null,
                            null
                        );
                    case 17:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Reciclaje y Final del Festival de la Canción de Eurovisión 2025", "World Recycling Day and Eurovision Song Contest 2025 Final"),
                            srcLang+"icons/calendar/0517.png",
                            srcLang+"icons/calendar/0500c.png",
                            null
                        );
                    case 18:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de los Museos", "World Museums Day"),
                            srcLang+"icons/calendar/0518.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Té", "International Tea Day"),
                            srcLang+"icons/calendar/0521.png",
                            null,
                            null
                        );
                    case 25:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Orgullo Friki", "Geek Pride Day"),
                            srcLang+"icons/calendar/0525.png",
                            null,
                            null
                        );
                    case 30:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de las Islas Canarias", "Canary Islands Day"),
                            srcLang+"icons/calendar/F_IslasCanarias.png",
                            null,
                            null
                        );
                    case 31:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Castilla-La Mancha", "Castile-La Mancha Day"),
                            srcLang+"icons/calendar/F_CastillaLaMancha.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //JUNE
            case 5:
                switch(day){
                    case 5:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Medio Ambiente", "World Environment Day"),
                            srcLang+"icons/calendar/0605.png",
                            null,
                            null
                        );
                    case 8:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de los Océanos", "World Ocean Day"),
                            srcLang+"icons/calendar/0608.png",
                            null,
                            null
                        );
                    case 9:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Murcia y de La Rioja", "Murcia and La Rioja Day"),
                            srcLang+"icons/calendar/F_Murcia.png",
                            srcLang+"icons/calendar/F_LaRioja.png",
                            null
                        );
                    case 12:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Doblaje", "World Dubbing Day"),
                            srcLang+"icons/calendar/0612.png",
                            null,
                            null
                        );
                    case 20:
                        return checkContent(
                            toGet,
                            null,
                            "Yellow Day",
                            srcLang+"icons/calendar/0620.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Inicio del verano", "Start of summer"),
                            srcLang+"icons/calendar/0600a.png",
                            null,
                            null
                        );
                    case 23:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Noche de San Juan", "St. John's Eve"),
                            srcLang+"icons/calendar/0623.png",
                            null,
                            null
                        );
                    case 28:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Orgullo LGTBIQ+", "World LGTBIQ+ Pride Day"),
                            srcLang+"icons/calendar/0628.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //JULY
            case 6:
                switch(day){
                    case 2:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de los OVNIs", "World UFO Day"),
                            srcLang+"icons/calendar/0702.png",
                            null,
                            null
                        );
                    case 8:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Alergia", "World Allergy Day"),
                            srcLang+"icons/calendar/0708.png",
                            null,
                            null
                        );
                    case 13:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Rock", "World Rock Day"),
                            srcLang+"icons/calendar/0713.png",
                            null,
                            null
                        );
                    case 17:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Emoji", "World Emoji Day"),
                            srcLang+"icons/calendar/0717.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Perro", "World Dog Day"),
                            srcLang+"icons/calendar/0721.png",
                            null,
                            null
                        );
                    case 25:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Galicia", "Galicia Day"),
                            srcLang+"icons/calendar/F_Galicia.png",
                            null,
                            null
                        );
                    case 26:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de los Abuelos", "Grandparents’ Day"),
                            srcLang+"icons/calendar/0726.png",
                            null,
                            null
                        );
                    case 28:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Cantabria", "Cantabria Day"),
                            srcLang+"icons/calendar/F_Cantabria.png",
                            null,
                            null
                        );
                    case 30:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Amistad", "International Day of Friendship"),
                            srcLang+"icons/calendar/0730.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;
            
            //AUGUST
            case 7:
                switch(day){
                    case 1: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Cerveza", "World Beer Day"),
                            srcLang+"icons/calendar/0800a.png",
                            null,
                            null
                        );
                    case 8:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Gato", "International Cat Day"),
                            srcLang+"icons/calendar/0808.png",
                            null,
                            null
                        );
                    case 16:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Geocaching®", "International Geocaching® Day"),
                            srcLang+"icons/calendar/0816.png",
                            null,
                            null
                        );
                    case 19:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Fotografía", "World Photography Day"),
                            srcLang+"icons/calendar/0819.png",
                            null,
                            null
                        );
                    case 23:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Hashtag", "International Hashtag Day"),
                            srcLang+"icons/calendar/0823.png",
                            null,
                            null
                        );
                    case 27:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "La Tomatina", "La Tomatina"),
                            srcLang+"icons/calendar/0800b.png",
                            null,
                            null
                        );
                    case 29:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial del Videojuego", "World Videogame Day"),
                            srcLang+"icons/calendar/0829.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //SEPTEMBER
            case 8:
                switch(day){
                    case 2:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Ceuta", "Ceuta Day"),
                            srcLang+"icons/calendar/F_Ceuta.png",
                            null,
                            null
                        );
                    case 8:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Asturias y de Extremadura", "Asturias and Extremadura Day"),
                            srcLang+"icons/calendar/F_Asturias.png",
                            srcLang+"icons/calendar/F_Extremadura.png",
                            null
                        );
                    case 10:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial para la Prevención del Suicidio", "World Suicide Prevention Day"),
                            srcLang+"icons/calendar/0910.png",
                            null,
                            null
                        );
                    case 11:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Cataluña", "Catalonia Day"),
                            srcLang+"icons/calendar/F_Catalunya.png",
                            null,
                            null
                        );
                    case 13:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Programador", "World Programmer’s Day"),
                            srcLang+"icons/calendar/0913.png",
                            null,
                            null
                        );
                    case 17:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Melilla", "Melilla Day"),
                            srcLang+"icons/calendar/F_Melilla.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Paz", "International Peace Day"),
                            srcLang+"icons/calendar/0921.png",
                            null,
                            null
                        );
                    case 22: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Inicio del otoño", "Start of fall"),
                            srcLang+"icons/calendar/0900a.png",
                            null,
                            null
                        );
                    case 27: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Astronomía (celebración de otoño)", "World Astronomy Day (fall celebration)"),
                            srcLang+"icons/calendar/0000a.png",
                            null,
                            null
                        );
                    case 28: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de los Ríos", "World Rivers Day"),
                            srcLang+"icons/calendar/0900b.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //OCTOBER
            case 9:
                switch(day){
                    case 1:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Café e inicio de Inktober 2025 (hasta el día 31)", "World Coffee Day and start of Inktober 2025 (until Oct. 31)"),
                            srcLang+"icons/calendar/1001.png",
                            srcLang+"icons/calendar/1000a.png",
                            null
                        );
                    case 4:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de los Animales", "World Animal Day"),
                            srcLang+"icons/calendar/1004.png",
                            null,
                            null
                        );
                    case 5:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de los Docentes", "World Teachers’ Day"),
                            srcLang+"icons/calendar/1005.png",
                            null,
                            null
                        );
                    case 9:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de la Comunidad Valenciana", "Valencian Community Day"),
                            srcLang+"icons/calendar/F_Valenciana.png",
                            null,
                            null
                        );
                    case 12:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Fiesta Nacional de España", "Spain National Holiday"),
                            srcLang+"icons/calendar/1012.png",
                            null
                        );
                    case 19:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Lucha contra el Cáncer de Mama", "International Day Against Breast Cancer"),
                            srcLang+"icons/calendar/1019.png",
                            null,
                            null
                        );
                    case 25:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Artista", "International Artist Day"),
                            srcLang+"icons/calendar/1025.png",
                            null,
                            null
                        );
                    case 26: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Cambio al horario de invierno (Europa)", "Change to winter time (Europe)"),
                            srcLang+"icons/calendar/1000b.png",
                            null,
                            null
                        );
                    case 28:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional de la Animación", "World Animation Day"),
                            srcLang+"icons/calendar/1028.png",
                            null,
                            null
                        );
                    case 31:
                        return checkContent(
                            toGet,
                            null,
                            "Halloween",
                            srcLang+"icons/calendar/1031.png",
                            null,
                            null
                        );
                        return;
                    default:
                        break;
                }
                break;

            //NOVEMBER
            case 10:
                switch(day){
                    case 1:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día de Todos los Santos", "All Saints’ Day"),
                            srcLang+"icons/calendar/1101.png",
                            null,
                            null
                        );
                    case 16: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial en Recuerdo de las Víctimas de Accidentes de Tráfico", "World Day of Remembrance for Road Traffic Victims"),
                            srcLang+"icons/calendar/1100a.png",
                            null,
                            null
                        );
                    case 19:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Internacional del Hombre y Día del HDMI", "International Men’s Day and HDMI Day"),
                            srcLang+"icons/calendar/1119a.png",
                            srcLang+"icons/calendar/1119b.png",
                            null
                        );
                    case 20:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Universal del Niño", "World Children’s Day"),
                            srcLang+"icons/calendar/1120.png",
                            null,
                            null
                        );
                    case 21:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día Mundial de la Televisión", "World Television Day"),
                            srcLang+"icons/calendar/1121.png",
                            null,
                            null
                        );
                    case 27:
                        return checkContent(
                            toGet,
                            null,
                            checkLanguage(language, "Día del Maestro (España)", "Teacher’s Day (Spain)"),
                            srcLang+"icons/calendar/1127.png",
                            null,
                            null
                            );
                    case 28: //CAMBIA
                        return checkContent(
                            toGet,
                            null,
                            "Black Friday",
                            srcLang+"icons/calendar/1100b.png",
                            null,
                            null
                        );
                    default:
                        break;
                }
                break;

            //DECEMBER
            case 11:
                if(currentYear == storedCurrentYear){ //THIS YEAR - Remove "old_" in 2025
                    switch(day){
                        case 1:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Internacional de la lucha contra el SIDA y Día Internacional del Motociclista", "World AIDS Day and International Motorcyclist Day"),
                                srcLang+"icons/calendar/1201a.png",
                                srcLang+"icons/calendar/1201b.png",
                                null
                            );
                        case 2:
                            return checkContent(
                                toGet,
                                null,
                                "Cyber Monday",
                                srcLang+"icons/calendar/1100c.png",
                                null
                            );
                        case 3:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día 3D, Giving Tuesday: Un día para dar y Día de Navarra", "3D Day, Giving Tuesday and Navarra Day"),
                                srcLang+"icons/calendar/1203.png",
                                srcLang+"icons/calendar/1100d.png",
                                srcLang+"icons/calendar/F_Navarra.png"
                            );
                        case 9:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Mundial de la Informática", "World Computing Day"),
                                srcLang+"icons/calendar/old_1209.png",
                                null,
                                null
                            );
                        case 10:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día de los Derechos Humanos", "Human Rights Day"),
                                srcLang+"icons/calendar/old_1210.png",
                                null,
                                null
                            );
                        case 15:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Mundial del Otaku", "World Otaku Day"),
                                srcLang+"icons/calendar/old_1215.png",
                                null,
                                null
                            );
                        case 21:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Inicio del invierno", "First day of winter"),
                                srcLang+"icons/calendar/old_1200a.png",
                                null,
                                null
                            );
                        case 24:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Nochebuena", "Christmas Eve"),
                                srcLang+"icons/calendar/old_1224.png",
                                null,
                                null
                            );
                        case 25:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Navidad", "Christmas"),
                                srcLang+"icons/calendar/old_1225.png",
                                null,
                                null
                            );
                        case 27:
                            return checkContent(
                                toGet,
                                null,
                                "LEGO® Build Day",
                                srcLang+"icons/calendar/old_1227.png",
                                null,
                                null
                            );
                        case 28:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día de los Santos Inocentes y Día Internacional de los Días Mundiales", "Day of the Holy Innocents and International World Days Day"),
                                srcLang+"icons/calendar/old_1228a.png",
                                srcLang+"icons/calendar/old_1228b.png",
                                null
                            );
                        case 31:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Nochevieja", "New Year’s Eve"),
                                srcLang+"icons/calendar/old_1231.png",
                                null,
                                null
                            );
                        default:
                            break;
                    }
                }
                else{ //NEXT YEAR
                    
                    switch(day){
                        case 1:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Internacional de la lucha contra el SIDA, Día Internacional del Motociclista y Cyber Monday", "World AIDS Day, International Motorcyclist Day and Cyber Monday"),
                                srcLang+"icons/calendar/1201a.png",
                                srcLang+"icons/calendar/1201b.png",
                                srcLang+"icons/calendar/1100c.png"
                            );
                        case 2:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Giving Tuesday: Un día para dar", "Giving Tuesday"),
                                srcLang+"icons/calendar/1100d.png",
                                null
                            );
                        case 3:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día 3D y Día de la Comunidad Foral de Navarra", "3D Day and Chartered Community of Navarre Day"),
                                srcLang+"icons/calendar/1203.png",
                                srcLang+"icons/calendar/F_Navarra.png",
                                null
                            );
                        case 9:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Mundial de la Informática", "World Computing Day"),
                                srcLang+"icons/calendar/1209.png",
                                null,
                                null
                            );
                        case 10:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día de los Derechos Humanos", "Human Rights Day"),
                                srcLang+"icons/calendar/1210.png",
                                null,
                                null
                            );
                        case 15:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día Mundial del Otaku", "World Otaku Day"),
                                srcLang+"icons/calendar/1215.png",
                                null,
                                null
                            );
                        case 21:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Inicio del invierno", "Start of winter"),
                                srcLang+"icons/calendar/1200a.png",
                                null,
                                null
                            );
                        case 22:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Sorteo Extraordinario de Navidad", "Traditional Christmas Lottery"),
                                srcLang+"icons/calendar/1222.png",
                                null,
                                null
                            );
                        case 24:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Nochebuena", "Christmas Eve"),
                                srcLang+"icons/calendar/1224.png",
                                null,
                                null
                            );
                        case 25:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Navidad", "Christmas"),
                                srcLang+"icons/calendar/1225.png",
                                null,
                                null
                            );
                        case 27:
                            return checkContent(
                                toGet,
                                null,
                                "LEGO® Build Day",
                                srcLang+"icons/calendar/1227.png",
                                null,
                                null
                            );
                        case 28:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Día de los Santos Inocentes y Día Internacional de los Días Mundiales", "Day of the Holy Innocents and International World Days Day"),
                                srcLang+"icons/calendar/1228a.png",
                                srcLang+"icons/calendar/1228b.png",
                                null
                            );
                        case 31:
                            return checkContent(
                                toGet,
                                null,
                                checkLanguage(language, "Nochevieja", "New Year’s Eve"),
                                srcLang+"icons/calendar/1231.png",
                                null,
                                null
                            );
                        default:
                            break;
                    }
            }
            break;
        }
        
    }


    /**
     * This function checks if a long term event is currently going on and applies to display C.
     * @param {number} currentMonth - Current month.
     * @param {number} currentDay - Current day.
     * @returns A CSS value that allows the display C to stay hidden or be revealed. It will only be revealed if the current day and month correspond to those stored here manually.
     */
    function revealDisplayC(currentMonth, currentDay){

        // const february = 1;
        const march = 2;
        const october = 9;
        const arrayCarnaval = [1,2,3,4,5];
        const arrayFallas = [15,16,17,18,19];
        const arrayInktober = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

        if((currentMonth == march && arrayCarnaval.includes(currentDay)) || (currentMonth == march && arrayFallas.includes(currentDay)) || (currentMonth == october && arrayInktober.includes(currentDay))){
            return true;
        }
        else{
            return false;
        }
    }

    /**
     * Data for long term events (that last more than one day). To use, refer to the use of parameter toGet.
     * - /!\ THIS DATABASE USES THE EVENTS LISTED FOR THE YEAR 2023.
     * @param {number} currentMonth - Current month corresponding to day.
     * @param {number} day - Day from which we want its information.
     * @param {string} language - The language in which the string will be returned. Must be "es" for spanish or "en" for english. Any other value will return null.
     * @param {string} srcLang - Start of the file path of the image. It can be obtained using startSrc(language) and storing it on a variable.
     *  @param {string} toGet - Information that has to be returned. It must be one of the following string values:
     * - "date" for dates information (from when the event starts until when it ends).
     * - "desc" for event name.
     * - "img1" for the icon of the event. (Long term events only use one icon, so "img2" or "img3" will return null)
     * - Any other value will return null.
     * @returns Specific information for the long term event.
     */
    function getC(currentMonth, day, language, srcLang, toGet){
        switch(currentMonth){

            //MARCH
            case 2:
                for(let i = 1; i <= 5; i++){
                    if(i == day){
                        return checkContent(
                            toGet,
                            checkLanguage(language, "Del 1 al 5 de marzo", "From March 1 to 5"),
                            checkLanguage(language, "Carnaval", "Carnival"),
                            srcLang+"icons/calendar/0000b.png",
                            null,
                            null
                        );
                    }
                }
                for(let i = 15; i <= 19; i++){
                    if(i == day){
                        return checkContent(
                            toGet,
                            checkLanguage(language, "Del 15 al 19 de marzo", "From March 15 to 19"),
                            checkLanguage(language, "Fallas de Valencia", "Fallas of Valencia"),
                            srcLang+"icons/calendar/0315.png",
                            null,
                            null
                        );
                    }
                }
                break;

            //OCTOBER
            case 9:
                for(let i = 1; i <= 31; i++){
                    if(i == day){
                        return checkContent(
                            toGet,
                            checkLanguage(language, "Del 1 al 31 de octubre", "From October 1 to 31"),
                            "Inktober 2025",
                            srcLang+"icons/calendar/1000a.png",
                            null,
                            null
                        );
                    }
                }
                break;
            }
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
        return day+" de "+getMonthName(realMonth, language);
    }
    else if(language == "en"){
        return getMonthName(realMonth, language)+" "+day;
    }
    else{
        return null;
    }
}

function revealCommunityDiv(calendarCommunityDiv, calendarCommunityEvent, calendarCommunityAuthor, day, month, language){
    let communityAuthor = getCommunityAuthor(day, month);
    
    if(communityAuthor != null){
        let communityEvent = getCommunityEvent(communityAuthor, language, day, month);
        calendarCommunityDiv.classList.remove('hide');
        calendarCommunityEvent.innerHTML = communityEvent+"<br>"+checkLanguage(language, "APORTADO POR", "CONTRIBUTED BY");
        calendarCommunityAuthor.innerText = communityAuthor;
    }
}

function getCommunityAuthor(day, month){
    switch(month){
        case 4:
            switch(day){
                case 17:
                    return "@vesare_12";
            }
            break;
        case 6:
            switch(day){
                case 2:
                case 26:
                    return "@jor69_gti";
            }
            break;
        case 10:
            switch(day){
                case 19:
                    return "@diegodiaz_1256";
            }
            break;
    }
}

function getCommunityEvent(author, language, day, month){
    switch(author){
        case "@vesare_12":
            switch(month){
                case 4:
                    switch(day){
                        case 17:
                            return checkLanguage(language, "Festival de la Canción de Eurovisión", "Eurovision Song Contest");
                    }
            }
        case "@diegodiaz_1256":
            switch(month){
                case 10:
                    switch(day){
                        case 19:
                            return checkLanguage(language, "Día del HDMI", "HDMI Day");
                    }
            }
        case "@jor69_gti":
            switch(month){
                case 6:
                    switch(day){
                        case 2:
                            return checkLanguage(language, "Día Mundial de los OVNIs", "World UFO Day");
                        case 26:
                            return checkLanguage(language, "Día de los Abuelos", "Grandparents’ Day");
                    }
            }
    }
}
