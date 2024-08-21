sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/techm/browseorders/controller/formatter"
],
function (Controller, formatter) {
    "use strict";

    return Controller.extend("com.techm.browseorders.controller.View1", {
        formatter:formatter,
        onInit: function () {

        },
        onListPress:function(oEvent){
            var select = oEvent.getParameter("listItem").getBindingContextPath();
            var select = select.split("/")[1];
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2", { OrderID: select });
        }
    });
});
