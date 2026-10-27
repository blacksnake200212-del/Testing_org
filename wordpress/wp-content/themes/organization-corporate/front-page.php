<?php
/**
 * Front Page Template
 */
get_header();

$founded_year = get_theme_mod('org_founded_year', 2008);
$years_active = max(1, date('Y') - $founded_year);
?>

<!-- Hero Section -->
<section class="org-hero">
    <div class="container">
        <span class="org-hero-tag"><?php _e('Official Institutional Portal', 'org-corporate'); ?></span>
        <h1 class="org-hero-title">
            <?php bloginfo('description'); ?>
        </h1>
        <p class="org-hero-desc">
            <?php echo esc_html(get_theme_mod('org_mission', 'An independent national apex organization dedicated to sustainable institutional development, public policy research, leadership excellence, and community advancement.')); ?>
        </p>
        <div class="org-hero-btns">
            <a href="<?php echo esc_url(home_url('/news')); ?>" class="org-btn-primary">
                <?php _e('Read Latest News & Announcements', 'org-corporate'); ?> →
            </a>
            <a href="<?php echo esc_url(home_url('/directors')); ?>" class="org-btn-secondary">
                <?php _e('Meet the Board of Directors', 'org-corporate'); ?>
            </a>
        </div>
    </div>
</section>

<!-- Stats Ribbon -->
<div class="container org-stats-ribbon">
    <div class="org-stats-grid">
        <div class="org-stat-item">
            <div class="org-stat-number"><?php echo esc_html($years_active); ?>+</div>
            <div class="org-stat-label"><?php _e('Years of Service', 'org-corporate'); ?></div>
            <div class="org-stat-sub"><?php printf(__('Founded in %d', 'org-corporate'), $founded_year); ?></div>
        </div>

        <div class="org-stat-item">
            <?php
            $directors_count = wp_count_posts('director')->publish;
            ?>
            <div class="org-stat-number"><?php echo esc_html($directors_count ? $directors_count : '8'); ?></div>
            <div class="org-stat-label"><?php _e('Governing Directors', 'org-corporate'); ?></div>
            <div class="org-stat-sub"><?php _e('Eminent Leaders & Experts', 'org-corporate'); ?></div>
        </div>

        <div class="org-stat-item">
            <?php
            $news_count = wp_count_posts('post')->publish;
            ?>
            <div class="org-stat-number"><?php echo esc_html($news_count ? $news_count : '24'); ?></div>
            <div class="org-stat-label"><?php _e('Published News & Directives', 'org-corporate'); ?></div>
            <div class="org-stat-sub"><?php _e('Public Media Bureau', 'org-corporate'); ?></div>
        </div>

        <div class="org-stat-item">
            <div class="org-stat-number">100%</div>
            <div class="org-stat-label"><?php _e('Transparency Rating', 'org-corporate'); ?></div>
            <div class="org-stat-sub"><?php _e('Independently Audited', 'org-corporate'); ?></div>
        </div>
    </div>
</div>

<!-- Mission & Vision Section -->
<section style="padding: 30px 0 60px 0;">
    <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 26px;">
            <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="width: 44px; height: 44px; background: #eff6ff; color: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px;">🎯</div>
                <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 12px;"><?php _e('Our Mission', 'org-corporate'); ?></h3>
                <p style="font-size: 14px; line-height: 1.7; color: #475569;">
                    <?php echo esc_html(get_theme_mod('org_mission', 'To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives that improve societal well-being.')); ?>
                </p>
            </div>

            <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <div style="width: 44px; height: 44px; background: #ecfdf5; color: #059669; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px;">👁</div>
                <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 12px;"><?php _e('Our Vision', 'org-corporate'); ?></h3>
                <p style="font-size: 14px; line-height: 1.7; color: #475569;">
                    <?php _e('A transparent, resilient, and prosperous society steered by forward-looking leadership and equitable opportunities for all communities.', 'org-corporate'); ?>
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Latest News Section -->
<section style="padding: 20px 0 70px 0;">
    <div class="container">
        <div class="org-section-header">
            <div>
                <span class="org-section-tag"><?php _e('Press & Media Bureau', 'org-corporate'); ?></span>
                <h2 class="org-section-title"><?php _e('Latest News & Announcements', 'org-corporate'); ?></h2>
            </div>
            <a href="<?php echo esc_url(home_url('/news')); ?>" class="org-section-link">
                <?php _e('View All News', 'org-corporate'); ?> →
            </a>
        </div>

        <div class="org-news-grid">
            <?php
            $recent_news = new WP_Query(array(
                'post_type'      => 'post',
                'posts_per_page' => 3,
                'post_status'    => 'publish',
            ));

            if ($recent_news->have_posts()) :
                while ($recent_news->have_posts()) : $recent_news->the_post();
                    $categories = get_the_category();
                    $cat_name   = !empty($categories) ? esc_html($categories[0]->name) : 'Announcement';
            ?>
                <article class="org-news-card">
                    <div class="org-news-thumb">
                        <a href="<?php the_permalink(); ?>">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('org-news-thumb'); ?>
                            <?php else : ?>
                                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="<?php the_title_attribute(); ?>" />
                            <?php endif; ?>
                        </a>
                    </div>
                    <div class="org-news-body">
                        <div class="org-news-meta">
                            <span class="org-news-category"><?php echo $cat_name; ?></span>
                            <span>•</span>
                            <span><?php echo get_the_date('M j, Y'); ?></span>
                        </div>
                        <h3 class="org-news-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>
                        <div class="org-news-excerpt">
                            <?php the_excerpt(); ?>
                        </div>
                        <div class="org-news-footer">
                            <a href="<?php the_permalink(); ?>"><?php _e('Read Full Article →', 'org-corporate'); ?></a>
                        </div>
                    </div>
                </article>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <p><?php _e('No news published yet. Visit the staff admin dashboard to post your first article!', 'org-corporate'); ?></p>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- Board of Directors Section -->
<section style="background: #f1f5f9; padding: 70px 0; border-top: 1px solid var(--slate-border); border-bottom: 1px solid var(--slate-border);">
    <div class="container">
        <div class="org-section-header">
            <div>
                <span class="org-section-tag"><?php _e('Executive Leadership', 'org-corporate'); ?></span>
                <h2 class="org-section-title"><?php _e('Governing Board of Directors', 'org-corporate'); ?></h2>
            </div>
            <a href="<?php echo esc_url(home_url('/directors')); ?>" class="org-section-link">
                <?php _e('Meet Full Board', 'org-corporate'); ?> →
            </a>
        </div>

        <?php echo do_shortcode('[board_of_directors status="active" columns="4"]'); ?>
    </div>
</section>

<!-- Call to Action Banner -->
<section style="padding: 70px 0;">
    <div class="container">
        <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--navy) 100%); border-radius: 20px; padding: 50px 40px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 30px;">
            <div style="max-width: 650px;">
                <h3 style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; margin-bottom: 10px; color: #ffffff;">
                    <?php _e('Institutional Collaboration & Secretariat Inquiries', 'org-corporate'); ?>
                </h3>
                <p style="font-size: 15px; color: #e2e8f0; line-height: 1.6;">
                    <?php _e('Our Secretariat welcomes public submissions, research partnerships, and media inquiries. Reach out to our communications bureau directly.', 'org-corporate'); ?>
                </p>
            </div>
            <div>
                <a href="<?php echo esc_url(home_url('/contact')); ?>" class="org-btn-primary" style="background: #ffffff; color: var(--navy);">
                    <?php _e('Contact the Secretariat', 'org-corporate'); ?> →
                </a>
            </div>
        </div>
    </div>
</section>

<?php
get_footer();
