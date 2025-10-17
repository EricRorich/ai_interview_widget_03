/**
 * AI Interview Widget - Live Preview Handler
 * 
 * Initializes the live preview object and provides core functionality
 * for real-time preview updates in the Enhanced Widget Customizer.
 * 
 * @version 1.0.0
 * @since 1.9.6
 */

(function(window, document) {
    'use strict';

    /**
     * Live Preview Handler Object
     */
    window.aiwLivePreview = {
        /**
         * Preview container element
         */
        container: null,

        /**
         * Current preview settings
         */
        settings: {},

        /**
         * Initialize the preview handler
         */
        init: function() {
            console.log('🎨 AI Interview Widget: Initializing live preview handler...');
            
            // Get the preview container
            this.container = document.getElementById('widget_preview_container');
            
            if (!this.container) {
                console.warn('⚠️ Preview container not found');
                return false;
            }

            console.log('✅ Live preview handler initialized');
            return true;
        },

        /**
         * Update a CSS variable in the preview
         * 
         * @param {string} property - CSS variable name
         * @param {string} value - CSS variable value
         */
        updateCSSVar: function(property, value) {
            if (!this.container) return;

            // Update CSS custom property on the container
            this.container.style.setProperty('--' + property, value);
            
            // Also update on the preview widget if it exists
            const previewWidget = this.container.querySelector('.aiw-preview-widget');
            if (previewWidget) {
                previewWidget.style.setProperty('--' + property, value);
            }
        },

        /**
         * Update a style property directly on an element
         * 
         * @param {string} selector - Element selector
         * @param {string} property - CSS property name
         * @param {string} value - CSS property value
         */
        updateStyle: function(selector, property, value) {
            if (!this.container) return;

            const elements = this.container.querySelectorAll(selector);
            elements.forEach(function(element) {
                element.style[property] = value;
            });
        },

        /**
         * Update multiple styles at once
         * 
         * @param {Object} styles - Object with selector keys and style objects as values
         */
        updateStyles: function(styles) {
            if (!this.container) return;

            Object.keys(styles).forEach(function(selector) {
                const styleObj = styles[selector];
                const elements = this.container.querySelectorAll(selector);
                
                elements.forEach(function(element) {
                    Object.keys(styleObj).forEach(function(prop) {
                        element.style[prop] = styleObj[prop];
                    });
                });
            }.bind(this));
        },

        /**
         * Get current setting value
         * 
         * @param {string} key - Setting key
         * @return {*} Setting value
         */
        getSetting: function(key) {
            return this.settings[key];
        },

        /**
         * Set a setting value
         * 
         * @param {string} key - Setting key
         * @param {*} value - Setting value
         */
        setSetting: function(key, value) {
            this.settings[key] = value;
        },

        /**
         * Refresh the preview
         */
        refresh: function() {
            console.log('🔄 Refreshing preview...');
            
            // Trigger a custom event that other scripts can listen to
            if (this.container) {
                const event = new CustomEvent('aiwPreviewRefresh', {
                    detail: { settings: this.settings }
                });
                this.container.dispatchEvent(event);
            }
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.aiwLivePreview.init();
        });
    } else {
        window.aiwLivePreview.init();
    }

})(window, document);
