/**
 * highcharts图处理工具类型
 */
var $hcUtils$= {
	/**
	 * 通过轴上的最大值与最小值计算轴的刻度值列表 <br />
	 * @param axis_ highcharts 的轴对象 <br />
	 * @param tickSize_ 指定刻度的值个数，如果不指定则默认为 highcharts 图形.该轴上的值个数。 <br />
	 * @returns {Array} 返回刻度值数组列表对象 <br />
	 */
	tickPositioner:function(axis_, tickSize_){
		var _positions= [];
		jQuery.each(axis_.series, function(index_, serie_){
			if(serie_.stackKey === 'column'){
				_positions= _positions.concat(serie_.stackedYData.slice(0))
			}else{
				_positions= _positions.concat(serie_.yData.slice(0));
			}
		});
		tickSize_= ((tickSize_ || tickSize_ === 0) ? tickSize_ : _positions.length) - 1;// 减去结束的刻度,将最大值设置为结束刻度值
		_positions.sort(function(a, b){
			return a - b;
		});
		// console.info(_positions);// TODO: 测试

		var _dataMax= Math.ceil(_positions[_positions.length - 1]);
		var _dataMin= Math.floor(_positions[0]);

		if(tickSize_ <= 0 || _positions.length <= 2){// 至少有两个刻度，起始值与结束值
			return [_dataMin, _dataMax];
		}

		var _interval= Math.ceil((_dataMax - _dataMin) / tickSize_);
		axis_.tickInterval= _interval;
		axis_.dataMin= _dataMin;
		axis_.dataMax= _dataMax;
		// console.info(_interval);// TODO: 测试

		_positions= [];
		var _tick= axis_.dataMin;
		for(_tick;_tick < axis_.dataMax;_tick+= _interval){
			_positions.push(_tick);
		}
		_positions.push(axis_.dataMax);

		// console.warn(_positions);// TODO: 测试
		return _positions;
	},
	/**
	 * 将16进制色值改为rgba值
	 * @param hexColor_ 16进制色值
	 * @param alpha_ 透明度 0－1 之间值，没指定时默认为1
	 * @returns 返回rgba(x,x,x,x)字符串
	 */
	color16ToRgba:function(hexColor_, alpha_){
		var hexRegEx= /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/;
		var result= hexRegEx.exec(hexColor_);
		var rgba= [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), alpha_];
		return 'rgba(' + rgba.join() + ')';
	}
};