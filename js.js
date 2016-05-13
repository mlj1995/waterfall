window.onload=function(){
	waterfall('main','box');
	var dataInt={'data':[{'src':'0 (22).jpg'},{'src':'0 (23).jpg'},{'src':'0 (24).jpg'},{'src':'0 (25).jpg'}]};
	 window.onscroll=function(){
        if(checkscrollside()){
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement('div'); //添加 元素节点
                oBox.className='box';                   //添加 类名 name属性
                oParent.appendChild(oBox);              //添加 子节点
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src='./image/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        };
    }
}
function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面的列数 页面宽度/单个宽度
	var oBoxW=oBoxs[0].offsetWidth;// console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	oParent.style.cssText='width:'+cols*oBoxW+'px;margin:0 auto;';
	var hArr=[];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {
			hArr.push(oBoxs[i].offsetHeight);//存放高度
		}
		else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
		}
		 // console.log(index);
	
}
//获得所有box的class

function getByClass(parent,clsName){
	var obj=parent.getElementsByTagName('*');
	var Arr=[];
	for(var i=0;i<obj.length;i++){
		if (obj[i].className==clsName) {
			 Arr.push(obj[i]);
		}
	}
	return Arr;
}

function getMinhIndex(arr,val){
	for(var i in arr){
		if (arr[i]==val) {
			return i;
		}
	}
}

function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getByClass(oParent,'box');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}