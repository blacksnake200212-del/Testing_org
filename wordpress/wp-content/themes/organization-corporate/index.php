<?php
/**
 * News Archive & Listing Template
 */
get_header();
?>

<div style="background: var(--navy); color: #ffffff; padding: 50px 0;">
    <div class="container">
        <span style="color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            <?php _e('Media & Public Records', 'org-corporate'); ?>
        </span>
        <h1 style="font-family: var(--font-heading); font-size: 38px; font-weight: 800; color: #ffffff; margin-top: 6px;">
            <?php _e('News, Declarations & Announcements', 'org-corporate'); ?>
        </h1>
        <p style="color: #94a3b8; font-size: 15px; max-width: 650px; margin-top: 10px;">
            <?php _e('Official communiqués, public press releases, statutory updates, and event briefs from the National Secretariat.', 'org-corporate'); ?>
        </p>
    </div>
</div>

<main style="padding: 50px 0;">
    <div class="container">
        <!-- Categories Filter -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; padding-bottom: 20px; border-bottom: 1px solid var(--slate-border);">
            <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts')) ?: home_url('/news')); ?>" style="background: var(--navy); color: #fff; font-size: 12px; font-weight: 700; padding: 6px 14px; border-radius: 6px;">
                <?php _e('All Categories', 'org-corporate'); ?>
            </a>
            <?php
            $cats = get_categories();
            foreach ($cats as $cat) {
                echo '<a href="' . esc_url(get_category_link($cat->term_id)) . '" style="background: #f1f5f9; color: #334155; font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 6px;">' . esc_html($cat->name) . ' (' . $cat->count . ')</a>';
            }
            ?>
        </div>

        <?php if (have_posts()) : ?>
            <div class="org-news-grid">
                <?php while (have_posts()) : the_post();
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
                <?php endwhile; ?>
            </div>

            <div style="text-align: center; margin-top: 40px;">
                <?php the_posts_pagination(array(
                    'mid_size'  => 2,
                    'prev_text' => __('« Previous', 'org-corporate'),
                    'next_text' => __('Next »', 'org-corporate'),
                )); ?>
            </div>

        <?php else : ?>
            <div style="text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 16px; border: 1px dashed var(--slate-border);">
                <h3><?php _e('No articles found', 'org-corporate'); ?></h3>
                <p><?php _e('Check back soon for new public releases.', 'org-corporate'); ?></p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
