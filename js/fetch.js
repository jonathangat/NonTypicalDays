$(document).ready(function () {



      // add event listener
  $("#submit_btn").on("click", function() {

    // show spinner
    $('#spinner').show();

    // get values from date pickers

    let from_d = $('#start').val();
    let to_d = $('#end').val();


    // set fetch url
    let url = 'https://script.google.com/macros/s/AKfycbzVK4jVkYBVPsgwj6QLMxDZ8uzrDMcqJd78a5J2qADM9MbnpwR3pk552X-1WcoA8dAw/exec';
    let q;

    // set query
    if (from_d && to_d) {
      // validate dates
      if (Date.parse(to_d) < Date.parse(from_d)) {
        alert('שגיאה: תאריך התחלה חייב להיות מוקדם או זהה לתאריך סיום')
      }

      else {
        q = `${url}?from=${from_d}&to=${to_d}`;
      }


    }

    else if (from_d && !to_d) {
      q = `${url}?from=${from_d}`;
    }

    else if (!from_d && to_d) {
      q = `${url}?to=${to_d}`;
    }
    else {
      q = url;
    };

    

    

    

    // populate table
    $.getJSON(q, function(data) {
      $('table').bootstrapTable('destroy').bootstrapTable({
        data: data.data
      });

      // remove background
    $("#table-col").removeClass("bg-light");

      $('table').show();

      // create blob
      let csvRows = [];
      let csvHeader = Object.keys(data.data[0]);
      csvRows.push(csvHeader.join(','));
      for (let i =0; i < data.data.length ; i++) {
        let rowValues = Object.values(data.data[i]).map(val => `"${val}"`).join(',');
        csvRows.push(rowValues);
      }

      let csv = csvRows.join('\n');


      const blob = new Blob([csv], { type: 'text/csv' });
      const blob_url = window.URL.createObjectURL(blob);
      $("#download-btn").attr("href", blob_url);
      $("#download-btn").attr("download", 'NonTypicalDays.csv');
      $("#download-btn").show('slow');

      
      // hide spinner
      $('#spinner').hide();


    });


  });



    });


    

