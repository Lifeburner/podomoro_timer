$(document).ready(function() {
	"use strict";
	
	var intervalID;
	
	$('.start').click(function() {
		var workLength, breakLength;
		
		$('#btn-start').toggleClass("pause start")
		$('#btn-start').text("PAUSE");
		
		// Time length for break and work period, in miliseconds
		workLength = parseInt($('#work-time').text(), 10) * 60000;
		breakLength = parseInt($('#break-time').text(), 10) * 60000;
		
		var work = function (minutes) {
			clearInterval(intervalID);
		
			var start = _.round(Date.now(), -3);
		
			function calculateTime(span) {
				var now = Date.now();
				return _.round(span - (now - start), -3);
			}
		
			function displayTime() {
				var time = new Date(calculateTime(minutes));
				
				$('#btn-stop').click(function() {
					clearInterval(intervalID);
					$('#main-display').text($('#work-time').text() + ":00");
				});
				
				if (time.getSeconds() < 0) {
					clearInterval(intervalID);
					return;
				}
				
				$('#main-display').text(time.getMinutes() + ":" + time.getSeconds());
			}
			
			intervalID = setInterval(displayTime, 1000);
			
			brake(breakLength);
		};
		
		var brake = function (minutes) {
			clearInterval(intervalID);
		
			var start = _.round(Date.now(), -3);
		
			function calculateTime(span) {
				var now = Date.now();
				return _.round(span - (now - start), -3);
			}
		
			function displayTime() {
				var time = new Date(calculateTime(minutes));
				
				$('#btn-stop').click(function() {
					clearInterval(intervalID);
					$('#main-display').text($('#work-time').text() + ":00");
				});
				
				if (time.getSeconds() < 0) {
					clearInterval(intervalID);
					return;
				}
				
				$('#main-display').text(time.getMinutes() + ":" + time.getSeconds());
			}
			
			intervalID = setInterval(displayTime, 1000);
			
			work(workLength);
		}
		
		work(workLength);
	});
	
	$('.pause').click(function() {
		$('#btn-start').text("START");	
		$('#btn-start').toggleClass("start pause");
		
		clearInterval(intervalID);
	});
	
	
})