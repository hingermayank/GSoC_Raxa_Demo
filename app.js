Ext.application({
    name:'GSOC_Demo',
	views: ['home'],
	controllers: ['translate'],

    launch:function()
    {    
	Ext.create('GSOC_Demo.view.home');
	}
	});