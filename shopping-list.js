/*
*@class ListItemsClass
*@param1 {obj} // accepts a value object
*@param2 {collectionManager} // accepts an instance of the collection managerclass

*/
function ListItemsClass(obj, collectionManager) {
	

		
    //-- properties
    var dis = this;
    this.item = document.createElement("li");

    this.id = obj.id;
    this.name = obj.name;
    this.title = obj.title;
    this.value = obj.value;

    this.value = obj.value;
	this.quantyValueCount = 0;
    this.checkBoxStatus = false;
    this.item.id = obj.id;
    this.title = document.createElement("h4");
    
	collectionManager.appMainHandler.utilCreateNode( this.title,obj.title);
    //
    /**
    *@method setValue //
    *@pram {value} accepts a number
    */
    this.setValue = function (value) {
    this.quantyValueCount = value;
	collectionManager.appMainHandler.utilCreateNode( this.valueLabel,value);
       // this.valueLabel.innerHTML = value;
    }

    this.checkBox = document.createElement("input");
    this.checkBox.type = "checkbox";

    this.quanty = document.createElement("input");
    this.quanty.type = "text";
    this.quanty.className = "qntField";
    this.quanty.value = 1;


    this.quantyLabel = document.createElement("label");
    this.quantyLabel.className = "qntlable";
    //this.quantyLabel.innerHTML = "Quantity:";
	collectionManager.appMainHandler.utilCreateNode( this.quantyLabel,"Quantity:");

    this.label = document.createElement("label");
    
    collectionManager.appMainHandler.utilCreateNode(this.label,obj.name); 
    this.valueLabel = document.createElement("span");
    
   collectionManager.appMainHandler.utilCreateNode(this.valueLabel,obj.value);
    this.deleteBtn = document.createElement("img");
    this.deleteBtn.src = "../images/deleteBtn.png";
	
	   /**
    *@method quantityPlus//
    *updates the quantity total 
    */
	this.quantityPlus = function (){
		this.quanty.value = parseInt(this.quanty.value)+1;
		//--
		dis.setValue(collectionManager.CurrencyFmt(dis.value * collectionManager.oneFactor(parseInt(dis.quanty.value))));
            collectionManager.itemvalueAdded(true);
		}
	/**
    *@method quantyValue //
    *updates the quantity total 
    *@return current quantyValue
    */
	this.quantyValue = function (){
		
	return  collectionManager.oneFactor( parseInt(this.quanty.value)) * this.value; 
		
		}
		
	/**
    *@property .//the input to change the qantity
    *is 
    *
    */
    this.quanty.onblur = function () {
	//alert(dis.quantyValue());



if (isNaN(dis.quanty.value) === false && dis.quanty.value >0 ) {

            dis.setValue(collectionManager.CurrencyFmt(dis.value * collectionManager.oneFactor(parseInt(dis.quanty.value))));
            collectionManager.itemvalueAdded(true);
        } 
		
		
		
		if (dis.quanty.value  == 0 ){
			
			remover();
			}

    }

    this.checkBox.onclick = function boxChecked(event) {
        if (  this.checkBox.checked == true) {

            dis.checkBoxStatus = true;
			collectionManager.addCheck(obj.id, true);
			
		

        } else {

            dis.checkBoxStatus = false;

            collectionManager.addCheck(obj.id, false);

        }

    }

    //--



    function remover() {

        collectionManager.removeItem(obj.id);
    }

    this.deleteBtn.onclick = remover;

    //--
    this.item.appendChild(this.title);
    this.item.appendChild(this.checkBox);
    this.item.appendChild(this.label);
    this.item.appendChild(this.valueLabel);
    this.item.appendChild(this.quantyLabel);
    this.item.appendChild(this.quanty);
    this.item.appendChild(this.deleteBtn);

    this.returnItem = function () {
        return this.item;
    }

    //--
}

//-----------------------------------------------------
/**
*@Class CollectionManagerClass
*@param1 {consoleobjId}// dom id
*@param2 {consoleobjId}// dom id
*@param3 {appMainHandler}// main app namespace

*/
function CollectionManagerClass(objcontrolId, consoleobjId,appMainHandler) {
	
	appMainHandler.listCollectionManager = this;
	this.appMainHandler = appMainHandler;
	
	//--
	
	this.control = document.getElementById(objcontrolId);
    this.consoleobj = document.getElementById(consoleobjId);



    this.collectionArray = [];
    this.count = 0;
    this.totalCount = 0;

    this.oneFactor = function (num){
	if (num < 1){ return 1;}else {return num;}
	}
	
    this.addCheck = function () {



        for (var i = 0; i < this.collectionArray.length; i++) {



            if (this.collectionArray[i].checkBoxStatus === true) {

                this.collectionArray[i].item.style.backgroundColor ="#FFcc00"; //"hlightBg";
				appMainHandler.listItemsGroupManager.findById( this.collectionArray[i].id).selectionItem.style.borderColor ="#FFcc00"; 
	

            } else {
                      this.collectionArray[i].item.style.backgroundColor ="#FFF8DC";
					 	appMainHandler.listItemsGroupManager.findById( this.collectionArray[i].id).selectionItem.style.borderColor ="#CCCCCC"; 
            }

        }

    };
    //--
    this.CurrencyFmt = function (amount) {

        var i = parseFloat(amount);
        if (isNaN(i)) {
            i = 0.00;
            return;
        }
        var minus = '';
        if (i < 0) {
            minus = '-';
        }
        i = Math.abs(i);
        i = parseInt((i + .005) * 100);
        i = i / 100;
        var s = new String(i);
        if (s.indexOf('.') < 0) {
            s += '.00';
        }
        if (s.indexOf('.') == (s.length - 2)) {
            s += '0';
        }
		
        s = minus + s;
		return s;
    }
    //------
    this.itemvalueAdded = function (bool) {
        this.totalCount = 0;
        if ((this.collectionArray.length) > 0) {
            for (var i = 0; i < this.collectionArray.length; i++) {
                //alert(this.collectionArray[i].value);
                this.totalCount += parseFloat(this.collectionArray[i].quantyValue(), 10);

                if (i === (this.collectionArray.length - 1)) {

                    //alert(this.totalCount);
					if(bool == true){
						
						  appMainHandler.utilCreateNode(this.consoleobj,"£" + this.CurrencyFmt(this.totalCount));
						}
						
                    return "£" + this.CurrencyFmt(this.totalCount);
                }

            }
        } else {
            return 0;
        }
return 0;
    }
    //--
    this.findById = function (itemId) {

        var itemMatched = 0;
        for (var i = 0; i < this.collectionArray.length; i++) {

            if ((this.collectionArray[i].id) === itemId) {
                itemMatched++;
                return this.collectionArray[i];
            }
            if (i === (this.collectionArray.length - 1) && (itemMatched === 0)) {

                return "notfound";
            }
        }
		return "notfound";
    }
    //--
    this.addItem = function (itemId) {
        var itemMatched = 0;
	
	if ((this.collectionArray.length) > 0) {

            for (var i = 0; i < this.collectionArray.length; i++) {


                if ((this.collectionArray[i].id) === itemId) {
                    itemMatched++;
                }

                if (i === (this.collectionArray.length - 1)) {

                    if (itemMatched === 0) {
                        var customItem = new ListItemsClass(list[itemId], this);
						
                        this.collectionArray.push(customItem);
                       this.control.appendChild(customItem.returnItem());
                        //-- 
                    
   appMainHandler.utilCreateNode( this.consoleobj,this.itemvalueAdded());
                        return;
                        //itemMatched =0;
                    } else if (itemMatched > 0) {
						
                        //alert("This Item is already added to the shopping list \n and the Quantity will be increased");
						
						this.findById(itemId).quantityPlus();
						

                    }
                }

            }
            //-- end of for loop
			 
        } else {
            var customItem = new ListItemsClass(list[itemId], this);
            this.collectionArray.push(customItem);
            this.control.appendChild(customItem.returnItem());
			appMainHandler.utilCreateNode(this.consoleobj,this.itemvalueAdded());
        }
	
	return;

    }
    //---------
    this.removeItem = function (itemId) {



        for (var i = 0; i < this.collectionArray.length; i++) {

            if ((this.collectionArray[i].id) === itemId) {
				
				this.control.removeChild(this.findById(itemId).item)
				
				this.collectionArray.splice(i, 1);
                //-- used remove function from jquery function from jquery;
                
				  appMainHandler.utilCreateNode(this.consoleobj,this.itemvalueAdded());

            }

        }

    }


    this.controller = function () {
        return this.control;
    }
return;

}
//---------------------------------------------
/*--
/*
*@class ListItemsClass
*@param1 {obj} // accepts a value object
*@param2 {collectionManager} // accepts an instance of the collection managerclass

*/

function SelectionsClass(objValue, collectionManager) {
 
	this.id = objValue.id ;
    this.selectionItem = document.createElement('li');
    this.selectionItem.id = objValue.id + "_list";
    this.imageItem = document.createElement('img');
    this.imageItem.src = "http://www.goshine-design.co.uk/expsite/images/thum-" + objValue.imageName;
    this.selectionItem.appendChild(this.imageItem);
 
	this.listNamepItem = document.createElement('p');
	this.listNamepItem.className ="listname";
	collectionManager.appMainHandler.utilCreateNode(this.listNamepItem,objValue.name);
	this.selectionItem.appendChild(this.listNamepItem );
	  
	this.listPricepItem = document.createElement('p');
	this.listPricepItem .className ="price";
    collectionManager.appMainHandler.utilCreateNode(this.listPricepItem,objValue.value); 
	this.selectionItem.appendChild(	this.listPricepItem);
	
   this.button = document.createElement('input');
   this.button.type ='button' ;
   this.button.value ="add to list";
   this.selectionItem.appendChild(this.button); 

    this.selectionItem.onclick = function () {
        collectionManager.addItem(objValue.id);
    }

    this.returnItem = function () {

        return this.selectionItem;
    }
}

//----------------------------------------------

/*
*@class ListItemsGroupManagerClass
*@param1 {tagetId} //id string
*@param2 {collectionData} // data source
*@param3 {parallelCollectionManager} // instance of paired collection manager
*@param4 {appMainHandler} //namespace


*/
function ListItemsGroupManagerClass(tagetId,collectionData, parallelCollectionManager,appMainHandler) {
	   appMainHandler.listItemsGroupManager = this;
	   this.appMainHandler = appMainHandler;
	   //--
	   this.targetLocation  = document.getElementById(tagetId);
	   this.control = document.createElement("ul");
	   
	   
    this.collectionArray = [];
	this.findById = parallelCollectionManager.findById;
	
    this.count = 0;
    this.totalCount = 0;
	//---
	parallelCollectionManager.reqBind = function(){}
	//
	  this.createConstructor = function (){
	    for (var i in collectionData) {
        // create instance of SelectionsClass items--
        var selectionItem = new SelectionsClass(collectionData[i], parallelCollectionManager);
		this.control.appendChild(selectionItem.returnItem());
		this.collectionArray.push(selectionItem);
		
  		 }
		 
	   this.targetLocation.appendChild(this.control);
	   }
	
}

/*
*@class ApplicationClass 
*@param1 {ListDivId} //id string
*@param2 {totalValueId} //id string
*@param3 {SelectableItemsId}  //id string


*/
function ApplicationClass (ListDivId,totalValueId,SelectableItemsId){
"use strict";
	this.name = "Goshine Neat Shopping List";
	this.version = "version 0.1";
	this.utilCreateNode = function(element,textContent){
		var texNode = document.createTextNode(textContent);
		
		if(element.firstChild){
		element.replaceChild(texNode,element.firstChild);
		} else{
			element.appendChild(texNode);
			}
		
		}
	this.init = function(){
this.listCollectionManager = new CollectionManagerClass(ListDivId,totalValueId,this);
this.listItemsGroupManager = new ListItemsGroupManagerClass(SelectableItemsId,list, this.listCollectionManager,this) ;
this.listItemsGroupManager.createConstructor();
		//alert("runing");
		}
		
	}
//---------------------------------------------
window.onload = function () {
var appMain = new ApplicationClass('mainList','priceTotal','selectList');
appMain.init();


//---


};


