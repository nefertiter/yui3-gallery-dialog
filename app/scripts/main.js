YUI.GlobalConfig = {
    skin:{
        base:'assets/skins/',
        overrides:{
            'mjr-gallery-dialog':['mjr']    
        }
        
    },
    modules: {
        'mjr-gallery-dialog': {
         fullpath: 'scripts/mjr-gallery-dialog/mjr-gallery-dialog.js',
         requires:['panel']   
        }
    }
}
YUI().use('panel','mjr-gallery-dialog', function (Y) {
    var buttonsCfg  = {
        footer: [
            {
                name  : 'cancel',
                label : 'Cancel',
                action: 'hide'
            },

            {
                name     : 'proceed',
                label    : 'Send',
                action   : 'hide'
            }
        ],
        header: [
            {
                name  : 'cancel',
                label : 'Cancel',
                action: 'hide'
            },

            {
                name     : 'proceed',
                label    : 'Send',
                action   : 'hide'
            }
        ]
    };

    var panel = new Y.MJR.GALLERY.Dialog({
    srcNode : '#yui-panel-example',
    buttons    : buttonsCfg
    });
    var panel2 = new Y.MJR.GALLERY.Dialog({
    srcNode : '#yui-panel-example-2',
    buttons    : buttonsCfg
    });

    Y.one('#dialog').on('click',function(){
        panel.set('visible',true);
    });
    Y.one('#dialog2').on('click',function(){
        panel2.set('visible',true);
    });
    
});