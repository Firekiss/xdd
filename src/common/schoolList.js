/* domObj, schoolList, url, number,callBack*/
export default {
	
get:function(options){
var schoolListDomTree = function(options) {
	console.log(options.domObj)
	console.log(this)
	this.domObj = options.domObj;
	this.schoolList = options.schoolList;

	this.number = options.number ? options.number : 10; //初始化驾校详情的个数
	this.index = 0; //记录当前列表的索引
	this.callBack = options.callBack;
	this.init();
}

schoolListDomTree.prototype.init = function() {
	var schoolListLength = this.schoolList.length;
	var listDomStr = '';
	for(var i = this.index; i < this.index + this.number; i++) {
		if(!this.schoolList[i]) {
			break;
		}
		var schPosN = this.schoolList[i].schPosN; // 驾校地标地标需要根据经纬度计算排序
		var schReview = this.schoolList[i].grade; // 驾校评分
		var schoolN = this.schoolList[i].name; // 驾校名称
		var img = this.schoolList[i].imgUrl != "" ? this.schoolList[i].imgUrl : "../common/image/pic_default1.png"; // 驾校图片
		var students = this.schoolList[i].studentAmount; // 学员人数
		var teachers = this.schoolList[i].coachAmount; // 教练人数
		var cars = this.schoolList[i].vehicleAmount; // 教练车数
		var address = this.schoolList[i].address; // 驾校地址
		var price = this.schoolList[i].avgPrice; // 学费
		var schDistance = this.schoolList[i].schDistance; // 驾校距离 需要根据经纬度计算排序
		var schoolNLen = schoolN.length; //驾校名称的长度
		var addressLen = address.length; //驾校地址的长度
		var wWidth = window.screen.width; //屏幕宽度
		var pixelRatio = window.devicePixelRatio; //屏幕像素比
		var wHeight = window.screen.height; //屏幕高度
		//判断手机屏幕大小 对文字进行省略号处理
		//iphone4
		/*if(wWidth==320&&wHeight==480&&pixelRatio==2){
    	   if(schoolNLen<6){
	       		schoolN=schoolN;
	       	}else{
	       		schoolN=schoolN.substring(0,6)+'...'
	       	}
    	    if(addressLen<6){
    	    	address=address;
    	    }else{
    	    	address=address.substring(0,6)+'...'
	       	}
       }
        //iphone5
        if(wWidth==320&&wHeight==568&&pixelRatio==2){
        	if(schoolNLen<8){
        		schoolN=schoolN;
        	}else{
        		schoolN=schoolN.substring(0,7)+'...'
        	}
        	if(addressLen<8){
    	    	address=address;
    	    }else{
    	    	address=address.substring(0,7)+'...'
	       	}
        }*/
		//小屏
		if(wWidth >= 320 && wWidth < 340) {
			if(schoolNLen < 7) {
				schoolN = schoolN;
			} else {
				schoolN = schoolN.substring(0, 7) + '...'
			}
			if(addressLen < 10) {
				address = address;
			} else {
				address = address.substring(0, 10) + '...'
			}
		}
		//大屏
		if(wWidth > 340 && wWidth < 730) {
			if(schoolNLen < 7) {
				schoolN = schoolN;
			} else {
				schoolN = schoolN.substring(0, 7) + '...'
			}
			if(addressLen < 10) {
				address = address;
			} else {
				address = address.substring(0, 10) + '...'
			}
		}

		listDomStr += '<div class="schoolList" data-id="' + this.schoolList[i].id + '"><div class="schoolDes row"><div style="width:80%;"><div class="schNaP">';

		if(schPosN !== undefined) {
			listDomStr += '<div class="di schPosition pr"><img src="../common/image/icon_locationb.png" alt="位置" /><span class="schPosN pa">' + schPosN + '</span></div>';
		}

		listDomStr += ('<div class="di schN" style="margin-left:0;">' +
			schoolN +
			'</div><div class="di schEvaluate">');

		var startDomStr = _caculateStar(schReview);
		listDomStr += startDomStr;
		listDomStr += ('</div><div class="schReview">' +
			schReview +
			'分</div></div><div class="row clearfix schDetail mp0"><div class="di"><img onerror="javascript:this.src=\'../common/image/pic_default1.png\'" src="' +
			img +
			'" /></div><div class="di schHDes" >学员人数：' +
			students +
			'<br />教练人数：' +
			teachers +
			'<br />教练车数：' +
			cars +
			'<br />地址：' +
			address +
			'</div></div></div><div class="pr" style="width:20%;"><div class="tuition pa"><span class="db">¥&nbsp;' +
			price +
			'</span></div><div class="schDistance pa">' +
			schDistance + '&nbsp;km</div></div></div></div>');
	}

	var str = '<ion-content scrollbar-y="false" ng-show="true" class="learnRecord"><ion-refresher pulling-text="下拉刷新..." on-refresh="doRefresh()"></ion-refresher>' +
		listDomStr + '<ion-infinite-scroll on-infinite="loadMore()" distance="1%" ng-if="!data_end"></ion-infinite-scroll></ion-content>';

	this.index = this.number + this.index;
	this.domObj.append(listDomStr);

	var self = this;
	this.domObj.off('click', '.schoolList');
	this.domObj.on('click', '.schoolList', function() {
		var id = $(this).attr('data-id');
		if(self.callBack) {
			self.callBack(id);
		}
	})
};

schoolListDomTree.prototype.resetList = function(schoolList) {
	this.index = 0;
	this.domObj.empty();
	this.schoolList = schoolList;
	this.init();
};

schoolListDomTree.prototype.showMore = function(number) {
	this.number = number ? number : this.number;
	this.init();
};
schoolListDomTree.prototype.doRefresh = function(schoolList) {
	//this.number = number ? number : this.number;
	this.index = 0;
	this.domObj.empty();
	this.schoolList = schoolList;
	this.init();
}

/**
 * 选择排序方式
 * @param schoolList 驾校列表
 * @param type 0智能暂时按距离来排 距离1 评分2 学员人数3 价格4
 */
schoolListDomTree.prototype.sortByType = function(schoolList, type) {
	this.index = 0;
	this.domObj.empty();
	if(type == 0) {
		schoolList.sort(sortByDistance)
	} else if(type == 1) {
		schoolList.sort(sortByDistance);
	} else if(type == 2) {
		schoolList.sort(sortByGrade);
	} else if(type == 3) {
		schoolList.sort(sortByStudentAmount);
	} else if(type == 4) {
		schoolList.sort(sortByAvgPrice);
	}

	//将description=1的驾校置后排序
	//  schoolList.sort(sortByDescription);
	this.schoolList = schoolList;
	this.init();
};

function _caculateStar(schReview) {
	// 星星展示处理
	// 清空星星区域的代码
	//$('.schEvaluate').empty();
	var startDomStr = '';
	// 整数星星
	var star10 = parseInt(schReview);

	// 添加整数星星
	for(var j = 0; j < star10; j++) {
		startDomStr += '<img src="../common/image/star10.png" />';
	}

	// alert('整数星星'+$('.schEvaluate').html())
	// 小数星星
	var starFloat = (schReview - star10).toFixed(1) * 10;

	// 添加小数星星
	switch(starFloat) {
		case 0:
			var starFloatAppend = '';
			break;
		case 1:
			var starFloatAppend = '<img src="../common/image/star1.png" />';
			break;
		case 2:
			var starFloatAppend = '<img src="../common/image/star2.png" />';
			break;
		case 3:
			var starFloatAppend = '<img src="../common/image/star3.png" />';
			break;
		case 4:
			var starFloatAppend = '<img src="../common/image/star4.png" />';
			break;
		case 5:
			var starFloatAppend = '<img src="../common/image/star5.png" />';
			break;
		case 6:
			var starFloatAppend = '<img src="../common/image/star6.png" />';
			break;
		case 7:
			var starFloatAppend = '<img src="../common/image/star7.png" />';
			break;
		case 8:
			var starFloatAppend = '<img src="../common/image/star8.png" />';
			break;
		case 9:
			var starFloatAppend = '<img src="../common/image/star9.png" />';
			break;
		default:
			var starFloatAppend = '<img src="../common/image/star10.png" />';
			break;
	}

	startDomStr += starFloatAppend;
	// $('.schEvaluate').eq(i).append(starFloatAppend);

	// alert('小数星星'+$('.schEvaluate').html())

	// 灰色星星
	var star0 = parseInt(5 - schReview),
		star0Img = '<img src="../common/image/star0.png" />';
	// 添加灰色星星
	if(star0 == '5') {
		startDomStr = '<img src="../common/image/star0.png" /><img src="../common/image/star0.png" /><img src="../common/image/star0.png" /><img src="../common/image/star0.png" /><img src="../common/image/star0.png" />';
	} else if(0 < star0 < 5) {
		for(var k = 0; k < star0; k++) {
			startDomStr += '<img src="../common/image/star0.png" />';
			// $('.schEvaluate').eq(i).append(star0Img);
		}
	}

	if(schReview > 5) {
		startDomStr = '<img src="../common/image/star10.png" /><img src="../common/image/star10.png" /><img src="../common/image/star10.png" /><img src="../common/image/star10.png" /><img src="../common/image/star10.png" />';
	}

	return startDomStr;
	// alert('灰色星星'+$('.schEvaluate').html())
}

var sortByAvgPrice = function(a, b) {
	if(a.avgPrice < b.avgPrice) {
		return -1;
	} else if(a.avgPrice == b.avgPrice) {
		if(parseFloat(a.schDistance) < parseFloat(b.schDistance)) {
			return -1;
		} else if(parseFloat(a.schDistance) == parseFloat(b.schDistance)) {
			if(parseFloat(a.grade) > parseFloat(b.grade)) {
				return -1;
			} else if(parseFloat(a.grade) == parseFloat(b.grade)) {
				if(a.studentAmount > b.studentAmount) {
					return -1;
				} else if(a.studentAmount == b.studentAmount) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
};

var sortByStudentAmount = function(a, b) {
	if(a.studentAmount > b.studentAmount) {
		return -1;
	} else if(a.studentAmount == b.studentAmount) {
		if(parseFloat(a.schDistance) < parseFloat(b.schDistance)) {
			return -1;
		} else if(parseFloat(a.schDistance) == parseFloat(b.schDistance)) {
			if(parseFloat(a.grade) > parseFloat(b.grade)) {
				return -1;
			} else if(parseFloat(a.grade) == parseFloat(b.grade)) {
				if(a.avgPrice < b.avgPrice) {
					return -1;
				} else if(a.avgPrice == b.avgPrice) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
};

var sortByGrade = function(a, b) {
	if(a.grade > b.grade) {
		return -1;
	} else if(a.grade == b.grade) {
		if(parseFloat(a.schDistance) < parseFloat(b.schDistance)) {
			return -1;
		} else if(parseFloat(a.schDistance) == parseFloat(b.schDistance)) {
			if(a.studentAmount > b.studentAmount) {
				return -1;
			} else if(a.studentAmount == b.studentAmount) {
				if(a.avgPrice < b.avgPrice) {
					return -1;
				} else if(a.avgPrice == b.avgPrice) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
};

var sortByDistance = function(a, b) {
	if(parseFloat(a.schDistance) < parseFloat(b.schDistance)) {
		return -1;
	} else if(parseFloat(a.schDistance) == parseFloat(b.schDistance)) {
		if(parseFloat(a.grade) > parseFloat(b.grade)) {
			return -1;
		} else if(parseFloat(a.grade) == parseFloat(b.grade)) {
			if(a.studentAmount > b.studentAmount) {
				return -1;
			} else if(a.studentAmount == b.studentAmount) {
				if(a.avgPrice < b.avgPrice) {
					return -1;
				} else if(a.avgPrice == b.avgPrice) {
					return 0;
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
};

//如果description字段等于1置后排序
var sortByDescription = function(a, b) {
	if(a.description == "1" && b.description != "1") {
		return 1;
	} else if(a.description != "1" && b.description == "1") {
		return -1;
	} else {
		return 0;
	}
}
 new schoolListDomTree(options)
}
}