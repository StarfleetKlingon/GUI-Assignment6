
window.onload = function(){
$('#grid').validate({
  submitHandler: function(form){
  rules: {
    x_low : {
      required: true,
      min: -100,
      max: 100
      },
    x_high : {
      required: true,
      min: -100,
      max: 100
      },
    y_low : {
      required: true,
      min: -100,
      max: 100
      },
    y_high : {
      required: true,
      min: -100,
      max: 100
      }
  }, //End of rules
  messages : {
    x_low: {
      required: "Please input low value for x axis.",
      min: "Low value for x axis must be larger than or equal to -100.",
      max: "Low value for x axis must be smaller than or equal to 100."
    },
    x_high: {
      required: "Please input high value for x axis.",
      min: "High value for x axis must be larger than or equal to -100.",
      max: "High value for x axis must be smaller than or equal to 100."
    },
    y_low: {
      required: "Please input low value for y axis.",
      min: "Low value for y axis must be larger than or equal to -100.",
      max: "Low value for y axis must be smaller than or equal to 100."
    },
    y_high: {
      required: "Please input high value for y axis.",
      min: "High value for y axis must be larger than or equal to -100.",
      max: "High value for y axis must be smaller than or equal to 100."
    },
  }  //end of messages
  form.submit();
  }
});


//Getting elements from:
//http://www.w3schools.com/jsref/coll_form_elements.asp
  document.getElementById("grid").onsubmit = (function(e) {
      //Create object with everything we need.
      var table_params = {};
      table_params.x_low = parseInt(document.getElementById("grid").x_low.value);
      table_params.x_high = parseInt(document.getElementById("grid").x_high.value);
      table_params.y_low = parseInt(document.getElementById("grid").y_low.value);
      table_params.y_high = parseInt(document.getElementById("grid").y_high.value);
      swap_if_reversed(table_params); 
      testfunc(table_params);
      //http://stackoverflow.com/questions/15146506/onsubmit-makes-text-printed-using-innerhtml-disappears
      e.preventDefault();
  });


// Dynamically adding rows and columns to table:
// http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_table_insertrow
function testfunc(table_params)
{
    //Add counters to the table_params object.
    table_params.counter_x_low = table_params.x_low;
    table_params.counter_y_low = table_params.y_low;
    var i = 0;
    var j = 1;

    //Get multiplication table for editing.
    var m_table = document.getElementById("mult-table");

    //Delete preexisting table to create a new one.
    //Learned about innerHTML from: http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_form_elements_index
    m_table.innerHTML = " ";

    //Loop for each y.
    for(table_params.counter_y_low; table_params.counter_y_low <= table_params.y_high; table_params.counter_y_low ++, i++)
    {
      //Insert new row.
      var new_row = m_table.insertRow(i);
      make_row(new_row, table_params, j);

      //After finishing cells for a row, reinitialize j to 1, and reset the counter for
      //the low value of x.
      j = 1;
      table_params.counter_x_low = table_params.x_low;
    } //End outer for loop.
    make_header(m_table, table_params, j);
}


function swap_if_reversed(table_params)
{
 document.getElementById("flash-notice").innerHTML = " "
 var flag = "not both";
 if(table_params.x_low > table_params.x_high && table_params.y_low > table_params.y_high)
    {
      var flag = "both";
    }
 if(table_params.x_low > table_params.x_high)
    {
      var temp = table_params.x_low;
      table_params.x_low = table_params.x_high;
      table_params.x_high = temp;
      document.getElementById("flash-notice").innerHTML = "We swapped your X axis values so they would increase from left to right."
    }
    if(table_params.y_low > table_params.y_high)
      {
        var temp = table_params.y_low;
        table_params.y_low = table_params.y_high;
        table_params.y_high = temp;
        document.getElementById("flash-notice").innerHTML = "We swapped your Y axis values so they would increase from top to bottom."
      }
    if(flag == "both")
      {
        document.getElementById("flash-notice").innerHTML = "We swapped your values so they would increase from upper left corner to lower right corner."
      }
 }

function make_row(new_row, table_params, j)
{
//Loop for each x.
      for(table_params.counter_x_low; table_params.counter_x_low <= table_params.x_high; table_params.counter_x_low ++, j++)
      {
        //j==1 when it's the first cell of a row.
        if(j == 1)
        {
          //Instead of a multiplied value, it should have the value.
          new_cell = new_row.insertCell(0);
          new_cell.innerHTML = table_params.counter_y_low;
        }
        //Add a cell with the multiplied value.
        new_cell = new_row.insertCell(j);
        new_cell.innerHTML = table_params.counter_x_low * table_params.counter_y_low;
      }
}

function make_header(m_table, table_params, j)
  {
    //Create top header.
    var new_row = m_table.insertRow(0);
    for(table_params.counter_x_low; table_params.counter_x_low <= table_params.x_high; table_params.counter_x_low ++, j++)
    {
       new_cell = new_row.insertCell(j-1);
       if(j==1)
       {
         new_cell.innerHTML = "";
         new_cell = new_row.insertCell(j);
         j++;
       }
       new_cell.innerHTML = table_params.counter_x_low;
   }
}
};