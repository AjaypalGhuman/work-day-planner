// current date and time at the top of the jumbotron section
var today = moment().format('dddd, MMMM Do, h:mm a');

var now = moment().format('H A');

// planner where entries will be made for tasks to do throughout the workday
var planner = [
    { time: '9 am', event: '' },
    { time: '10 am', event: '' },
    { time: '11 am', event: '' },
    { time: '12 pm', event: '' },
    { time: '1 pm', event: '' },
    { time: '2 pm', event: '' },
    { time: '3 pm', event: '' },
    { time: '4 pm', event: '' },
    { time: '5 pm', event: '' },
];


var workPlans = JSON.parse(localStorage.getItem('workday'));
if (workPlans) {
    planner = workPlans
}

$('#currentDay').text(today);

planner.forEach(function(timeblock, index) {
    var timeStamp = timeblock.time;
    var color = colorSection(timeStamp);
    var section = '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeStamp +
    '</div><textarea class="form-control ' +
    color +
    '">' +
    timeblock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    $('.container').append(section);
});

function colorSection(time) {
    var scheduleNow = moment(now, 'H A');
    var eventEntry = moment(time, 'H A');

    if (scheduleNow.isBefore(eventEntry) === true) {
        return 'future';
    } else if (scheduleNow.isAfter(eventEntry) === true) {
        return 'past';
    } else {
        return 'present';
    }
}

$('.saveBtn').on('click', function() {
	var sectionID = parseInt($(this).closest('time-block').attr('id'));
	var userEntry = $.trim($(this).parent().siblings('textarea').val());
	
    planner[sectionID].event = userEntry;

	/* Set local storage */
	localStorage.setItem('workday', JSON.stringify(planner));
});
