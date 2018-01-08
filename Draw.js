/*-----------------------------------------------------------------------------
�萔
-----------------------------------------------------------------------------*/
var CvsMinWidth = 600;					//canvas�ŏ���
var CvsMinHeight = 600;					//canvas�ŏ�����
var OffsetScaleReelAreaX = 0.225;		//���[���`��X�ʒu�I�t�Z�b�g
var OffsetScaleReelAreaY = 0.495;		//���[���`��X�ʒu�I�t�Z�b�g
var OffsetScaleReelAreaHeight = 0.24;	//���[���`�敝�I�t�Z�b�g

var TexSymbolHeight = 683 / 24;			//���[���摜�}������
var TexReelWidth = 205;					//���[���摜��

/*-----------------------------------------------------------------------------
�ϐ�
-----------------------------------------------------------------------------*/
var cvs;		//canvas�I�u�W�F�N�g
var ctx;		//context�I�u�W�F�N�g
var slotArea;	//�X���b�g��`�悷��͈͂̍��W
var reelArea;	//���[���`��͈�

/*-----------------------------------------------------------------------------
�`��͈̓I�u�W�F�N�g
-----------------------------------------------------------------------------*/
function DrawArea(){
	this.x = 0;			//X�ʒu
	this.y = 0;			//Y�ʒu
	this.width = 0;		//��
	this.height = 0;	//����
}

/*-----------------------------------------------------------------------------
�`�揉����
-----------------------------------------------------------------------------*/
function initDrawer(){
	//�`��͈̓I�u�W�F�N�g�̏�����
	slotArea = new DrawArea();
	reelArea = new DrawArea();
	reelArea.eachArea = [];			//�e���[���`��ʒu
	for(var i = 0; i < 3; i++){
		reelArea.eachArea[i] = new DrawArea();
	}

	//canvas�̎擾
	cvs = document.getElementById("cv");

	//context�擾
	ctx = cvs.getContext("2d");

	//canvas�T�C�Y�ݒ�
	resizeCanvas();

	//�E�C���h�E���T�C�Y����canvas�����T�C�Y
	window.onresize = resizeCanvas;
}

/*-----------------------------------------------------------------------------
�X���b�g�`��͈͂̃��T�C�Y
-----------------------------------------------------------------------------*/
function resizeSlot(){

	//canvas�̃T�C�Y����➑̕`��͈͂��X�V
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

	//➑̕`��͈͂��烊�[���`��͈͂��X�V
	reelArea.x = slotArea.x + slotArea.width * OffsetScaleReelAreaX;
	reelArea.width = slotArea.width * (1 - OffsetScaleReelAreaX * 2);
	reelArea.y = slotArea.y + slotArea.height * OffsetScaleReelAreaY;
	reelArea.height = slotArea.height * OffsetScaleReelAreaHeight;

	//���[���`��͈͂���e���[���`��͈͂��X�V
	for(var i = 0; i < 3; i++){
		reelArea.eachArea[i].x = reelArea.x + (reelArea.width / 3 * i);
		reelArea.eachArea[i].y = reelArea.y;
		reelArea.eachArea[i].width = reelArea.width / 3;
		reelArea.eachArea[i].height = reelArea.height;
	}
}

/*-----------------------------------------------------------------------------
canvas�̃��T�C�Y
window�Ɠ��T�C�Y�ɕύX���邪�A�����T�C�Y����B
-----------------------------------------------------------------------------*/
function resizeCanvas(){
	var windowWidth;	//�E�C���h�E��
	var windowHeight;	//�E�C���h�E����

	//�E�C���h�E�T�C�Y�擾
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	//�������Ȃ�߂��Ȃ��悤��
	if (windowWidth < CvsMinWidth){
		windowWidth = CvsMinWidth;
	}
	if (windowHeight < CvsMinHeight){
		windowHeight = CvsMinHeight;
	}

	//canvas�̃T�C�Y�w��
	cvs.setAttribute("width", windowWidth);
	cvs.setAttribute("height", windowHeight);

	//�X���b�g�`��͈͂̃��T�C�Y
	resizeSlot();
}

/*-----------------------------------------------------------------------------
�`�揈��
-----------------------------------------------------------------------------*/
function Draw(){

	//canvas�̃N���A
	ctx.clearRect(0, 0, cvs.width, cvs.height);

//�w�i
ctx.fillStyle = "black";
ctx.fillRect(0, 0, cvs.width, cvs.height);

	//➑̉摜�`��
	ctx.drawImage(texEnc, slotArea.x, slotArea.y, slotArea.width, slotArea.height);


	//���[���`��
//	ctx.fillStyle = "black";
//	ctx.fillRect(reelArea.x, reelArea.y, reelArea.width, reelArea.height);

	for(var i = 0; i < 3; i++){
		ctx.drawImage(texReel,
			0 + (TexReelWidth / 3 * i), 0, TexReelWidth / 3, TexSymbolHeight * 3,
			reelArea.eachArea[i].x, reelArea.eachArea[i].y, reelArea.eachArea[i].width, reelArea.eachArea[i].height);
	}

}