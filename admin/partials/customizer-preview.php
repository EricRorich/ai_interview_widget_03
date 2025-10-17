<?php
/**
 * AI Interview Widget - Customizer Preview Partial
 * 
 * Displays a live preview of the widget with current style settings
 * 
 * @version 1.0.0
 * @since 1.9.6
 */

defined('ABSPATH') or die('No script kiddies please!');

// Get current style settings
$style_data = get_option('ai_interview_widget_style_settings', '');
$style_settings = json_decode($style_data, true);

// Get current content settings
$content_data = get_option('ai_interview_widget_content_settings', '');
$content_settings = json_decode($content_data, true);

// Set defaults if no settings exist
if (!is_array($style_settings)) {
    $style_settings = array(
        'container_bg_type' => 'gradient',
        'container_bg_color' => '#0a0a1a',
        'container_bg_gradient_start' => '#667eea',
        'container_bg_gradient_end' => '#764ba2',
        'container_border_radius' => 15,
        'container_padding' => 30,
        'canvas_color' => 'rgba(0, 0, 0, 0.3)',
        'canvas_shadow_color' => '#00cfff',
        'canvas_shadow_intensity' => 30,
        'play_button_size' => 100,
        'play_button_color' => '#00cfff',
        'play_button_icon_color' => '#ffffff',
        'play_button_border_width' => 2,
        'play_button_border_color' => '#00cfff'
    );
}

if (!is_array($content_settings)) {
    $content_settings = array(
        'headline_text' => 'Ask Eric',
        'headline_font_size' => 18,
        'headline_color' => '#ffffff',
        'headline_font_family' => 'inherit'
    );
}

// Extract settings with defaults
$container_bg_type = isset($style_settings['container_bg_type']) ? $style_settings['container_bg_type'] : 'gradient';
$container_bg_color = isset($style_settings['container_bg_color']) ? $style_settings['container_bg_color'] : '#0a0a1a';
$container_bg_gradient_start = isset($style_settings['container_bg_gradient_start']) ? $style_settings['container_bg_gradient_start'] : '#667eea';
$container_bg_gradient_end = isset($style_settings['container_bg_gradient_end']) ? $style_settings['container_bg_gradient_end'] : '#764ba2';
$container_border_radius = isset($style_settings['container_border_radius']) ? $style_settings['container_border_radius'] : 15;
$container_padding = isset($style_settings['container_padding']) ? $style_settings['container_padding'] : 30;

$canvas_color = isset($style_settings['canvas_color']) ? $style_settings['canvas_color'] : 'rgba(0, 0, 0, 0.3)';
$canvas_shadow_color = isset($style_settings['canvas_shadow_color']) ? $style_settings['canvas_shadow_color'] : '#00cfff';
$canvas_shadow_intensity = isset($style_settings['canvas_shadow_intensity']) ? $style_settings['canvas_shadow_intensity'] : 30;

$play_button_size = isset($style_settings['play_button_size']) ? $style_settings['play_button_size'] : 100;
$play_button_color = isset($style_settings['play_button_color']) ? $style_settings['play_button_color'] : '#00cfff';
$play_button_icon_color = isset($style_settings['play_button_icon_color']) ? $style_settings['play_button_icon_color'] : '#ffffff';
$play_button_border_width = isset($style_settings['play_button_border_width']) ? $style_settings['play_button_border_width'] : 2;
$play_button_border_color = isset($style_settings['play_button_border_color']) ? $style_settings['play_button_border_color'] : '#00cfff';

$visualizer_primary_color = isset($style_settings['visualizer_primary_color']) ? $style_settings['visualizer_primary_color'] : '#00cfff';
$visualizer_bar_width = isset($style_settings['visualizer_bar_width']) ? $style_settings['visualizer_bar_width'] : 2;
$visualizer_bar_spacing = isset($style_settings['visualizer_bar_spacing']) ? $style_settings['visualizer_bar_spacing'] : 3;
$visualizer_glow_intensity = isset($style_settings['visualizer_glow_intensity']) ? $style_settings['visualizer_glow_intensity'] : 8;

$headline_text = isset($content_settings['headline_text']) ? $content_settings['headline_text'] : 'Ask Eric';
$headline_font_size = isset($content_settings['headline_font_size']) ? $content_settings['headline_font_size'] : 18;
$headline_color = isset($content_settings['headline_color']) ? $content_settings['headline_color'] : '#ffffff';
$headline_font_family = isset($content_settings['headline_font_family']) ? $content_settings['headline_font_family'] : 'inherit';

// Calculate background style
$container_bg_style = '';
if ($container_bg_type === 'gradient') {
    $container_bg_style = 'background: linear-gradient(135deg, ' . esc_attr($container_bg_gradient_start) . ', ' . esc_attr($container_bg_gradient_end) . ');';
} else {
    $container_bg_style = 'background: ' . esc_attr($container_bg_color) . ';';
}

// Calculate canvas shadow
$canvas_shadow = 'none';
if ($canvas_shadow_intensity > 0) {
    $hex = str_replace('#', '', $canvas_shadow_color);
    $r = hexdec(substr($hex, 0, 2));
    $g = hexdec(substr($hex, 2, 2));
    $b = hexdec(substr($hex, 4, 2));
    
    $glow1 = round($canvas_shadow_intensity * 0.33);
    $glow2 = round($canvas_shadow_intensity * 0.66);
    
    $canvas_shadow = '0 0 ' . $canvas_shadow_intensity . 'px ' . $glow1 . 'px rgba(' . $r . ', ' . $g . ', ' . $b . ', 0.5), ' .
                     '0 0 ' . $canvas_shadow_intensity . 'px ' . $glow2 . 'px rgba(' . $r . ', ' . $g . ', ' . $b . ', 0.3)';
}
?>

<div class="aiw-preview-widget" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
    <div class="aiw-preview-container" style="
        <?php echo $container_bg_style; ?>
        border-radius: <?php echo esc_attr($container_border_radius); ?>px;
        padding: <?php echo esc_attr($container_padding); ?>px;
        text-align: center;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    ">
        <!-- Headline -->
        <h2 class="aiw-preview-headline" style="
            color: <?php echo esc_attr($headline_color); ?>;
            font-size: <?php echo esc_attr($headline_font_size); ?>px;
            font-family: <?php echo esc_attr($headline_font_family); ?>;
            margin: 0 0 20px 0;
            font-weight: 600;
        ">
            <?php echo esc_html($headline_text); ?>
        </h2>

        <!-- Play Button -->
        <div class="preview-play-button aiw-preview-button" style="
            width: <?php echo esc_attr($play_button_size); ?>px;
            height: <?php echo esc_attr($play_button_size); ?>px;
            background: <?php echo esc_attr($play_button_color); ?>;
            color: <?php echo esc_attr($play_button_icon_color); ?>;
            border: <?php echo esc_attr($play_button_border_width); ?>px solid <?php echo esc_attr($play_button_border_color); ?>;
            border-radius: 50%;
            font-size: <?php echo esc_attr($play_button_size * 0.4); ?>px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(0, 207, 255, 0.5);
            transition: all 0.3s ease;
        " title="Play Button Preview">
            <span class="dashicons dashicons-controls-play" style="
                width: <?php echo esc_attr($play_button_size * 0.4); ?>px;
                height: <?php echo esc_attr($play_button_size * 0.4); ?>px;
                font-size: <?php echo esc_attr($play_button_size * 0.4); ?>px;
            "></span>
        </div>

        <!-- Canvas/Visualization Preview -->
        <div class="aiw-preview-canvas" id="previewSoundbar" style="
            background-color: <?php echo esc_attr($canvas_color); ?>;
            box-shadow: <?php echo $canvas_shadow; ?>;
            border-radius: 8px;
            height: 60px;
            width: 100%;
            max-width: 400px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: <?php echo esc_attr($visualizer_bar_spacing); ?>px;
            padding: 10px;
            box-sizing: border-box;
        ">
            <!-- Simple visualization bars -->
            <?php for ($i = 0; $i < 12; $i++): 
                $height = rand(15, 45);
                $delay = $i * 0.1;
                $glow = $visualizer_glow_intensity > 0 ? '0 0 ' . $visualizer_glow_intensity . 'px ' . $visualizer_primary_color : 'none';
            ?>
            <div class="preview-viz-bar" style="
                width: <?php echo esc_attr($visualizer_bar_width); ?>px;
                height: <?php echo $height; ?>px;
                background: <?php echo esc_attr($visualizer_primary_color); ?>;
                border-radius: 2px;
                box-shadow: <?php echo $glow; ?>;
                animation: pulse 1s ease-in-out <?php echo $delay; ?>s infinite alternate;
            "></div>
            <?php endfor; ?>
        </div>

        <!-- Preview info text -->
        <p style="
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            margin: 15px 0 0 0;
            font-style: italic;
        ">
            Live preview - changes update in real-time
        </p>
    </div>
</div>

<style>
@keyframes pulse {
    0% {
        opacity: 0.3;
        transform: scaleY(0.5);
    }
    100% {
        opacity: 1;
        transform: scaleY(1);
    }
}

.preview-play-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 207, 255, 0.7) !important;
}

.aiw-preview-canvas {
    transition: all 0.3s ease;
}
</style>
