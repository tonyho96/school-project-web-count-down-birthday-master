var month30 = [4, 6, 9, 11];
var month31 = [1, 3, 5, 7, 8, 10, 12];
var _day;
var _month;
var _year;
var days;
var hours;
var minutes;
var seconds;
var timeout = null;

function submit(){
	clearError();
	if (validate() == 0 && checkBirthday() == 0) {
		var modal = document.getElementById("modalBlock");
		var gender = document.getElementById("Gender");
		var firstName = document.getElementById("FirstName");
		var lastName = document.getElementById("LastName");
		var welcome = document.getElementById("Welcome");
		var annou = document.getElementById("Announcement");
		var string = "Good ";
		var Announcement = "";
		var Gd = "";
		var current = new Date();



		string = string + CurrentTime(current.getHours()*1) + " ";
		if (gender.value*1 == 1) {
			string = string + "Mr.";
			Gd = "Mr.";
		}
		else{
			string = string + "Ms.";
			Gd = "Ms.";
		}
		string = string + ' <span style="color: #f37d14;">' + firstName.value + " " + lastName.value + "</span>!";
		welcome.innerHTML = string;



		
		_day = document.getElementById("DayOfBirth").value*1;
		_month = document.getElementById("MonthOfBirth").value*1;
		var $year = document.getElementById("YearOfBirth").value*1;
		Announcement = Announcement + Gd + string + " is " + YearsOld(_day, _month, $year) + " years old and still ";
		if (_month < current.getMonth()*1+1) {
			_year = current.getFullYear()*1+1;
		}
		if (_month == current.getMonth()*1+1) {
			if (_day < current.getDate()*1) {
				_year = current.getFullYear()*1+1;
				alert(_year);
			}
			else{
				_year = current.getFullYear()*1;
			}
		}
		if (_month > current.getMonth()*1+1) {
			_year = current.getFullYear()*1;
		}
		var time = new Date(_year, _month-1, _day, 00, 00, 00);
		var elapse = time-current;
		//var mls = new Date(elapse);
		days = Math.floor(elapse/1000/60/60/24);
		hours = Math.floor(elapse%864e5/36e5);
		minutes = Math.floor(elapse%36e5/60000);
		seconds = Math.floor(elapse%60000/1000);
		//alert(days+"-"+hours+"-"+minutes+"-"+seconds);
		document.getElementById("dayRelease").innerHTML = days;
		document.getElementById("hourRelease").innerHTML = hours;
		document.getElementById("minRelease").innerHTML = minutes;
		document.getElementById("secondsRelease").innerHTML = seconds;

		Announcement = Announcement + days + " days to your " + YearsOld(_day, _month, $year-1) + "th birthday of " + Gd;
		annou.innerHTML = Announcement;

		modal.style.display = "none";
		startCountDown();
	}
}

function validate(){
	var flag = 0;
	var firstName = document.getElementById("FirstName").value;
	var lastName = document.getElementById("LastName").value;
	var gender = document.getElementById("Gender").value;
	var dayofbirth = document.getElementById("DayOfBirth").value;
	var monthofbirth = document.getElementById("MonthOfBirth").value;
	var yearofbirth = document.getElementById("YearOfBirth").value;
	if (firstName == '' || firstName == null) {
		flag = 1;
		var obj = document.getElementById("FirstName");
		obj.className += " red-border";
	}
	if (lastName == '' || lastName == null) {
		flag = 1;
		var obj = document.getElementById("LastName");
		obj.className += " red-border";
	}
	if (gender == 0) {
		flag = 1;
		var obj = document.getElementById("Gender");
		obj.className += " red-border";
	}
	if (dayofbirth == 0) {
		flag = 1;
		var obj = document.getElementById("DayOfBirth");
		obj.className += " red-border";
	}
	if (monthofbirth == 0) {
		flag = 1;
		var obj = document.getElementById("MonthOfBirth");
		obj.className += " red-border";
	}
	if (yearofbirth == 0) {
		flag = 1;
		var obj = document.getElementById("YearOfBirth");
		obj.className += " red-border";
	}
	return flag;
}

function checkBirthday(){
	var dayofbirth = document.getElementById("DayOfBirth");
	var monthofbirth = document.getElementById("MonthOfBirth");
	var yearofbirth = document.getElementById("YearOfBirth");
	var flag = 0;
	var year = yearofbirth.value*1;
	var day = dayofbirth.value*1;
	var month = monthofbirth.value*1;
	if ((year%4 === 0 && year%100 !== 0) || (year%100 === 0 && year%400 === 0)) {
		//is leap year
		if (month == 2) {
			if (day > 29) {
				flag = 1;
				dayofbirth.className += " red-border";
				showError("Day you enter does not correct!");
			}
		}
		else{
			if (month30.indexOf(month) != -1) {
				if (day > 30) {
					flag = 1;
					dayofbirth.className += " red-border";
					showError("Day you enter does not correct!");
				}
			}
			if (month31.indexOf(month) != -1) {
				if (day > 31) {
					flag = 1;
					dayofbirth.className += " red-border";
					showError("Day you enter does not correct!");
				}
			}
		}
	}
	else{
		//is not leap year
		if (month == 2) {
			if (day > 28) {
				flag = 1;
				dayofbirth.className += " red-border";
				showError("Day you enter does not correct!");
			}
		}
		else{
			if (month30.indexOf(month) != -1) {
				if (day > 30) {
					flag = 1;
					dayofbirth.className += " red-border";
					showError("Day you enter does not correct!");
				}
			}
			if (month31.indexOf(month) != -1) {
				if (day > 31) {
					flag = 1;
					dayofbirth.className += " red-border";
					showError("Day you enter does not correct!");
				}
			}
		}
	}
	return flag;
}

function clearError(){
	var errLg = document.getElementById("errorLog");
	errLg.style.display = "none";
}

function showError(error){
	var errLg = document.getElementById("errorLog");
	errLg.innerHTML = error;
	errLg.style.display = "block";
}

function fillDateOfBirth(){
	var day = document.getElementById("DayOfBirth");
	var month = document.getElementById("MonthOfBirth");
	var year = document.getElementById("YearOfBirth");
	for (var i = 1; i < 32; i++) {
		day.innerHTML = day.innerHTML + '<option value="'+i+'">'+i+'</option>';
	}
	for (var i = 1; i < 13; i++) {
		month.innerHTML = month.innerHTML + '<option value="'+i+'">'+i+'</option>';
	}
	for (var i = 2017; i > 1917; i--) {
		year.innerHTML = year.innerHTML + '<option value="'+i+'">'+i+'</option>';
	}
}

function startCountDown(){
	if (seconds == -1) {
		minutes -= 1;
		seconds = 59;
	}
	if (minutes == -1) {
		hours -= 1;
		minutes = 59;
	}
	if (hours == -1) {
		days -= 1;
		hours = 23;
	}
	if (days == -1) {
		clearTimeout(timeout);
		alert("Time out");
		return false;
	}
	document.getElementById("dayRelease").innerHTML = days;
	document.getElementById("hourRelease").innerHTML = hours;
	document.getElementById("minRelease").innerHTML = minutes;
	document.getElementById("secondsRelease").innerHTML = seconds;

	timeout = setTimeout(function(){
		seconds--;
		startCountDown();
	}, 1000);
}

function CurrentTime(hours){
	if (hours>=3 && hours <11) {
		return "morning";
	}
	if (hours>=11 && hours<13) {
		return "noon";
	}
	if (hours>=13 && hours<18) {
		return "afternoon";
	}
	if (hours>=18 || hours<3) {
		return "evening";
	}
}

function YearsOld($day, $month, $year){
	var crr = new Date();
	if (crr.getMonth()*1+1 == $month) {
		if (crr.getDate()*1 >= $day) {
			return crr.getFullYear()*1 - $year;
		}
		else{
			return crr.getFullYear()*1 - $year -1;
		}
	}
	if (crr.getMonth()*1+1 < $month) {
		return crr.getFullYear()*1 - $year - 1;
	}
	if (crr.getMonth()*1+1 > $month) {
		return crr.getFullYear()*1 - $year;
	}
}