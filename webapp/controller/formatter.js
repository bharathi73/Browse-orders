sap.ui.define([],function(){
    "use strict";
     
    return{
        formatDate : function (sDate) {
               
            var SDate = sDate.split("(")[1].split(")")[0];
            var nDate = parseInt(SDate)
            var oDate = new Date(nDate);


           // var monthNames = ["jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

           // var Month = monthNames[oDate.getUTCMonth()];
             var Month = oDate.getUTCMonth()+1;
             var Day = oDate.getUTCDate();
             var Year = oDate.getUTCFullYear();

            var FormattedDate = Month + '/' + Day + '/' + Year;
            
            return FormattedDate;


               //     var oDateFormat = DateFormat.getDateInstance({
               //         pattern : "mmm/dd/yyyy"
               //     });

               //  console.log(oDateFormat.format(oDate));
               //     return oDateFormat.format(oDate);
            
        }
    }
})