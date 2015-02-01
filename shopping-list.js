

var list = {
  id01: {
    id: "id01",
    name: 'Magical Mix',
    title: 'Magical Mix',
    value: "3.60",
    imageName: "http://placehold.it/70",
    prodDesc: "Perfect Description"
  },
  id02: {
    id: "id02",
    name: 'Empty Box',
    title: 'Empty Box',
    value: "9.60",
    imageName: "http://placehold.it/70",
    prodDesc: "Less is more"
  },
  id03: {
    id: "id03",
    name: 'Good Gears',
    title: 'Good Gears',
    value: "101.60",
    imageName: "http://placehold.it/70",
    prodDesc: "Get in the right gear"
  },
  id04: {
    id: "id04",
    name: "Loud Alarmers",
    title: "Loud Alarmers",
    value: "5.60",
    imageName: "http://placehold.it/70",
    prodDesc: "Loud is always better"
  },
  id05: {
    id: "id05",
    name: 'Perfect Gift',
    title: 'Perfect Gift',
    value: "1.60",
    imageName: "http://placehold.it/70",
    prodDesc: "A perfect Gift is what you expectected"
  },
  id06: {
    id: "id06",
    name: "Piggy Bank",
    title: "Piggy Bank",
    value: "5.60",
    imageName: "http://placehold.it/70",
    prodDesc: "This Piggy Bank is perfect for big coins"
  }
};

function ListItemsClass(obj, collectionManager) {
  "use strict";
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
  collectionManager.appMainHandler.utilCreateNode(this.title, obj.title);


  this.checkBox = document.createElement("input");
  this.checkBox.type = "checkbox";
  this.quanty = document.createElement("input");
  this.quanty.type = "text";
  this.quanty.className = "qntField";
  this.quanty.value = 1;
  this.quantyLabel = document.createElement("label");
  this.quantyLabel.className = "qntlable";
  //this.quantyLabel.innerHTML = "Quantity:";
  collectionManager.appMainHandler.utilCreateNode(this.quantyLabel, "Quantity:");
  this.label = document.createElement("label");
  collectionManager.appMainHandler.utilCreateNode(this.label, obj.name);
  this.valueLabel = document.createElement("span");
  collectionManager.appMainHandler.utilCreateNode(this.valueLabel, obj.value);
  this.deleteBtn = document.createElement("img");
  this.deleteBtn.src = "http://www.goshine-design.co.uk/expsite/images/deleteBtn.png";


  this.quantityPlus = function () {
    this.quanty.value = parseInt(this.quanty.value, 10) + 1;
    dis.setValue(collectionManager.CurrencyFmt(dis.value * collectionManager.oneFactor(parseInt(dis.quanty.value, 10))));
    collectionManager.itemvalueAdded(true);
  };

  this.quantyValue = function () {
    return collectionManager.oneFactor(parseInt(this.quanty.value, 10)) * this.value;

  };
//--

  function remover() {
    collectionManager.removeItem(obj.id);
  }


  this.quanty.onblur = function () {
    //alert(dis.quantyValue());

    if (isNaN(dis.quanty.value) === false && dis.quanty.value > 0) {
      dis.setValue(collectionManager.CurrencyFmt(dis.value * collectionManager.oneFactor(parseInt(dis.quanty.value, 10))));
      collectionManager.itemvalueAdded(true);
    }

    if (dis.quanty.value === 0) {
      remover();
    }

  };

  this.checkBox.onclick = function boxChecked() {

    if (dis.checkBox.checked === true) {
      dis.checkBoxStatus = true;
      collectionManager.addCheck(obj.id, true);

    } else {
      dis.checkBoxStatus = false;
      collectionManager.addCheck(obj.id, false);

    }

  };

  this.deleteBtn.onclick = remover;
  this.item.appendChild(this.title);
  this.item.appendChild(this.checkBox);
  this.item.appendChild(this.label);
  this.item.appendChild(this.valueLabel);
  this.item.appendChild(this.quantyLabel);
  this.item.appendChild(this.quanty);
  this.item.appendChild(this.deleteBtn);

  this.returnItem = function () {
    return this.item;
  };
}



function CollectionManagerClass(objcontrolId, consoleobjId, appMainHandler) {
  "use strict";
  appMainHandler.listCollectionManager = this;
  this.appMainHandler = appMainHandler;

  //--
  this.control = document.getElementById(objcontrolId);
  this.consoleobj = document.getElementById(consoleobjId);

  this.collectionArray = [];
  this.count = 0;
  this.totalCount = 0;

  this.oneFactor = function (num) {
    if (num < 1) {
      return 1;
    } else {
      return num;
    }
  };

  this.addCheck = function () {


    var ln = this.collectionArray.length;

    for (var i = 0; i < ln; i += 1) {


      if (this.collectionArray[i].checkBoxStatus === true) {

        this.collectionArray[i].item.style.backgroundColor = "#FFcc00"; //"hlightBg";
        appMainHandler.listItemsGroupManager.findById(this.collectionArray[i].id).selectionItem.style.borderColor = "#FFcc00";


      } else {
        this.collectionArray[i].item.style.backgroundColor = "#FFF8DC";
        appMainHandler.listItemsGroupManager.findById(this.collectionArray[i].id).selectionItem.style.borderColor = "#CCCCCC";
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
    i = parseInt(((i + 0.005) * 100), 10);
    i = i / 100;
    var s = i + " ";
    if (s.indexOf('.') < 0) {
      s += '.00';
    }
    if (s.indexOf('.') === (s.length - 2)) {
      s += '0';
    }

    s = minus + s;
    return s;
  };
  //------
  this.itemvalueAdded = function (bool) {
    this.totalCount = 0;
    if ((this.collectionArray.length) > 0) {

      var ln = this.collectionArray.length;

      for (var i = 0; i < ln; i += 1) {
        //alert(this.collectionArray[i].value);
        this.totalCount += parseFloat(this.collectionArray[i].quantyValue(), 10);

        if (i === (this.collectionArray.length - 1)) {

          //alert(this.totalCount);
          if (bool === true) {

            appMainHandler.utilCreateNode(this.consoleobj, "£" + this.CurrencyFmt(this.totalCount));
          }

          return "£" + this.CurrencyFmt(this.totalCount);
        }

      }
    } else {
      return 0;
    }
    return 0;
  };
  //--
  this.findById = function (itemId) {

    var itemMatched = 0;

    var ln = this.collectionArray.length;

    for (var i = 0; i < ln; i += 1) {

      if ((this.collectionArray[i].id) === itemId) {
        itemMatched += 1;
        return this.collectionArray[i];
      }
      if (i === (this.collectionArray.length - 1) && (itemMatched === 0)) {

        return "notfound";
      }
    }
    return "notfound";
  };

  //--
  this.addItem = function (itemId) {
    var itemMatched = 0, customItem;

    if ((this.collectionArray.length) > 0) {


      var ln = this.collectionArray.length;

      for (var i = 0; i < ln; i += 1) {


        if ((this.collectionArray[i].id) === itemId) {
          itemMatched += 1;
        }

        if (i === (this.collectionArray.length - 1)) {

          if (itemMatched === 0) {
            customItem = new ListItemsClass(list[itemId], this);

            this.collectionArray.push(customItem);
            this.control.appendChild(customItem.returnItem());
            //--
            appMainHandler.utilCreateNode(this.consoleobj, this.itemvalueAdded());
            return;
            //itemMatched =0;
          } else if (itemMatched > 0) {


            this.findById(itemId).quantityPlus();


          }
        }

      }
      //-- end of for loop
    } else {
      customItem = new ListItemsClass(list[itemId], this);
      this.collectionArray.push(customItem);
      this.control.appendChild(customItem.returnItem());
      appMainHandler.utilCreateNode(this.consoleobj, this.itemvalueAdded());
    }

    return;

  };
  //---------
  this.removeItem = function (itemId) {


    var ln = this.collectionArray.length;

    for (var i = 0; i < ln; i += 1) {

      if ((this.collectionArray[i].id) === itemId) {

        this.control.removeChild(this.findById(itemId).item);

        this.collectionArray.splice(i, 1);
        //-- used remove function from jquery function from jquery;
        appMainHandler.utilCreateNode(this.consoleobj, this.itemvalueAdded());

      }

    }

  };


  this.controller = function () {
    return this.control;
  };
  return;

}


function SelectionsClass(objValue, collectionManager) {
  "use strict";
  this.id = objValue.id;
  this.selectionItem = document.createElement('li');
  this.selectionItem.id = objValue.id + "_list";
  this.imageItem = document.createElement('img');
  this.imageItem.src = objValue.imageName;
  this.selectionItem.appendChild(this.imageItem);

  this.listNamepItem = document.createElement('p');
  this.listNamepItem.className = "listname";
  collectionManager.appMainHandler.utilCreateNode(this.listNamepItem, objValue.name);
  this.selectionItem.appendChild(this.listNamepItem);

  this.listPricepItem = document.createElement('p');
  this.listPricepItem.className = "price";
  collectionManager.appMainHandler.utilCreateNode(this.listPricepItem, objValue.value);
  this.selectionItem.appendChild(this.listPricepItem);

  this.button = document.createElement('input');
  this.button.type = 'button';
  this.button.value = "add to list";
  this.selectionItem.appendChild(this.button);

  this.selectionItem.onclick = function () {
    collectionManager.addItem(objValue.id);
  };

  this.returnItem = function () {

    return this.selectionItem;
  };
}


function ListItemsGroupManagerClass(tagetId, collectionData, parallelCollectionManager, appMainHandler) {
  "use strict";
  appMainHandler.listItemsGroupManager = this;
  this.appMainHandler = appMainHandler;
  //--
  this.targetLocation = document.getElementById(tagetId);
  this.control = document.createElement("ul");


  this.collectionArray = [];
  this.findById = parallelCollectionManager.findById;

  this.count = 0;
  this.totalCount = 0;
  //--interface for future functinality
  parallelCollectionManager.reqBind = function () {
  };
  //
  this.createConstructor = function () {

    for (var i in collectionData) {
      // create instance of SelectionsClass items--
      var selectionItem = new SelectionsClass(collectionData[i], parallelCollectionManager);
      this.control.appendChild(selectionItem.returnItem());
      this.collectionArray.push(selectionItem);

    }

    this.targetLocation.appendChild(this.control);
  };

}


function ApplicationClass(ListDivId, totalValueId, SelectableItemsId) {
  "use strict";
  this.name = "KoolKart ";
  this.version = "version 0.1";
  this.utilCreateNode = function (element, textContent) {
    var texNode = document.createTextNode(textContent);

    if (element.firstChild) {
      element.replaceChild(texNode, element.firstChild);
    } else {
      element.appendChild(texNode);
    }

  };
  /**
   *@metod init
   * initialise application
   *
   */
  this.init = function () {
    this.listCollectionManager = new CollectionManagerClass(ListDivId, totalValueId, this);

    this.listItemsGroupManager = new ListItemsGroupManagerClass(SelectableItemsId, list, this.listCollectionManager, this);
    this.listItemsGroupManager.createConstructor();
    //alert( "runing" );
  };

}
//---------------------------------------------
window.onload = function () {
  'use strict';
  var appMain = new ApplicationClass('mainList', 'priceTotal', 'selectList');
  appMain.init();


  //---
};
