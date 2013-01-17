YUI.add('mjr-gallery-dialog', function(Y){

var Dialog = Y.Base.create(
    'mjr-gallery-dialog',    // NAME, used for event prefixes (camelCase by convention)
    Y.Panel,             // parent class
    [],     // class extensions
    {
        initializer: function(){
            // console.log('initializer');
            self = this;
            
            Y.on(
                'resize' ,
                function(evt){
                    // self is known here
                    self.fire(Y.namespace('MJR.GALLERY').Dialog.EV_UPDATE_POSITION);
                }
            );
            self.on(
                Y.namespace('MJR.GALLERY').Dialog.EV_UPDATE_POSITION,
                self.updatePosition,
                self
            );

        },
        bindUI: function(){
            // console.log('bindUI');
            var self = this;
            self.on('visibleChange',self._visibleUpdate,self);
            self.after('visibleChange',function(){
                window.setTimeout(function(){
                    self.fire(Y.namespace('MJR.GALLERY').Dialog.EV_UPDATE_POSITION);
                },10);
            });
            self._renderUpdate(null);
            
        },
        syncUI: function(){
            this.fire(Y.namespace('MJR.GALLERY').Dialog.EV_UPDATE_POSITION);
        },
        updatePosition: function(){
            
            var self   = this,
                center = self.get('center'),
                panel  = self.get('boundingBox'),
                wHeight = panel.get('winHeight'),
                wWidth = panel.get('winWidth');

            console.log('calling updatePosition for:'+panel.get('id')+'-'+self.get('visible'));

            if (!self.get('visible')) return;

            var left = Math.floor((wWidth -  this.get('width')) / 2),
                top  = Math.floor((wHeight -  parseInt(panel.getComputedStyle('height'),10)  ) / 2);

            if(center){
                panel.setStyles({
                    'left': Math.max(0,left),
                    'top': Math.max(0,top)
                });
            }
            if(top < 0 ){
                self.set('height',wHeight);
                panel.addClass(self.getClassName('overflow'));
            }else{
                if(panel.hasClass(self.getClassName('overflow'))){
                    panel.setStyle('height',null);
                    self.set('height',null)
                    panel.one('.yui3-widget-bd').setStyle('height',null);
                    panel.removeClass(self.getClassName('overflow'));
                    self.updatePosition();
                    return;
                }  
            }
        },
        _renderUpdate: function(evt){
            var self  = this,
                panel = self.get('boundingBox'),
                hd    = panel.all('.yui3-widget-hd').generateID(),
                bd    = panel.all('.yui3-widget-bd').generateID();

                panel
                  .setAttribute('role','dialog')
                  .setAttribute('tabIndex','-1')
                  .setAttribute('aria-hidden','true')
                  .setAttribute('aria-labelledby',hd)
                  .setAttribute('aria-describedby',bd)
                  .focus();
        },
        _visibleUpdate: function(evt){
            var self  = this,
                value = evt.newVal,
                panel = self.get('boundingBox'),
                body  = Y.one('body'),
                mask  = Y.one('.yui3-widget-mask');
            
            body.setAttribute('aria-hidden',value);
            panel.setAttribute('aria-hidden',!value);

            if (value){
                body
                    .setStyle('overflow','hidden');
                mask
                    .addClass(self.getClassName('mask'));
            }else{
                body
                    .setStyle('overflow','auto');
                mask
                    .removeClass(self.getClassName('mask'));
            }
        }

    },{
        ATTRS:{
            center:{
                value: true
            },
            modal:{
                value:true
            },
            visible: {
                value: false
            },
            render:{
                value: true
            },
            width:{
                value:600
            }

        },
        EV_UPDATE_POSITION: 'UPDATE_POSITION'
    }
);
Y.namespace('MJR.GALLERY').Dialog = Dialog;
},'0.0.1',{
    require:['base','panel','event']
});