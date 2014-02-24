/**
 * Created with JetBrains WebStorm.
 * User: waynelu
 * Date: 14-2-18
 * Time: 上午9:10
 * To change this template use File | Settings | File Templates.
 */
var Pipe=cc.Sprite.extend({
    up:true,

    ctor:function(arg){
        this._super();
        this.up=arg.up;
        console.log(this.up);
        this.init();
    },
//    setPos:function(x,y){
//
//    },
    init:function(){

        if(this.up){
            this.initWithSpriteFrameName("down.png");
            this.setAnchorPoint(1,0);
           // this.setPosition(winSize.width,winSize.height-200);
        }
        else{
            this.initWithSpriteFrameName("up.png");
            this.setAnchorPoint(1,0);
            //this.setPosition(winSize.width,120);
        }
        this.scheduleUpdate();
    },
    update:function(dt){
      if(MW.STATE==MW.GAME_STATE.PLAY){
          var actionFlay= cc.MoveBy.create(0.2, cc.p(-2, 0));
          this.runAction(actionFlay);
      }

    },
    collideRect:function (p) {
        var a = this.getContentSize();
       // console.log(a);
        return cc.rect(p.x - a.width, p.y, a.width, a.height);
    },
    restart:function(){
      this.stopAllActions();
      this.init();
      //this.set
    }
});
Pipe.create=function(arg){
    var pipe=new Pipe(arg);
    return pipe;
}
Pipe.getOrCreatePair = function (arg) {
    var selChild = null;
    for (var j = 0; j < MW.CONTAINER.PIPES.length; j++) {
        selChild = MW.CONTAINER.PIPES[j];
        if (selChild.active == false) {
            selChild.active=true;
            this.setRadomHeight(selChild);
            selChild.first=false;
            return selChild;
        }
    }
    selChild = Pipe.createPipePair(arg);
    this.setRadomHeight(selChild);
    MW.CONTAINER.PIPES.push(selChild);
    return selChild;
};
Pipe.setRadomHeight=function(pPair){

    var upPipe=pPair.up;
    var downPipe= pPair.down;
    var winSize = cc.Director.getInstance().getWinSize();
    var downy=320*Math.random()-320;
    if(downy<-140){
        downy=-140;
    }

    downPipe.setPosition(winSize.width+12,downy);
    downPipe.setVisible(true);
    upPipe.setVisible(true);
    var upy=320+downy+112;

    upPipe.setPosition(winSize.width+12,upy);
    pPair.score=false;

}
Pipe.createPipePair=function(){
    console.log('create pair');
    var upPipe=Pipe.create({up:true});
    var downPipe=Pipe.create({up:false});

    //var upx=
    var active=true;

    return {up:upPipe,down:downPipe,active:active,first:true,score:false};
}
