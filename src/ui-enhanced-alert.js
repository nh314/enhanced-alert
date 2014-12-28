(function($) {
	$.ea = {
		alert: function(message, title, icon){
			$.ea._show(message, title , 'alert', icon);

		},
		confirm: function(message, title , callback, icon){
			$.ea._show(message, title, 'confirm', function(result) {
				if (callback) callback(result);
			},icon);

		},
		prompt: function(message, title , callback, icon) {
			$.ea._show(message, title , 'prompt', function(result) {
				if (callback) callback(result);
			},icon);
		},
		_show: function(message, title , template, callback, icon) {
			title = title || '';
			if ($.ea._isOpen()) {
				$.ea._queue.push({
					template: template,
					title: title,
					message: message,
					icon: icon,
					callback: callback
				})
			}
			else {
				var icon2 = null;
				var html = '';
				switch (template) {
					case 'alert':
						icon2 = icon || 'alert';
						html = $.ea.template.alert.replace('%message%', message).replace('%icon%', icon2);
						break;
					case 'confirm':
						icon2 = icon || 'info';
						html = $.ea.template.confirm.replace('%message%', message).replace('%icon%', icon2);
						break;
					case 'prompt':
						icon2 = icon || 'info';
						html = $.ea.template.prompt.replace('%message%', message).replace('%icon%', icon2);
						break;
				}


				$('body').append(html);
				switch (template) {
					case 'alert':
						$('#enhanced-alert').dialog({
							title: title + '',
							modal: true,
							open: function(event, ui) {
								$(event.target).closest('.ui-dialog').css('z-index', 9999999);
							},
							close: function(event, ui) {
								$.ea._destroy();

							},
							buttons: {
								Ok: function() {
									$(this).dialog("close");
								}
							}
						});
						break;

					case 'confirm':
						$('#enhanced-confirm').dialog({
							title: title,
							modal: true,

							open: function(event, ui) {
								$(event.target).closest('.ui-dialog').css('z-index', 9999999);
							},
							close: function(event, ui) {
								$.ea._destroy();
							},
							buttons: {
								OK: function() {
									$(this).dialog("close");
									callback(true);
								},
								Cancel: function() {
									$(this).dialog("close");
									callback(false);
								},
							}
						});
						break;
					case 'prompt':
						$('#enhanced-prompt').dialog({
							title: title,
							modal: true,
							open: function(event, ui) {
								$(event.target).closest('.ui-dialog').css('z-index', 9999999);
							},
							close: function(event, ui) {
								$.ea._destroy();
							},
							buttons: {
								OK: function() {
									var val = $('#enhanced-prompt-input').val();
									$(this).dialog("close");
									callback(val);
								},
								Cancel: function() {
									$(this).dialog("close");
									callback(false);
								}
							}
						});
						break;
				}
			}



		},
		_prompt_result: null,
		_queue: [],
		template: {
			alert: '<div id="enhanced-alert" class="enhanced-alert"><p><i class="ea %icon%"></i>%message%</p><div>',
			confirm: '<div id="enhanced-confirm" class="enhanced-alert"><p><i class="ea %icon%"></i>%message%</p><div>',
			prompt: '<div id="enhanced-prompt" class="enhanced-alert"><p><i class="ea %icon%"></i>%message%</p><p><input id="enhanced-prompt-input" type="text" /></p><div>',
		},
		_isOpen: function() {
			return ($('#enhanced-alert').length || false) || ($('#enhanced-prompt').length || false) || ($('#enhanced-confirm').length || false)
		},
		_run_queue: function() {
			if ($.ea._queue.length > 0) {
				var _param = $.ea._queue.shift();
				$.ea._show(_param.title, _param.message, _param.template, _param.icon,_param.callback);
			}

		},
		_destroy: function() {
			$('.enhanced-alert').remove();
			$.ea._run_queue();
		},
	}

})(jQuery)