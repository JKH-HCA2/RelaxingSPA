"use strict";

/*
 *
 * Function: onload function that initializes all JavaScript on the page
 *
 * Author: Jeremy Han
 *
 */
$(function() {
    getCategories();
  $("#services").on("click", function() {    
    $("#categoryContainer").show();
    $("#infoBlock").hide();
    $("#categoryContainer").show()
  });

  $("#home").on("click", function() {
    $("#categoryContainer").hide();
    $("#infoBlock").show();
    $("#servicesContainer").hide();
    $("#serviceCard").hide();
    $("#catNameHeading").hide();
  });

  $("#saleLink").on("click", function()
    {
        $("#categoryContainer").show();
        $("#infoBlock").hide();
        $("#categoryContainer").show()
        getServices("MASS")
        getService("MASS1")
    })
});

function getCategories() {
  $.getJSON("/api/categories/", categories => {
    $.each(categories, (index, category) => {
      $("#categoryList").append(
        $("<a />")
          .text(category.Category)
          .attr("class", "dropdown-item")
          .attr("href", "#")
          .on("click", e => {
            e.preventDefault();
            $("#catNameHeading").show();
            $("#categoryName").text(category.Category);
            getServices(category.Value);
          })
      );
    });
  });
}

function getServices(category) {
  $("#serviceCard").hide();
  $("#serviceList").html("");

  $.getJSON(`/api/services/bycategory/${category}`, services => {
    $.each(services, (index, service) => {
      $("#serviceList").append(
        $("<li />")
          .attr("class", "list-group-item border-dark list-group-item-action")
          .text(service.ServiceName)
          .on("click", e => {
            e.preventDefault();
            getService(service.ServiceID);
          })
      );
      $("#cardImage").attr("src", `images/${category}.png`)
    });
    $("#servicesContainer").show();
  });
}

function getService(serviceId) {
  $.getJSON(`/api/services/${serviceId}`, service => {
    $("#cardTitle").html(service.ServiceName);
    $("#cardText1").html(service.Description);
    if (service.CategoryName == "Massage and Bodywork")
    {
        $("#cardText2").html("<span class='onSale'>$ " + Number(service.Price).toFixed(2) + "</span><span class='salePrice'> $" + (Number(service.Price) * .75).toFixed(2) + "</span>")
    }
    else
    {
        $("#cardText2").html("$" + Number(service.Price).toFixed(2));
    }
    $("#serviceCard").show();
  });
}

function getSaleItem()
{
    
}
