/* FWDR3DCarPageMenuButton */
(function (){
var FWDR3DCarPageMenuButton = function(
			label1, 
			label2,
			disableButton_bl
		){
		
		var self = this;
		var prototype = FWDR3DCarPageMenuButton.prototype;
		
		this.label_str1 = label1;
		this.label_str2 = label2;
		
		this.id;
		this.totalWidth = 240;
		this.totalHeight = 20;
		
		this.text_ndo = null;
		this.text_sdo = null;
		this.dumy_sdo = null;
		
		this.finalX;
		this.finalY;
		
		this.isMobile_bl = FWDR3DCarUtils.isMobile;
		this.disableButton_bl = disableButton_bl;
		this.currentState = 1;
		this.isDisabled_bl = false;
	
		
		//##########################################//
		/* initialize self */
		//##########################################//
		self.init = function(){
			self.setBackfaceVisibility();
			self.setButtonMode(true);
			self.setupMainContainers();
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);
			if(self.disableButton_bl) self.disable();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		self.setupMainContainers = function(){
			
			self.text_ndo = new FWDR3DCarSimpleDisplayObject("div");
			self.text_ndo.getStyle().whiteSpace = "nowrap";
			self.text_ndo.setBackfaceVisibility();
			self.text_ndo.setDisplay("inline-block");
			self.text_ndo.getStyle().fontFamily = "myFont, Arial";
			self.text_ndo.getStyle().fontSize= "17px";
			self.text_ndo.getStyle().color = "#777777";
			self.text_ndo.getStyle().fontSmoothing = "antialiased";
			self.text_ndo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_ndo.getStyle().textRendering = "optimizeLegibility";	
			self.text_ndo.setInnerHTML(self.label_str1);
			self.addChild(self.text_ndo);
			
			self.text_sdo = new FWDR3DCarSimpleDisplayObject("div");
			self.text_sdo.getStyle().whiteSpace = "nowrap";
			self.text_sdo.setBackfaceVisibility();
			self.text_sdo.setDisplay("inline-block");
			self.text_sdo.getStyle().fontFamily = "myFont, Arial";
			self.text_sdo.getStyle().fontSize= "17px";
			self.text_sdo.getStyle().fontSmoothing = "antialiased";
			self.text_sdo.getStyle().webkitFontSmoothing = "antialiased";
			self.text_sdo.getStyle().textRendering = "optimizeLegibility";	
			self.text_sdo.setInnerHTML(self.label_str2);
			self.addChild(self.text_sdo);
			
			self.text_sdo.setAlpha(0);
			
			setTimeout(function(){
				self.centerText();
				self.setTotalWidth();
			}, 50);
			
			self.dumy_sdo = new FWDR3DCarSimpleDisplayObject("div");
			if(FWDR3DCarUtils.isIE){
				self.dumy_sdo.setBkColor("#FFFF00");
				self.dumy_sdo.setAlpha(0);
			};
			self.addChild(self.dumy_sdo);
			
			if(self.isMobile_bl){
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.addEventListener){
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("click", self.onClick);
			}else if(self.screen.attachEvent){
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onclick", self.onClick);
			}
		};
		
		self.onMouseOver = function(animate){
			if(self.isDisabled_bl) return;
			FWDR3DCarModTweenMax.to(self.text_ndo.screen, .5, {alpha:0, ease:Expo.easeOut});
			FWDR3DCarModTweenMax.to(self.text_sdo.screen, .5, {alpha:1, ease:Expo.easeOut});
		};
			
		self.onMouseOut = function(e){
			if(self.isDisabled_bl) return;
			FWDR3DCarModTweenMax.to(self.text_ndo.screen, .5, {alpha:1, ease:Expo.easeOut});
			FWDR3DCarModTweenMax.to(self.text_sdo.screen, .5, {alpha:0, ease:Expo.easeOut});
		};
		
		self.onClick = function(e){
			if(self.isDisabled_bl) return;
			if(e.preventDefault) e.preventDefault();
			self.dispatchEvent(FWDR3DCarPageMenuButton.CLICK);
		};
		
		//##############################//
		/* set selected state */
		//##############################//
		self.disable = function(){
			self.isDisabled_bl = true;
			self.setButtonMode(false);
			
			FWDR3DCarModTweenMax.to(self.text_ndo.screen, .5, {alpha:0, ease:Expo.easeOut});
			FWDR3DCarModTweenMax.to(self.text_sdo.screen, .5, {alpha:1, ease:Expo.easeOut});
		};		

		//##########################################//
		/* center text */
		//##########################################//
		self.centerText = function(){
			self.dumy_sdo.setWidth(self.totalWidth);
			self.dumy_sdo.setHeight(self.totalHeight);
			
			if(FWDR3DCarUtils.isIEAndLessThen9 || FWDR3DCarUtils.isSafari){
				self.text_ndo.setY(Math.round((self.totalHeight - self.text_ndo.getHeight())/2) - 1);
			}else{
				self.text_ndo.setY(Math.round((self.totalHeight - self.text_ndo.getHeight())/2));
			}
			self.text_ndo.setHeight(self.totalHeight + 2);
			
			if(FWDR3DCarUtils.isIEAndLessThen9 || FWDR3DCarUtils.isSafari){
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2) - 1);
			}else{
				self.text_sdo.setY(Math.round((self.totalHeight - self.text_sdo.getHeight())/2));
			}
			self.text_sdo.setHeight(self.totalHeight + 2);
		};
		
		//###############################//
		/* get max text width */
		//###############################//
		self.setTotalWidth = function(){
			self.totalWidth = self.text_ndo.getWidth();
			self.dumy_sdo.setWidth(self.totalWidth);
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDR3DCarPageMenuButton.setPrototype = function(){
		FWDR3DCarPageMenuButton.prototype = new FWDR3DCarDisplayObject("div");
	};

	FWDR3DCarPageMenuButton.CLICK = "onClick";
	
	FWDR3DCarPageMenuButton.prototype = null;
	window.FWDR3DCarPageMenuButton = FWDR3DCarPageMenuButton;
}(window));