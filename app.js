// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
   var DOMstring  = {
     inputType:".add__type",
     inputDescription:".add__description",
     inputValue:".add__value",
     addBtn:".add__btn",
     incomeList :".income__list",
     expersesList:".expenses__list",
     tusuvLabel:".budget__value",
     incomeLabel:".budget__income--value",
     expeseLabel:".budget__expenses--value",
     percentageLabel: ".budget__expenses--percentage",
     containerDiv : ".container",
     expensePercentageLabel: ".item__percentage",
     dateLabel: ".budget__title--month"
};
var nodListForeach = function(list, callback){
   for (var i= 0 ; i<list.length ; i++){
  
      callback(list[i], i);
   }
};
var formatMoney = function(too, type){
    too = ' ' + too;
    var x = too.split("")
                .reverse()
                .join("");
    var y = '';
    var count = 1;
for ( var i= 0; i<x.length; i++)
 { 
     y = y + x[i];
     if(count%3===0) y = y +',';
     count++; 
}
   var z =y.split("").reverse().join("");
   if(z[0]===',') z = z.substr(1, z.length -1);
    if (type === 'inc') z = ' +' + z; 
    else z = '-' + z;
     return z ;
  }; 

return{
   displayDate:function(){
      var unuudur =new Date(); 
   document.querySelector(DOMstring.dateLabel).textContent = unuudur.getUTCFullYear() + " оны " + unuudur.getMonth() + " сарын";
   },
   
    changeType :function (){
       var freild = document.querySelectorAll(DOMstring.inputType + ', ' + DOMstring.inputDescription  + ' ,' + DOMstring.inputValue);
      nodListForeach(freild, function(el){
         el.classList.toggle('red-focus')
      })
     document.querySelector(DOMstring.addBtn).classList.toggle('red');  
    },
     getInput:function(){
        return{
          type:document.querySelector(DOMstring.inputType).value,
          description:document.querySelector(DOMstring.inputDescription).value,
          value: parseInt(document.querySelector( DOMstring.inputValue).value),
        };
     },
   
    displayPercentages:function(allPercentages){
       
      // Зарлагын NodeList elementniig олно
      var elements = document.querySelectorAll(DOMstring.expensePercentageLabel)
      
      // Элэмент болгоны хувьд зарлагын хувийг массиваас авч шивж оруулах;
      nodListForeach(elements, function(el,index){
        el.textContent = allPercentages[index];

      });
    }, 
     getDOMstring:function() {
       return DOMstring;
     },
     clearFeilds:function (){
       var feilds = document.querySelectorAll(DOMstring.inputDescription + "," + DOMstring.inputValue);
       var feildsArr = Array.prototype.slice.call(feilds);
       for (var i = 0 ;i<feildsArr.length; i++) {
           feildsArr[i].value = '';

        }
        feildsArr[0].focus();
      },
            tusviigUzuuleh:function (tusuv){
              var type;
              if(tusuv.tusuv > 0) type = 'inc';
              else type = 'exp'; 

          document.querySelector(DOMstring.tusuvLabel).textContent = formatMoney (tusuv.tusuv , type);
          document.querySelector(DOMstring.incomeLabel).textContent = formatMoney(tusuv.toalInc, 'inc');
          document.querySelector(DOMstring.expeseLabel).textContent = formatMoney( tusuv.totalExp,'exp');
          if ( tusuv.huvi !== 0){
            document.querySelector(DOMstring.percentageLabel).textContent=tusuv.huvi + "%";     
           }
        else {
          document.querySelector(DOMstring.percentageLabel).textContent=tusuv.huvi
           }
       },
 
 deleteListItem:function(id){
   var el =document.getElementById(id);
   el.parentNode.removeChild(el)

 } ,     


addListItem: function(item,type){
        // Орлого зарлагын элемэнтийг агуулсан html -ийг бэлтгэнэ
         var html , list;
         if (type === 'inc'){
           list = DOMstring.incomeList;
            html= '<div class="item clearfix" id="inc-%id%"> <div class="item__description">$$DESCRIPTON$$</div> <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div> </div>';
         }
         else { 
             list = DOMstring.expersesList;
             html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">$$DESCRIPTON$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div> <div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div> </div>';
         }
          
        // Тэр HTML дотроо орлого зарлагын утгуудыг Replace 
        html = html.replace('%id%',item.id);
        html = html.replace('$$DESCRIPTON$$',item.description);
        html = html.replace('$$VALUE$$', formatMoney( item.value, type));    
      
      // Бэлтгэсэн HTML DOM руу хийж өгнө  
       document.querySelector(list).insertAdjacentHTML("beforeend" ,html);
      }  
     
  };
})() ;

// Санхүүтэй ажиллах контроллер 

var finaceController = (function(){
  // private 
var Income = function ( id ,description , value){
  this.id = id ;
  this.description = description;
  this.value = value;
}
// private 
var Expense  = function (id ,description , value){
  this.id = id ; 
  this.description = description;
  this.value = value;
  this.percentage = - 1;
 };

 Expense.prototype.calPercentage = function (totalIncome){
     if(totalIncome >0)
      this.percentage =  Math.round( (this.value/totalIncome)*100);
      else this.percentage = 0;
 };

 Expense.prototype.getPercentage = function(){
    return this.percentage;
   };
var calculateTotal = function( type){
  var sum= 0;
  data.items[type].forEach(function(el) {
  sum=sum+el.value;
});
data.totals[type]=sum; 
}
 // private 
 var data= {
    items :{ 
       inc:[],
       exp:[]
    },
    totals :{
      inc:0,
      exp:0
    },
   tusuv:0,
    huvi:0 
  };
return {
   tusuvtootsooloh:function(){
    // Нийт орлогын нийлбэрийг тооцоолно 
    calculateTotal("inc");
     // Нийт зарлагын нийлбэрийг тооцоолно 
    calculateTotal("exp");
  // Төсвийг шинээр тооцоолох 
    data.tusuv = data.totals.inc - data.totals.exp;
    
   // Орлого зарлагыг хувийг тооцоолно
   if(data.totals.inc>0)
      data.huvi = Math.round ((data.totals.exp/data.totals.inc)*100);
      else data.huvi = 0;
  },
   calculatePercentages:function(){
    data.items.exp.forEach(function (el){
           el.calPercentage(data.totals.inc);
    });
   },
  getPercentages:function() {
   var allPercentages  = data.items.exp.map(function(el){
     return el.getPercentage();
   });
   return allPercentages;
  },
 
   tusviigAvah:function()
   {
      return {
        tusuv:data.tusuv,
        huvi:data.huvi,
        toalInc:data.totals.inc,
        totalExp:data.totals.exp,
      };
  }, 
  deleteItem : function(type, id){
    var ids = data.items[type].map(function(el) {
        return el.id;
    })
     console.log("ids:" + ids )
    var index = ids.indexOf(id);
     console.log("index"  + index);
     if ( index !== -1 ){
        console.log("ustgah gej baina")  
      data.items[type].splice(index , 1)
     }
   },

 addItem: function(type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }
if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
        data.items[type].push(item);
          
         return item ;
    },
 seeData: function() {
      return data;
    }
};
})(); 
// Програм холбогч контроллер
var appController = (function(uiController ,finaceController){
  var crtlAddItem = function (){
    var input = uiController.getInput()
    if (input.description !== "" &&  input.value!== "") {
       //1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
       if (input.description !==""){  
          if(input.value!==" ")  {
          var item = finaceController.addItem(
            input.type ,
            input.description,
            input.value
           ); 
           //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулах
          //3. Олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт нь гаргана
          uiController.addListItem(item ,input.type);
          uiController.clearFeilds();
           
          //Төсвийг шинээр тооцоолоод дэлгэцэнд үзүүлэх
          updateTusuv();
          }
      } 
    }
  };

  var updateTusuv = function(){
        //4.Төсвийг тооцооно
       finaceController.tusuvtootsooloh();
       
       //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
       var tusuv = finaceController.tusviigAvah();
       
       // 6 Төсвийг тооцоолон дэлгэцэнд гарганэ 
       uiController.tusviigUzuuleh(tusuv);
       
       // 7. Элементүүдийн хувийг тооцоолно 
       finaceController.calculatePercentages() ;
       // 8. Элементүүдийн хувийг хүлээж авна 
       var allPercentages = finaceController.getPercentages();
      // 9. Элементүүдийн хувийг хүлээж авна 
      uiController.displayPercentages(allPercentages);
  };
  var setupEventListeners = function(){
   var DOM =uiController.getDOMstring();

  document.querySelector(DOM.addBtn).addEventListener("click", function(){
  crtlAddItem();
  });

    document.addEventListener("keypress",function(event){
    if (event.keyCode === 13 || event.which===13) { 
    crtlAddItem();
    }
  });
  document.querySelector(DOM.inputType).addEventListener('change', uiController.changeType);
  document.querySelector(DOM.containerDiv).addEventListener('click',function(event){
        var id= event.target.parentNode.parentNode.parentNode.parentNode.id;
         if(id){
          var arr =  id.split("-");
          var type = arr[0];
          var itemId =parseInt (arr[1]);
          console.log(type + "===>" +itemId); 
         
          // 1 Санхүүгийн модулиас type ,id ашиглаад устгана 
         finaceController.deleteItem(type ,itemId)
         
         //2 дэлгэцэн дээрээс энэ элементийг устгана
         uiController.deleteListItem(id)
         
         // 3 Үлдэгдэл тоог шинэчилж харуулна
         // 4 Төсвийг шинээр тооцоолж дэлгэцэнд харуулна 
          updateTusuv();
        }
      });
};
return { 
   init:function(){ 
      console.log("Aplication stared ...");
      uiController.displayDate();
       uiController.tusviigUzuuleh({
        tusuv:0,
        huvi: 0,
        toalInc: 0,
        totalExp:0,
       })
      setupEventListeners();
   }
};
})(uiController,finaceController);
appController.init();