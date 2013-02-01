
YUI.add('mjr-gallery-dialog', function(Y){
/**
* The Dialog class is a Panel based extension as an accesible and responsive enhancement for the base one. 
* and the relevant data points.
*
* @module charts
* @class Dialog
* @extends Panel
* @uses Fills
* @constructor
*/

var Dialog = Y.Base.create(
    'mjr-gallery-dialog', 
    Y.Panel,
    [],
    {
        /**
        * @public
        *
        * Widget extended method to bind the protected method with their events for handling Aria Tags, position and Content Overflow
        *
        * @method bindUI
        * @return void
        */
        bindUI: function(){
            var self = this;
            Y.on('resize',function(){
                self.updatePosition();
            });
            self.on('visibleChange',self._visibleUpdate,self);
            self.after('visibleChange',function(){
                window.setTimeout(function(){
                    self.updatePosition();
                },10);
            });
            self._renderUpdate(null);
            
        },
        /**
        * @public
        *
        * Widget extended method to update the widget position
        *
        * @method syncUI
        * @return void
        */
        syncUI: function(){
            var self = this;
            self.updatePosition();
        },
        /**
        * @public
        *
        * Method used to center and update the overflow content if needed, on load and windows resize
        *
        * @method updatePosition
        * @return void
        */
        updatePosition: function(){
            
            var self   = this,
                center = self.get('center'),
                panel  = self.get('boundingBox'),
                wHeight = panel.get('winHeight'),
                wWidth = panel.get('winWidth');

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
        /**
        * @protected
        *
        * Method used to set the ARIA Tags and focus for the Dialog on opening
        *
        * @method _renderUpdate
        * @param {EventFacade} evt The renderChange event
        * @return void
        */
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
        /**
        * @protected
        *
        * Method used to update the ARIA Tags and control the overflow within the Dialog
        *
        * @method _visibleUpdate
        * @param {EventFacade} evt The visibleChange event
        * @return void
        */
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
            /**
            * If set True, the Dialog window will be keep centered while the browser window resize
            *
            * @attribute center
            * @type Boolean
            * @default true
            */
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
        }
    }
);
Y.namespace('MJR.GALLERY').Dialog = Dialog;
},'0.0.1',{
    require:['base','panel','event']
});