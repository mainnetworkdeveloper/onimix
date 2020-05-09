var url_progress = '';
$(function() {
	url_progress = $('#url_progress').attr('data-url');

	$.get(url_progress, function(data) {
		try {
			data = $.parseJSON(data);
		} catch (ex) {}
		var progress = '0';
		var text = progress + ' % ';
		if (data['success'] == 'true') {
			progress = data['progress'];
			text = progress + ' % ';
		}
		var panel_progress = $('#panel_progress');
		var stats = $($(panel_progress).find('.stats-number'));
		var bar = $($(panel_progress).find('.progress-bar'));
		var description = $($(panel_progress).find('.stats-desc .alert'));

		try {
			$(stats).html(text);
		} catch (ex) {}

		try {
			$(bar).css('width', progress + '%');
		} catch (ex) {}

		try {
			$(bar).attr('aria-valuenow'.progress);
		} catch (ex) {}

		try {
			$(description).html('Barra de progreso , tope de comision al ' + text);
		} catch (ex) {}
	});
});
