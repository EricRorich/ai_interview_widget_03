/**
 * AI Interview Widget - Geolocation Module (aiw-geo.js)
 * Version: 1.9.6+
 * 
 * Privacy-conscious, resilient geolocation abstraction layer
 * Uses multiple geolocation providers with automatic fallback for maximum reliability
 * Eliminates 403/CORS errors by trying multiple services
 * Provides caching, opt-out mechanisms, and graceful fallbacks
 * 
 * Geolocation Providers (in order of preference):
 * 1. ipapi.co - Free tier with excellent CORS support
 * 2. geojs.io - Completely free, no rate limits
 * 3. ip-api.com - Fallback option
 * 
 * Fallback Strategy:
 * - Network providers (tries all in sequence)
 * - Timezone-based detection
 * - Browser language preference
 * - Default to English
 */

(function(window) {
    'use strict';

    // Configuration defaults
    const DEFAULT_CONFIG = {
        enabled: true,
        useCache: true,
        cacheTimeoutMs: 24 * 60 * 60 * 1000, // 24 hours
        networkTimeoutMs: 8000, // 8 seconds
        debugMode: false,
        privacy: {
            requireConsent: false,
            consentStorageKey: 'aiw_geo_consent'
        },
        fallbackToTimezone: true,
        silentErrors: true // Silent in production, unless debugMode is true
    };

    // Cache keys
    const CACHE_KEYS = {
        country: 'aiw_geo_country',
        timestamp: 'aiw_geo_timestamp',
        consent: 'aiw_geo_consent'
    };

    // Multiple geolocation providers for reliability
    // Using a cascading approach with fallbacks for maximum reliability
    const GEOLOCATION_PROVIDERS = [
        {
            name: 'ipapi.co',
            url: 'https://ipapi.co/json/',
            extractCountry: (data) => data.country_code || data.country || null,
            timeout: 5000
        },
        {
            name: 'ipify+geojs',
            // This is a two-step process: first get IP, then get location
            // We'll use a simpler single-step approach with geojs.io
            url: 'https://get.geojs.io/v1/ip/country.json',
            extractCountry: (data) => data.country || null,
            timeout: 5000
        },
        {
            name: 'ip-api.com',
            url: 'https://ip-api.com/json/?fields=status,countryCode',
            extractCountry: (data) => data.status === 'success' ? data.countryCode : null,
            timeout: 5000
        }
    ];

    // Country to language mapping for timezone-based detection
    // Enhanced with more German-speaking regions for better coverage
    const TIMEZONE_TO_COUNTRY = {
        // German-speaking timezones (Germany, Austria, Switzerland, Liechtenstein)
        'Europe/Berlin': 'DE',
        'Europe/Vienna': 'AT',  // Austria
        'Europe/Zurich': 'CH',  // Switzerland
        'Europe/Vaduz': 'LI',   // Liechtenstein
        'Europe/Luxembourg': 'LU', // Luxembourg
        
        // Other European timezones
        'Europe/London': 'GB',
        'Europe/Paris': 'FR',
        'Europe/Madrid': 'ES',
        'Europe/Rome': 'IT',
        'Europe/Brussels': 'BE',  // Belgium
        'Europe/Amsterdam': 'NL', // Netherlands
        
        // US timezones
        'America/New_York': 'US',
        'America/Los_Angeles': 'US',
        'America/Chicago': 'US',
        'America/Denver': 'US',
        'America/Phoenix': 'US',
        
        // Asian timezones
        'Asia/Tokyo': 'JP',
        'Asia/Shanghai': 'CN',
        'Asia/Hong_Kong': 'HK',
        'Asia/Singapore': 'SG',
        
        // Australian timezones
        'Australia/Sydney': 'AU',
        'Australia/Melbourne': 'AU',
        'Australia/Perth': 'AU'
    };

    class AIWGeo {
        constructor(config = {}) {
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.debugLog = this.config.debugMode ? console.log.bind(console, '[AIWGeo]') : () => {};
            this.errorLog = this.config.silentErrors && !this.config.debugMode ? 
                () => {} : console.error.bind(console, '[AIWGeo Error]');
        }

        /**
         * Main public method: Get country code with caching and privacy controls
         * Enhanced with detailed logging for debugging geolocation issues
         * 
         * @param {Object} options - Override options for this request
         * @returns {Promise<string|null>} Country code (ISO 3166-1 alpha-2) or null
         */
        async getCountry(options = {}) {
            const requestConfig = { ...this.config, ...options };
            
            this.debugLog('=== Getting country code ===');
            this.debugLog('Config:', {
                enabled: requestConfig.enabled,
                useCache: requestConfig.useCache,
                requireConsent: requestConfig.privacy.requireConsent,
                fallbackToTimezone: requestConfig.fallbackToTimezone
            });

            // Check if geolocation is disabled
            if (!requestConfig.enabled) {
                this.debugLog('✗ Geolocation disabled by configuration');
                return null;
            }

            // Check privacy consent if required
            if (requestConfig.privacy.requireConsent && !this.hasConsent()) {
                this.debugLog('✗ Geolocation consent not granted');
                return null;
            }

            // Try server-provided country first
            if (requestConfig.serverCountry) {
                this.debugLog('✓ Using server-provided country:', requestConfig.serverCountry);
                return requestConfig.serverCountry.toUpperCase();
            }

            // Try cached country
            if (requestConfig.useCache) {
                const cachedCountry = this.getCachedCountry();
                if (cachedCountry) {
                    this.debugLog('✓ Using cached country:', cachedCountry);
                    return cachedCountry;
                }
                this.debugLog('ℹ No valid cached country found');
            }

            // Attempt network-based detection
            try {
                this.debugLog('Attempting network-based country detection...');
                const networkCountry = await this.detectCountryFromNetwork(requestConfig);
                if (networkCountry) {
                    // Cache the result
                    if (requestConfig.useCache) {
                        this.setCachedCountry(networkCountry);
                        this.debugLog('✓ Cached country for future requests');
                    }
                    this.debugLog('✓ Successfully detected country from network:', networkCountry);
                    return networkCountry;
                }
            } catch (error) {
                this.errorLog('Network country detection failed:', error.message);
                this.debugLog('Falling back to alternative methods...');
            }

            // Fallback to timezone-based detection
            if (requestConfig.fallbackToTimezone) {
                this.debugLog('Attempting timezone-based country detection...');
                const timezoneCountry = this.detectCountryFromTimezone();
                if (timezoneCountry) {
                    this.debugLog('✓ Using timezone-based country:', timezoneCountry);
                    return timezoneCountry;
                }
                this.debugLog('✗ Timezone detection did not yield a country');
            }

            this.debugLog('✗ All country detection methods failed');
            return null;
        }

        /**
         * Detect country from network using multiple providers with automatic fallback
         * Tries providers in order until one succeeds, providing maximum reliability
         * 
         * Providers tried in order:
         * 1. ipapi.co - Free tier with good CORS support
         * 2. geojs.io - Completely free, no rate limits
         * 3. ip-api.com - Fallback option
         * 
         * @param {Object} config Configuration options
         * @returns {Promise<string|null>} ISO 3166-1 alpha-2 country code or null
         */
        async detectCountryFromNetwork(config) {
            this.debugLog('Starting multi-provider network-based country detection');

            // Try each provider in sequence until one succeeds
            for (let i = 0; i < GEOLOCATION_PROVIDERS.length; i++) {
                const provider = GEOLOCATION_PROVIDERS[i];
                
                try {
                    this.debugLog(`Trying provider ${i + 1}/${GEOLOCATION_PROVIDERS.length}:`, provider.name);
                    
                    const country = await this.tryGeolocationProvider(provider, config);
                    
                    if (country) {
                        this.debugLog(`✓ Successfully detected country from ${provider.name}:`, country);
                        return country;
                    }
                    
                    this.debugLog(`✗ Provider ${provider.name} returned no country, trying next...`);
                    
                } catch (error) {
                    this.debugLog(`✗ Provider ${provider.name} failed:`, error.message);
                    
                    // If this is not the last provider, continue to the next one
                    if (i < GEOLOCATION_PROVIDERS.length - 1) {
                        this.debugLog('Falling back to next provider...');
                        continue;
                    }
                    
                    // If this was the last provider, throw the error
                    this.debugLog('All geolocation providers failed');
                    throw new Error('All geolocation providers failed');
                }
            }
            
            // If we get here, all providers returned null
            this.debugLog('✗ All providers returned null, no country detected');
            return null;
        }

        /**
         * Try a single geolocation provider
         * 
         * @param {Object} provider Provider configuration
         * @param {Object} config Request configuration
         * @returns {Promise<string|null>} Country code or null
         */
        async tryGeolocationProvider(provider, config) {
            const controller = new AbortController();
            const timeout = provider.timeout || config.networkTimeoutMs;
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            try {
                this.debugLog('Fetching from:', provider.url);
                
                const response = await fetch(provider.url, {
                    method: 'GET',
                    signal: controller.signal,
                    headers: {
                        'Accept': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'no-cache' // Prevent stale cached responses
                });

                clearTimeout(timeoutId);

                // Handle HTTP errors
                if (!response.ok) {
                    // Special handling for 403 errors (common CORS/rate limit issue)
                    if (response.status === 403) {
                        throw new Error(`Provider blocked request (403 Forbidden) - likely CORS or rate limit`);
                    }
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                this.debugLog('Received data from', provider.name, ':', data);
                
                const country = provider.extractCountry(data);

                // Validate country code format (ISO 3166-1 alpha-2)
                if (country && typeof country === 'string' && /^[A-Z]{2}$/i.test(country)) {
                    // Ensure uppercase
                    return country.toUpperCase();
                }

                // Invalid or missing country code
                this.debugLog('Invalid country code format from', provider.name, ':', country);
                return null;

            } catch (error) {
                clearTimeout(timeoutId);
                
                // Categorize errors for better debugging
                if (error.name === 'AbortError') {
                    throw new Error(`Timeout after ${timeout}ms`);
                } else if (error.message.includes('403')) {
                    throw new Error('403 Forbidden - CORS or rate limit issue');
                } else if (error.message.includes('CORS') || error.message.includes('cors')) {
                    throw new Error('CORS policy blocked request');
                } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                    throw new Error('Network connectivity issue');
                } else {
                    throw error;
                }
            }
        }

        /**
         * Detect country from browser timezone (privacy-friendly fallback)
         */
        detectCountryFromTimezone() {
            try {
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                this.debugLog('Detected timezone:', timezone);
                
                return TIMEZONE_TO_COUNTRY[timezone] || null;
            } catch (error) {
                this.debugLog('Timezone detection failed:', error.message);
                return null;
            }
        }

        /**
         * Cache management methods
         */
        getCachedCountry() {
            try {
                const timestamp = localStorage.getItem(CACHE_KEYS.timestamp);
                const country = localStorage.getItem(CACHE_KEYS.country);

                if (!timestamp || !country) {
                    return null;
                }

                const age = Date.now() - parseInt(timestamp, 10);
                if (age > this.config.cacheTimeoutMs) {
                    this.clearCache();
                    return null;
                }

                return country;
            } catch (error) {
                this.debugLog('Cache read failed:', error.message);
                return null;
            }
        }

        setCachedCountry(country) {
            try {
                localStorage.setItem(CACHE_KEYS.country, country);
                localStorage.setItem(CACHE_KEYS.timestamp, Date.now().toString());
            } catch (error) {
                this.debugLog('Cache write failed:', error.message);
            }
        }

        clearCache() {
            try {
                localStorage.removeItem(CACHE_KEYS.country);
                localStorage.removeItem(CACHE_KEYS.timestamp);
            } catch (error) {
                this.debugLog('Cache clear failed:', error.message);
            }
        }

        /**
         * Privacy consent management
         */
        hasConsent() {
            try {
                return localStorage.getItem(CACHE_KEYS.consent) === 'true';
            } catch (error) {
                return false;
            }
        }

        grantConsent() {
            try {
                localStorage.setItem(CACHE_KEYS.consent, 'true');
                return true;
            } catch (error) {
                this.debugLog('Failed to save consent:', error.message);
                return false;
            }
        }

        revokeConsent() {
            try {
                localStorage.removeItem(CACHE_KEYS.consent);
                this.clearCache(); // Clear any cached location data
                return true;
            } catch (error) {
                this.debugLog('Failed to revoke consent:', error.message);
                return false;
            }
        }

        /**
         * Utility methods
         */
        isEnabled() {
            return this.config.enabled;
        }

        getConfig() {
            return { ...this.config };
        }

        // Method to update configuration
        updateConfig(newConfig) {
            this.config = { ...this.config, ...newConfig };
            this.debugLog = this.config.debugMode ? console.log.bind(console, '[AIWGeo]') : () => {};
            this.errorLog = this.config.silentErrors && !this.config.debugMode ? 
                () => {} : console.error.bind(console, '[AIWGeo Error]');
        }
    }

    // Create and export singleton instance
    const aiwGeo = new AIWGeo();

    // Export to global scope
    if (typeof window !== 'undefined') {
        window.AIWGeo = aiwGeo;
    }

    // Also support module exports for testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { AIWGeo: AIWGeo, aiwGeo: aiwGeo };
    }

})(typeof window !== 'undefined' ? window : global);