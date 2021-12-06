// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Create a variable to keep track of all the filters as an object.
var filters = {};
// Use this function to update the filters. 
function updateFilters() {
    // Save the element that was changed as a variable.
    let changedDate = d3.select("#datetime");
    let changedCity = d3.select("#city");
    let changedState = d3.select("#state");
    let changedCountry = d3.select("#country");
    let changedShape = d3.select("#shape");
    // Save the value that was changed as a variable.
    let dateValue = changedDate.property("value");
    console.log(dateValue);
    let cityValue = changedCity.property("value");
    console.log(cityValue);
    let stateValue = changedState.property("value");
    console.log(stateValue);
    let countryValue = changedCountry.property("value");
    console.log(countryValue);
    let shapeValue = changedShape.property("value");
    console.log(shapeValue);
    // Save the id of the filter that was changed as a variable.
    let dateID = changedDate.attr("id");
    console.log(dateID);
    let cityID = changedCity.attr("id");
    console.log(cityID);
    let stateID = changedState.attr("id");
    console.log(stateID);
    let countryID = changedCountry.attr("id");
    console.log(countryID);
    let shapeID = changedShape.attr("id");
    console.log(shapeID);
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (dateValue) {
      filters[dateID] = dateValue;
    }
    else {
      delete filters[dateID];
    }
    if (cityValue) {
      filters[cityID] = cityValue;
    }
    else {
      delete filters[cityID];
    }
    if (stateValue) {
      filters[stateID] = stateValue;
    }
    else {
      delete filters[stateID];
    }
    if (countryValue) {
      filters[countryID] = countryValue;
    }
    else {
      delete filters[countryID];
    }
    if (shapeValue) {
      filters[shapeID] = shapeValue;
    }
    else {
      delete filters[shapeID];
    }
    // Call function to apply all filters and rebuild the table
    filterTable();
  }
  // Use this function to filter the table when data is entered.
  function filterTable() {
    // Set the filtered data to the tableData.
    let filteredData = tableData;
    // Loop through all of the filters and keep any data that
    // matches the filter values
    for (var i in filters) {
      filteredData = filteredData.filter(row => row[i] === filters[i])
    }
    // Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  // Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);  
  // Build the table when the page loads
  buildTable(tableData);
