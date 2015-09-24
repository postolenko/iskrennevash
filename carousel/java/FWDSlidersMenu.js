/* FWDR3DCarSlidersMenu */
(function (window){
var FWDR3DCarSlidersMenu = function(parent, sValues)
{
		var self = this;
		var prototype = FWDR3DCarSlidersMenu.prototype;
		
		this.parent = parent;
		this.slidersValues = sValues;
		
		this.menuButtons_ar = [];
		this.buttonsHolder_do = null;
		
		this.lineDO1 = null;
		this.lineImgDO1 = null;
		this.lineDO2 = null;
		this.lineImgDO2 = null;
		
		this.stageWidth;
		this.stageHeight;
		this.maxWidth = 970;
		this.buttonsHolderWidth = 200;
		this.buttonsBarOriginalHeight = 70;
		this.totalHeight = 0;
		this.buttonsBarTotalHeight = 200;
		this.totalButtons;
		this.totalHeight = 200;
		this.hSpace = 2;
		this.vSpace = 16;
		this.minMarginXSpace = 12;
		this.startY = 8;

		this.init = function()
		{
			self.parent.style.height = "10px";
			self.parent.appendChild(self.screen);

			self.nrOfSliders = 1;
			self.totalButtons = 3;
			
			self.setupSliderButtons();
			
			self.positionSlidersId = setTimeout(self.positionSliderButtons, 50);
		};
		
		this.update = function(sValues)
		{
			self.slidersValues = sValues;
		};
			
		this.positionAndResize = function(viewportWidth)
		{
			if (self.viewportWidth == viewportWidth) return;
		
			self.viewportWidth = viewportWidth;
			self.stageWidth = viewportWidth;
			
			self.positionSliderButtons();
		};
		
		this.setupSliderButtons = function()
		{
			var sliderButton;
			
			self.buttonsHolder_do = new FWDR3DCarDisplayObject("div", "absolute", "visible");
			self.buttonsHolder_do.getStyle().backgroundPosition = "0% 100%";
			self.buttonsHolder_do.setBkColor(self.buttonsHolderBackgroundColor_str);
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarOriginalHeight);
			self.addChild(self.buttonsHolder_do);
			
			for(var i=0; i<self.totalButtons; i++)
			{
				FWDR3DCarSlidersMenuButton.setPrototype();
				
				var propsObj = {};
				
				propsObj.id = i;
				propsObj.nrOfSliders = self.nrOfSliders;
				propsObj.totalButtons = self.totalButtons;
				
				switch (i)
				{
					case 0:
						propsObj.value = self.slidersValues[0];
						propsObj.text = "Show reflection";
						break;
					case 1:
						propsObj.sliderMinValue = 0;
						propsObj.sliderMaxValue = 50;
						propsObj.sliderValue = self.slidersValues[1];
						propsObj.text = "Reflection distance";
						break;
					case 2:
						propsObj.text = "Configuration reset";
						break;
				}
				
				sliderButton = new FWDR3DCarSlidersMenuButton(propsObj);
				sliderButton.addListener(FWDR3DCarSlidersMenuButton.CHANGE, self.sliderButtonChangeHandler);
				sliderButton.addListener(FWDR3DCarSlidersMenuButton.RESET, self.reset);
				
				self.menuButtons_ar[i] = sliderButton;
				self.buttonsHolder_do.addChild(sliderButton);
			}
		};
		
		this.sliderButtonChangeHandler = function()
		{
			self.dispatchEvent(FWDR3DCarSlidersMenu.CHANGE,
			{
				showRefl:self.menuButtons_ar[0].value,
				reflDist:self.menuButtons_ar[1].value
			});
		};
		
		this.reset = function()
		{
			self.menuButtons_ar[0].setValue(self.slidersValues[0]);
			self.menuButtons_ar[1].setValue(self.slidersValues[1]);

			self.sliderButtonChangeHandler();
		};
		
		//###################################################//
		/* position slider buttons */
		//###################################################//
		this.positionSliderButtons = function()
		{
			if(isNaN(self.stageWidth)) return;
			
			var button;
			var prevButton;
			var rowsAr = [];
			var rowsWidthAr = [];
			var tempX;
			var tempY = self.startY;
			var maxY = 0;
			var totalRowWidth = 0;
			var rowsNr = 0;
			
			self.buttonsHolderWidth = self.stageWidth;
			
			rowsAr[rowsNr] = [0];
			rowsWidthAr[rowsNr] = self.menuButtons_ar[0].totalWidth;
			
			for (var i=1; i<self.totalButtons; i++)
			{	
				button = self.menuButtons_ar[i];
				
				if (rowsWidthAr[rowsNr] + button.totalWidth + self.hSpace > Math.min(self.stageWidth, self.maxWidth) - self.minMarginXSpace)
				{	
					rowsNr++;
					rowsAr[rowsNr] = [];
					rowsAr[rowsNr].push(i);
					rowsWidthAr[rowsNr] = button.totalWidth;
				}
				else
				{
					rowsWidthAr[rowsNr] += button.totalWidth + self.hSpace;
					rowsAr[rowsNr].push(i);
				}
			}
			
			for (var i=0; i<rowsNr + 1; i++)
			{
				var rowMarginXSpace = parseInt((self.buttonsHolderWidth - rowsWidthAr[i])/2);
				
				if (i > 0) tempY += button.totalHeight + self.vSpace;
					
				for (var j=0; j<rowsAr[i].length; j++)
				{
					button = self.menuButtons_ar[rowsAr[i][j]];
					
					if (j == 0)
					{
						tempX = rowMarginXSpace;
					}
					else
					{
						prevButton = self.menuButtons_ar[rowsAr[i][j] - 1];
						tempX = prevButton.finalX + prevButton.totalWidth + self.hSpace;
					}
					
					button.finalX = tempX;
					button.finalY = tempY + 4;
						
					if (maxY < button.finalY)
						maxY = button.finalY;
					
					self.buttonsBarTotalHeight = maxY + button.totalHeight + self.startY + 7;
					
					button.setX(button.finalX);
					button.setY(button.finalY);
				}
			}
			
			self.totalHeight = self.buttonsBarTotalHeight;  
			self.buttonsHolder_do.setWidth(self.buttonsHolderWidth);
			self.buttonsHolder_do.setHeight(self.buttonsBarTotalHeight + 15);
			
			self.setX(parseInt((self.viewportWidth - self.stageWidth)/2));
			self.parent.style.height = (self.totalHeight + 15) + "px";
		};
		
		this.disable = function()
		{
			for(var i=0; i<self.totalButtons; i++)
			{
				self.menuButtons_ar[i].disable();
			}
		};
		
		this.enable = function()
		{
			for(var i=0; i<self.totalButtons; i++)
			{
				self.menuButtons_ar[i].enable();
			}
		};
		
		this.destroy = function()
		{
			clearTimeout(self.positionSlidersId);
			
			for (var i=0; i<self.totalButtons; i++)
			{
				self.buttonsHolder_do.removeChild(self.menuButtons_ar[i]);
				self.menuButtons_ar[i].destroy();
				self.menuButtons_ar[i] = null;
			};
			
			self.removeChild(self.buttonsHolder_do);
			self.buttonsHolder_do.destroy();
			self.buttonsHolder_do = null;

			self.menuButtons_ar = null;
			
			self.screen.innerHTML = "";
			self = null;
			prototype.destroy();
			prototype = null;
			FWDR3DCarSlidersMenu.prototype = null;
		};
	
		self.init();
	};
	
	/* set prototype */
	FWDR3DCarSlidersMenu.setPrototype = function(){
		FWDR3DCarSlidersMenu.prototype = new FWDR3DCarDisplayObject("div", "absolute", "visible");
	};
	
	FWDR3DCarSlidersMenu.CHANGE = "onChange";

	FWDR3DCarSlidersMenu.prototype = null;
	window.FWDR3DCarSlidersMenu = FWDR3DCarSlidersMenu;
}(window));