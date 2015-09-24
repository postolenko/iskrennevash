/* FWDR3DCarSlidersMenuButton */
(function (){
var FWDR3DCarSlidersMenuButton = function(propsObj)
{
		var self = this;
		var prototype = FWDR3DCarSlidersMenuButton.prototype;
		
		this.id = propsObj.id;
		this.text = propsObj.text;
		this.nrOfSliders = propsObj.nrOfSliders;
		this.totalButtons = propsObj.totalButtons;
		this.data = propsObj.data;
		
		this.sliderMinValue;
		this.sliderMaxValue;
		this.sliderValue;
		
		this.totalWidth = 190;
		this.totalHeight = 100;
		
		this.imgDO;
		this.sliderDO;
		this.sliderTextDO;
		this.sliderText;
		this.comboBoxDO;
		this.resetButtonDO;
		this.onOffButtonDO;
		this.textDO;
		
		this.finalX;
		this.finalY;
		
		this.isMobile = FWDR3DCarUtils.isMobile;
		this.isDisabled = false;
		
		this.init = function()
		{
			self.setWidth(self.totalWidth);
			self.setHeight(self.totalHeight);

			if (self.id == 0)
			{
				self.value = propsObj.value;
				self.setupMainContainers2();
			}
			else if (self.id == 1)
			{
				self.sliderMinValue = propsObj.sliderMinValue;
				self.sliderMaxValue = propsObj.sliderMaxValue;
				self.sliderValue = propsObj.sliderValue;
				self.value = self.sliderValue;
				
				self.setupMainContainers();
			}
			else
			{
				self.setupMainContainers3();
			}
		};
		
		this.setupMainContainers = function()
		{
			self.imgDO = new FWDR3DCarSimpleDisplayObject("img");
			
			self.imgDO.setWidth(170);
			self.imgDO.setHeight(57);
			
			self.imgDO.setX(Math.floor((self.totalWidth - 170)/2));
			self.imgDO.setY(-4);
			
			self.imgDO.screen.src = "load/slider-skin/sliderImage.jpg";
			self.addChild(self.imgDO);
			
			self.imgDO.screen.ontouchstart = null;
			
			FWDR3DCarSlider.setPrototype();
			self.sliderDO = new FWDR3DCarSlider(
			{
				skinPath:"load/slider-skin",
				sliderWidth:170,
				sliderHeight:22,
				handlerWidth:22,
				trackHeight:10,
				trackMarginWidth:5,
				progressHeight:6,
				minValue:self.sliderMinValue,
				maxValue:self.sliderMaxValue,
				value:self.sliderValue
			});
			
			self.sliderDO.addListener(FWDR3DCarSlider.CHANGE, self.onSliderChange);
			self.addChild(self.sliderDO);
			
			self.sliderDO.setY(45);
			
			self.sliderTextDO = new FWDR3DCarDisplayObject("div");
			self.addChild(self.sliderTextDO);

			self.sliderTextDO.setWidth(40);
			self.sliderTextDO.setHeight(25);
			
			self.sliderTextDO.setX(75);
			self.sliderTextDO.setY(5);
			
			self.sliderText = new FWDR3DCarSimpleDisplayObject("div");
			self.sliderTextDO.addChild(self.sliderText);
			
			self.sliderText.getStyle().fontSmoothing = "antialiased";
			self.sliderText.getStyle().webkitFontSmoothing = "antialiased";
			self.sliderText.getStyle().textRendering = "optimizeLegibility";
			
			self.sliderText.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.sliderText.getStyle().fontSize = "12px";
			self.sliderText.getStyle().color = "#000000";

			if (FWDR3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = self.sliderValue;
			}
			else
			{
				self.sliderText.setInnerHTML(self.sliderValue);
			}
			
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.textDO = new FWDR3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDR3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
		};
		
		this.setTextPosition = function()
		{
			self.textDO.setX(Math.floor((self.totalWidth - self.textDO.getWidth())/2));
			self.textDO.setY(80);
		};
		
		this.setSliderTextPosition = function()
		{
			self.sliderText.setX(Math.floor((40 - self.sliderText.getWidth())/2));
			self.sliderText.setY(Math.floor((25 - self.sliderText.getHeight())/2));
		};
		
		this.onSliderChange = function(e)
		{
			if (FWDR3DCarUtils.isIEAndLessThen9)
			{
				self.sliderText.screen.innerText = e.value;
			}
			else
			{
				self.sliderText.setInnerHTML(e.value);
			}
			
			clearTimeout(self.sliderTextId);
			self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
			
			self.value = e.value;
			self.dispatchEvent(FWDR3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setupMainContainers2 = function()
		{
			FWDR3DCarOnOffButton.setPrototype();
			
			self.onOffButtonDO = new FWDR3DCarOnOffButton(104, 31, 54, "load/onOffButton-skin", self.value);
			self.onOffButtonDO.addListener(FWDR3DCarOnOffButton.CHANGE, self.onOnOffButtonChangeHandler);
			self.addChild(self.onOffButtonDO);
			
			self.onOffButtonDO.setX(Math.floor((self.totalWidth - self.onOffButtonDO.getWidth())/2));
			self.onOffButtonDO.setY(Math.floor((80 - self.onOffButtonDO.getHeight())/2));
			
			self.textDO = new FWDR3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDR3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
		};
		
		this.onOnOffButtonChangeHandler = function(e)
		{
			self.value = e.value;
			self.dispatchEvent(FWDR3DCarSlidersMenuButton.CHANGE);
		};
		
		this.setupMainContainers3 = function()
		{
			FWDResetButton.setPrototype();
			
			self.resetButtonDO = new FWDResetButton(31, 29, "load/reset-skin");
			self.resetButtonDO.addListener(FWDResetButton.CLICK, self.resetButtonClickHandler);
			self.addChild(self.resetButtonDO);
			
			self.resetButtonDO.setX(Math.floor((self.totalWidth - self.resetButtonDO.getWidth())/2));
			self.resetButtonDO.setY(Math.floor((60 - self.resetButtonDO.getHeight())/2));
			
			self.textDO = new FWDR3DCarSimpleDisplayObject("div");
			self.addChild(self.textDO);
			
			self.textDO.getStyle().fontSmoothing = "antialiased";
			self.textDO.getStyle().webkitFontSmoothing = "antialiased";
			self.textDO.getStyle().textRendering = "optimizeLegibility";
			
			self.textDO.getStyle().fontFamily = "Arial, Helvetica, sans-serif";
			self.textDO.getStyle().fontSize = "12px";
			self.textDO.getStyle().color = "#777777";
			
			if (FWDR3DCarUtils.isIEAndLessThen9)
			{
				self.textDO.screen.innerText = self.text;
			}
			else
			{
				self.textDO.getStyle().whiteSpace = "nowrap";
				self.textDO.setInnerHTML(self.text);
			}
			
			self.textPosId = setTimeout(self.setTextPosition, 10);
		};
		
		this.resetButtonClickHandler = function(e)
		{
			self.dispatchEvent(FWDR3DCarSlidersMenuButton.RESET);
		};
		
		this.setValue = function(newValue)
		{
			self.value = newValue;
			
			if (self.id == 0)
			{
				self.onOffButtonDO.setValue(newValue);
			}
			else if (self.id == 1)
			{
				if (FWDR3DCarUtils.isIEAndLessThen9)
				{
					self.sliderText.screen.innerText = self.value;
				}
				else
				{
					self.sliderText.setInnerHTML(self.value);
				}
				
				clearTimeout(self.sliderTextId);
				self.sliderTextId = setTimeout(self.setSliderTextPosition, 10);
				
				self.sliderDO.setValue(newValue);
			}
		};
		
		this.disable = function()
		{
			self.isDisabled = true;
			
			if (self.id == 0)
			{
				self.onOffButtonDO.disable();
			}
			else if (self.id == 1)
			{
				self.sliderDO.disable();
			}
			else
			{
				self.resetButtonDO.disable();
			}
		};
		
		this.enable = function()
		{
			self.isDisabled = false;
			
			if (self.id == 0)
			{
				self.onOffButtonDO.enable();
			}
			else if (self.id == 1)
			{
				self.sliderDO.enable();
			}
			else
			{
				self.resetButtonDO.enable();
			}
		};
		
		this.destroy = function()
		{
			clearTimeout(self.sliderTextId);
			clearTimeout(self.textPosId);
			clearTimeout(self.posComboboxId);
			
			if (self.imgDO)
			{
				self.imgDO.destroy();
				self.imgDO = null;
			}
			
			if (self.sliderDO)
			{
				self.sliderDO.destroy();
				self.sliderDO = null;
			}
			
			if (self.sliderTextDO)
			{
				self.sliderTextDO.destroy();
				self.sliderTextDO = null;
			}
			
			if (self.sliderText)
			{
				self.sliderText.destroy();
				self.sliderText = null;
			}
			
			if (self.comboBoxDO)
			{
				self.comboBoxDO.destroy();
				self.comboBoxDO = null;
			}
			
			if (self.resetButtonDO)
			{
				self.resetButtonDO.destroy();
				self.resetButtonDO = null;
			}
			
			if (self.onOffButtonDO)
			{
				self.onOffButtonDO.destroy();
				self.onOffButtonDO = null;
			}
			
			if (self.textDO)
			{
				self.textDO.destroy();
				self.textDO = null;
			}
			
			self.screen.innerHTML = "";
			self = null;
			prototype.destroy();
			prototype = null;
			FWDR3DCarSlidersMenuButton.prototype = null;
		};
		
		self.init();
	};
	
	/* set prototype */
	FWDR3DCarSlidersMenuButton.setPrototype = function()
	{
		FWDR3DCarSlidersMenuButton.prototype = new FWDR3DCarDisplayObject("div", "absolute", "visible");
	};

	FWDR3DCarSlidersMenuButton.CHANGE = "onChange";
	FWDR3DCarSlidersMenuButton.RESET = "onReset";
	
	FWDR3DCarSlidersMenuButton.prototype = null;
	window.FWDR3DCarSlidersMenuButton = FWDR3DCarSlidersMenuButton;
}(window));