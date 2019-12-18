(function() {
	var that; //记录游戏对象
	

	function Game() {
		this.box = new Box();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}

	Game.prototype.start = function() {
		//1、把蛇和食物对象，渲染到地图上
		this.box.render(this.map);
		this.snake.render(this.map);

		//2、开始游戏的逻辑
		//2.1 让蛇移动起来
		//2.2 当蛇遇到边界游戏结束
		runSnake();
		//2.3通过键盘控制蛇移动的方向
		bindkey();
		//2.4 当蛇遇到食物 做相应的处理
		//2.5 当蛇遇到边界游戏结束

	}
	//通过键盘控制蛇移动的方向
	function bindkey() {
		document.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
			//37-left
			//38-top
			//39-right
			//40-bottom
			//32-空格
			switch(e.keyCode) {
				case 37:
					that.snake.direction = 'left';
					break;
				case 38:
					that.snake.direction = 'top';
					break;
				case 39:
					that.snake.direction = 'right';
					break;
				case 40:
					that.snake.direction = 'bottom';
					break;
					//				case 32:
					//				    clearInterval(timeId);
					//				    break;
			}
		}, false);
	}
	var flag = 1;
	//私有函数
	function runSnake() {
		var timeId = setInterval(function run() {
				//让蛇走一格
				//在定时器的function中this 指向window对象
				//this.snake;
				//要获取游戏对象中蛇的属性
				that.snake.move(that.box, that.map);
				that.snake.render(that.map);

				//2.2 当蛇遇到边界游戏结束
				//获取蛇头坐标
				var maxX = that.map.offsetWidth / that.snake.width;
				var maxY = that.map.offsetHeight / that.snake.height;

				var headX = that.snake.body[0].x;
				var headY = that.snake.body[0].y;

				if(headX < 0 || headX >= maxX) {
					alert("Game over!!");
					clearInterval(timeId);
				}
				if(headY < 0 || headY >= maxY) {
					alert("Game over!!");
					clearInterval(timeId);
				}

			}, 150);
			
		//暂停开始按钮
		var stop = document.getElementById('pause');
		var refresh = document.getElementById('refresh');
		var start = document.getElementById('start');
		
		
		if(flag == 1){
				
			start.disabled = true;    //禁用开始按钮
			stop.onclick = function() {
				clearInterval(timeId);	//点击暂停按钮，暂停
				stop.disabled = true;	//暂停按钮被禁用
				start.disabled = "";	//开始按钮恢复使用
				flag = 0;
//				console.log(flag);
			}
			
		}else if(flag == 0){
			stop.disabled = true;
			start.disabled = "";  //开始按钮可以使用
		}
		start.onclick = function(){
				timeId = setInterval(function run() {
				//让蛇走一格
				//在定时器的function中this 指向window对象
				//this.snake;
				//要获取游戏对象中蛇的属性
				that.snake.move(that.box, that.map);
				that.snake.render(that.map);

				//2.2 当蛇遇到边界游戏结束
				//获取蛇头坐标
				var maxX = that.map.offsetWidth / that.snake.width;
				var maxY = that.map.offsetHeight / that.snake.height;

				var headX = that.snake.body[0].x;
				var headY = that.snake.body[0].y;

				if(headX < 0 || headX >= maxX) {
					alert("Game over!!");
					clearInterval(timeId);
				}
				if(headY < 0 || headY >= maxY) {
					alert("Game over!!");
					clearInterval(timeId);
				}

			},150);
						start.disabled = true;
						stop.disabled = false;
						flag = 1;
//						console.log(flag);
					}
		

		

		//		var timeId = setInterval(function(){
		//			//让蛇走一格
		//			//在定时器的function中this 指向window对象
		//			//this.snake;
		//			//要获取游戏对象中蛇的属性
		//			that.snake.move(that.box, that.map);
		//			that.snake.render(that.map);
		//			
		//			//2.2 当蛇遇到边界游戏结束
		//			//获取蛇头坐标
		//			var maxX = that.map.offsetWidth / that.snake.width;
		//			var maxY = that.map.offsetHeight / that.snake.height;
		//			
		//			var headX = that.snake.body[0].x;
		//			var headY = that.snake.body[0].y;
		//			
		//			if(headX < 0 || headX >= maxX){
		//				alert("Game over!!");
		//				clearInterval(timeId);
		//			}
		//			if(headY < 0 || headY >= maxY){
		//				alert("Game over!!");
		//				clearInterval(timeId);
		//			}
		//			
		//		},150);

		refresh.onclick = function() {
			window.location.reload();
		};

	}

	window.Game = Game;
})();