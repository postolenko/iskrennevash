/* FWDResetButton */
(function (window){
var FWDResetButton = function(bWidth, bHeight, skinPath)
{
		var self = this;
		var prototype = FWDResetButton.prototype;
		
		this.nImgUrl = skinPath + "/reset-normal.png";
		this.sImgUrl = skinPath + "/reset-selected.png";
		this.pImgUrl = skinPath + "/reset-pressed.png";
		
		this.n_do;
		this.s_do;
		this.p_do;
		
		this.isMobile_bl = FWDR3DCarUtils.isMobile;
		this.hasPointerEvent_bl = FWDR3DCarUtils.hasPointerEvent;
		
		//##########################################//
		/* initialize this */
		//##########################################//
		this.init = function()
		{
			this.setupMainContainers();
		};
		
		//##########################################//
		/* setup main containers */
		//##########################################//
		this.setupMainContainers = function()
		{
			this.n_do = new FWDR3DCarSimpleDisplayObject("img");
			this.n_do.screen.src = this.nImgUrl;
			this.s_do = new FWDR3DCarSimpleDisplayObject("img");
			this.s_do.screen.src = this.sImgUrl;
			this.p_do = new FWDR3DCarSimpleDisplayObject("img");
			this.p_do.screen.src = this.pImgUrl;
			
			this.addChild(this.p_do);
			this.addChild(this.s_do);
			this.addChild(this.n_do);
			
			this.setWidth(bWidth);
			this.setHeight(bHeight);
			
			this.n_do.setWidth(bWidth);
			this.n_do.setHeight(bHeight);
			
			this.s_do.setWidth(bWidth);
			this.s_do.setHeight(bHeight);
			
			this.p_do.setWidth(bWidth);
			this.p_do.setHeight(bHeight);
			
			self.enable();
			
			self.n_do.screen.ontouchstart = null;
			self.s_do.screen.ontouchstart = null;
			self.p_do.screen.ontouchstart = null;
		};
		
		this.onMouseOver = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDR3DCarModTweenMax.to(self.n_do, .9, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onMouseOut = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDR3DCarModTweenMax.to(self.n_do, .9, {alpha:1, ease:Expo.easeOut});
				FWDR3DCarModTweenMax.to(self.s_do, .9, {alpha:1, ease:Expo.easeOut});
			}
		};
		
		this.onMouseDown = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDR3DCarModTweenMax.to(self.s_do, .9, {alpha:0, ease:Expo.easeOut});
			}
		};
			
		this.onClick = function(e)
		{
			if (!e.pointerType || e.pointerType == e.MSPOINTER_TYPE_MOUSE)
			{
				FWDR3DCarModTweenMax.to(self.s_do, .9, {alpha:1, ease:Expo.easeOut});
			}

			self.dispatchEvent(FWDResetButton.CLICK);
		};
		
		this.enable = function()
		{
			this.setButtonMode(true);
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					self.screen.addEventListener("MSPointerOver", self.onMouseOver);
					self.screen.addEventListener("MSPointerOut", self.onMouseOut);
					self.screen.addEventListener("MSPointerDown", self.onMouseDown);
					self.screen.addEventListener("MSPointerUp", self.onClick);
				}
				else
				{
					self.screen.addEventListener("touchstart", self.onClick);
				}
			}
			else if (self.screen.addEventListener)
			{	
				self.screen.addEventListener("mouseover", self.onMouseOver);
				self.screen.addEventListener("mouseout", self.onMouseOut);
				self.screen.addEventListener("mousedown", self.onMouseDown);
				self.screen.addEventListener("mouseup", self.onClick);
			}
			else if (self.screen.attachEvent)
			{
				self.screen.attachEvent("onmouseover", self.onMouseOver);
				self.screen.attachEvent("onmouseout", self.onMouseOut);
				self.screen.attachEvent("onmousedown", self.onMouseDown);
				self.screen.attachEvent("onmouseup", self.onClick);
			}
			
			self.setAlpha(1);
		};
		
		this.disable = function()
		{
			FWDR3DCarModTweenMax.to(self.n_do, .9, {alpha:1, ease:Expo.easeOut});
			FWDR3DCarModTweenMax.to(self.s_do, .9, {alpha:1, ease:Expo.easeOut});
			
			this.setButtonMode(false);
			
			if (self.isMobile_bl)
			{
				if(self.hasPointerEvent_bl)
				{
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerDown", self.onMouseDown);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}
				else
				{
					self.screen.removeEventListener("touchstart", self.onClick);
				}
			}
			else if (self.screen.removeEventListener)
			{	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mousedown", self.onMouseDown);
				self.screen.removeEventListener("mouseup", self.onClick);
			}
			else if (self.screen.detachEvent)
			{
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmousedown", self.onMouseDown);
				self.screen.detachEvent("onmouseup", self.onClick);
			}
			
			self.setAlpha(.5);
		};
		
		//##############################//
		/* destroy */
		//##############################//
		this.destroy = function()
		{
			if (self.isMobile_bl)
			{
				if (self.hasPointerEvent_bl)
				{
					self.screen.removeEventListener("MSPointerOver", self.onMouseOver);
					self.screen.removeEventListener("MSPointerOut", self.onMouseOut);
					self.screen.removeEventListener("MSPointerUp", self.onClick);
				}
				else
				{
					self.screen.removeEventListener("touchstart", self.onClick);
				}
			}
			else if (self.screen.removeEventListener)
			{	
				self.screen.removeEventListener("mouseover", self.onMouseOver);
				self.screen.removeEventListener("mouseout", self.onMouseOut);
				self.screen.removeEventListener("mouseup", self.onClick);
			}
			else if (self.screen.detachEvent)
			{
				self.screen.detachEvent("onmouseover", self.onMouseOver);
				self.screen.detachEvent("onmouseout", self.onMouseOut);
				self.screen.detachEvent("onmouseup", self.onClick);
			}
			
			FWDR3DCarModTweenMax.killTweensOf(self.n_do);
			FWDR3DCarModTweenMax.killTweensOf(self.s_do);
			FWDR3DCarModTweenMax.killTweensOf(self.p_do);
			
			self.n_do.destroy();
			self.s_do.destroy();
			self.p_do.destroy();
			
			self.nImgUrl = null;
			self.sImgUrl = null;
			self.pImgUrl = null;
			
			self.n_do = null;
			self.s_do = null;
			self.p_do = null;
			
			self.setInnerHTML("");
			prototype.destroy();
			self = null;
			prototype = null;
			FWDResetButton.prototype = null;
		};
	
		this.init();
	};
	
	/* set prototype */
	FWDResetButton.setPrototype = function(){
		FWDResetButton.prototype = new FWDR3DCarDisplayObject("div");
	};
	
	FWDResetButton.CLICK = "onClick";
	
	FWDResetButton.prototype = null;
	window.FWDResetButton = FWDResetButton;
}(window));