/*-----------------------------------------------------------------------------
定数
-----------------------------------------------------------------------------*/
var CvsMinWidth = 600;					//canvas最小幅
var CvsMinHeight = 600;					//canvas最小高さ
var OffsetScaleReelAreaX = 0.225;		//リール描画X位置オフセット
var OffsetScaleReelAreaY = 0.495;		//リール描画X位置オフセット
var OffsetScaleReelAreaHeight = 0.24;	//リール描画幅オフセット

var TexSymbolHeight = 683 / 24;			//リール画像図柄高さ
var TexReelWidth = 205;					//リール画像幅

/*-----------------------------------------------------------------------------
変数
-----------------------------------------------------------------------------*/
var cvs;		//canvasオブジェクト
var ctx;		//contextオブジェクト
var slotArea;	//スロットを描画する範囲の座標
var reelArea;	//リール描画範囲

/*-----------------------------------------------------------------------------
描画範囲オブジェクト
-----------------------------------------------------------------------------*/
function DrawArea(){
	this.x = 0;			//X位置
	this.y = 0;			//Y位置
	this.width = 0;		//幅
	this.height = 0;	//高さ
}

/*-----------------------------------------------------------------------------
描画初期化
-----------------------------------------------------------------------------*/
function initDrawer(){
	//描画範囲オブジェクトの初期化
	slotArea = new DrawArea();
	reelArea = new DrawArea();
	reelArea.eachArea = [];			//各リール描画位置
	for(var i = 0; i < 3; i++){
		reelArea.eachArea[i] = new DrawArea();
	}

	//canvasの取得
	cvs = document.getElementById("cv");

	//context取得
	ctx = cvs.getContext("2d");

	//canvasサイズ設定
	resizeCanvas();

	//ウインドウリサイズ時にcanvasもリサイズ
	window.onresize = resizeCanvas;
}

/*-----------------------------------------------------------------------------
スロット描画範囲のリサイズ
-----------------------------------------------------------------------------*/
function resizeSlot(){

	//canvasのサイズから筐体描画範囲を更新
	if(cvs.width < cvs.height){
		slotArea.width = cvs.width;
		slotArea.height = cvs.width;
		slotArea.y = (cvs.height - slotArea.height) / 2;
		slotArea.x = 0;
	}
	else{
		slotArea.width = cvs.height;
		slotArea.height = cvs.height;
		slotArea.x = (cvs.width - slotArea.width) / 2;
		slotArea.y = 0;
	}

	//筐体描画範囲からリール描画範囲を更新
	reelArea.x = slotArea.x + slotArea.width * OffsetScaleReelAreaX;
	reelArea.width = slotArea.width * (1 - OffsetScaleReelAreaX * 2);
	reelArea.y = slotArea.y + slotArea.height * OffsetScaleReelAreaY;
	reelArea.height = slotArea.height * OffsetScaleReelAreaHeight;

	//リール描画範囲から各リール描画範囲を更新
	for(var i = 0; i < 3; i++){
		reelArea.eachArea[i].x = reelArea.x + (reelArea.width / 3 * i);
		reelArea.eachArea[i].y = reelArea.y;
		reelArea.eachArea[i].width = reelArea.width / 3;
		reelArea.eachArea[i].height = reelArea.height;
	}
}

/*-----------------------------------------------------------------------------
canvasのリサイズ
windowと同サイズに変更するが、下限サイズあり。
-----------------------------------------------------------------------------*/
function resizeCanvas(){
	var windowWidth;	//ウインドウ幅
	var windowHeight;	//ウインドウ高さ

	//ウインドウサイズ取得
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	//小さくなり過ぎないように
	if (windowWidth < CvsMinWidth){
		windowWidth = CvsMinWidth;
	}
	if (windowHeight < CvsMinHeight){
		windowHeight = CvsMinHeight;
	}

	//canvasのサイズ指定
	cvs.setAttribute("width", windowWidth);
	cvs.setAttribute("height", windowHeight);

	//スロット描画範囲のリサイズ
	resizeSlot();
}

/*-----------------------------------------------------------------------------
描画処理
-----------------------------------------------------------------------------*/
function Draw(){

	//canvasのクリア
	ctx.clearRect(0, 0, cvs.width, cvs.height);

//背景
ctx.fillStyle = "black";
ctx.fillRect(0, 0, cvs.width, cvs.height);

	//筐体画像描画
	ctx.drawImage(texEnc, slotArea.x, slotArea.y, slotArea.width, slotArea.height);


	//リール描画
//	ctx.fillStyle = "black";
//	ctx.fillRect(reelArea.x, reelArea.y, reelArea.width, reelArea.height);

	for(var i = 0; i < 3; i++){
		ctx.drawImage(texReel,
			0 + (TexReelWidth / 3 * i), 0, TexReelWidth / 3, TexSymbolHeight * 3,
			reelArea.eachArea[i].x, reelArea.eachArea[i].y, reelArea.eachArea[i].width, reelArea.eachArea[i].height);
	}

}