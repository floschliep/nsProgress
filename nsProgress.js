(function( $ ){

    var methods = {
        init : function(options) {

            var defaults = {
                img_path: 'nsProgress/img'
            };

            options = $.extend(defaults, options);
            height_without_text = 60;
            height_with_text = 85;
            
            var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
            if (pixelRatio > 1) {
            	options.img_path = options.img_path+'/retina';
            }

            $(this).addClass('nsProgress_container');
            $('body').append('<div class="nsProgress_block"></div>');

            $(this).append('<img class="nsProgress_img" data-src="' + options.img_path + '" src="' + options.img_path + '/nsLoader.gif" /><div class="nsProgress_text">Loading&hellip;</div>');
        },
        show : function( ) { 
        	$('.nsProgress_block').show();
        	$('.nsProgress_container').show();
            $(this).show();
        },
        showWithMaskType : function( type ) {

            switch(type) {
                case 'none':
                    break;
                case 'clear':
                    $('.nsProgress_block').show();
                    break;yep
                case 'black':
                    $('.nsProgress_block').show();
                    $('.nsProgress_block').css('background', 'rgba(0, 0, 0, 0.5)');
                    break;
                default:
                    break;
            }

            $(this).nsProgress('show');
        },
        showWithStatus : function( status ) {

            $(this).css('height', height_with_text + 'px');
            $(this).find('.nsProgress_text').html( status ).show();
            $('.nsProgress_text').show();
            $(this).nsProgress('showWithImage', 'nsLoader.gif');
            $(this).nsProgress('show');

        },
        showWithStatusAndMaskType : function ( status, type ) {

            $(this).nsProgress('showWithMaskType', type);
            $(this).nsProgress('showWithStatus', status);

        },
        showWithImage : function( image_name ) {

            $(this).find('.nsProgress_img').attr('src', $(this).find('.nsProgress_img').attr('data-src') + '/' + image_name);
            $('.nsProgress_img').show();
            $(this).nsProgress('show');

        },
        showSuccessWithStatus : function ( status ) {

            $(this).nsProgress('showWithStatus', status);
            $(this).nsProgress('showWithImage', 'nsSuccess.png');
			$(this).nsProgress('delayDismissal', status);

        },
        showErrorWithStatus : function ( status ) {

            $(this).nsProgress('showWithStatus', status);
            $(this).nsProgress('showWithImage', 'nsError.png');
			$(this).nsProgress('delayDismissal', status);

        },
        showSuccessWithStatusAndMaskType : function ( status, type ) {

            $(this).nsProgress('showWithStatusAndMaskType', status, type);
            $(this).nsProgress('showWithImage', 'nsSuccess.png');
			$(this).nsProgress('delayDismissal', status);

        },
        showErrorWithStatusAndMaskType : function ( status, type ) {

            $(this).nsProgress('showWithStatusAndMaskType', status, type);
            $(this).nsProgress('showWithImage', 'nsError.png');
			$(this).nsProgress('delayDismissal', status);

        },
        showWithImageAndStatus : function ( image, status ) {

            $(this).nsProgress('showWithStatus', status);
            $(this).nsProgress('showWithImage', image);

        },
        showWithImageAndStatusAndMaskType : function ( image, status, type ) {

            $(this).nsProgress('showWithStatusAndMaskType', status, type);
            $(this).nsProgress('showWithImage', image);

        },
        showWithImageAndMaskType : function ( image, type ) {

            $(this).nsProgress('showWithMaskType', type);
            $(this).nsProgress('showWithImage', image);

        },
        delayDismissal : function (status) {
        	var time = Math.min(status.length*0.06 + 0.3, 5.0) * 1000;
			setTimeout(function() { 
				$(this).nsProgress('dismiss');
			}, time);
		},
        dismiss : function() {
        	
        	$('.nsProgress_block').attr('style', '');
            $(this).find('.nsProgress_text').attr('style', '').html('').hide();
            $(this).attr('style', '');
        	
            $(this).hide();
            $('.nsProgress_text').hide();
            $('.nsProgress_block').hide();
            $('.nsProgress_container').hide();
        }
    };

    $.fn.nsProgress = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.nsProgress' );
        }    
    };


})( jQuery );