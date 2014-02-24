/**
 * Created with JetBrains WebStorm.
 * User: waynelu
 * Date: 14-2-17
 * Time: 下午4:43
 * To change this template use File | Settings | File Templates.
 */
var Bird=cc.Sprite.extend({
    zOrder:3000,
    appearPosition:cc.p(110,280),
    active:true,
    start:false,
    bornSprite:null,
    flayAction:null,

    ctor:function () {
        this._super();

        //init life
        this.initWithSpriteFrameName("bird1.png");
        this.setTag(this.zOrder);
        this.setPosition(this.appearPosition);

        // set frame
         this.flaywing();
        this.flay();

        //this.schedule(this.stopFlay, 1);

    },
    flaywing:function(){
        var frame0 = cc.SpriteFrameCache.getInstance().getSpriteFrame("bird2.png");
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame("bird3.png");

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        var animation = cc.Animation.create(animFrames, 0.1);
        var animate = cc.Animate.create(animation);
        this.runAction(cc.RepeatForever.create(animate));
    },
    flay:function(){
        //如果还没开始飞，则停在那里飞
            var action1= cc.MoveBy.create(0.5, cc.p(0, 20));
            var action2=action1.reverse();
            var repeatUint=cc.Sequence.create(action1,action2);
            this.flayAction=   cc.RepeatForever.create(repeatUint);
            this.runAction(this.flayAction);

    },
    stopFlay:function(){
           this.stopAction(this.flayAction) ;
    },
    jump:function(){
        if(this.start==true){
            var jumpHeight=Math.min(480-this.getPosition().y,50);
             console.log(jumpHeight);
            var actionFlay= cc.MoveBy.create(0.2, cc.p(0, jumpHeight));
            this.runAction(actionFlay);

        }
    },
    update:function (dt) {
         //if(this.start==true){
             //var actionFlay= cc.MoveBy.create(0.2, cc.p(0, -5));
             //this.runAction(actionFlay);
        // }

    },

    destroy:function () {

    },
    dead:function () {
        console.log('bird dead');
        this.start=false;
        //this.setPosition(this.appearPosition);
        this.setVisible(false);
    },
    collideRect:function (p) {
        var a = this.getContentSize();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height);
    }


});