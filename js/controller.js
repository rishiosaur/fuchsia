addEventListener('DOMContentLoaded', function (d) {
	d = document;

	// http://stackoverflow.com/a/384380
	function isElement(obj) {
		return (
			typeof HTMLElement === 'object' ? obj instanceof HTMLElement :
			obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
		);
	}

	var elements = Fuchsia.elements,
		$input = elements.$input,
		$conversation = elements.$conversation;

	$input.style['display'] = 'block';
	$input.addEventListener('keypress', function (e) {
		e = e || window.event;

		var value,
			response,
			self,
			fuchsia;

		if (e.which === 13 && this.value.replace(/\s+/g, '') !== '') {
			value = Fuchsia.makeConversation('self', this.value, 'p');
			response = Fuchsia(this.value);

			if (typeof response === 'string') {
				response = Fuchsia.makeConversation('fuchsia', response, 'p');
			} else if (response === null) {
				response = Fuchsia.makeConversation('fuchsia', 'Blah', 'div');
			}

			$conversation.appendChild(value);
			$conversation.appendChild(response);

			setTimeout(function () {
				self = d.getElementsByClassName('self');
				for (var i = 0; i < self.length; i++) {
					self[i].style['opacity'] = 1;
				}
				d.body.scrollTop = value.offsetTop;
				setTimeout(function () {
					var fuchsia = d.getElementsByClassName('fuchsia');
					for (var j = 0; j < fuchsia.length; j++) {
						fuchsia[j].style['opacity'] = 1;
					}
				}, 500);
			}, 300);

			this.value = '';
		}
	});
});