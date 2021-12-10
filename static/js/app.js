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
    function updateOneFilter(filterID) {
      let changedValue = d3.select(filterID)

    // Save the value that was changed as a variable.
      let propertyValue = changedValue.property("value");
      console.log(propertyValue);
    // Save the id of the filter that was changed as a variable.
      let valueID = changedValue.attr("id");
      console.log(valueID);

    if (propertyValue) {
      filters[valueID] = propertyValue;
    }
    else {
      delete filters[valueID];
    }
  }
  updateOneFilter("#datetime")
  updateOneFilter("#city")
  updateOneFilter("#state")
  updateOneFilter("#country")
  updateOneFilter("#shape")

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
