 //自调用函数--开启一个新的作用域,避免命名冲突
(function() {
	//局部作用域
	var position = 'absolute';
	 
	//记录上一次创建的方块，为删除做准备
	var elements = [];

	function Box(options) {
		options = options || {};
		//设置对象属性
		this.backgroundColor = options.backgroundColor || 'white';
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.x = options.x || 0;
		this.y = options.y || 0;

	}

	//渲染
	//初始化div方块的样式
	Box.prototype.render = function(map) {

		remove();

		//随机设置x,y值
		this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

		//创建对应的div
		var div = document.createElement('div');
		map.appendChild(div);

		elements.push(div);

		div.style.backgroundColor = this.backgroundColor;
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.left = this.x + 'px'
		div.style.top = this.y + 'px';

		div.style.position = position;
	}

	function remove() {
		for(var i = elements.length - 1; i >=0; i--) {
			//删除div
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中的元素
			elements.splice(i, 1);
		}
	}
	
	//暴露构造函数给外部
	window.Box = Box;;

})()

//
////测试
//var map = document.getElementById('map');
//var box1 = new Box();
//box1.render(map);


