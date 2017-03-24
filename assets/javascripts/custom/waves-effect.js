/*
 * Created By: Carlos Silva
 * jQuery extension to display a wave effect like in Material Design clickable elements
 */
+function ($) {
  'use strict';

  $.fn.wavesEffect = function() {
    return this.each(function() {

      var $element = $(this);

      $element.on('mousedown', function (e) {

        if (e.button == 2) return;

        var $wave = $('<span />', {
          id: 'wave-' + new Date().getTime(),
          class: 'wave'
        });

        $wave.css({
          left: e.offsetX + 'px',
          top: e.offsetY + 'px'
        });

        $element.append($wave);

        setTimeout(function () {
          $wave.addClass('is-active');
        }, 0);

        setTimeout(function () {
          $wave.remove();
        }, 1500);

      });

    });
  };
  
}(jQuery);