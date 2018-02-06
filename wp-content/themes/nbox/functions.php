<?php 

define('child_template_directory', dirname( get_bloginfo('stylesheet_url')) );

define ('VERSION', '1.1.3');

function version_id() {
  if ( WP_DEBUG )
    return time();
  return VERSION;
}

add_action( 'wp_enqueue_scripts', 'nbox_enqueue_assets' );
function nbox_enqueue_assets() {
	wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css', '', version_id() );

    // Components styles
    wp_enqueue_style( 'nboxStyles', get_stylesheet_directory_uri() . '/app/nbox-styles.css', '', version_id() );
    wp_enqueue_style( 'slick-style', get_stylesheet_directory_uri() . '/js/bower_components/slick-carousel/slick/slick.css', '', version_id() );
    wp_enqueue_style( 'slick-theme-style', get_stylesheet_directory_uri() . '/js/bower_components/slick-carousel/slick/slick-theme.css', '', version_id() );

}

add_action( 'wp_enqueue_scripts', 'nbox_google_fonts' );
function nbox_google_fonts() {
    wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Nunito:400,300,700&subset=latin', array() );
}

$api_url_base = 'http://servicios.coderia.mx:8082';
//$api_url_base = 'https://servicios.n-box.com.mx';
$api_args = array('sslverify' => false);

function get_instructors() {
    global $api_url_base, $api_args;
    $data['instructors'] = array();

    $url = $api_url_base.'/instructors';
    $request = new WP_Http;
    $result = $request->get( $url, $api_args );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['instructors']) ){
            $data['instructors'] = $json['instructors'];
        }
    }
    return htmlspecialchars(json_encode($data['instructors']));

}

function get_schedule_types() {
    global $api_url_base, $api_args;
    $data['schedule_types'] = array();

    $url = $api_url_base.'/schedule_types';
    $request = new WP_Http;
    $result = $request->get( $url, $api_args );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['schedule_types']) ){
            $data['schedule_types'] = $json['schedule_types'];
        }
    }
    return htmlspecialchars(json_encode($data['schedule_types']));

}

function get_packs() {
    global $api_url_base, $api_args;
    $data['packs'] = array();

    $url = $api_url_base.'/packs';
    $request = new WP_Http;
    $result = $request->get( $url, $api_args);
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['packs']) ){
            $data['packs'] = $json['packs'];
        }
    }
    return htmlspecialchars(json_encode($data['packs']));
}

function get_weekly_schedule() {
    global $api_url_base, $api_args;
    $data['weekly_schedule'] = array();

    $url = $api_url_base.'/schedules/weekly_scope';
    $request = new WP_Http;
    $result = $request->get( $url, $api_args );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['schedules']) ){
            $data['weekly_schedule'] = $json;
        }
    }
    return htmlspecialchars(json_encode($data['weekly_schedule']));
}

function get_instructor_profile() {
    global $api_url_base, $api_args;
    $data['instructor'] = array();

    $instructor_id = $_GET['id'];

    $url = $api_url_base.'/instructors/' . $instructor_id;
    $request = new WP_Http;
    $result = $request->get( $url, $api_args );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['instructor']) ){
            $data['instructor'] = $json['instructor'];
        }
    }
    return htmlspecialchars(json_encode($data['instructor']));
}

function get_cards() {
    global $api_url_base;
    $data['cards'] = array();

    $url = $api_url_base.'/cards/get_all_for_user';
    $request = new WP_Http;

    $result = $request->get( $url, array('headers' => get_nbx_headers(), 'sslverify' => false) );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['cards']) ){
            $data['cards'] = $json['cards'];
        }
    }
    return htmlspecialchars(json_encode($data['cards']));
}

function get_primary_card() {
    global $api_url_base;
    $data['card'] = null;

    $url = $api_url_base.'/cards/get_primary_for_user';
    $request = new WP_Http;

    $result = $request->get( $url, array('headers' => get_nbx_headers(), 'sslverify' => false) );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['card']) ){
            $data['card'] = $json['card'];
        }
    }
    return htmlspecialchars(json_encode($data['card']));
}

function get_future_appointments() {
    global $api_url_base;
    $data['appointments'] = array();

    $url = $api_url_base.'/appointments/weekly_scope_for_user';
    $request = new WP_Http;

    $result = $request->get( $url, array('headers' => get_nbx_headers(), 'sslverify' => false) );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['appointments']) ){
            $data['appointments'] = $json['appointments'];
        }
    }

    return htmlspecialchars(json_encode($data['appointments']));
}

function get_appointments_history() {
    global $api_url_base;
    $data['appointments'] = array();

    $url = $api_url_base.'/appointments/historic_for_user';
    $request = new WP_Http;

    $result = $request->get( $url, array('headers' => get_nbx_headers(), 'sslverify' => false) );
    if( wp_remote_retrieve_response_code($result) == '200' || wp_remote_retrieve_response_code($result) == '304' ){
        $json = json_decode( $result['body'], true );
        if( isset($json['appointments']) ){
            $data['appointments'] = $json['appointments'];
        }
    }
    return htmlspecialchars(json_encode($data['appointments']));
}

function get_nbx_headers() {
    $formatted_headers = array();

    if (isset($_COOKIE['nbx-headers'])) {
        $headers = json_decode(stripslashes($_COOKIE['nbx-headers']), true);

        $formatted_headers['access-token'] = $headers['accessToken'];
        $formatted_headers['expiry'] = $headers['expiry'];
        $formatted_headers['token-type'] = $headers['tokenType'];
        $formatted_headers['uid'] = $headers['uid'];
        $formatted_headers['client'] = $headers['client'];
    }

    return $formatted_headers;
}

add_action( 'wp_enqueue_scripts', 'coderia_register_angular_scripts' );
function coderia_register_angular_scripts() {

    // Common libraries
    wp_register_script( 'conekta', 'https://conektaapi.s3.amazonaws.com/v0.3.2/js/conekta.js', '', version_id() );
    wp_register_script( 'moment', get_stylesheet_directory_uri() . '/js/bower_components/moment/min/moment.min.js', '', version_id() );
    wp_register_script( 'timezone', get_stylesheet_directory_uri() . '/js/bower_components/moment-timezone/builds/moment-timezone-with-data.min.js', '', version_id() );
    wp_register_script( 'sprintf', get_stylesheet_directory_uri() . '/js/bower_components/sprintf/dist/sprintf.min.js', '', version_id() );
    wp_register_script( 'locale', get_stylesheet_directory_uri() . '/js/bower_components/moment/locale/es.js', '', version_id() );
    wp_register_script( 'alertify', get_stylesheet_directory_uri() . '/js/bower_components/alertify/alertify.min.js', '', version_id() );

    // Angular core and libraries
    wp_register_script( 'angularjs', get_stylesheet_directory_uri() . '/js/bower_components/angular/angular.min.js', '', version_id() );
    wp_register_script( 'angular-route', get_stylesheet_directory_uri() . '/js/bower_components/angular-route/angular-route.min.js', '', version_id() );
    wp_register_script( 'angular-logger', get_stylesheet_directory_uri() . '/js/bower_components/angular-logger/dist/angular-logger.min.js', '', version_id() );
    wp_register_script( 'angular-sanitize', get_stylesheet_directory_uri() . '/js/bower_components/angular-sanitize/angular-sanitize.min.js', '', version_id() );
    wp_register_script( 'angular-scroll', get_stylesheet_directory_uri() . '/js/bower_components/angular-scroll/angular-scroll.min.js', '', version_id() );
    wp_register_script( 'angular-local-storage' , get_stylesheet_directory_uri() . '/js/bower_components/angular-local-storage/dist/angular-local-storage.min.js', '', version_id() );
    wp_register_script( 'angular-animate' , get_stylesheet_directory_uri() . '/js/bower_components/angular-animate/angular-animate.min.js', '', version_id() );
    wp_register_script( 'spinner' , get_stylesheet_directory_uri() . '/js/bower_components/spin/javascripts/jquery.spin.js', '', version_id() );
    wp_register_script( 'angular-spinner' , get_stylesheet_directory_uri() . '/js/bower_components/angular-spinner/dist/angular-spinner.js', '', version_id() );
    wp_register_script( 'slick-carousel' , get_stylesheet_directory_uri() . '/js/bower_components/slick-carousel/slick/slick.js', '', version_id() );
    wp_register_script( 'slick' , get_stylesheet_directory_uri() . '/js/bower_components/angular-slick-carousel/dist/angular-slick.min.js', '', version_id() );

    // Application
    wp_register_script( 'app', get_stylesheet_directory_uri() . '/app/application.js', '', version_id() );

    // Custom Libraries
    wp_register_script( 'CalendarDay', get_stylesheet_directory_uri() . '/app/lib/CalendarDay.js', '', version_id() );
    wp_register_script( 'Instructor', get_stylesheet_directory_uri() . '/app/lib/Instructor.js', '', version_id() );
    wp_register_script( 'BoxClass', get_stylesheet_directory_uri() . '/app/lib/BoxClass.js', '', version_id() );
    wp_register_script( 'Station', get_stylesheet_directory_uri() . '/app/lib/Station.js', '', version_id() );
    wp_register_script( 'Appointment', get_stylesheet_directory_uri() . '/app/lib/Appointment.js', '', version_id() );
    wp_register_script( 'ScheduleType', get_stylesheet_directory_uri() . '/app/lib/ScheduleType.js', '', version_id() );
    wp_register_script( 'User', get_stylesheet_directory_uri() . '/app/lib/User.js', '', version_id() );
    wp_register_script( 'Pack', get_stylesheet_directory_uri() . '/app/lib/Pack.js', '', version_id() );
    wp_register_script( 'Card', get_stylesheet_directory_uri() . '/app/lib/Card.js', '', version_id() );

    // Filters
    wp_register_script( 'ClassByInstructorFilter', get_stylesheet_directory_uri() . '/app/common/classByInstructorFilter.js', '', version_id() );
    wp_register_script( 'ClassByScheduleTypeFilter', get_stylesheet_directory_uri() . '/app/common/classByScheduleTypeFilter.js', '', version_id() );
    wp_register_script( 'OrderByDateFilter', get_stylesheet_directory_uri() . '/app/common/orderByDateFilter.js', '', version_id() );
    
    // Services
    wp_register_script( 'LoggerService', get_stylesheet_directory_uri() . '/app/common/loggerService.js', '', version_id() );
    wp_register_script( 'SessionService', get_stylesheet_directory_uri() . '/app/common/sessionService.js', '', version_id() );
    wp_register_script( 'UtilsService', get_stylesheet_directory_uri() . '/app/common/utilsService.js', '', version_id() );
    wp_register_script( 'LoginService', get_stylesheet_directory_uri() . '/app/components/login/loginService.js', '', version_id() );
    wp_register_script( 'PackService', get_stylesheet_directory_uri() . '/app/components/packs/packService.js', '', version_id() );
    wp_register_script( 'CalendarService', get_stylesheet_directory_uri() . '/app/components/calendar/calendarService.js', '', version_id() );
    wp_register_script( 'InstructorService', get_stylesheet_directory_uri() . '/app/components/instructors/instructorService.js', '', version_id() );
    wp_register_script( 'InstructorProfileService', get_stylesheet_directory_uri() . '/app/components/instructor-profile/instructorProfileService.js', '', version_id() );
    wp_register_script( 'ClassroomService', get_stylesheet_directory_uri() . '/app/components/classroom/classroomService.js', '', version_id() );
    wp_register_script( 'BookingService', get_stylesheet_directory_uri() . '/app/components/booking/bookingService.js', '', version_id() );
    wp_register_script( 'PaymentService', get_stylesheet_directory_uri() . '/app/components/payment/paymentService.js', '', version_id() );
    wp_register_script( 'ProfilePaymentService', get_stylesheet_directory_uri() . '/app/components/profile/payments/profilePaymentService.js', '', version_id() );
    wp_register_script( 'ProfileAccountService', get_stylesheet_directory_uri() . '/app/components/profile/account/profileAccountService.js', '', version_id() );
    wp_register_script( 'ProfileHistoryService', get_stylesheet_directory_uri() . '/app/components/profile/history/profileHistoryService.js', '', version_id() );
    wp_register_script( 'ProfileDashboardService', get_stylesheet_directory_uri() . '/app/components/profile/dashboard/profileDashboardService.js', '', version_id() );
    wp_register_script( 'SocialService', get_stylesheet_directory_uri() . '/app/components/social/socialService.js', '', version_id() );

    // Controllers
    wp_register_script( 'RootController', get_stylesheet_directory_uri() . '/app/common/rootController.js', '', version_id() );
    wp_register_script( 'LoginController', get_stylesheet_directory_uri() . '/app/components/login/loginController.js', '', version_id() );
    wp_register_script( 'NavigationController', get_stylesheet_directory_uri() . '/app/components/navigation/navigationController.js', '', version_id() );
    wp_register_script( 'PackController', get_stylesheet_directory_uri() . '/app/components/packs/packController.js', '', version_id() );
    wp_register_script( 'CalendarController', get_stylesheet_directory_uri() . '/app/components/calendar/calendarController.js', '', version_id() );
    wp_register_script( 'InstructorController', get_stylesheet_directory_uri() . '/app/components/instructors/instructorController.js', '', version_id() );
    wp_register_script( 'InstructorProfileController', get_stylesheet_directory_uri() . '/app/components/instructor-profile/instructorProfileController.js', '', version_id() );
    wp_register_script( 'ClassroomController', get_stylesheet_directory_uri() . '/app/components/classroom/classroomController.js', '', version_id() );
    wp_register_script( 'BookingController', get_stylesheet_directory_uri() . '/app/components/booking/bookingController.js', '', version_id() );
    wp_register_script( 'PaymentController', get_stylesheet_directory_uri() . '/app/components/payment/paymentController.js', '', version_id() );
    wp_register_script( 'ProfileController', get_stylesheet_directory_uri() . '/app/components/profile/profileController.js', '', version_id() );
    wp_register_script( 'ProfilePaymentController', get_stylesheet_directory_uri() . '/app/components/profile/payments/profilePaymentController.js', '', version_id() );
    wp_register_script( 'ProfileAccountController', get_stylesheet_directory_uri() . '/app/components/profile/account/profileAccountController.js', '', version_id() );
    wp_register_script( 'ProfileHistoryController', get_stylesheet_directory_uri() . '/app/components/profile/history/profileHistoryController.js', '', version_id() );
    wp_register_script( 'ProfileDashboardController', get_stylesheet_directory_uri() . '/app/components/profile/dashboard/profileDashboardController.js', '', version_id() );
    wp_register_script( 'NotificationController', get_stylesheet_directory_uri() . '/app/components/notification/notificationController.js', '', version_id() );

}

add_action( 'wp_enqueue_scripts', 'coderia_enqueue_angular_scripts' );
function coderia_enqueue_angular_scripts() {

    // Common libraries
    wp_enqueue_script( 'moment' );
    wp_enqueue_script( 'timezone' );
    wp_enqueue_script( 'sprintf' );
    wp_enqueue_script( 'locale' );
    wp_enqueue_script( 'alertify' );

    // Angular core and libraries
    wp_enqueue_script( 'angularjs' );
    wp_enqueue_script( 'angular-logger' );
    wp_enqueue_script( 'angular-sanitize' );
    wp_enqueue_script( 'angular-scroll' );
    wp_enqueue_script( 'angular-local-storage' );
    wp_enqueue_script( 'angular-animate' );
    wp_enqueue_script( 'spinner' );
    wp_enqueue_script( 'angular-spinner' );
    wp_enqueue_script( 'slick-carousel' );
    wp_enqueue_script( 'slick' );

    // Application
    wp_enqueue_script( 'app' );

    // Classes
    wp_enqueue_script( 'CalendarDay' );
    wp_enqueue_script( 'Instructor' );
    wp_enqueue_script( 'BoxClass' );
    wp_enqueue_script( 'ScheduleType' );
    wp_enqueue_script( 'User' );

    // Filters
    wp_enqueue_script( 'ClassByInstructorFilter' );
    wp_enqueue_script( 'ClassByScheduleTypeFilter' );
    wp_enqueue_script( 'OrderByDateFilter' );

    // Services
    wp_enqueue_script( 'LoggerService' );
    wp_enqueue_script( 'UtilsService' );
    wp_enqueue_script( 'UserService' );
    wp_enqueue_script( 'SessionService' );
    wp_enqueue_script( 'LoginService' );

    // Controllers
    wp_enqueue_script( 'RootController' );
    wp_enqueue_script( 'NavigationController' );

}

//* Add logout link to menu
add_filter( 'wp_nav_menu_items', 'nbox_add_menu_items', 10, 2 );
function nbox_add_menu_items( $items, $args ) {
    // Change 'primary' to 'secondary' to put the login link in your secondary nav bar
    if ( $args->theme_location == 'primary-menu' ) {
        $items .= '<li class="menu-item" ng-show="!navigationCtrl.isLoggedIn()"><a href="#" class="menu-user" ng-click="navigationCtrl.showLogin()"><span class="menu-user-text">INICIAR SESIÓN</span></a></li>';
        $items .= '<li class="menu-item" ng-show="navigationCtrl.isLoggedIn()"><a href="' . site_url('mi-cuenta') . '" class="menu-user"><span class="menu-user-text">MI CUENTA</span><span class="menu-credits" ng-bind="navigationCtrl.getUserClassesLeft()"></span><span class="tooltip">{{ "Hola " + navigationCtrl.getGreetings() }}</span></a></li>';
        $items .= '<li class="menu-item" ng-show="navigationCtrl.isLoggedIn()"><a href="#" ng-click="navigationCtrl.logout()">SALIR</a></li>';
    }
    return $items;
}


add_action( 'wp', 'check_authorization',10,1);
function check_authorization() {
    if ( is_page('mi-cuenta') ){
        if ( !isset($_COOKIE['nbx-headers']) ){
            wp_redirect( home_url() );
            exit;
        }
    }

}

function wp_after_body() {  
    do_action('wp_after_body');
}

function fbsdkhead() {

    if ( is_page('mi-cuenta') || is_page('compra-success') || is_page('reserva-success')) {
        wp_enqueue_script( 'SocialService' );

        ?>
        <div id="fb-root"></div>
        <script>
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '271662650002298',
                    xfbml: true,
                    version: 'v2.6'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            var a2a_config = a2a_config || {};

        </script>
        <script async src="https://static.addtoany.com/menu/page.js"></script>

        <?php
    }
}
add_action( 'wp_after_body', 'fbsdkhead' );
