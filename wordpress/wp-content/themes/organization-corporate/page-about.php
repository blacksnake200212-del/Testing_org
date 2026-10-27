<?php
/**
 * Template Name: About Us
 */
get_header();
?>

<div style="background: var(--navy); color: #ffffff; padding: 50px 0;">
    <div class="container">
        <span style="color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            <?php _e('About the Organization', 'org-corporate'); ?>
        </span>
        <h1 style="font-family: var(--font-heading); font-size: 38px; font-weight: 800; color: #ffffff; margin-top: 6px;">
            <?php _e('Pioneering Ethical Governance & Societal Progress', 'org-corporate'); ?>
        </h1>
        <p style="color: #94a3b8; font-size: 15px; max-width: 650px; margin-top: 10px;">
            <?php bloginfo('description'); ?>
        </p>
    </div>
</div>

<main style="padding: 60px 0 90px 0;">
    <div class="container">
        <!-- Mission & Vision Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 26px; margin-bottom: 60px;">
            <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="font-size: 26px; margin-bottom: 14px;">🎯</div>
                <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 12px;"><?php _e('Our Mission', 'org-corporate'); ?></h3>
                <p style="font-size: 14px; line-height: 1.8; color: #475569;">
                    <?php echo esc_html(get_theme_mod('org_mission', 'To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives that improve societal well-being.')); ?>
                </p>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="font-size: 26px; margin-bottom: 14px;">👁</div>
                <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 12px;"><?php _e('Our Vision', 'org-corporate'); ?></h3>
                <p style="font-size: 14px; line-height: 1.8; color: #475569;">
                    <?php _e('A transparent, resilient, and prosperous society steered by forward-looking leadership and equitable opportunities for all communities.', 'org-corporate'); ?>
                </p>
            </div>
        </div>

        <!-- Four Pillars -->
        <div style="margin-bottom: 60px;">
            <div class="org-section-header">
                <div>
                    <span class="org-section-tag"><?php _e('Institutional Framework', 'org-corporate'); ?></span>
                    <h2 class="org-section-title"><?php _e('Core Governance Pillars', 'org-corporate'); ?></h2>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                <div style="background: #ffffff; padding: 24px; border: 1px solid var(--slate-border); border-radius: 12px;">
                    <h4 style="font-weight: 700; color: var(--navy); margin-bottom: 8px;">🛡 <?php _e('Integrity & Trust', 'org-corporate'); ?></h4>
                    <p style="font-size: 13px; color: #64748b; line-height: 1.6;"><?php _e('Upholding strict statutory and fiduciary standards across all programs, funds, and research publications.', 'org-corporate'); ?></p>
                </div>
                <div style="background: #ffffff; padding: 24px; border: 1px solid var(--slate-border); border-radius: 12px;">
                    <h4 style="font-weight: 700; color: var(--navy); margin-bottom: 8px;">🌱 <?php _e('Sustainable Innovation', 'org-corporate'); ?></h4>
                    <p style="font-size: 13px; color: #64748b; line-height: 1.6;"><?php _e('Encouraging evidence-based civic solutions that preserve environmental capital and build resilience.', 'org-corporate'); ?></p>
                </div>
                <div style="background: #ffffff; padding: 24px; border: 1px solid var(--slate-border); border-radius: 12px;">
                    <h4 style="font-weight: 700; color: var(--navy); margin-bottom: 8px;">🤝 <?php _e('Equitable Access', 'org-corporate'); ?></h4>
                    <p style="font-size: 13px; color: #64748b; line-height: 1.6;"><?php _e('Guaranteeing equal participation for regional districts and emerging grassroots leaders.', 'org-corporate'); ?></p>
                </div>
                <div style="background: #ffffff; padding: 24px; border: 1px solid var(--slate-border); border-radius: 12px;">
                    <h4 style="font-weight: 700; color: var(--navy); margin-bottom: 8px;">📊 <?php _e('Open Transparency', 'org-corporate'); ?></h4>
                    <p style="font-size: 13px; color: #64748b; line-height: 1.6;"><?php _e('Publishing unedited independent financial audits and board resolutions for unrestricted public review.', 'org-corporate'); ?></p>
                </div>
            </div>
        </div>

        <!-- Page Content if Editor has text -->
        <?php while (have_posts()) : the_post(); ?>
            <?php if (get_the_content()) : ?>
                <div style="background: #ffffff; padding: 36px; border: 1px solid var(--slate-border); border-radius: 16px; margin-top: 30px; font-size: 15px; line-height: 1.8;">
                    <?php the_content(); ?>
                </div>
            <?php endif; ?>
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
