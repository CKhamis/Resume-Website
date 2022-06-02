$(document).ready(function(){
	d3.csv("../Data/Data.csv", function(error,data){
		if (error) throw error;

		//Gender Count For Overview
		var Boys = 0, Girls = 0, Other = 0;
		for(i=0; i < data.length;i++){	
			if(data[i].Gender == "Male"){
				Boys++;
			}else if(data[i].Gender == "Female"){
				Girls++;
			}else{
				Other++;
				console.log("Other: " + data[i].Gender);
			}
		}
		d3.select("#maleCount").text((Boys / data.length).toFixed(2)*100 + "%");
		d3.select("#femaleCount").text((Girls / data.length).toFixed(2)*100 + "%");
		d3.select("#otherCount").text((Other / data.length).toFixed(2)*100 + "%");

		//Status Count For Overview
		var Faded = 0, Idle = 0, Inactive = 0, Active = 0, Open = 0;
		for(i=0; i < data.length;i++){	
			if(data[i].Status == "Faded"){
				Faded++;
			}else if(data[i].Status == "Idle"){
				Idle++;
			}else if(data[i].Status == "Inactive"){
				Inactive++;
			}else if(data[i].Status == "Open"){
				Open++;
			}else if(data[i].Status == "Active"){
				Active++;
			}else{
				console.log("Other: " + data[i].Gender)
			}
		}
		d3.select("#fadedCount").text(Faded);
		d3.select("#idleCount").text(Idle);
		d3.select("#inactiveCount").text(Inactive);
		d3.select("#activeCount").text(Active);
		d3.select("#openCount").text(Open);	

		//People Enterd For Overview
		d3.select("#Count").text(data.length);

		//Roster Select Options
		var OpSelect = d3.select("#peopleOptions");
		
		for(i=0; i<data.length; i++){
			OpSelect.append("option")
				.text(data[i].FirstName)
				.attr("value", i);
		}
		
		//Roster Setup
		$("#updateBtn").click(function(){
			//Declare Properties
			var peopleOptionsDropdownValue = document.getElementById('peopleOptions').value;
			var firstName = data[peopleOptionsDropdownValue].FirstName;
			var lastName = data[peopleOptionsDropdownValue].LastName;
			var profilePhotoSrc = undefined;
			var birthday = data[peopleOptionsDropdownValue].Birthday;
			var Information =  data[peopleOptionsDropdownValue].Information;
			var Status = data[peopleOptionsDropdownValue].Status;
			var Level = data[peopleOptionsDropdownValue]["Status lvl"];
			var Met = data[peopleOptionsDropdownValue].Met;
			
			//Set Up Values for Properites
			if(profilePhotoSrc == undefined){
				profilePhotoSrc = "../Images/Backgrounds/giphy.gif";
			}
			
			if(lastName == "N/A" || lastName == undefined){
				lastName = "";
			}else{
				lastName = " " + lastName;
			}
			
			if(isNaN(Met)){
				Met = "Met in " + Met;
			}else{
				Met = "Met in grade: " + Met;
			}
			
			//Page Setup
			d3.select("#Name").text(firstName + lastName);
			d3.select("#profilePhoto").attr("src",  profilePhotoSrc);
			d3.select("#Birthday").text(birthday);
			if(Birthday == new Date()){
				d3.select("#Birthday").style("color", "orange");
			}
			d3.select("#Info").text("Information: "+Information);
			d3.select("#Status").text(Status);
			d3.select("#Met").text(Met);
			d3.select("#Lvl").text(Level);
		});
	});
});
