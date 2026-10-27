<?php
/**
 * Single Director Template
 */
get_header();

while (have_posts()) : the_post();
    $director_id = get_the_ID();
    $position    = get_post_meta($director_id, '_director_position', true);
    $status      = get_post_meta($director_id, '_director_status', true);
    $tenure      = get_post_meta($director_id, '_director_tenure', true);
    $email       = get_post_meta($director_id, '_director_email', true);
    $linkedin    = get_post_meta($director_id, '_director_linkedin', true);
    $terms       = get_the_term_list($director_id, 'director_committee', '', ', ', '');
?>

<div style="background: #f1f5f9; padding: 14px 0; border-bottom: 1px solid var(--slate-border); font-size: 13px;">
    <div class="container">
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php _e('Home', 'org-corporate'); ?></a>
        <span style="margin: 0 6px; color: #94a3b8;">/</span>
        <a href="<?php echo esc_url(home_url('/directors')); ?>"><?php _e('Board of Directors', 'org-corporate'); ?></a>
        <span style="margin: 0 6px; color: #94a3b8;">/</span>
        <span style="color: #64748b;"><?php the_title(); ?></span>
    </div>
</div>

<main style="padding: 60px 0 90px 0;">
    <div class="container" style="max-width: 900px;">
        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 40px; align-items: start;">
            <!-- Portrait Column -->
            <div>
                <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); background: #e2e8f0; aspect-ratio: 1/1;">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('large', array('style' => 'width:100%; height:100%; object-fit:cover;')); ?>
                    <?php else : ?>
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" alt="<?php the_title_attribute(); ?>" style="width:100%; height:100%; object-fit:cover;" />
                    <?php endif; ?>
                </div>

                <div style="margin-top: 20px; font-size: 13px; color: #475569; space-y: 8px;">
                    <?php if ($status === 'emeritus') : ?>
                        <p><span style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 3px 8px; border-radius: 12px; font-weight: 700; font-size: 11px; text-transform: uppercase;"><?php _e('Emeritus Member', 'org-corporate'); ?></span></p>
                    <?php else : ?>
                        <p><span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 3px 8px; border-radius: 12px; font-weight: 700; font-size: 11px; text-transform: uppercase;"><?php _e('Active Member', 'org-corporate'); ?></span></p>
                    <?php endif; ?>

                    <?php if ($tenure) : ?>
                        <p style="margin-top: 10px;"><strong><?php _e('Tenure:', 'org-corporate'); ?></strong> <?php echo esc_html($tenure); ?></p>
                    <?php endif; ?>

                    <?php if ($terms) : ?>
                        <p style="margin-top: 6px;"><strong><?php _e('Committee:', 'org-corporate'); ?></strong> <?php echo $terms; ?></p>
                    <?php endif; ?>
                </div>

                <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 8px;">
                    <?php if ($email) : ?>
                        <a href="mailto:<?php echo esc_attr($email); ?>" style="display: block; padding: 8px 12px; background: #f1f5f9; border-radius: 6px; font-size: 12px; font-weight: 600; text-align: center; color: #1e293b;">
                            ✉ <?php _e('Send Inquiry', 'org-corporate'); ?>
                        </a>
                    <?php endif; ?>
                    <?php if ($linkedin) : ?>
                        <a href="<?php echo esc_url($linkedin); ?>" target="_blank" rel="noopener noreferrer" style="display: block; padding: 8px 12px; background: #0284c7; border-radius: 6px; font-size: 12px; font-weight: 600; text-align: center; color: #ffffff;">
                            in LinkedIn Profile
                        </a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Details Column -->
            <div>
                <span style="color: var(--primary); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">
                    <?php echo $terms ? wp_strip_all_tags($terms) : __('Board Member', 'org-corporate'); ?>
                </span>
                <h1 style="font-family: var(--font-heading); font-size: 32px; font-weight: 800; color: var(--navy); margin-bottom: 6px;">
                    <?php the_title(); ?>
                </h1>
                <h3 style="font-size: 18px; font-weight: 600; color: var(--primary); margin-bottom: 24px;">
                    <?php echo esc_html($position); ?>
                </h3>

                <div style="border-top: 1px solid var(--slate-border); padding-top: 20px;">
                    <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 14px;">
                        <?php _e('Executive Biography', 'org-corporate'); ?>
                    </h4>
                    <div style="font-size: 15px; line-height: 1.8; color: #334155;">
                        <?php the_content(); ?>
                    </div>
                </div>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--slate-border);">
                    <a href="<?php echo esc_url(home_url('/directors')); ?>" style="font-weight: 700; font-size: 13px;">
                        ← <?php _e('Back to Board of Directors Gallery', 'org-corporate'); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>

<?php
endwhile;
get_footer();
