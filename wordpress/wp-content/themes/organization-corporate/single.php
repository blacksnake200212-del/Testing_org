<?php
/**
 * Single Post Template (News Article)
 */
get_header();

while (have_posts()) : the_post();
    $categories = get_the_category();
    $cat_name   = !empty($categories) ? esc_html($categories[0]->name) : 'Announcement';
?>

<div style="background: #f1f5f9; padding: 14px 0; border-bottom: 1px solid var(--slate-border); font-size: 13px;">
    <div class="container">
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php _e('Home', 'org-corporate'); ?></a>
        <span style="margin: 0 6px; color: #94a3b8;">/</span>
        <a href="<?php echo esc_url(home_url('/news')); ?>"><?php _e('News', 'org-corporate'); ?></a>
        <span style="margin: 0 6px; color: #94a3b8;">/</span>
        <span style="color: #64748b;"><?php the_title(); ?></span>
    </div>
</div>

<article style="padding: 50px 0 80px 0;">
    <div class="container" style="max-width: 840px;">
        <!-- Header -->
        <header style="margin-bottom: 30px;">
            <span style="display: inline-block; background: var(--primary-light); color: var(--primary); font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px;">
                <?php echo $cat_name; ?>
            </span>
            <h1 style="font-family: var(--font-heading); font-size: 38px; font-weight: 800; color: var(--navy); line-height: 1.25; margin-bottom: 16px;">
                <?php the_title(); ?>
            </h1>

            <div style="display: flex; gap: 16px; font-size: 13px; color: #64748b; border-top: 1px solid var(--slate-border); border-bottom: 1px solid var(--slate-border); padding: 12px 0;">
                <span>📅 <?php echo get_the_date('l, F j, Y'); ?></span>
                <span>•</span>
                <span>✍ By <?php the_author(); ?></span>
            </div>
        </header>

        <!-- Featured Image -->
        <?php if (has_post_thumbnail()) : ?>
            <div style="margin-bottom: 34px; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                <?php the_post_thumbnail('full'); ?>
            </div>
        <?php endif; ?>

        <!-- Content -->
        <div class="org-entry-content" style="font-size: 16px; line-height: 1.8; color: #334155;">
            <?php the_content(); ?>
        </div>

        <!-- Footer -->
        <footer style="margin-top: 50px; padding-top: 24px; border-top: 1px solid var(--slate-border); display: flex; justify-content: space-between; align-items: center;">
            <a href="<?php echo esc_url(home_url('/news')); ?>" style="font-weight: 700; font-size: 14px;">
                ← <?php _e('Back to News Archive', 'org-corporate'); ?>
            </a>
            <button onclick="navigator.clipboard.writeText(window.location.href); alert('Article URL copied to clipboard!');" style="background: #f1f5f9; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
                🔗 <?php _e('Share Article', 'org-corporate'); ?>
            </button>
        </footer>
    </div>
</article>

<?php
endwhile;
get_footer();
