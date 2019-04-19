function createVCode(stringDataCode){
   var codeString = '0,1,2,3,4,5,6,7,8,9';
   codeString += 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
   codeString += 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
   var codeArr = codeString.split(',');
   var codeData = [];
   var codeLength = 0;
   while (codeLength < 4){
    codeLength = Math.ceil(Math.random()*5);
   }
   for (let i = 0;i<codeLength;i++) {
    codeData.push(codeArr[randomNum(0,59)]);
   }
   stringDataCode = codeData.join("");
   return codeData;
}
function randomNum(min,max){
  return Math.floor(Math.random()*(max-min)+min);
}
function randomColor(min,max){
  var r= randomNum(min,max);
  var g= randomNum(min,max);
  var b= randomNum(min,max);
  return 'rgb('+r+','+g+','+b+')';
}
function renderCode(codeData){
  var canvas = document.getElementById("canvas");
  var width = canvas.width;
  var height = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = randomColor(180,240);
  ctx.fillRect(0,0,width,height);
  ctx.textBaseline = 'bottom';
  for (let i=0;i<codeData.length;i++) {
    ctx.fillStyle = randomColor(30,100);
    ctx.font = 'bold '+randomNum(44,72)	+ 'px Arail';
    var x = 20 +i * 55;
    var y = randomNum(80,100);
    var deg = randomNum(-20,20);
    ctx.translate(x,y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.fillText(codeData[i],0,0);
    ctx.rotate(-deg*Math.PI/180);
    ctx.translate(-x,-y);
  }
  for (let j =0;j<5;j++) {
    ctx.strokeStyle = randomColor(40,80);
    ctx.beginPath();
    ctx.moveTo(randomNum(0,width),randomNum(0,height));
    ctx.lineTo(randomNum(0,width),randomNum(0,height));
    ctx.stroke();
  }
  for (let k=0;k<100;k++) {
    ctx.fillStyle = randomColor(0.255);
    ctx.beginPath();
    ctx.arc(randomNum(0,width),randomNum(0,height),1,0,2*Math.PI);
    ctx.fill();
  }
}
