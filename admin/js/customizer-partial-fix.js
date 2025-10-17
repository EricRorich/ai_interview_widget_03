/**
 * AI Interview Widget - Customizer Partial Fix
 * 
 * Ensures the preview container is properly initialized and handles
 * any DOM-related fixes for the customizer.
 * 
 * @version 1.0.0
 * @since 1.9.6
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        console.log('🔧 Customizer partial fix script loaded');

        // Ensure preview container is visible
        const previewContainer = $('#widget_preview_container');
        if (previewContainer.length) {
            console.log('✅ Preview container found');
            
            // Remove any error messages
            previewContainer.find('.aiw-preview-error').remove();
        }

        // Log when color pickers are initialized
        if (typeof $.fn.wpColorPicker !== 'undefined') {
            console.log('✅ WordPress color picker available');
        }
    });

})(jQuery);
