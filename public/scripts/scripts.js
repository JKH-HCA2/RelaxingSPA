"use strict";

/*
*
* Function: onload function that initializes all JavaScript on the page
*
* Author: Jeremy Han
*
*/
$(function()
{
    $("#services").on("click", function()
    {
        getCategories();
        $("#categoryContainer").show()
        $("#infoBlock").hide();
    })

    $("#home").on("click", function()
    {
        $("#categoryContainer").hide();
        $("#infoBlock").show();
        $("#servicesContainer").hide();
        $("#serviceCard").hide();
        $("#categoryName").hide();
    })
})

function getCategories()
{
    $.getJSON('/api/categories/', (categories) => {
        $.each(categories, (index, category) => {
            $("#categoryList").append($("<a />")
                .text(category.Category)
                .attr("class", "dropdown-item")
                .attr("href", "#")
                .on("click", (e) => {
                    e.preventDefault();
                    $("#categoryName").show()
                    $("#categoryName").text(category.Category);
                    getServices(category.Value)
                }));
        });
        $("#categoryContainer").show();
    }) 
}

function getServices(category)
{
    $("#serviceCard").hide();
    $("#serviceList").html("");

    $.getJSON(`/api/services/bycategory/${category}`, (services) => {
        $.each(services, (index, service) => {
            $("#serviceList").append($("<li />")
                .attr("class", "list-group-item list-group-item-action")
                .text(service.ServiceName)
                .on("click", (e) => {
                    e.preventDefault();
                    getService(service.ServiceID);
                }));
        });
        $("#servicesContainer").show();
    });
}

function getService(serviceId)
{
    $.getJSON(`/api/services/${serviceId}`, (service) => {
        $("#cardTitle").html("Service ID: " + service.ServiceID);
        $("#cardText1").html(service.ServiceName);
        $("#cardText2").html("$" + Number(service.Price).toFixed(2));
        $("#serviceCard").show();
    })
}