<?php
/**
 * Template Name: Board of Directors
 */
get_header();
?>

<div style="background: var(--navy); color: #ffffff; padding: 50px 0;">
    <div class="container">
        <span style="color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            <?php _e('Institutional Leadership', 'org-corporate'); ?>
        </span>
        <h1 style="font-family: var(--font-heading); font-size: 38px; font-weight: 800; color: #ffffff; margin-top: 6px;">
            <?php _e('Governing Board of Directors', 'org-corporate'); ?>
        </h1>
        <p style="color: #94a3b8; font-size: 15px; max-width: 650px; margin-top: 10px;">
            <?php _e('The governing council responsible for statutory oversight, fiduciary integrity, and the strategic mandate of our national charter.', 'org-corporate'); ?>
        </p>
    </div>
</div>

<main style="padding: 50px 0 80px 0;">
    <div class="container">
        <!-- Active Board -->
        <div style="margin-bottom: 60px;">
            <div style="margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid var(--slate-border); display: flex; justify-content: space-between; align-items: center;">
                <h2 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; color: var(--navy);">
                    <?php _e('Active Governing Board', 'org-corporate'); ?>
                </h2>
                <span style="font-size: 12px; background: #ecfdf5; color: #047857; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
                    <?php _e('Current Mandate', 'org-corporate'); ?>
                </span>
            </div>

            <?php echo do_shortcode('[board_of_directors status="active" columns="4"]'); ?>
        </div>

        <!-- Emeritus / Past Board Section (Historical Record) -->
        <div style="margin-top: 60px; padding-top: 40px; border-top: 1px dashed var(--slate-border);">
            <div style="margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid var(--slate-border); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy);">
                        <?php _e('Emeritus & Past Board Members', 'org-corporate'); ?>
                    </h2>
                    <p style="font-size: 13px; color: #64748b; margin-top: 2px;">
                        <?php _e('Distinguished former directors honored for their enduring contributions to the organization charter.', 'org-corporate'); ?>
                    </p>
                </div>
                <span style="font-size: 12px; background: #f1f5f9; color: #475569; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
                    <?php _e('Historical Roster', 'org-corporate'); ?>
                </span>
            </div>

            <?php echo do_shortcode('[board_of_directors status="emeritus" columns="4"]'); ?>
        </div>
    </div>
</main>

<?php
get_footer();
