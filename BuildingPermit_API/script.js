/******w**************
    
    Name: Qiaoran Xue
    Date: 2023-09-28
    Description: Search building permits by street name. 

*********************/

let button = document.querySelector('button.search');

button.addEventListener('click', (event) => {

	let streetName = document.getElementById("streetName").value; 

	const apiUrl = 'https://data.winnipeg.ca/resource/it4w-cpf4.json?'
	+
					`$where=lower(street_name) LIKE lower('%${streetName}%')` +
					'&$order=street_number ASC' +
					'&$limit=99';

	const encodedURL = encodeURI(apiUrl);
	
	fetch(encodedURL)
		.then((result) => {
			return result.json(); 
		})
		.then((data) => {  
			if (streetName == "") {
				document.getElementById("tableHead").innerHTML = "";
				document.getElementById("data").innerHTML = "";
				document.getElementById("output").innerHTML = "Please enter a street name!";
			} else if (data == "") {
				document.getElementById("tableHead").innerHTML = "";
				document.getElementById("data").innerHTML = "";
				document.getElementById("output").innerHTML = "Did not find any records, please enter a valid street name!";
			} else {
				document.getElementById("output").innerHTML = "Here are the building permits issued for " + streetName + ":";
				var tableHead = "";
			
				tableHead += "<th>" + "Permit Type";
				tableHead += "<th>" + "Street Number";
				tableHead += "<th>" + "Street Name";
				tableHead += "<th>" + "Work Type";
				tableHead += "<th>" + "Application Received Date";
				tableHead += "<th>" + "Status";

				document.getElementById("tableHead").innerHTML = tableHead;

				var item = "";
				let records = data;
				for (let record of records) {
					item += "<tr>";
					item += "<td>" + record.permit_type;
					item += "<td>" + record.street_number;
					item += "<td>" + record.street_name;
					item += "<td>" + record.work_type;
					item += "<td>" + record.application_received_date;
					item += "<td>" + record.status;

					document.getElementById("data").innerHTML = item;	
				}
			}
		});
});
