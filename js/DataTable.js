define(["js/Common.js"], function (Common) {
  let isActive = false;


    Common.subscribe("DisablingWidgets", () => {
      isActive = false
      document.getElementById("dataTableContent").style.display = "none";
      // document.getElementsByClassName("charts")[0].style.display = "block";
      // document.getElementsByClassName("legend")[0].style.top = "984px";
  });

  document.getElementById("dataTableButton").addEventListener("click", () => {
    document.getElementById("dataTableContent").style.display = "block";
      window.Charts.closeChart() 
    // if (!isActive) {
    //   Common.disableWidgets();
    //   document.getElementById("dataTableContent").style.display = "block";
    //   // document.getElementsByClassName("legend")[0].style.top = "622px";
    //   window.Charts.closeChart() 
    //   isActive= true
    // } else {
    //   Common.disableWidgets();
    // }
  });

  function dataTableInfo(response) {
    trHTML = "";

    $("#example").DataTable().destroy();

    $("#example").find("tbody").empty();
    let i=1;
    response.forEach((elements) => {
      trHTML += `<tr>
                                <td>${i}</td>
                                <td id=${elements.attributes.OBJECTID}>${elements.attributes.OBJECTID}</td>
                                <td id=${elements.attributes.owner_name}>${elements.attributes.owner_name}</td>
                                <td id=${elements.attributes.developer_name}>${elements.attributes.developer_name}</td>
                                <td id=${elements.attributes.date_constructed}>${elements.attributes.date_constructed}</td>
                                <td id=${elements.attributes.area_name}>${elements.attributes.area_name}</td>
                                <td id=${elements.attributes.area1}>${elements.attributes.area1}</td>
                                <td id=${elements.attributes.Description}>${elements.attributes.Description}</td>
                                <td id=${elements.attributes.address}>${elements.attributes.address}</td>
                 </tr>`;
    i++;
    });

    $("#example").find("tbody").append(trHTML);
    // $("#example").DataTable({
    //   fnRowCallback: function (nRow) {
    //     $("td", nRow).css("background-color", "#F9F9F9 ");
    //   },
    //   scrollY: true,
    //   scrollX: true,
    //   scrollY: "40.7vw",
    //   scrollCollapse: true,
    //   paging: true,
    //   emptyTable: "No data available in table", //
    //   loadingRecords: "Please wait .. ", // default Loading...
    //   zeroRecords: "No matching records found",
    //   autoWidth: true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //        'csv', 'excel', 'pdf', 'print'
    //   ]
    // });

    $(document).ready(function() {
      $('#example').DataTable({
        fnRowCallback: function (nRow) {
              $("td", nRow).css("background-color", "#F9F9F9 ");
            },
        scrollY: true,
      scrollX: true,
      scrollY: "35.7vw",
      scrollCollapse: true,
      dom: 'Bfrtip',
      buttons: [
            'csv', 'excel', 'pdf', 'print'
      ],
      paging: false,
      columnDefs: [
        {
            "targets": 0, // your case first column
            "className": "text-center",
       }
     ]

      });
      

  } );
  }
  return { dataTableInfo };
});
