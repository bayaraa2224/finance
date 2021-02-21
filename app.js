// Дэлгэцтэй ажиллах контроллер
var uiController = (function(){
})() ;

// Санхүүтэй ажиллах контроллер 
var finaceController = (function(){

})(); 

// Програм холбогч контроллер
var appController = (function(uiController ,finaceController){

   var crtlAddItem = function (){
   //1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
  console.log("Дэлгэцнээс өгөгдлөө авах хэсэг");
  //2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулах
  //3. Олж авсан өгөгдлүүдээ вэб дээр тохирох хэсэгт нь гаргана
  //4.Төсвийг тооцооно
  //5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана

    
  }
document.querySelector(".add__btn").addEventListener("click", function(){
    crtlAddItem();
  });
document.addEventListener("keypress",function(event){
 if (event.keyCode === 13 || event.which===13) { 
  crtlAddItem();
  }
 });
})(uiController,finaceController);