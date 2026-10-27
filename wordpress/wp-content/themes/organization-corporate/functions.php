<?php
/**
 * Organization Corporate Theme Functions
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function org_corporate_theme_setup() {
    // Document title tag support
    add_theme_support('title-tag');

    // Enable featured images
    add_theme_support('post-thumbnails');
    add_image_size('org-news-thumb', 800, 500, true);
    add_image_size('org-portrait-thumb', 600, 600, true);

    // Custom Logo
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 240,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 markup support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => __('Primary Header Menu', 'org-corporate'),
        'footer'  => __('Footer Quick Links', 'org-corporate'),
    ));
}
add_action('after_setup_theme', 'org_corporate_theme_setup');

/**
 * Enqueue Theme Scripts and Styles
 */
function org_corporate_enqueue_assets() {
    // Google Fonts
    wp_enqueue_style('org-google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap', array(), null);

    // Theme Stylesheet
    wp_enqueue_style('org-main-style', get_stylesheet_uri(), array(), '1.0.0');

    // Theme JavaScript
    wp_enqueue_script('org-theme-script', get_template_directory_uri() . '/assets/js/corporate.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'org_corporate_enqueue_assets');

/**
 * Organization Customizer Settings
 */
function org_corporate_customizer($wp_customize) {
    // New Section: Organization Institutional Details
    $wp_customize->add_section('org_details_section', array(
        'title'       => __('Organization Information & Contacts', 'org-corporate'),
        'priority'    => 30,
        'description' => __('Configure official telephone, email, registration, and headquarters information.', 'org-corporate'),
    ));

    // Phone / Hotline
    $wp_customize->add_setting('org_phone', array('default' => '+94 11 289 4500', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('org_phone', array(
        'label'    => __('Official Phone Number', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'text',
    ));

    // Email
    $wp_customize->add_setting('org_email', array('default' => 'info@organization.lk', 'sanitize_callback' => 'sanitize_email'));
    $wp_customize->add_control('org_email', array(
        'label'    => __('Official Email', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'email',
    ));

    // Registration Number
    $wp_customize->add_setting('org_reg_no', array('default' => 'GA-2008-8841', 'sanitize_callback' => 'sanitize_text_field'));
    $wp_customize->add_control('org_reg_no', array(
        'label'    => __('Statutory Registration / Charter Number', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'text',
    ));

    // Address
    $wp_customize->add_setting('org_address', array('default' => 'Level 14, Apex Tower, 45 Galle Road, Colombo 03, Sri Lanka', 'sanitize_callback' => 'sanitize_textarea_field'));
    $wp_customize->add_control('org_address', array(
        'label'    => __('Headquarters Address', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'textarea',
    ));

    // Founded Year
    $wp_customize->add_setting('org_founded_year', array('default' => '2008', 'sanitize_callback' => 'absint'));
    $wp_customize->add_control('org_founded_year', array(
        'label'    => __('Founded Year', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'number',
    ));

    // Tagline / Mission
    $wp_customize->add_setting('org_mission', array(
        'default' => 'To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives.',
        'sanitize_callback' => 'sanitize_textarea_field'
    ));
    $wp_customize->add_control('org_mission', array(
        'label'    => __('Mission Statement', 'org-corporate'),
        'section'  => 'org_details_section',
        'type'     => 'textarea',
    ));
}
add_action('customize_register', 'org_corporate_customizer');

/**
 * Excerpt word count limit
 */
function org_custom_excerpt_length($length) {
    return 24;
}
add_filter('excerpt_length', 'org_custom_excerpt_length', 999);

/**
 * Excerpt Read More replacement
 */
function org_custom_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'org_custom_excerpt_more');

/**
 * Standalone Fallback: Register Director CPT in theme if plugin not active
 */
if (!class_exists('Org_Board_Of_Directors')) {
    add_action('init', function() {
        if (!post_type_exists('director')) {
            register_post_type('director', array(
                'label'                 => __('Board of Directors', 'org-corporate'),
                'public'                => true,
                'has_archive'           => true,
                'menu_icon'             => 'dashicons-groups',
                'supports'              => array('title', 'editor', 'thumbnail'),
                'show_in_rest'          => true,
                'rewrite'               => array('slug' => 'directors'),
            ));
        }
    });
}
