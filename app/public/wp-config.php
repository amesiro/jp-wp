<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'fYG3.&nKSF<iKwAveN87wBr%i*7$iwJps,WC IoW$`v>.3cVKt0=i0W^5wSn:U}0' );
define( 'SECURE_AUTH_KEY',   'wwxk#W;.{9{Rl=ihP7S]8%, aLRg{s=q!_Ej|wdD3?i^Zn3Khce]2-2OJz+2WJMF' );
define( 'LOGGED_IN_KEY',     '?X3)}{)P[|cMNH3$mb)N0wri`MpBtNmro|jrv(bpJ1Gh.]k&h>k1EuZ{<a(cT=-?' );
define( 'NONCE_KEY',         '%0O3FX8jH/^bXD.0pEVp%xkF;j;J4gHBEC4,95Xo*i#0ND;dxM.Yv*R3}<*k6xrQ' );
define( 'AUTH_SALT',         '2-xmkgi#{b7!T?/>^_!R!%>4IP!gl}5D y8;/+h*U5lEKEa6cROH6*GV)jqXzs*^' );
define( 'SECURE_AUTH_SALT',  'MKtbN/RfjytP4Pd bE^aT0/+,$d6Qy8g<EBn`lf<L%:0KOd,>2wUhGN%vq{ot34~' );
define( 'LOGGED_IN_SALT',    '$&6Ygr$.AOO._Bz%_LMOB<yB kKatM|Mk;LG{U7I|zwARwYCvHRGq6^ eZ/cRV7,' );
define( 'NONCE_SALT',        'OFKrudO|+XKnv{ j&c6KwW^]6M8S91X8@$|LZn3u9OYx$PEWnms0kArZ5?ef`x1l' );
define( 'WP_CACHE_KEY_SALT', '6N[PEklyztM)t&JKrC8~6hbkL8=VcL:kM0O/{w{ FZHO==liDX!#X2@7oW)406/{' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
