sap.ui.define([
	"sap/ui/core/Control",
	"nl/barrydam/ui/MultiStepIndicator" 
	],
	function(Control, MultiStepIndicator) {
		return Control.extend("nl.barrydam.ui.MultiStepIndicator",{

			metadata	: {
				properties			: {
					completedColor		: { type: 'sap.ui.core.CSSColor' },
					inCompletedColor	: { type: 'sap.ui.core.CSSColor' },
					itemWidth			: { type: 'sap.ui.core.CSSSize', defaultValue : "200px" },
					vAlign				: { type: 'string' }
				},
				aggregations		: {
					items : {
						type : "nl.barrydam.ui.MultiStepIndicatorItem"
					}
				},
				defaultAggregation	: "items"
			},


			init: function() {
				var sLibPath = jQuery.sap.getModulePath("nl.barrydam");
				jQuery.sap.includeStyleSheet(sLibPath+"/ui/MultiStepIndicator.css");
			},

			renderer: function(oRm, oControl) {
				console.log(oRm);
				var bWrapper = (oControl.getVAlign() && ["center", "left", "right"].indexOf(oControl.getVAlign().toLowerCase()) !== -1);
				if (bWrapper) {
					oRm.write("<div class=\"bdMultiStepIndicator-wrapper\" style=\"text-align:" + oControl.getVAlign().toLowerCase() + ";\">");
				}
				oRm.write("<ol ");
				oRm.writeControlData(oControl);
				oControl.addStyleClass("bdMultiStepIndicator");
				oRm.writeClasses(oControl);
				oRm.writeElementData(oControl);
				oRm.write(">");
				// Items
				$(oControl.getItems()).each(function(){
					if (oControl.getCompletedColor()) {
						this.setCompletedColor(oControl.getCompletedColor());
					}
					if (oControl.getInCompletedColor()) {
						this.setInCompletedColor(oControl.getInCompletedColor());
					}
					if (oControl.getItemWidth()) {
						this.setWidth(oControl.getItemWidth());
					}
					oRm.renderControl(this);
				});
				oRm.write("</ol>");
				if (bWrapper) {
					oRm.write("</div>");
				}
			}
		});
	}
);