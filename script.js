// YO! It's a Partial Billing Calculator

/* NOTES 

1.	Total amount due/ total days of service = cost per day
2.	Cost per day x the number of days in the partial = amount due for partial bill
Example using the attached bill, if the tenant moved out on 3/31/16 which means the tenant would be responsible for 44 days of service:

$366.99/61 days of service = $6.01/day
$6.01 x 44 dos =  $264.71 (this is what a tenant would owe if they moved 3/31/16).
 
*/

$(function(){
	var totalDue;
	var serviceDays;
	var partialDays;
	var costPerDay;
	var partialDue;

	$('.helpModal, .helpModal button').click(function() {
		$('.helpModal').fadeOut();
	});

	$('.step button.help').click(function() {
		var step = $(this).closest('.step').attr('id');
		console.log(step);
		switch (step){
			case 'step1':
				$('.helpModal .step2').hide();
				$('.helpModal .step1').show();
			break;
			case 'step2':
				$('.helpModal .step2').show();
				$('.helpModal .step1').hide();
			break;
		}
		$('.helpModal').fadeIn();
	});

	$('.step input').focusout(function(){
		inputValue = $(this).val(); 
		if (inputValue.length > 0){
			numValue = parseFloat(inputValue) || 0.0;
			if (numValue != 0.0) {
				//console.log(numValue);
			} else {
				//console.log('You can only enter numbers higher than zero.');
			}
		}
	});

	$('.step button.next').click(function() {
		var $step = $(this).closest('.step');
		var input = parseFloat($step.find('input').val()) || 0.0;
		var	$error = $step.find('.errorWrapper');
		var progressPosition = ($step.index() + 1) * 25;

		//console.log(input);
	
		if (input && input !== 0.0 || $step[0].id === 'stepWelcome') {
			$error.fadeOut();

			if ($step[0].id === 'step3') {
				$('.amountDue').text('$ ' + amountDue());
			}
			$('.step').removeClass('active');
			$('.progressBar .step:eq('+ $step.index() +')').addClass('active');
			$step.next('.step').toggle('slide', {direction:'right'}, 300);
			$step.toggle('slide', {direction:'left'}, 300); 
			$('.stepIndicator').css('left', progressPosition + '%');
		} else {
			console.log('yo, you need input');
			$error.find('.errorMessage')
				  .text('You must enter a number greater than 0.');
			$error.fadeIn();
		}
	});	

	$('.step button.previous').click(function() {
		var $parentStep = $(this).closest('.step');
		$parentStep.prev('.step').toggle('slide');
		$parentStep.toggle('slide');
	});		

	$('.step button.reset').click(function() {
		$('.step input').val('');
		var $parentStep = $(this).closest('.step');
		$('#step1').toggle('slide', {direction:'left'}, 300);
		$parentStep.toggle('slide', {direction:'right'}, 300); 
		$('.stepIndicator').css('left', '0px');
	});	
});

var costPerDay = function() {
	totalDue = parseFloat($('#totalDue').val()) || 0.0;
	serviceDays = parseFloat($('#serviceDays').val()) || 0.0;

	return totalDue/serviceDays;
}

var amountDue = function() {
	var dayRate = costPerDay();
	partialDays = parseFloat($('#partialDays').val()) || 0.0;

	var partialDue = dayRate * partialDays;

	return partialDue.toFixed(2);
}