Ext.define('GSOC_Demo.view.home', {
    extend: 'Ext.tab.Panel',
	
	config:
	{
		fullscreen: true,
					items: [
                {
					//home page
                    title: 'Home',
                    iconCls: 'home',
					id: 'page1',
                    html: [
					'<img src="libs/touch-2.3.1/resources/images/Raxa.png" height=200px style="display: block; margin-left: auto; margin-right: auto; padding-top: 15px"/>',
					'<br>',
					'<p><b><i><h1>That\'s what Doctor said</h1></i></b></p>',
					'<br><br>',
					'<p style="text-align: center;">Hello World and all the Mentors!!</p>',
					'<br>',
					"<p>Welcome to the Demo of \"That's what Doctor said\".</p> <p>This demonstrates how ",
                        "to parse prescription given by doctor to make a meaningful sentence for a layman to understand.</p>"
					].join("")
                },
				{
				// page to translate
				title:'Make me Understand!',
				iconCls: 'info',
				displayfield: 'title',
				xtype: 'formpanel',
				id: 'page2',
				items: [
                        {
                            height: 400,
                            instructions: '(Demo Version! Please enter in desired format.)',
                            items: [
                                {
									//prescription here
                                    xtype: 'textareafield',
                                    label: 'Prescription',
									name: 'prescription_field',
									id: 'prescription_field'
                                },
                                {
									//translation here
                                    xtype: 'textareafield',
                                    label: 'Layman\'s Language',
									name: 'translation_field',
									id: 'translation_field'
                                }
                            ]
                        },
                        {
                            //button to translate
							xtype: 'button',
                            text: 'Make me Understand!',
							width: 300,
							id: 'translate_button'
							
                        }
						]
                }
            ]
			
			}});    