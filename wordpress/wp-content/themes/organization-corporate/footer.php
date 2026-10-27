<?php
/**
 * Footer Template
 */
?>
<footer class="org-footer">
    <div class="container">
        <div class="org-footer-grid">
            <!-- Col 1: Brand & Mission -->
            <div class="org-footer-col">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <span style="font-size: 24px;">🏛</span>
                    <h3 style="color: #ffffff; font-family: var(--font-heading); font-size: 18px; margin: 0; font-weight: 800;">
                        <?php bloginfo('name'); ?>
                    </h3>
                </div>
                <p style="font-size: 13px; line-height: 1.7; color: #94a3b8; margin-bottom: 14px; max-width: 360px;">
                    <?php echo esc_html(get_theme_mod('org_mission', 'An independent national apex organization dedicated to sustainable institutional development, public policy research, leadership excellence, and community advancement.')); ?>
                </p>
                <p style="font-size: 11px; color: #64748b;">
                    <?php _e('Statutory Charter:', 'org-corporate'); ?> <strong><?php echo esc_html(get_theme_mod('org_reg_no', 'GA-2008-8841')); ?></strong>
                </p>
            </div>

            <!-- Col 2: Navigation Links -->
            <div class="org-footer-col">
                <h4><?php _e('Quick Links', 'org-corporate'); ?></h4>
                <ul>
                    <li><a href="<?php echo esc_url(home_url('/')); ?>"><?php _e('Home', 'org-corporate'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/about')); ?>"><?php _e('About Us & Mission', 'org-corporate'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/news')); ?>"><?php _e('News & Announcements', 'org-corporate'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/directors')); ?>"><?php _e('Board of Directors', 'org-corporate'); ?></a></li>
                    <li><a href="<?php echo esc_url(home_url('/contact')); ?>"><?php _e('Contact Information', 'org-corporate'); ?></a></li>
                </ul>
            </div>

            <!-- Col 3: Public Governance -->
            <div class="org-footer-col">
                <h4><?php _e('Governance', 'org-corporate'); ?></h4>
                <ul>
                    <li><a href="#"><?php _e('Open Audit Reports', 'org-corporate'); ?></a></li>
                    <li><a href="#"><?php _e('Statutory Resolutions', 'org-corporate'); ?></a></li>
                    <li><a href="#"><?php _e('District Hubs Network', 'org-corporate'); ?></a></li>
                    <li><a href="<?php echo esc_url(admin_url()); ?>" style="color: #60a5fa; font-weight: 700;"><?php _e('🔒 Staff CMS Portal', 'org-corporate'); ?></a></li>
                </ul>
            </div>

            <!-- Col 4: Contact -->
            <div class="org-footer-col">
                <h4><?php _e('Headquarters', 'org-corporate'); ?></h4>
                <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 8px;">
                    📍 <?php echo esc_html(get_theme_mod('org_address', 'Level 14, Apex Tower, 45 Galle Road, Colombo 03, Sri Lanka')); ?>
                </p>
                <p style="font-size: 13px; color: #94a3b8; margin-bottom: 6px;">
                    📞 <?php echo esc_html(get_theme_mod('org_phone', '+94 11 289 4500')); ?>
                </p>
                <p style="font-size: 13px; color: #94a3b8;">
                    ✉ <a href="mailto:<?php echo esc_attr(get_theme_mod('org_email', 'info@organization.lk')); ?>" style="color: #94a3b8;"><?php echo esc_html(get_theme_mod('org_email', 'info@organization.lk')); ?></a>
                </p>
            </div>
        </div>

        <div class="org-footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'org-corporate'); ?></p>
            <p>
                <?php _e('Built with WordPress + Custom Corporate Theme + Board Management CMS', 'org-corporate'); ?>
            </p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
