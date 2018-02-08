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
 * Currently, when the user stops a pomodoro without completing,
 * the title remains "POMODORO #N", while when a pomodoro is 
 * is completed, it changes to "TAKE A SHORT BREAK." When a 
 * 'pomodoro-time_finished' message is received while a pomodoro 
 * is running, we will use the title to infer whether the pomo
 * was completed or interrupted.
 *
 * Joseph 02/04/2018
 */

var bptApp = {
	
    var pomoRunning = 'none'; // none, pomodoro, break
    var buttonStartStopResume;

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

    function readTitle () {
        return $('pomodoro .pomodoro-timer_title span').html();
    }

    function reward () {
    // <write this> 
    console.log ('Good job - pomodoro finished!');
    }

    function punish () {
    // <write this>
    console.log ('Oh no - pomodoro interrupted!');  
    }
    
    function init () {

        // add listener for messages
        window.addEventListener("message", bptApp.messageHandler, false);

        // add listeners for buttons
	var buttons = document.getElementsbyClassName ("pomodoro-timer_buttons");
	buttonStartStopResume = buttons.firstElementChild;
	bptApp.buttonStartStopResume.addEventListener("click", btpApp.firstButtonHandler, false);
	
	// We don't actually need to watch the second button at this time, since we're watching the messages
	// If you add this, then declare the variable globally
	// buttonStop = start.nextElementSibling; 
	
    };

    function exit () {
	// If the window is closing in the middle of a pomodoro, then punish!
	If (bptApp.isRunning === 'pomodoro") {
	    bptApp.punish ();
        }

	// This serves no function other than to satisfy some obsessive trait I must have
	bptApp.isRunning = 'none';
	    
	// remove our event listeners
	window.removeEventListener("message");
	btpApp.buttonStartStopResume.removeEventListener("click");
    }

function messageHandler (event) {

    // We only accept messages from ourselves
    if (event.source != window)
     		return;

    // We can ignore empty events
    if (!event.data.type) {
     		return;
    }

    // For all other messages, do the right thing

    switch (event.data.type) {

        // Pomodoro or break started
        case 'pomodoro_timer_started': 

			var pomoTitle = bptApp.readTitle();
      
            // Pomomodoro started
            if (pomoTitle.indexOf ("POMODORO") {
                console.log ("Pomodoro started");
                bptApp.isRunning === 'pomodoro';

            // Break started
            } else if (pomoTitle.indexOf ("BREAK") {
		console.log ("Break started");
		pomoRunning = 'break';

            // Unexpected title
            } else {
                console.log (`Error - unexpected title: $pomoTitle`);
            } 

        break;
		
        // We're ignoring these, because they are redundant with 'pomodoro_timer_finished'
        case 'pododoro_timer_stopped':
		
       break;
			
       case 'pomodoro_timer_finished'
		
       // If we were a pomodoro, then figure out whether to punish or reward
       if bptApp.isRunning === 'pomodoro' {
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

