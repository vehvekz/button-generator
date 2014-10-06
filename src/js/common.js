(function() {

	var app = {
		initialize: function() {
			this.setUi();
			this.setUpListeners();
			this.settingText();
		},
		setUpListeners: function() {
			this.textbox.on('keyup', $.proxy(this.settingText, this));
			this.bRadius.bind('slide', $.proxy(this.settingRadius, this));
			this.bSize.bind('slide', $.proxy(this.settingBorderSize, this));
			this.sendEmail.on('click', $.proxy(this.mailer, this));
		},
		setUi: function() {
			if (this.borderSizePosition == "no") {
				this.borderSizePosition = 1;
			};
			if (this.radiusPosition == "no") {
				this.radiusPosition = 2;
			};
			this.settingCodeCSS();
			this.bRadius.slider({
				range: "min",
				value: 2,
				max: 26,
				main: 0,
				step: 1
			});
			this.bSize.slider({
				range: "min",
				value: 1,
				max: 10,
				main: 0,
				step: 1
			});
		},

		button: $('#result'),
		codeHTML: $('#res-code-html'),
		codeCSS: $('#res-code-css'),
		email: $('.email input'),
		textbox: $('#text'),
		sendEmail: $('.email button'),
		radiusPosition: "no",
		borderSizePosition: "no",
		bRadius: $('#border-rad'),
		bSize: $('#border-size'),

		settingText: function() {
			var text = this.textbox.val();
			this.button.text( text );
			if(text == "") {
				this.button.text('empty');
				text = "empty";
			}
			this.codeHTML.val( '<button type="submit" class="btn">' + text + '</button>' );
		},
		settingRadius: function(event, ui) {
			this.button.css('border-radius', ui.value + 'px');
			this.radiusPosition = ui.value;
			this.settingCodeCSS();
		},
		settingBorderSize: function(event, ui) {
			this.button.css('border', ui.value + 'px solid #777');
			this.borderSizePosition = ui.value;
			this.settingCodeCSS();
		},
		settingCodeCSS: function() {
			this.codeCSS.val( '.btn {\n border-radius: ' + this.radiusPosition + 'px;\n border: ' + this.borderSizePosition +'px solid #777;\n}' );
		},
		mailer: function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "../dest/php/mailer.php",
				data: {
					codeHTML: this.codeHTML.val(),
					codeCSS: this.codeCSS.val(),
					email: this.email.val()
				},
				success: function(data) {
					alert( data );
				}
			});
		}
	};

	app.initialize();


})();












// ;(function () {

// 	var resButton = {
// 		defaults: {
// 			'borderRad'  : 3,
// 			'borderSize' : 1,
// 			'maxBrWidth' : 10,
// 			'horPadd'    : 30,
// 			'maxHorPadd' : 60,
// 			'verPadd'    : 10,
// 			'maxVerPadd' : 30
// 		},


// 		calculateMaxBr: function () {
// 			var def = this.defaults,
// 				verSize = def.maxVerPadd * 2 + $('#result').height() + def.maxBrWidth;
// 			def.maxBr = parseInt(verSize/2); 
// 		},

// 		setButtDef: function () {
// 			var def = this.defaults;			
// 			$('#result').css({
// 				'border-radius'  : def.borderRad,
// 				'border-width'   : def.borderSize,
// 				'padding-top' 	 : def.verPadd,			
// 				'padding-bottom' : def.verPadd,			
// 				'padding-left'   : def.horPadd,			
// 				'padding-right'  : def.horPadd			
// 			})
// 		}

// 	};

// 	resButton.calculateMaxBr();
// 	resButton.setButtDef();





// 	var app = {

// 		initialize: function () {

// 			this.setUpPlugins();
// 			this.setUpListners();

// 		},

// 		setUpListners: function () {
// 			$("#border-rad").on( "slidechange", app.borderRadChange);
// 			$("#border-size").on( "slidechange", app.brWidthChange);
// 			$("#height").on( "slidechange", app.heightChange);
// 			$("#width").on( "slidechange", app.widthChange);
			
// 			$('.ui-slider').on( "slidechange", app.showResult);

// 			$("#text").on( "keyup", app.textChange);
// 		},

// 		textChange: function (e) {
// 			var inpText = e.currentTarget,
// 				nevText = $(inpText).val();

// 			$('#result').text(nevText);
// 			$('#res-code-html').val( '<button type="submit" class="my-btn">' + newText + '</button>' );
// 		},

// 		setUpPlugins: function () {

// 			var def = resButton.defaults;

// 			$('#border-rad').slider({
// 				max: def.maxBr,
// 				value: def.borderRad,
// 				range: "min",
// 				min: 0,
// 				step: 1
// 			});
			
// 			$('#height').slider({
// 				max: def.maxVerPadd,
// 				value: def.verPadd
// 			});

// 			$('#border-size').slider({
// 				max: def.maxBrWidth,
// 				value: def.borderSize,
// 				range: "min",
// 				min: 0,
// 				step: 1
// 			});

// 			$('#width').slider({
// 				max: def.maxHorPadd,
// 				value: def.horPadd
// 			});
			
// 		},

// 		borderRadChange: function (e, ui) {
// 			$('#result').css({
// 				'border-radius' : ui.value
// 			});
// 		},

// 		heightChange: function (e, ui) {			
// 			$('#result').css({
// 				'padding-top' 	 : ui.value,			
// 				'padding-bottom' : ui.value,		
// 			});
// 		},

// 		widthChange: function (e, ui) {			
// 			$('#result').css({
// 				'padding-left' 	: ui.value,			
// 				'padding-right' : ui.value,		
// 			});
// 		},

// 		brWidthChange: function (e, ui) {			
// 			$('#result').css({			
// 				'border-width' : ui.value		
// 			});
// 		},

// 		showResult: function () {

// 			var rBtn = $('#result');
// 				borderWidth = rBtn.css('border-width'),
// 				padd = rBtn.css('padding-top') + ' ' + rBtn.css('padding-left'),
// 				maxBrRad = parseInt(rBtn.outerHeight()/2); 
// 				borRad = parseInt(rBtn.css('border-radius'));


// 				(borRad > maxBrRad) ? borRad = maxBrRad + 'px' : borRad = borRad + 'px';

// 			$('#res-code-css').text(

// 				'-moz-border-radius' + ':' + borRad + ';\n' +
// 				'-webkit-border-radius' + ':' + borRad + ';\n' +
// 				'border-radius' + ':' + borRad + ';\n' +
// 				'border-width' + ':' + borderWidth + ';\n' + 
// 				'padding' + ':' + padd + ';\n' 
// 			);

// 			// $('#res-code-html').text(
// 			// 	'<button class="create">' + textChange + '</button>'
// 			// 	)
// 		}

// 	}

// 	app.initialize();

	
// })();