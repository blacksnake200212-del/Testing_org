<?php
/**
 * Template Name: Contact Us
 */
get_header();

$message_sent = false;
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['org_contact_nonce']) && wp_verify_nonce($_POST['org_contact_nonce'], 'org_submit_contact')) {
    $name    = sanitize_text_field($_POST['contact_name'] ?? '');
    $email   = sanitize_email($_POST['contact_email'] ?? '');
    $dept    = sanitize_text_field($_POST['contact_department'] ?? 'General Secretariat');
    $subject = sanitize_text_field($_POST['contact_subject'] ?? '');
    $message = sanitize_textarea_field($_POST['contact_message'] ?? '');

    if (!empty($name) && !empty($email) && !empty($message)) {
        // Send email or log to DB
        $to = get_theme_mod('org_email', get_option('admin_email'));
        $email_subject = "[Org Inquiry] " . $subject . " (" . $dept . ")";
        $email_body = "From: $name <$email>\nDepartment: $dept\n\nMessage:\n$message";
        $headers = array('Content-Type: text/plain; charset=UTF-8', "Reply-To: $name <$email>");

        @wp_mail($to, $email_subject, $email_body, $headers);
        $message_sent = true;
    } else {
        $error_message = __('Please fill out all required fields.', 'org-corporate');
    }
}
?>

<div style="background: var(--navy); color: #ffffff; padding: 50px 0;">
    <div class="container">
        <span style="color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            <?php _e('National Secretariat', 'org-corporate'); ?>
        </span>
        <h1 style="font-family: var(--font-heading); font-size: 38px; font-weight: 800; color: #ffffff; margin-top: 6px;">
            <?php _e('Contact & Official Inquiries', 'org-corporate'); ?>
        </h1>
        <p style="color: #94a3b8; font-size: 15px; max-width: 650px; margin-top: 10px;">
            <?php _e('Reach out to our communications bureau, schedule institutional delegations, or request official documentation.', 'org-corporate'); ?>
        </p>
    </div>
</div>

<main style="padding: 60px 0 90px 0;">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.4fr; gap: 40px; align-items: start;">
            <!-- Left: Headquarters Info -->
            <div>
                <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 24px;">
                    <h3 style="font-family: var(--font-heading); font-size: 20px; font-weight: 800; color: var(--navy); margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
                        <?php _e('Headquarters Details', 'org-corporate'); ?>
                    </h3>

                    <div style="display: flex; flex-direction: column; gap: 20px; font-size: 14px;">
                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 4px;">📍 <?php _e('Physical Address', 'org-corporate'); ?></strong>
                            <p style="color: #1e293b;"><?php echo esc_html(get_theme_mod('org_address', 'Level 14, Apex Tower, 45 Galle Road, Colombo 03, Sri Lanka')); ?></p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 4px;">📞 <?php _e('Telephone & Hotline', 'org-corporate'); ?></strong>
                            <p style="color: #1e293b;"><?php echo esc_html(get_theme_mod('org_phone', '+94 11 289 4500')); ?></p>
                            <p style="font-size: 12px; color: #64748b;"><?php _e('Direct Hotline: +94 77 123 4567', 'org-corporate'); ?></p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 4px;">✉ <?php _e('Electronic Mail', 'org-corporate'); ?></strong>
                            <p><a href="mailto:<?php echo esc_attr(get_theme_mod('org_email', 'info@organization.lk')); ?>" style="color: var(--primary); font-weight: 600;"><?php echo esc_html(get_theme_mod('org_email', 'info@organization.lk')); ?></a></p>
                        </div>

                        <div>
                            <strong style="display: block; font-size: 11px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; margin-bottom: 4px;">🕒 <?php _e('Operating Hours', 'org-corporate'); ?></strong>
                            <p style="color: #1e293b;"><?php _e('Monday to Friday: 8:30 AM – 4:30 PM', 'org-corporate'); ?></p>
                            <p style="font-size: 12px; color: #64748b;"><?php _e('Closed on Weekends and Public Holidays', 'org-corporate'); ?></p>
                        </div>
                    </div>
                </div>

                <!-- Google Maps Card -->
                <div style="background: #f1f5f9; border: 1px solid var(--slate-border); border-radius: 16px; padding: 30px; text-align: center;">
                    <div style="font-size: 32px; margin-bottom: 10px;">🗺</div>
                    <h4 style="font-weight: 700; color: var(--navy); margin-bottom: 6px;"><?php _e('Secretariat Location', 'org-corporate'); ?></h4>
                    <p style="font-size: 12px; color: #64748b; margin-bottom: 14px;"><?php echo esc_html(get_theme_mod('org_address', 'Apex Tower, Galle Road, Colombo 03')); ?></p>
                    <a href="https://maps.google.com/?q=<?php echo urlencode(get_theme_mod('org_address', 'Apex Tower, Colombo')); ?>" target="_blank" rel="noopener noreferrer" style="font-size: 12px; font-weight: 700; color: var(--primary);">
                        <?php _e('Open in Google Maps →', 'org-corporate'); ?>
                    </a>
                </div>
            </div>

            <!-- Right: Interactive Inquiry Form -->
            <div style="background: #ffffff; border: 1px solid var(--slate-border); border-radius: 16px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
                <h3 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 8px;">
                    <?php _e('Send Official Communication', 'org-corporate'); ?>
                </h3>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 24px;">
                    <?php _e('Submissions are logged into the Secretariat register and routed to the corresponding department head.', 'org-corporate'); ?>
                </p>

                <?php if ($message_sent) : ?>
                    <div style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 20px; border-radius: 10px; text-align: center;">
                        <h4 style="margin: 0 0 6px 0; font-size: 16px;">✓ <?php _e('Inquiry Sent Successfully', 'org-corporate'); ?></h4>
                        <p style="margin: 0; font-size: 13px;">
                            <?php _e('Thank you for contacting us. Your message has been received and our Secretariat will follow up shortly.', 'org-corporate'); ?>
                        </p>
                    </div>
                <?php else : ?>
                    <?php if ($error_message) : ?>
                        <div style="background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 12px; border-radius: 8px; margin-bottom: 18px; font-size: 13px;">
                            <?php echo esc_html($error_message); ?>
                        </div>
                    <?php endif; ?>

                    <form method="post" action="">
                        <?php wp_nonce_field('org_submit_contact', 'org_contact_nonce'); ?>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                                    <?php _e('Your Full Name *', 'org-corporate'); ?>
                                </label>
                                <input type="text" name="contact_name" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;" placeholder="e.g. Sahan Perera" />
                            </div>
                            <div>
                                <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                                    <?php _e('Official Email *', 'org-corporate'); ?>
                                </label>
                                <input type="email" name="contact_email" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;" placeholder="name@example.com" />
                            </div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                                <?php _e('Recipient Department', 'org-corporate'); ?>
                            </label>
                            <select name="contact_department" style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; background: #ffffff;">
                                <option value="General Secretariat"><?php _e('General Secretariat Inquiries', 'org-corporate'); ?></option>
                                <option value="Media & Press"><?php _e('Media & Press Relations', 'org-corporate'); ?></option>
                                <option value="Board of Directors"><?php _e('Board of Directors Secretariat', 'org-corporate'); ?></option>
                                <option value="Governance & Audit"><?php _e('Statutory Compliance & Audit', 'org-corporate'); ?></option>
                            </select>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                                <?php _e('Subject *', 'org-corporate'); ?>
                            </label>
                            <input type="text" name="contact_subject" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px;" placeholder="<?php esc_attr_e('Brief inquiry title', 'org-corporate'); ?>" />
                        </div>

                        <div style="margin-bottom: 24px;">
                            <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px; text-transform: uppercase;">
                                <?php _e('Message *', 'org-corporate'); ?>
                            </label>
                            <textarea name="contact_message" rows="5" required style="width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; resize: vertical;" placeholder="<?php esc_attr_e('Write your official communication...', 'org-corporate'); ?>"></textarea>
                        </div>

                        <button type="submit" class="org-btn-primary" style="width: 100%; border: none; font-size: 14px; cursor: pointer;">
                            <?php _e('Submit Official Inquiry', 'org-corporate'); ?> →
                        </button>
                    </form>
                <?php endif; ?>
            </div>
        </div>
    </div>
</main>

<?php
get_footer();
