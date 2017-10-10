<?php

    wp_enqueue_script( 'ProfileController' );
    wp_enqueue_script( 'ProfileDashboardService' );
    wp_enqueue_script( 'ProfileDashboardController' );
    wp_enqueue_script( 'ProfileAccountService' );
    wp_enqueue_script( 'ProfileAccountController' );
    wp_enqueue_script( 'ProfileHistoryService' );
    wp_enqueue_script( 'ProfileHistoryController' );
    wp_enqueue_script( 'ProfilePaymentService' );
    wp_enqueue_script( 'ProfilePaymentController' );
    wp_enqueue_script( 'Card' );
    wp_enqueue_script( 'Appointment' );
    wp_enqueue_script( 'conekta' );

?>

<div class="profile-component" ng-controller="ProfileController as profileCtrl" ng-class="{ true:'dashboard' }[profileCtrl.isModuleVisible(profileCtrl.MODULES.DASHBOARD)]" ng-init="profileCtrl.init()">
    <h2 class="section-title">Mi cuenta</h2>

    <div class="profile-container">
        <aside class="profile-menu">
            <ul>
                <li ng-repeat="item in profileCtrl.MODULES" ng-class="{ true:'selected', false:'' }[profileCtrl.isModuleVisible(item)]" ng-click="profileCtrl.events.selectModule(item)">
                    <icon class="{{ item.icon }}"></icon>
                    <span class="item-name">{{ item.name }}</span>
                </li>
            </ul>
        </aside>

        <section class="modules-container">

            <section class="dashboard animate-visibility" ng-show="profileCtrl.isModuleVisible(profileCtrl.MODULES.DASHBOARD)">
                <?php locate_template( array( 'app/components/profile/dashboard/profileDashboardTemplate.php' ), true, true ); ?>
            </section>

            <section class="animate-visibility" ng-show="profileCtrl.isModuleVisible(profileCtrl.MODULES.HISTORY)">
                <?php locate_template( array( 'app/components/profile/history/profileHistoryTemplate.php' ), true, true ); ?>
            </section>

            <section class="animate-visibility" ng-show="profileCtrl.isModuleVisible(profileCtrl.MODULES.PERSONAL_INFO)">
                <?php locate_template( array( 'app/components/profile/account/profileAccountTemplate.php' ), true, true ); ?>
            </section>

            <section class="animate-visibility" ng-show="profileCtrl.isModuleVisible(profileCtrl.MODULES.PAYMENTS)">
                <?php locate_template( array( 'app/components/profile/payments/profilePaymentTemplate.php' ), true, true ); ?>
            </section>

        </section>
    </div>
</div>
