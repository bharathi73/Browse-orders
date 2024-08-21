sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.techm.browseorders.controller.View2", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteView2").attachMatched(this.getID,this);
            oRouter.getRoute("RouteView2").attachMatched(this._creatingOrdersTable,this);
            oRouter.getRoute("RouteView2").attachMatched(this._Datechange,this);
        },
        getID:function(oEvent){
            var id=oEvent.getParameter("arguments").OrderID;
            var path="OrderModel>/"+id;
            this.getView().bindElement({path});
        },_creatingOrdersTable : function (oEvent) {
           
            var id =oEvent.getParameter("arguments").OrderID;  // 0

            // creating Global Model for OrderJson

            var oOModel = this.getOwnerComponent().getModel("OrderModel");
            var Orders = oOModel.getData()[id].OrderID;
        
           // creating Global Model for OrderDetailJson

            var oDModel = this.getOwnerComponent().getModel("OrdersDetailModel");
            var Detail = oDModel.getData();
              
             // creating Empty Json  Model
            var dataModel = new JSONModel([]);

            var data = dataModel.getData();

             // Adding new Key Value Pairs to Empty Json Model with required data

           var j = 0;
            for(var i = 0 ; i < Detail.length ; i++){
              
               if(Detail[i].OrderID === Orders){

                   if(!data[j]){
                       data[j] = {};
                   }
                     data[j].UnitPrice = Detail[i].UnitPrice;
                     data[j].Quantity = Detail[i].Quantity;
                     data[j].ProductID = Detail[i].ProductID;
                     data[j].Total = Math.trunc((Detail[i].UnitPrice * Detail[i].Quantity) * 100) / 100 ;
                     j++;
                    
               }
            }

            // Setting data and dataModel to View

            dataModel.setData(data);
            this.getView().setModel(dataModel ,"dataModel");

           // creating Global Model for dataModel

           var oDod = this.getView().getModel("dataModel");
           var Dmod = oDod.getData();

           // creating Global Model for ProductJson

           var oProd = this.getView().getModel("ProductsModel");
           var product = oProd.getData();
        
           // Adding Product Key value to Same DataModel

           for(var i = 0 ; i < Dmod.length ; i++){
              
               for(var j = 0 ; j < product.length ; j++){

                   if (product[j].ProductID === Dmod[i].ProductID){
                          Dmod[i].ProductName = product[j].ProductName;
                          break;
                   }
                }
            
            }

            // Setting the new data and model to View

            oDod.setData(Dmod);
            
            this.getView().setModel(oDod,"dataModel");

            this.Count();
       },
       Count : function (){
           
        var oD = this.getView().getModel("dataModel");
        var ln = oD.getData();
        var Count = ln.length;
   
        var countModel = new JSONModel({});
        var count = countModel.getData();
        count.Count = Count;
     
        countModel.setData(count);
        this.getView().setModel(countModel ,"countModel");
    },
    _Datechange : function (oEvent) {
             
        var id =oEvent.getParameter("arguments").OrderID;

        var oOModel = this.getOwnerComponent().getModel("OrderModel");
        var Orders = oOModel.getData()[id].OrderDate;

        var dateModel = new JSONModel({});
        var date = dateModel.getData();
     
        var SDate = Orders.split("(")[1].split(")")[0];
             var nDate = parseInt(SDate);
             var oDate = new Date(nDate);

             var monthNames = ["jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
             

              var Month = monthNames[oDate.getUTCMonth()];
              var Day = oDate.getUTCDate();
              var Year = oDate.getUTCFullYear();


             var vDate = Month + ' ' + Day + ',' + Year;
             
                 date.OrderDate = vDate;

                 dateModel.setData(date);
                 this.getView().setModel(dateModel,"dateModel"); 
    }

    });
});
