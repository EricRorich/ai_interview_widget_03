/**
 * AI Interview Widget - Live Preview Script
 * 
 * Handles real-time preview updates for Visual Style Settings
 * in the Enhanced Widget Customizer.
 * 
 * @version 1.0.0
 * @since 1.9.6
 */

(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function() {
        console.log('🎨 AI Interview Widget: Initializing live preview updates...');

        // Verify preview handler is available
        if (typeof window.aiwLivePreview === 'undefined') {
            console.error('❌ Preview handler not available');
            return;
        }

        /**
         * Update preview with current settings
         */
        function updatePreview() {
            // Container styles
            updateContainerStyles();
            
            // Canvas styles
            updateCanvasStyles();
            
            // Button styles
            updateButtonStyles();
            
            // Text styles
            updateTextStyles();
        }

        /**
         * Update container styles in preview
         */
        function updateContainerStyles() {
            const container = $('.aiw-preview-container');
            if (!container.length) return;

            // Background type
            const bgType = $('#container_bg_type').val();
            
            if (bgType === 'solid') {
                const bgColor = $('#container_bg_color').val();
                container.css('background', bgColor);
            } else if (bgType === 'gradient') {
                const gradientStart = $('#container_bg_gradient_start').val();
                const gradientEnd = $('#container_bg_gradient_end').val();
                container.css('background', 'linear-gradient(135deg, ' + gradientStart + ', ' + gradientEnd + ')');
            }

            // Border radius
            const borderRadius = $('#container_border_radius_slider').val();
            container.css('border-radius', borderRadius + 'px');

            // Padding
            const padding = $('#container_padding_slider').val();
            container.css('padding', padding + 'px');
        }

        /**
         * Update canvas styles in preview
         */
        function updateCanvasStyles() {
            const canvas = $('.aiw-preview-canvas, #previewSoundbar');
            if (!canvas.length) return;

            // Canvas background color
            const canvasColor = $('#canvas_color').val();
            if (canvasColor) {
                canvas.css('background-color', canvasColor);
            }

            // Canvas border radius
            const canvasBorderRadius = $('#canvas_border_radius_slider').val();
            if (canvasBorderRadius) {
                canvas.css('border-radius', canvasBorderRadius + 'px');
            }

            // Canvas shadow color
            const shadowColor = $('#canvas_shadow_color').val();
            const shadowIntensity = $('#canvas_shadow_intensity_slider').val() || 30;
            
            if (shadowColor && shadowIntensity > 0) {
                const glow1 = Math.round(shadowIntensity * 0.33);
                const glow2 = Math.round(shadowIntensity * 0.66);
                
                // Convert hex to RGB
                const hex = shadowColor.replace('#', '');
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                
                const shadow = '0 0 ' + shadowIntensity + 'px ' + glow1 + 'px rgba(' + r + ', ' + g + ', ' + b + ', 0.5), ' +
                              '0 0 ' + shadowIntensity + 'px ' + glow2 + 'px rgba(' + r + ', ' + g + ', ' + b + ', 0.3)';
                
                canvas.css('box-shadow', shadow);
            } else {
                canvas.css('box-shadow', 'none');
            }
        }

        /**
         * Update button styles in preview
         */
        function updateButtonStyles() {
            const button = $('.aiw-preview-button, .preview-play-button');
            if (!button.length) return;

            // Button size
            const buttonSize = $('#play_button_size_slider').val();
            if (buttonSize) {
                button.css({
                    'width': buttonSize + 'px',
                    'height': buttonSize + 'px',
                    'font-size': 'calc(' + buttonSize + 'px * 0.4)'
                });
                // Also update the icon size
                button.find('.dashicons').css({
                    'width': (buttonSize * 0.4) + 'px',
                    'height': (buttonSize * 0.4) + 'px',
                    'font-size': (buttonSize * 0.4) + 'px'
                });
            }

            // Button design (determines background style)
            const design = $('#play_button_design').val();
            const buttonColor = $('#play_button_color').val();
            
            if (design === 'classic') {
                // Gradient style
                const gradientStart = $('#play_button_gradient_start').val();
                const gradientEnd = $('#play_button_gradient_end').val();
                if (gradientStart && gradientEnd) {
                    button.css('background', 'radial-gradient(circle, ' + gradientStart + ' 0%, ' + gradientEnd + ' 100%)');
                }
            } else if (design === 'minimalist' || design === 'futuristic') {
                // Solid color
                if (buttonColor) {
                    button.css('background', buttonColor);
                }
            }

            // Button icon color
            const iconColor = $('#play_button_icon_color').val();
            if (iconColor) {
                button.css('color', iconColor);
            }

            // Button border
            const borderWidth = $('#play_button_border_width_slider').val();
            const borderColor = $('#play_button_border_color').val();
            if (borderWidth !== undefined && borderColor) {
                button.css('border', borderWidth + 'px solid ' + borderColor);
            }
        }

        /**
         * Update text styles in preview
         */
        function updateTextStyles() {
            const headline = $('.aiw-preview-headline');
            if (!headline.length) return;

            // Headline font size
            const fontSize = $('#headline_font_size_slider').val();
            if (fontSize) {
                headline.css('font-size', fontSize + 'px');
            }

            // Headline color
            const color = $('#headline_color').val();
            if (color) {
                headline.css('color', color);
            }

            // Headline font family
            const fontFamily = $('#headline_font_family').val();
            if (fontFamily && fontFamily !== 'inherit') {
                headline.css('font-family', fontFamily);
            }
        }

        /**
         * Set up event listeners for all controls
         */
        function setupEventListeners() {
            // Container background type
            $('#container_bg_type').on('change', function() {
                const type = $(this).val();
                if (type === 'solid') {
                    $('#solid_color_group').show();
                    $('#gradient_colors_group').hide();
                } else {
                    $('#solid_color_group').hide();
                    $('#gradient_colors_group').show();
                }
                updateContainerStyles();
            });

            // Play button design type
            $('#play_button_design').on('change', function() {
                const design = $(this).val();
                
                // Show/hide appropriate controls
                if (design === 'classic') {
                    $('#play_button_gradient_group').show();
                    $('#play_button_neon_group').hide();
                } else if (design === 'futuristic') {
                    $('#play_button_gradient_group').hide();
                    $('#play_button_neon_group').show();
                } else {
                    $('#play_button_gradient_group').hide();
                    $('#play_button_neon_group').hide();
                }
                
                updateButtonStyles();
            });

            // Color pickers - use wpColorPicker change event
            $('.color-picker').on('change', function() {
                updatePreview();
            });

            // Also listen to the iris color picker events
            $(document).on('change', '.wp-color-picker', function() {
                updatePreview();
            });

            // Range sliders
            $('input[type="range"]').on('input', function() {
                updatePreview();
            });

            // Text inputs
            $('#headline_font_family').on('change', function() {
                updatePreview();
            });

            // Canvas background image
            $('#canvas_bg_image').on('change', function() {
                const imageUrl = $(this).val();
                if (imageUrl) {
                    $('.aiw-preview-canvas').css('background-image', 'url(' + imageUrl + ')');
                    $('.aiw-preview-canvas').css('background-size', 'cover');
                    $('.aiw-preview-canvas').css('background-position', 'center');
                } else {
                    $('.aiw-preview-canvas').css('background-image', 'none');
                }
            });

            console.log('✅ Event listeners set up for live preview');
        }

        /**
         * Initialize responsive preview toggle
         */
        function initResponsiveToggle() {
            // Add responsive toggle buttons if they don't exist
            const previewContainer = $('#widget_preview_container');
            if (!previewContainer.length) return;

            // Check if toggle already exists
            if ($('#responsive-toggle').length) return;

            // Create toggle buttons
            const toggleHtml = `
                <div id="responsive-toggle" style="position: absolute; top: 10px; right: 10px; z-index: 100; display: flex; gap: 5px;">
                    <button class="button button-small responsive-btn active" data-view="desktop" style="padding: 5px 10px; font-size: 11px;">
                        <span class="dashicons dashicons-desktop" style="font-size: 14px; width: 14px; height: 14px;"></span>
                        Desktop
                    </button>
                    <button class="button button-small responsive-btn" data-view="mobile" style="padding: 5px 10px; font-size: 11px;">
                        <span class="dashicons dashicons-smartphone" style="font-size: 14px; width: 14px; height: 14px;"></span>
                        Mobile
                    </button>
                </div>
            `;

            previewContainer.parent().css('position', 'relative');
            previewContainer.before(toggleHtml);

            // Handle responsive toggle
            $('.responsive-btn').on('click', function() {
                const view = $(this).data('view');
                const widget = $('.aiw-preview-widget');

                $('.responsive-btn').removeClass('active');
                $(this).addClass('active');

                if (view === 'mobile') {
                    widget.css({
                        'max-width': '375px',
                        'margin': '0 auto'
                    });
                } else {
                    widget.css({
                        'max-width': '100%',
                        'margin': '0 auto'
                    });
                }
            });

            console.log('✅ Responsive toggle initialized');
        }

        // Initialize
        setupEventListeners();
        initResponsiveToggle();
        updatePreview();

        console.log('✅ Live preview script initialized');
    });

})(jQuery);
