sap.ui.define(
	['sap/ui/core/Control'],
	function(Control) {
		return Control.extend("nl.barrydam.ui.MultiStepIndicatorItem", {

			metadata: {
				properties: {
					completed		: { type :'boolean', defaultValue: false},
					completedColor	: { type : 'sap.ui.core.CSSColor' },
					inCompletedColor: { type : 'sap.ui.core.CSSColor'},
					text			: { type:'string'},
					width			: { type : 'sap.ui.core.CSSSize', defaultValue : "200px" }
				},
				events : {
					press : {}
				}
			},

			init: function() {
				var sLibPath = jQuery.sap.getModulePath("nl.barrydam");
				jQuery.sap.includeStyleSheet(sLibPath+"/ui/MultiStepIndicator.css");
			},

			onclick: function(e) {
				if (this.hasListeners("press")) {
					// mark the event for components that needs to know if the event was handled
					e.setMarked();
				}
				// fire the event
				this.firePress();
			},

			renderer: function(oRm, oControl) {
				var sColorStyle 	= "",
					sBGColorStyle 	= "";
				if (oControl.getCompleted() && oControl.getCompletedColor()) {
					sBGColorStyle 	= " style=\"background-color:" + oControl.getCompletedColor() + "\"";
					sColorStyle		= " style=\"color:" + oControl.getCompletedColor() + "\"";
				} else if (! oControl.getCompleted() && oControl.getInCompletedColor()) {
					sBGColorStyle 	= " style=\"background-color:" + oControl.getInCompletedColor() + "\"";
					sColorStyle		= " style=\"color:" + oControl.getInCompletedColor() + "\"";
				}
				oRm.write("<li style=\"width:" + oControl.getWidth() + ";\"");
				oRm.writeControlData(oControl);
				oRm.write(" class=\"bdMultiStepIndicatorItem" + ((oControl.getCompleted()) ? " bdMultiStepIndicatorItemCompleted" + ((oControl.hasListeners("press")) ? " sapUiIconPointer" : "") +"\"":"\"") + ">");
					oRm.write("<div class=\"bdMultiStepIndicatorItemBar\"" + sBGColorStyle + "></div>");
					oRm.write("<div class=\"bdMultiStepIndicatorItemText\"" + sColorStyle + ">");
						oRm.write(oControl.getText());
					oRm.write("</div>");
				oRm.write("</li>");
			}
		});
	}
);