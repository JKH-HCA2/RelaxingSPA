"use strict";

/*
 *
 * Function: onload function that initializes all JavaScript on the page
 *
 * Author: Jeremy Han
 *
 */
$(function () {
	// Calls the list of categories from the json file via server.js
	getCategories();
	// Click event hides home page content and displays service lookup content
	$("#services").on("click", function () {
		$("#categoryContainer").show();
		$("#infoBlock").hide();
		$("#categoryContainer").show()
		$("#spaBanner").hide();
	});
	// Click event hides lookup tool content and displays home page content
	$("#home").on("click", function () {
		$("#categoryContainer").hide();
		$("#infoBlock").show();
		$("#servicesContainer").hide();
		$("#serviceCard").hide();
		$("#catNameHeading").hide();
		$("#spaBanner").show();
	});
	// Click event serves as a direct line to the sale content
	$("#saleLink").on("click", function () {
		$("#categoryContainer").show();
		$("#infoBlock").hide();
		$("#spaBanner").hide();
		$("#categoryContainer").show()
		$("#categoryName").text("Massage and Bodywork")
		$("#catNameHeading").show()
		getServices("MASS")
		getService("MASS1")
	})
	// Click event serves as a direct line to the new-in content
	$("#newThisMonth").on("click", function () {
		$("#categoryContainer").show();
		$("#infoBlock").hide();
		$("#spaBanner").hide();
		$("#categoryContainer").show()
		$("#categoryName").text("Acupuncture")
		$("#catNameHeading").show()
		getServices("ACU")
		getService("ACU1")
	})
});
/*
*
* Function: Calls categories.json and populates the dropdown with each category name. Additionally a
* click event is attached to the drop to display the category name as a heading and run the 
* getServices function. A badge also displays if the category is "Acupuncture".
*
* @param categories (JSON) - variable containing output from the getJSON request
* @param category (Array) - variable where the array from categories.json is stored
*
*/
function getCategories() {
	// JSON file is called here
	$.getJSON("/api/categories/", categories => {
		$.each(categories, (index, category) => {
			if (category.Category == "Acupuncture") {
				// List items that are new are added here
				$("#categoryList").append(
					$("<a />")
						.html(category.Category + " <span class='badge badge-success'>New!</span>")
						.attr("class", "dropdown-item")
						.attr("href", "#")
						// Click event added to the anchor
						.on("click", e => {
							e.preventDefault();
							$("#catNameHeading").show();
							$("#categoryName").text(category.Category);
							getServices(category.Value);
						})
				);
			}
			else {
				// List items are dynamically populated here
				$("#categoryList").append(
					$("<a />")
						.text(category.Category)
						.attr("class", "dropdown-item")
						.attr("href", "#")
						.on("click", e => {
							// Click event added to the anchor
							e.preventDefault();
							$("#catNameHeading").show();
							$("#categoryName").text(category.Category);
							getServices(category.Value);
						})
				);
			}
		});
	});
}

/*
*
* Function: Clears any previous output on the DOM and populates the list with information from services.json,
* the list is dynamically populated based on the category selection. Additionally, a click event is added to
* each list item to display a card with more info on the service offered
*
* @param category (string) - string containing the category value from the getCategories function
* @param services (JSON file) - var where the output from the getJSON request is stored
* @param service (Array) - variable where the array from services.json is stored
*
*/
function getServices(category) {
	// Previous DOM content is cleared from the page
	$("#serviceCard").hide();
	$("#serviceList").html("");

	// JSON file is called here
	$.getJSON(`/api/services/bycategory/${category}`, services => {
		$.each(services, (index, service) => {
			// Services are appended to the page on an unordered list
			$("#serviceList").append(
				$("<li />")
					.attr("class", "list-group-item border-dark list-group-item-action")
					.text(service.ServiceName)
					.on("click", e => {
						// click event is added to the anchors
						e.preventDefault();
						getService(service.ServiceID);
					})
			);
			// Category image is dynamically added based on the category value
			$("#cardImage").attr("src", `images/${category}.png`)
		});
		$("#servicesContainer").show();
	});
}
/*
*
* Function: takes the output from the getServices function and dynamically creates a card with more information
* using data from services.json. There is hard-coded customization for sale items and new-in items.
*
* @param serviceId (String) - output from the previous function used to determine which service to display
* @param service (Object) - object pulled directly from the json file using the serviceId
*
*/
function getService(serviceId) {
	// JSON file is called and the relevant object is stored in the service variable
	$.getJSON(`/api/services/${serviceId}`, service => {
		// If the category is acupuncture a badge is attached to the service name
		if (service.CategoryName == "Acupuncture") {
			$("#cardTitle").html(service.ServiceName + " <span class='badge badge-success'>New!</span>");
		}
		else {
			$("#cardTitle").html(service.ServiceName)
		}
		// A description of the service is added to the card here
		$("#cardText1").html(service.Description);
		// if the category is massage and bodywork a price update is added to the card
		if (service.CategoryName == "Massage and Bodywork") {
			$("#cardText2").html("<span class='onSale'>$ " + Number(service.Price).toFixed(2) + "</span><span class='salePrice'> $" + (Number(service.Price) * .75).toFixed(2) + "</span>")
		}
		else {
			$("#cardText2").html("$" + Number(service.Price).toFixed(2));
		}
		// info card is displayed here
		$("#serviceCard").show();
	});
}
