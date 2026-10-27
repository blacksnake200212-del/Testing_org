<?php
/**
 * Default Page Template
 */
get_header();

while (have_posts()) : the_post();
?>

<div style="background: var(--navy); color: #ffffff; padding: 45px 0;">
    <div class="container">
        <h1 style="font-family: var(--font-heading); font-size: 36px; font-weight: 800; color: #ffffff; margin: 0;">
            <?php the_title(); ?>
        </h1>
    </div>
</div>

<main style="padding: 50px 0 80px 0;">
    <div class="container" style="max-width: 900px;">
        <div class="org-entry-content" style="background: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid var(--slate-border); font-size: 15px; line-height: 1.8;">
            <?php the_content(); ?>
        </div>
    </div>
</main>

<?php
endwhile;
get_footer();
