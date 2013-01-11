YUI.add('mjr-gallery-dialog', function(Y){

var Dialog = Y.Base.create(
    'mjr-gallery-dialog',    // NAME, used for event prefixes (camelCase by convention)
    Y.Panel,             // parent class
    [],     // class extensions
    {
        initializer: function(){
            console.log('initializer');
        },
        bindUI: function(){
            // console.log('bindUI');
            var self = this;
            this.on('visibleChange',self._visibleUpdate,self);
            self._renderUpdate(null);
        },
        syncUI: function(){
            // console.log('syncUI');
        },
        _renderUpdate: function(evt){
            var self  = this,
                panel = self.get('boundingBox'),
                hd    = panel.one('.yui3-widget-hd').generateID(),
                bd = panel.one('.yui3-widget-bd').generateID();
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
        MY_CONSTANT: 'Marcos Riganti'
    }
);
Y.namespace('MJR.GALLERY').Dialog = Dialog;
},'0.0.1',{
    require:['base','panel']
});