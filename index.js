 function calcTime(offset) {
      // create Date object for current location
      let date = new Date();
  
      // convert to msec
      // subtract local time zone offset
      // get UTC time in msec
      let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  
      // create new Date object for different city
      // using supplied offset
      let newDate = new Date(utc + (3600000*offset));
  
      // return time as a string
      return newDate;
  }
 
    setInterval(function time(){

      let start = new Date();
      start.setHours(11, 45, 0); // 11:45am
      let now = start.isDaylightSavingTime() ? calcTime('-4') : calcTime('-5');
      if (now > start) { // check current time is getter then add one day
          start.setDate(start.getDate() + 1);
      }
    
        let days = ((start - now) / 1000);
        let hrs = format((days / 60 / 60) % 60);
        let min = format((days / 60) % 60);
        let sec = format(days % 60);
        
    timeLeft = "" +hrs+' hours and '+min+' minutes '+sec+' seconds';
      $("#countdown").html(timeLeft);
      
      if(document.getElementById('fromDate')) {

        
        let dateStart = 2;
        let dateEnd = 3;
        let fromDate = Date.today().addDays(dateStart);
        if (fromDate.is().saturday() || fromDate.is().sunday()) { 
          fromDate = fromDate.next().monday();
        }
        let toDate = Date.today().addDays(dateEnd);
        if (toDate.is().saturday() || toDate.is().sunday()) { 
          toDate = toDate.next().monday(); 
        }
        if(fromDate.is().friday() && toDate.is().monday()) {
          fromDate = fromDate.next().monday();
          toDate = toDate.tuesday();

        }
        if (fromDate.is().monday && toDate.is().monday) {
          fromDate.addDays(1)
          toDate.addDays(2)
        }
        document.getElementById('fromDate').innerHTML = fromDate.toString('MM/dd');
        document.getElementById('toDate').innerHTML = toDate.toString('MM/dd');
      }

    }, 1000);
    
    // Add before 0 of hour, min, sec
    function format(num) {
        return ("0" + parseInt(num)).substr(-2);
    }
