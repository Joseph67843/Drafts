//listener.js

/* Note: intended behavior is to reward user for each completed
 * pomodoro and punish user for each paused or quit pomodoro. 
 * The prior version also punished the user for skipped breaks,
 * but I don't think that makes much sense. Maybe a user setting
 * is a possible future feature.
 *
 * Pomodoro tracker currently sends 3 messages: 
 * pomodoro_timer_started: pomodoro starts; break starts
 *
 * pododoro_timer_stopped, immediately followed by
 *  pomodoro_timer_finished: pomodoro complete, break complete
 *
 * no message: pause, resume, skip break, user quit by leaving
 *  page
 *
 * pomodoro_timer_finished (without stopped): pomodoro stopped 
 *  by clicking button
 *
 * Since this reads the display to infer status where the messages
 * fall short, it's going to be finicky. If it starts misbehaving,
 * look at pomo-timer.com for interface changes.
 * 
 * Generally, we are going to listen for the pomodoro_timer_started
 * message to learn when a pomo or break starts, and the 
 * pomorodo_timer_finished message to learn when a pomodoro or break
 * by completion or the user terminating. We will add a listener
 * to the first button to watch for when the user pauses a 
 * pomodoro or break.
 *
 * Currently, when the user stops a pomodoro without completing,
 * the title remains "POMODORO #N", while when a pomodoro is 
 * is completed, it changes to "TAKE A SHORT BREAK." We will use the
 * title and the isRunning variable to figure out whether the events 
 * are associated with breaks, pomos, completions and interuptions. 
 * An alternative would be to read the timer when a pomo starts and 
 * measure elapsed time when it stops.
 *
 * Joseph 02/04/2018
 */

var bptApp = {
	
    var isRunning = 'none'; // none, pomodoro, break
    var buttonStartStopResume; // we'll need a pointer to this button so we can add and remove a listener

    /* We don't currently use these functions, but an alternative would be to measure the
       time remaining when a Pomodoro starts, then compare that to the current time on stop
       to see if a Pomodoro were completed or interruped.
   
    function readTimer () {
        return $('pomodoro .pomodoro-timer span').html();
    }

    function readPomodoroNumber (str) {
    	return parseInt(str.split("#")[1]);
    }
 
    function readFirstButton () {
        return $("pomodoro .pomodoro-timer_buttons button").html()
    }
    */

    readTitle: function () {
        return $('pomodoro .pomodoro-timer_title span').html();
    }

    pomoDone: function (num) {
        // browser.sendMessage({
        //    type: "pomTracker.pomodoro.done",
        //    pomodoroCount: num
        // });
        console.log ('Good job - pomodoro finished!');
    }

    pomoStopped: function  () {
        //  browser.sendMessage({type: "pomTracker.pomodoro.stopped"});
        console.log ('Oh no - pomodoro interrupted!');  
    }
    
    init: function () {

        // add listener for messages
        window.addEventListener("message", this.messageHandler, false);

        // add listeners for buttons
	var buttons = document.getElementsbyClassName ("pomodoro-timer_buttons");
	this.buttonStartStopResume = buttons.firstElementChild;
	this.buttonStartStopResume.addEventListener("click", this.firstButtonHandler, false);
	
	// We don't actually need to watch the second button at this time, since we're watching the messages
	// If you add this, then declare the variable globally
	// buttonStop = start.nextElementSibling; 
	
    };

    exit: function () {
	// If the window is closing in the middle of a pomodoro, then punish!
	If (this.isRunning === 'pomodoro") {
	    this.pomoDone ();
        }

	// This serves no function other than to satisfy some obsessive trait I must have
	this.isRunning = 'none';
	    
	// remove our event listeners
	window.removeEventListener("message");
	this.buttonStartStopResume.removeEventListener("click");
    }

    messageHandler: function (event) {

        // We only accept messages from ourselves
        if (event.source != window)
            return;

        // We can ignore empty events
        if (!event.data.type) {
     	    return;
        }

        // For all other messages, do the right thing

        switch (event.data.type) {
			
            case 'pomodoro_timer_started': 
	        // Ok, we have either started a pomo or a break

	        var pomoTitle = this.readTitle();
      
                if (pomoTitle.indexOf ("POMODORO") { 
		    //We have started a pomo
		    
                    console.log ("Pomodoro started");
                    this.isRunning === 'pomodoro';

           
                } else if (pomoTitle.indexOf ("BREAK") {
	 	    // We have started a break
		
	            console.log ("Break started");
		    this.isRunning = 'break';

                } else {
		    // If the title didn't contain either "POMODORO" or "BREAK", something is wrong
                    console.log (`Error - unexpected title: $pomoTitle`);
                } 

            break;
            case 'pomodoro_timer_started': 

            case 'pododoro_timer_stopped':
            // We can ignore these messages because they are redundant with pomodoro_timer_finished
		
            break;
			
            case 'pomodoro_timer_finished'
            // We have either (a) finished or (b) quit a (i) pomodoro or (ii) break
		
            if this.isRunning === 'pomodoro' {
                // We were in a pomodoro - if finished, reward, if quit, punish

// <Use the pomocount to figure this out??> 
       // <here> punish or reward based on the title or the button
       } 

       // If we're not in a pomodoro, we don't care (although we could error check for none)

       // Whether or not we're in a pomodoro, we're done and can switch to none.

       bptApp.isRunning = 'none';

       break;
			
       // If we're here, an unexpected message arrived
       case default:
		
	   console.log (`Error - unexpected message: $event.data.type`);
			
	break;
    }

            case 'pododoro_timer_stopped':
            // We can ignore these messages because they are redundant with pomodoro_timer_finished
		
            break;
<here>
	
//	console.log (event.data.type);
//  console.log (" Time: " + readTimer() );
//    console.log (" First button: " + readFirstButton () );
//    console.log (" Title: " + readTitle () );
    return;
}

function buttonOneHandler () {
	// Ok, the user clicked the first button, what does that mean?
	
	var currentTitle = readTitle()
	
	// Well, if we're on a break, we don't care; so return
	
	if currentTitle.indexOf ("BREAK") {
	
	} else if currentTitle.indexOf ("POMODORO") {
		// Check to see if user paused a pomo. If not, the messages will catch it.
		if readFirstButton = 'RESUME' {
			// <punish>
			console.log ('For shame - you paused your Pomodoro!');
	}
}

$( window ).on( "load", function() {
    init();
});

$(window).on('unload', function () {
	window.removeEventListener("message");
	buttonStartStopResume.removeEventListener("click");
	// <here> if Pomodoro is still running, then punish
});

console.log("Script active");        

