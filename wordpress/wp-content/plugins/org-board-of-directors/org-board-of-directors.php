<?php
/**
 * Plugin Name: Organization Board of Directors Management
 * Plugin URI: https://organization.lk
 * Description: Dedicated Board of Directors Management System for organizations. Add, edit, reorder directors (Chairman, Vice Chair, etc.), upload portraits, and toggle active vs emeritus status without touching code.
 * Version: 1.0.0
 * Author: Apex Institutional CMS Solutions
 * Text Domain: org-directors
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}

class Org_Board_Of_Directors {

    public function __construct() {
        // Register Custom Post Type & Taxonomies
        add_action('init', array($this, 'register_post_type'));
        add_action('init', array($this, 'register_taxonomies'));

        // Meta Boxes for Director Attributes
        add_action('add_meta_boxes', array($this, 'add_director_meta_boxes'));
        add_action('save_post_director', array($this, 'save_director_meta'), 10, 2);

        // Custom Admin Columns
        add_filter('manage_director_posts_columns', array($this, 'set_custom_columns'));
        add_action('manage_director_posts_custom_column', array($this, 'render_custom_columns'), 10, 2);
        add_filter('manage_edit-director_sortable_columns', array($this, 'sortable_columns'));
        add_action('pre_get_posts', array($this, 'admin_order_directors'));

        // Frontend Shortcode
        add_shortcode('board_of_directors', array($this, 'render_directors_shortcode'));

        // Enqueue Assets
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_assets'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }

    /**
     * Register 'director' Custom Post Type
     */
    public function register_post_type() {
        $labels = array(
            'name'                  => _x('Board of Directors', 'Post Type General Name', 'org-directors'),
            'singular_name'         => _x('Director', 'Post Type Singular Name', 'org-directors'),
            'menu_name'             => __('Board of Directors', 'org-directors'),
            'name_admin_bar'        => __('Director', 'org-directors'),
            'archives'              => __('Director Archives', 'org-directors'),
            'all_items'             => __('All Directors', 'org-directors'),
            'add_new_item'          => __('Add New Director', 'org-directors'),
            'add_new'               => __('Add New', 'org-directors'),
            'new_item'              => __('New Director', 'org-directors'),
            'edit_item'             => __('Edit Director Profile', 'org-directors'),
            'update_item'           => __('Update Director', 'org-directors'),
            'view_item'             => __('View Profile', 'org-directors'),
            'search_items'          => __('Search Directors', 'org-directors'),
            'not_found'             => __('No directors found in database', 'org-directors'),
            'not_found_in_trash'    => __('No directors found in Trash', 'org-directors'),
            'featured_image'        => __('Director Portrait Photo', 'org-directors'),
            'set_featured_image'    => __('Set portrait photo', 'org-directors'),
            'remove_featured_image' => __('Remove portrait photo', 'org-directors'),
            'use_featured_image'    => __('Use as director portrait', 'org-directors'),
        );

        $args = array(
            'label'                 => __('Director', 'org-directors'),
            'description'           => __('Governing Board of Directors and Executive Committee members', 'org-directors'),
            'labels'                => $labels,
            'supports'              => array('title', 'editor', 'thumbnail'),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 21,
            'menu_icon'             => 'dashicons-groups',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'post',
            'show_in_rest'          => true, // Gutenberg & REST API support
            'rewrite'               => array('slug' => 'directors'),
        );

        register_post_type('director', $args);
    }

    /**
     * Register Board Committee Taxonomy
     */
    public function register_taxonomies() {
        $labels = array(
            'name'              => _x('Committees', 'taxonomy general name', 'org-directors'),
            'singular_name'     => _x('Committee', 'taxonomy singular name', 'org-directors'),
            'search_items'      => __('Search Committees', 'org-directors'),
            'all_items'         => __('All Committees', 'org-directors'),
            'edit_item'         => __('Edit Committee', 'org-directors'),
            'update_item'       => __('Update Committee', 'org-directors'),
            'add_new_item'      => __('Add New Committee', 'org-directors'),
            'new_item_name'     => __('New Committee Name', 'org-directors'),
            'menu_name'         => __('Committees', 'org-directors'),
        );

        register_taxonomy('director_committee', array('director'), array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array('slug' => 'committee'),
            'show_in_rest'      => true,
        ));
    }

    /**
     * Add Meta Boxes for Board Member Details
     */
    public function add_director_meta_boxes() {
        add_meta_box(
            'org_director_details',
            __('Board Member Official Credentials & Hierarchy', 'org-directors'),
            array($this, 'render_meta_box_details'),
            'director',
            'normal',
            'high'
        );
    }

    /**
     * Render Meta Box Fields
     */
    public function render_meta_box_details($post) {
        wp_nonce_field('org_save_director_meta', 'org_director_meta_nonce');

        $position      = get_post_meta($post->ID, '_director_position', true);
        $display_order = get_post_meta($post->ID, '_director_display_order', true);
        $status        = get_post_meta($post->ID, '_director_status', true);
        $email         = get_post_meta($post->ID, '_director_email', true);
        $linkedin      = get_post_meta($post->ID, '_director_linkedin', true);
        $tenure        = get_post_meta($post->ID, '_director_tenure', true);

        if ($display_order === '') {
            $display_order = '10';
        }
        if (!$status) {
            $status = 'active';
        }
        ?>
        <div style="padding: 10px 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
            <p style="margin-bottom: 18px; color: #555; font-size: 13px;">
                <?php _e('Configure the director\'s executive position, governing status, and display sequence on the public website.', 'org-directors'); ?>
            </p>

            <table class="form-table" role="presentation" style="width: 100%;">
                <tr>
                    <th scope="row" style="width: 25%;"><label for="org_director_position"><strong><?php _e('Position / Title *', 'org-directors'); ?></strong></label></th>
                    <td>
                        <input type="text" id="org_director_position" name="org_director_position" value="<?php echo esc_attr($position); ?>" class="regular-text" placeholder="e.g. Chairman of the Board" style="width: 100%; max-width: 480px;" required />
                        <p class="description"><?php _e('Official designation displayed under director\'s name (e.g. Chairman, Vice Chairperson, Director of Legal Affairs).', 'org-directors'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="org_director_display_order"><strong><?php _e('Display Hierarchy Order *', 'org-directors'); ?></strong></label></th>
                    <td>
                        <input type="number" id="org_director_display_order" name="org_director_display_order" value="<?php echo esc_attr($display_order); ?>" min="1" step="1" style="width: 100px;" required />
                        <p class="description"><?php _e('Controls position hierarchy on the website. Set <strong>1</strong> for Chairman, <strong>2</strong> for Vice Chair, <strong>3</strong> for Secretary, etc.', 'org-directors'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="org_director_status"><strong><?php _e('Membership Status', 'org-directors'); ?></strong></label></th>
                    <td>
                        <select id="org_director_status" name="org_director_status" style="width: 240px;">
                            <option value="active" <?php selected($status, 'active'); ?>><?php _e('Active Board Member', 'org-directors'); ?></option>
                            <option value="emeritus" <?php selected($status, 'emeritus'); ?>><?php _e('Past / Emeritus Member (Historical)', 'org-directors'); ?></option>
                        </select>
                        <p class="description"><?php _e('Best practice: When a director steps down, mark them as <em>Past / Emeritus</em> to preserve institutional records rather than deleting.', 'org-directors'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="org_director_tenure"><?php _e('Tenure / Service Period', 'org-directors'); ?></label></th>
                    <td>
                        <input type="text" id="org_director_tenure" name="org_director_tenure" value="<?php echo esc_attr($tenure); ?>" class="regular-text" placeholder="e.g. 2021 – Present or 2014 – 2021" style="width: 100%; max-width: 480px;" />
                        <p class="description"><?php _e('Years of board appointment.', 'org-directors'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="org_director_email"><?php _e('Official Email (Optional)', 'org-directors'); ?></label></th>
                    <td>
                        <input type="email" id="org_director_email" name="org_director_email" value="<?php echo esc_attr($email); ?>" class="regular-text" placeholder="director@organization.lk" style="width: 100%; max-width: 480px;" />
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="org_director_linkedin"><?php _e('LinkedIn Profile URL (Optional)', 'org-directors'); ?></label></th>
                    <td>
                        <input type="url" id="org_director_linkedin" name="org_director_linkedin" value="<?php echo esc_attr($linkedin); ?>" class="regular-text" placeholder="https://linkedin.com/in/director" style="width: 100%; max-width: 480px;" />
                    </td>
                </tr>
            </table>

            <div style="background: #f0f6fc; border-left: 4px solid #0073aa; padding: 12px 16px; margin-top: 15px; border-radius: 3px;">
                <p style="margin: 0; font-size: 13px; color: #1e3a8a;">
                    <strong><?php _e('Tip for Portrait Photos:', 'org-directors'); ?></strong>
                    <?php _e('Upload the director portrait using the <strong>Featured Image</strong> box on the right sidebar. Recommended resolution: 600x600px square or 3:4 portrait.', 'org-directors'); ?>
                </p>
            </div>
        </div>
        <?php
    }

    /**
     * Save Meta Box Data
     */
    public function save_director_meta($post_id, $post) {
        if (!isset($_POST['org_director_meta_nonce']) || !wp_verify_nonce($_POST['org_director_meta_nonce'], 'org_save_director_meta')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['org_director_position'])) {
            update_post_meta($post_id, '_director_position', sanitize_text_field($_POST['org_director_position']));
        }

        if (isset($_POST['org_director_display_order'])) {
            update_post_meta($post_id, '_director_display_order', intval($_POST['org_director_display_order']));
        }

        if (isset($_POST['org_director_status'])) {
            $status = in_array($_POST['org_director_status'], array('active', 'emeritus')) ? $_POST['org_director_status'] : 'active';
            update_post_meta($post_id, '_director_status', $status);
        }

        if (isset($_POST['org_director_tenure'])) {
            update_post_meta($post_id, '_director_tenure', sanitize_text_field($_POST['org_director_tenure']));
        }

        if (isset($_POST['org_director_email'])) {
            update_post_meta($post_id, '_director_email', sanitize_email($_POST['org_director_email']));
        }

        if (isset($_POST['org_director_linkedin'])) {
            update_post_meta($post_id, '_director_linkedin', esc_url_raw($_POST['org_director_linkedin']));
        }
    }

    /**
     * Custom Columns in Director List
     */
    public function set_custom_columns($columns) {
        $new_columns = array();
        $new_columns['cb']            = $columns['cb'];
        $new_columns['photo']         = __('Portrait', 'org-directors');
        $new_columns['title']         = __('Director Name', 'org-directors');
        $new_columns['position']      = __('Position / Designation', 'org-directors');
        $new_columns['committee']     = __('Committee', 'org-directors');
        $new_columns['display_order'] = __('Order #', 'org-directors');
        $new_columns['status']        = __('Status', 'org-directors');
        $new_columns['date']          = $columns['date'];
        return $new_columns;
    }

    /**
     * Render Custom Column Data
     */
    public function render_custom_columns($column, $post_id) {
        switch ($column) {
            case 'photo':
                if (has_post_thumbnail($post_id)) {
                    echo get_the_post_thumbnail($post_id, array(48, 48), array('style' => 'border-radius: 8px; object-fit: cover; border: 1px solid #ddd;'));
                } else {
                    echo '<div style="width: 48px; height: 48px; background: #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 11px;">' . __('No Pic', 'org-directors') . '</div>';
                }
                break;

            case 'position':
                $pos = get_post_meta($post_id, '_director_position', true);
                echo '<strong>' . esc_html($pos ? $pos : '—') . '</strong>';
                break;

            case 'committee':
                $terms = get_the_term_list($post_id, 'director_committee', '', ', ', '');
                echo $terms ? $terms : '<span style="color: #999;">' . __('General Board', 'org-directors') . '</span>';
                break;

            case 'display_order':
                $order = get_post_meta($post_id, '_director_display_order', true);
                echo '<span style="font-weight: bold; background: #f1f5f9; padding: 3px 8px; border-radius: 4px; font-family: monospace;">#' . intval($order) . '</span>';
                break;

            case 'status':
                $status = get_post_meta($post_id, '_director_status', true);
                if ($status === 'emeritus') {
                    echo '<span style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">' . __('Past / Emeritus', 'org-directors') . '</span>';
                } else {
                    echo '<span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">' . __('Active Member', 'org-directors') . '</span>';
                }
                break;
        }
    }

    /**
     * Make Display Order Sortable
     */
    public function sortable_columns($columns) {
        $columns['display_order'] = 'display_order';
        $columns['position']      = 'position';
        return $columns;
    }

    /**
     * Default Sort Order in Admin: Display Order ASC
     */
    public function admin_order_directors($query) {
        if (!is_admin() || !$query->is_main_query()) {
            return;
        }

        if ($query->get('post_type') === 'director') {
            $orderby = $query->get('orderby');
            if (empty($orderby) || $orderby === 'display_order') {
                $query->set('meta_key', '_director_display_order');
                $query->set('orderby', 'meta_value_num');
                $query->set('order', 'ASC');
            }
        }
    }

    /**
     * Frontend Shortcode: [board_of_directors]
     */
    public function render_directors_shortcode($atts) {
        $atts = shortcode_atts(array(
            'status'    => 'active', // 'active', 'emeritus', or 'all'
            'committee' => '',
            'columns'   => 4,
        ), $atts, 'board_of_directors');

        $meta_query = array();
        if ($atts['status'] !== 'all') {
            $meta_query[] = array(
                'key'     => '_director_status',
                'value'   => $atts['status'],
                'compare' => '=',
            );
        }

        $tax_query = array();
        if (!empty($atts['committee'])) {
            $tax_query[] = array(
                'taxonomy' => 'director_committee',
                'field'    => 'slug',
                'terms'    => sanitize_text_field($atts['committee']),
            );
        }

        $query_args = array(
            'post_type'      => 'director',
            'posts_per_page' => -1,
            'meta_key'       => '_director_display_order',
            'orderby'        => 'meta_value_num',
            'order'          => 'ASC',
            'meta_query'     => $meta_query,
            'tax_query'      => $tax_query,
        );

        $directors_query = new WP_Query($query_args);

        ob_start();
        ?>
        <div class="org-directors-wrapper">
            <?php if ($directors_query->have_posts()) : ?>
                <div class="org-directors-grid org-grid-cols-<?php echo esc_attr($atts['columns']); ?>">
                    <?php while ($directors_query->have_posts()) : $directors_query->the_post();
                        $director_id = get_the_ID();
                        $position    = get_post_meta($director_id, '_director_position', true);
                        $status      = get_post_meta($director_id, '_director_status', true);
                        $tenure      = get_post_meta($director_id, '_director_tenure', true);
                        $email       = get_post_meta($director_id, '_director_email', true);
                        $linkedin    = get_post_meta($director_id, '_director_linkedin', true);
                        $photo_url   = get_the_post_thumbnail_url($director_id, 'large');
                        if (!$photo_url) {
                            $photo_url = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600';
                        }
                    ?>
                        <div class="org-director-card" data-director-id="<?php echo esc_attr($director_id); ?>">
                            <div class="org-director-photo-wrap">
                                <img src="<?php echo esc_url($photo_url); ?>" alt="<?php the_title_attribute(); ?>" class="org-director-photo" />
                                <?php if ($status === 'emeritus') : ?>
                                    <span class="org-badge-emeritus"><?php _e('Emeritus', 'org-directors'); ?></span>
                                <?php endif; ?>
                            </div>
                            <div class="org-director-info">
                                <h3 class="org-director-name"><?php the_title(); ?></h3>
                                <p class="org-director-position"><?php echo esc_html($position); ?></p>
                                <div class="org-director-bio-preview">
                                    <?php echo wp_trim_words(get_the_content(), 18, '...'); ?>
                                </div>
                                <div class="org-director-actions">
                                    <button type="button" class="org-btn-read-bio" onclick="orgOpenDirectorModal(<?php echo esc_attr($director_id); ?>)">
                                        <?php _e('View Biography →', 'org-directors'); ?>
                                    </button>
                                </div>
                            </div>

                            <!-- Hidden Bio for Modal -->
                            <div id="org-director-modal-content-<?php echo esc_attr($director_id); ?>" style="display: none;">
                                <div class="org-modal-layout">
                                    <div class="org-modal-photo">
                                        <img src="<?php echo esc_url($photo_url); ?>" alt="<?php the_title_attribute(); ?>" />
                                        <?php if ($tenure) : ?>
                                            <p class="org-modal-tenure"><strong><?php _e('Tenure:', 'org-directors'); ?></strong> <?php echo esc_html($tenure); ?></p>
                                        <?php endif; ?>
                                    </div>
                                    <div class="org-modal-details">
                                        <h2 class="org-modal-name"><?php the_title(); ?></h2>
                                        <h4 class="org-modal-position"><?php echo esc_html($position); ?></h4>
                                        <div class="org-modal-full-bio">
                                            <?php the_content(); ?>
                                        </div>
                                        <div class="org-modal-contacts">
                                            <?php if ($email) : ?>
                                                <a href="mailto:<?php echo esc_attr($email); ?>" class="org-btn-contact-email">✉ <?php echo esc_html($email); ?></a>
                                            <?php endif; ?>
                                            <?php if ($linkedin) : ?>
                                                <a href="<?php echo esc_url($linkedin); ?>" target="_blank" rel="noopener noreferrer" class="org-btn-contact-linkedin">in LinkedIn</a>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>
            <?php else : ?>
                <p class="org-no-directors"><?php _e('No directors found matching current criteria.', 'org-directors'); ?></p>
            <?php endif; ?>
        </div>

        <!-- Global Biography Modal Container -->
        <div id="org-director-modal" class="org-director-modal-backdrop" style="display: none;" onclick="orgCloseDirectorModal(event)">
            <div class="org-director-modal-card" onclick="event.stopPropagation()">
                <button type="button" class="org-director-modal-close" onclick="orgCloseDirectorModal()">&times;</button>
                <div id="org-director-modal-body"></div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Enqueue CSS and JS
     */
    public function enqueue_frontend_assets() {
        wp_register_style('org-directors-style', plugins_url('directors.css', __FILE__), array(), '1.0.0');
        wp_register_script('org-directors-script', plugins_url('directors.js', __FILE__), array(), '1.0.0', true);

        // Enqueue on pages with shortcode or on director archive/single
        if (is_singular() || is_archive() || is_front_page()) {
            wp_enqueue_style('org-directors-style');
            wp_enqueue_script('org-directors-script');
        }
    }

    public function enqueue_admin_assets($hook) {
        // Optional custom admin styling for drag and drop
    }
}

new Org_Board_Of_Directors();
