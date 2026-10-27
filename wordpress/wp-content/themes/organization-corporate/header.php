<?php
/**
 * Header Template
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Micro Topbar -->
<div class="org-topbar">
    <div class="container">
        <div class="org-topbar-inner">
            <div class="org-topbar-left">
                <span>📞 <?php echo esc_html(get_theme_mod('org_phone', '+94 11 289 4500')); ?></span>
                <span>✉ <a href="mailto:<?php echo esc_attr(get_theme_mod('org_email', 'info@organization.lk')); ?>"><?php echo esc_html(get_theme_mod('org_email', 'info@organization.lk')); ?></a></span>
                <span>🏛 Reg: <?php echo esc_html(get_theme_mod('org_reg_no', 'GA-2008-8841')); ?></span>
            </div>
            <div class="org-topbar-right">
                <?php if (is_user_logged_in()) : ?>
                    <a href="<?php echo esc_url(admin_url()); ?>">
                        <span>⚙ <?php _e('Staff Dashboard', 'org-corporate'); ?></span>
                    </a>
                <?php else : ?>
                    <a href="<?php echo esc_url(wp_login_url()); ?>">
                        <span>🔒 <?php _e('Staff CMS Login', 'org-corporate'); ?></span>
                    </a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<!-- Main Header -->
<header class="org-header">
    <div class="container">
        <div class="org-navbar">
            <div class="org-brand">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="org-brand-link" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <div class="org-brand-logo">🏛</div>
                        <div class="org-brand-text">
                            <h1><?php bloginfo('name'); ?></h1>
                            <p><?php bloginfo('description'); ?></p>
                        </div>
                    <?php endif; ?>
                </a>
            </div>

            <!-- Desktop Nav Menu -->
            <nav class="org-nav-menu" id="org-main-nav">
                <?php
                if (has_nav_menu('primary')) {
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'depth'          => 2,
                    ));
                } else {
                    // Default institutional menu fallback
                    echo '<ul>';
                    echo '<li><a href="' . esc_url(home_url('/')) . '">' . __('Home', 'org-corporate') . '</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/about')) . '">' . __('About Us', 'org-corporate') . '</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/news')) . '">' . __('News & Announcements', 'org-corporate') . '</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/directors')) . '">' . __('Board of Directors', 'org-corporate') . '</a></li>';
                    echo '<li><a href="' . esc_url(home_url('/contact')) . '">' . __('Contact Us', 'org-corporate') . '</a></li>';
                    echo '<li><a href="' . esc_url(admin_url()) . '" class="org-btn-staff-portal">' . __('Staff Portal', 'org-corporate') . '</a></li>';
                    echo '</ul>';
                }
                ?>
            </nav>

            <!-- Mobile Hamburger Toggle -->
            <button class="org-mobile-toggle" id="org-mobile-menu-btn" aria-label="<?php esc_attr_e('Toggle navigation', 'org-corporate'); ?>">
                ☰
            </button>
        </div>
    </div>
</header>
