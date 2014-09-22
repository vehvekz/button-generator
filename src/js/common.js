(function () {

	var resButton = {
		
		// Р·Р°РґР°С‘Рј РёР·РЅР°С‡Р°Р»СЊРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹ РєРЅРѕРїРєРё
		defaults: {
			'borderRad'  : 3,  // СЂР°РґРёСѓСЃ
			'borderSize' : 1,   // СЂР°Р·РјРµСЂ Р±РѕСЂРґРµСЂР°
			'maxBrWidth' : 10,  
			'horPadd'    : 30,  // РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Рµ РїР°РґРґРёРЅРіРё (С€РёСЂРёРЅР°, РѕРїСЂРµРґРµР»СЏРµС‚СЃСЏ РєР°Рє СЃСѓРјРјР° РґР»РёРЅС‹ С‚РµРєСЃС‚Р°, Р»РµРІРѕРіРѕ Рё РїСЂР°РІРѕРіРѕ РїР°РґРґРёРЅРіРѕРІ)
			'maxHorPadd' : 60,   
			'verPadd'    : 10,  // РІРµСЂС‚РёРєР°Р»СЊРЅС‹Рµ РїР°РґРґРёРЅРіРё (РІС‹СЃРѕС‚Р°, РѕРїСЂРµРґРµР»СЏРµС‚СЃСЏ РєР°Рє СЃСѓРјРјР° РІС‹СЃРѕС‚С‹ С‚РµРєСЃС‚Р°, РІРµСЂС…РЅРµРіРѕ Рё РЅРёР¶РЅРµРіРѕ РїР°РґРґРёРЅРіРѕРІ)
			'maxVerPadd' : 30
		},

		// РїРѕРґСЃС‡РёС‚С‹РІР°РµРј РјР°РєСЃРёРјР°Р»СЊРЅС‹Р№ Р±РѕСЂРґРµСЂ-СЂР°РґРёСѓСЃ (РёСЃС…РѕРґСЏ РёР· РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ РІС‹СЃРѕС‚С‹)
		calculateMaxBr: function () {
			var def = this.defaults,
				verSize = def.maxVerPadd * 2 + $('#result').height() + def.maxBrWidth;
			def.maxBr = parseInt(verSize/2); 
		},

		setButtDef: function () {
			var def = this.defaults;			
			$('#result').css({
				'border-radius'  : def.borderRad,
				'border-width'   : def.borderSize,
				'padding-top' 	 : def.verPadd,			
				'padding-bottom' : def.verPadd,			
				'padding-left'   : def.horPadd,			
				'padding-right'  : def.horPadd			
			})
		}

	};

	resButton.calculateMaxBr();
	resButton.setButtDef();

	// console.log(resButton.defaults);





	var app = {

		initialize: function () {

			this.setUpPlugins(); // СЃРЅР°С‡Р°Р»Р° РїРѕРґРєР»СЋС‡Р°РµРј РІСЃРµ РїР»Р°РіРёРЅС‹			
			this.setUpListners(); // Рё С‚РѕР»СЊРєРѕ РїРѕС‚РѕРј РїСЂРѕСЃР»СѓС€РєСѓ СЃРѕР±С‹С‚РёР№

		},

		// setButtDef: function () {
				
		// },

		setUpListners: function () {
			$("#border-rad").on( "slidechange", app.borderRadChange);			
			$("#border-size").on( "slidechange", app.brWidthChange);			
			$("#height").on( "slidechange", app.heightChange);			
			$("#width").on( "slidechange", app.widthChange);
			
			$('.ui-slider').on( "slidechange", app.showResult);	

			$("#text").on( "keyup", app.textChange);
		},

		textChange: function (e) {
			var inpText = e.currentTarget,
				nevText = $(inpText).val();

			$('#result').text(nevText);
		},

		setUpPlugins: function () {

			var def = resButton.defaults;

			$('#border-rad').slider({
				max: def.maxBr,
				value: def.borderRad
			});
			
			$('#height').slider({
				max: def.maxVerPadd,
				value: def.verPadd
			});

			$('#border-size').slider({
				max: def.maxBrWidth,
				value: def.borderSize
			});

			$('#width').slider({
				max: def.maxHorPadd,
				value: def.horPadd
			});
			
		},

		borderRadChange: function (e, ui) {
			$('#result').css({
				'border-radius' : ui.value
			});
		},

		heightChange: function (e, ui) {			
			$('#result').css({
				'padding-top' 	 : ui.value,			
				'padding-bottom' : ui.value,		
			});
		},

		widthChange: function (e, ui) {			
			$('#result').css({
				'padding-left' 	: ui.value,			
				'padding-right' : ui.value,		
			});
		},

		brWidthChange: function (e, ui) {			
			$('#result').css({			
				'border-width' : ui.value		
			});
		},

		showResult: function () {

			var rBtn = $('#result');
				borderWidth = rBtn.css('border-width'),
				padd = rBtn.css('padding-top') + ' ' + rBtn.css('padding-left'),
				maxBrRad = parseInt(rBtn.outerHeight()/2); // РїРѕСЃР»Рµ РЅР°Р¶Р°С‚РёСЏ РЅР° РєРЅРѕРєСѓ "РїРѕР»СѓС‡РёС‚СЊ РєРѕРґ", РЅР°Рј РЅРµРѕР±С…РѕРґРёРјРѕ РµС‰С‘ СЂР°Р· РїРµСЂРµСЃС‡РёС‚Р°С‚СЊ РјР°РєСЃРёРјР°Р»СЊРЅС‹Р№ Р±РѕСЂРґРµСЂ-СЂР°РґРёСѓСЃ 
				borRad = parseInt(rBtn.css('border-radius'));

				// РїСЂРѕРІРµСЂРєР°: СЂР°РґРёСѓСЃ РЅРµ РґРѕР»Р¶РµРЅ РїСЂРµРІС‹С€Р°С‚СЊ РјР°РєСЃРёРјР°Р»СЊРЅРѕ РґРѕРїСѓСЃС‚РёРјРѕРµ Р·РЅР°С‡РµРЅРёРµ
				(borRad > maxBrRad) ? borRad = maxBrRad + 'px' : borRad = borRad + 'px';

			$('#res-code-css').text(

				'-moz-border-radius' + ':' + borRad + ';\n' +
				'-webkit-border-radius' + ':' + borRad + ';\n' +
				'border-radius' + ':' + borRad + ';\n' +
				'border-width' + ':' + borderWidth + ';\n' + 
				'padding' + ':' + padd + ';\n' 

			);


			// -moz-border-radius: 16px;
	// -webkit-border-radius: 16px;
	// border-radius: 16px;
		}

	}

	app.initialize();

	
})()