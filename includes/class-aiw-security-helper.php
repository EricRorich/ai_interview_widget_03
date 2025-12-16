<?php
/**
 * Security Helper Class for AI Interview Widget
 * 
 * Provides centralized security functions including input validation,
 * sanitization, and rate limiting helpers.
 * 
 * @package AIInterviewWidget
 * @since 1.9.6
 */

defined('ABSPATH') or die('No script kiddies please!');

class AIW_Security_Helper {
    
    /**
     * Validate API key formats for different providers
     * 
     * @param string $api_key The API key to validate
     * @param string $provider The provider name (openai, anthropic, elevenlabs, etc.)
     * @return array Array with 'valid' boolean and 'message' string
     */
    public static function validate_api_key($api_key, $provider = 'openai') {
        $api_key = trim($api_key);
        
        // Empty keys are valid (optional configuration)
        if (empty($api_key)) {
            return array('valid' => true, 'message' => '');
        }
        
        // Basic security check - no obvious malicious patterns
        if (self::contains_malicious_patterns($api_key)) {
            return array(
                'valid' => false, 
                'message' => 'Invalid API key format - contains suspicious characters'
            );
        }
        
        switch (strtolower($provider)) {
            case 'openai':
            case 'azure':
                // OpenAI keys start with 'sk-' and are typically 48-51 characters
                // Maximum length set to prevent DoS attacks
                if (!preg_match('/^sk-[A-Za-z0-9]{40,150}$/', $api_key)) {
                    return array(
                        'valid' => false,
                        'message' => 'Invalid OpenAI API key format. Should start with "sk-" followed by 40-150 alphanumeric characters.'
                    );
                }
                break;
                
            case 'anthropic':
                // Anthropic keys start with 'sk-ant-' and vary in length
                // Typical length is around 95-108 characters after prefix
                if (!preg_match('/^sk-ant-[A-Za-z0-9_-]{80,120}$/', $api_key)) {
                    return array(
                        'valid' => false,
                        'message' => 'Invalid Anthropic API key format. Should start with "sk-ant-".'
                    );
                }
                break;
                
            case 'elevenlabs':
                // ElevenLabs keys are typically 32 character hex strings
                if (!preg_match('/^[A-Za-z0-9]{20,64}$/', $api_key)) {
                    return array(
                        'valid' => false,
                        'message' => 'Invalid ElevenLabs API key format. Should be 20-64 alphanumeric characters.'
                    );
                }
                break;
                
            case 'gemini':
            case 'google':
                // Google API keys are typically 39 characters
                if (!preg_match('/^AIza[A-Za-z0-9_-]{35}$/', $api_key)) {
                    return array(
                        'valid' => false,
                        'message' => 'Invalid Google/Gemini API key format. Should start with "AIza".'
                    );
                }
                break;
                
            default:
                // Generic validation for unknown providers
                if (strlen($api_key) < 20 || strlen($api_key) > 200) {
                    return array(
                        'valid' => false,
                        'message' => 'API key length should be between 20 and 200 characters.'
                    );
                }
        }
        
        return array('valid' => true, 'message' => '');
    }
    
    /**
     * Check for malicious patterns in input
     * 
     * @param string $input The input to check
     * @return bool True if malicious patterns detected
     */
    private static function contains_malicious_patterns($input) {
        // Check for SQL injection patterns
        $sql_patterns = array(
            '/(\bUNION\b|\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i',
            '/(\bOR\b\s+["\']?\d+["\']?\s*=\s*["\']?\d+)/i',
            '/(\bAND\b\s+["\']?\d+["\']?\s*=\s*["\']?\d+)/i',
        );
        
        // Check for XSS patterns
        $xss_patterns = array(
            '/<script[^>]*>.*?<\/script>/is',
            '/javascript:/i',
            '/on\w+\s*=/i',
        );
        
        $all_patterns = array_merge($sql_patterns, $xss_patterns);
        
        foreach ($all_patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Sanitize API key for storage
     * 
     * @param string $api_key The API key to sanitize
     * @return string Sanitized API key
     */
    public static function sanitize_api_key($api_key) {
        // Remove whitespace
        $api_key = trim($api_key);
        
        // Remove any non-alphanumeric characters except hyphens and underscores
        // (common in API keys)
        $api_key = preg_replace('/[^A-Za-z0-9_-]/', '', $api_key);
        
        return $api_key;
    }
    
    /**
     * Verify nonce with better error messages
     * 
     * @param string $nonce The nonce to verify
     * @param string $action The action name
     * @return bool True if valid
     */
    public static function verify_nonce_with_logging($nonce, $action) {
        $result = wp_verify_nonce($nonce, $action);
        
        if (!$result) {
            error_log(sprintf(
                'AI Interview Widget: Nonce verification failed for action "%s" from IP %s',
                $action,
                self::get_client_ip()
            ));
        }
        
        return (bool) $result;
    }
    
    /**
     * Get client IP address (supports proxies)
     * 
     * @return string Client IP address
     */
    public static function get_client_ip() {
        $ip = '';
        
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        
        // Sanitize IP
        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : 'unknown';
    }
    
    /**
     * Simple rate limiting check using transients
     * 
     * @param string $action The action being rate limited
     * @param int $limit Maximum requests allowed
     * @param int $window Time window in seconds
     * @return bool True if rate limit not exceeded
     */
    public static function check_rate_limit($action, $limit = 60, $window = 60) {
        $ip = self::get_client_ip();
        $key = 'aiw_rate_' . md5($action . $ip);
        
        $count = get_transient($key);
        
        if ($count === false) {
            // First request in window
            set_transient($key, 1, $window);
            return true;
        }
        
        if ($count >= $limit) {
            error_log(sprintf(
                'AI Interview Widget: Rate limit exceeded for action "%s" from IP %s (count: %d)',
                $action,
                $ip,
                $count
            ));
            return false;
        }
        
        // Increment counter
        set_transient($key, $count + 1, $window);
        return true;
    }
    
    /**
     * Sanitize hex color
     * 
     * @param string $color Hex color string
     * @return string Sanitized hex color or empty string
     */
    public static function sanitize_hex_color($color) {
        // Remove any whitespace
        $color = trim($color);
        
        // Remove # if present
        $color = ltrim($color, '#');
        
        // Validate hex color
        if (preg_match('/^[A-Fa-f0-9]{6}$/', $color)) {
            return '#' . $color;
        }
        
        // Support shorthand
        if (preg_match('/^[A-Fa-f0-9]{3}$/', $color)) {
            return '#' . $color;
        }
        
        return '';
    }
    
    /**
     * Sanitize integer within range
     * 
     * @param mixed $value The value to sanitize
     * @param int $min Minimum allowed value
     * @param int $max Maximum allowed value
     * @param int $default Default value if invalid
     * @return int Sanitized integer
     */
    public static function sanitize_int_range($value, $min, $max, $default) {
        $value = intval($value);
        
        if ($value < $min || $value > $max) {
            return $default;
        }
        
        return $value;
    }
    
    /**
     * Sanitize boolean value
     * 
     * @param mixed $value The value to sanitize
     * @return bool Boolean value
     */
    public static function sanitize_boolean($value) {
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }
    
    /**
     * Sanitize array of allowed values
     * 
     * @param mixed $value The value to check
     * @param array $allowed Array of allowed values
     * @param mixed $default Default value if not in allowed list
     * @return mixed Sanitized value
     */
    public static function sanitize_enum($value, $allowed, $default) {
        if (in_array($value, $allowed, true)) {
            return $value;
        }
        
        return $default;
    }
    
    /**
     * Sanitize file upload
     * 
     * @param array $file $_FILES array entry
     * @param array $allowed_types Allowed MIME types
     * @param int $max_size Maximum file size in bytes
     * @return array Array with 'valid' boolean and 'message' string
     */
    public static function validate_file_upload($file, $allowed_types, $max_size) {
        // Check if file was uploaded
        if (!isset($file['tmp_name']) || empty($file['tmp_name'])) {
            return array('valid' => false, 'message' => 'No file uploaded');
        }
        
        // Check for upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return array('valid' => false, 'message' => 'File upload error: ' . $file['error']);
        }
        
        // Check file size
        if ($file['size'] > $max_size) {
            return array(
                'valid' => false, 
                'message' => sprintf('File too large. Maximum size: %s', size_format($max_size))
            );
        }
        
        // Check MIME type
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime_type = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
        
        if (!in_array($mime_type, $allowed_types, true)) {
            return array(
                'valid' => false, 
                'message' => 'Invalid file type. Allowed: ' . implode(', ', $allowed_types)
            );
        }
        
        return array('valid' => true, 'message' => '');
    }
}
